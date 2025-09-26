import { Effect, Schema } from 'effect';
import { HttpClient, HttpClientRequest } from '@effect/platform';
import {
  ProcuratBadRequestError,
  ProcuratErrorSchema,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
} from './error/procurat-errors';

export class ProcuratHttpClient extends Effect.Service<ProcuratHttpClient>()('ProcuratHttpClient', {
  effect: Effect.fnUntraced(function* ({ baseUrl, apiKey }: { baseUrl: string; apiKey: string }) {
    return (yield* HttpClient.HttpClient).pipe(
      HttpClient.mapRequest((request) =>
        request.pipe(
          HttpClientRequest.acceptJson,
          HttpClientRequest.prependUrl(baseUrl),
          HttpClientRequest.setHeader('X-API-KEY', apiKey),
        ),
      ),
      HttpClient.filterStatusOk,
      HttpClient.catchTag('ResponseError', (error) =>
        Effect.gen(function* () {
          const status = error.response.status;
          const endpoint = error.request.url;

          const json = yield* error.response.json.pipe(
            Effect.flatMap(Schema.decodeUnknown(ProcuratErrorSchema)),
            Effect.orDie,
          );
          const errorDetails = {
            ...json,
            endpoint,
            status,
          };
          switch (status) {
            case 400: {
              return yield* new ProcuratBadRequestError(errorDetails);
            }
            case 401: {
              return yield* new ProcuratUnauthorizedError(errorDetails);
            }
            case 404: {
              return yield* new ProcuratNotFoundError(errorDetails);
            }
            default: {
              return yield* new ProcuratServerError(errorDetails);
            }
          }
        }),
      ),
    );
  }),
}) {}