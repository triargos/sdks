import { Effect, Schema, Stream } from 'effect';
import type { HttpClientResponse } from 'effect/unstable/http/HttpClientResponse';
import { ProcuratDecodeError, ProcuratUnavailableError } from '../shared/errors';
import { CurrentOperation } from './operation';

/** Reads the body once so `ProcuratDecodeError` can carry it. */
export const decodeJson =
  <A, I>(schema: Schema.Codec<A, I>) =>
  (response: HttpClientResponse): Effect.Effect<A, ProcuratDecodeError | ProcuratUnavailableError> => {
    const decode = Schema.decodeUnknownEffect(schema);
    return Effect.gen(function* () {
      const operation = yield* CurrentOperation;
      const endpoint = response.request.url;
      const body = yield* response.json.pipe(
        Effect.mapError(
          (cause) =>
            new ProcuratUnavailableError({
              operation,
              endpoint,
              kind: 'transport',
              status: null,
              code: null,
              message: cause.message,
              cause,
            }),
        ),
      );
      return yield* decode(body).pipe(
        Effect.mapError((cause) => new ProcuratDecodeError({ operation, endpoint, body, cause })),
      );
    });
  };

/** Hands the body back as a stream, with failures mid-download named as ours. */
export const streamBody = (
  response: HttpClientResponse,
): Effect.Effect<Stream.Stream<Uint8Array, ProcuratUnavailableError>> =>
  Effect.gen(function* () {
    const operation = yield* CurrentOperation;
    const endpoint = response.request.url;
    return response.stream.pipe(
      Stream.mapError(
        (cause) =>
          new ProcuratUnavailableError({
            operation,
            endpoint,
            kind: 'transport',
            status: null,
            code: null,
            message: cause.message,
            cause,
          }),
      ),
    );
  });
