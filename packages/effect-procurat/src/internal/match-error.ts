import { Effect, Schema } from 'effect';
import type { HttpBody } from 'effect/unstable/http';
import type { HttpClientError } from 'effect/unstable/http/HttpClientError';
import type { HttpClientResponse } from 'effect/unstable/http/HttpClientResponse';
import {
  ProcuratAuthError,
  ProcuratBadRequestError,
  type ProcuratError,
  ProcuratNotFoundError,
  ProcuratUnavailableError,
} from '../error/procurat-errors';
import { ProcuratErrorSchema } from './error-schema';
import { CurrentOperation } from './operation';

const MAX_MESSAGE_LENGTH = 500;

const decodeEnvelope = Schema.decodeUnknownEffect(ProcuratErrorSchema);

const truncate = (text: string) => (text.length > MAX_MESSAGE_LENGTH ? `${text.slice(0, MAX_MESSAGE_LENGTH)}…` : text);

const parseJson = (text: string): unknown => {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

/**
 * A reverse proxy can answer with an HTML 502 and Procurat itself is not obliged to
 * keep its envelope on every path, so an unparsable body degrades to the raw text
 * rather than killing the fiber.
 */
const readFailureBody = (
  response: HttpClientResponse,
  fallbackMessage: string,
): Effect.Effect<{ code: number | null; message: string }> =>
  response.text.pipe(
    Effect.flatMap((text) =>
      decodeEnvelope(parseJson(text)).pipe(
        Effect.map((envelope) => ({ code: envelope.code, message: envelope.error })),
        Effect.orElseSucceed(() => ({ code: null, message: truncate(text) })),
      ),
    ),
    Effect.orElseSucceed(() => ({ code: null, message: fallbackMessage })),
  );

/** Best-effort recovery of what we sent, so a rejected request can be dead-lettered. */
const requestPayload = (body: HttpBody.HttpBody): unknown => {
  if (body._tag !== 'Uint8Array') return undefined;
  return parseJson(new TextDecoder().decode(body.body));
};

/** The single seam turning a failed response into a Procurat-owned error. */
export const matchError = (error: HttpClientError): Effect.Effect<never, ProcuratError> =>
  Effect.gen(function* () {
    const operation = yield* CurrentOperation;
    const endpoint = error.request.url;

    if (error.reason._tag !== 'StatusCodeError') {
      return yield* new ProcuratUnavailableError({
        operation,
        endpoint,
        kind: 'transport',
        status: null,
        code: null,
        message: error.message,
        cause: error,
      });
    }

    const response = error.reason.response;
    const { code, message } = yield* readFailureBody(response, error.message);
    const failure = { operation, endpoint, status: response.status, code, message };

    switch (response.status) {
      case 400:
      case 409:
      case 422:
        return yield* new ProcuratBadRequestError({
          ...failure,
          payload: requestPayload(error.request.body),
        });
      case 401:
      case 403:
        return yield* new ProcuratAuthError(failure);
      case 404:
        return yield* new ProcuratNotFoundError(failure);
      default:
        return yield* new ProcuratUnavailableError({
          ...failure,
          kind: 'server',
          cause: null,
        });
    }
  });
