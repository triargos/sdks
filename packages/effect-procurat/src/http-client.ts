import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClient, HttpClientRequest } from 'effect/unstable/http';
import {
  ProcuratBadRequestError,
  ProcuratErrorSchema,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratTransportError,
  ProcuratUnauthorizedError,
} from './error/procurat-errors';

type ProcuratHttpErrors =
  | ProcuratBadRequestError
  | ProcuratUnauthorizedError
  | ProcuratNotFoundError
  | ProcuratServerError
  | ProcuratTransportError;

export class ProcuratHttpClient extends Context.Service<
  ProcuratHttpClient,
  HttpClient.HttpClient.With<ProcuratHttpErrors>
>()('ProcuratHttpClient') {
  static layer({
    baseUrl,
    apiKey,
  }: {
    baseUrl: string;
    apiKey: string;
  }): Layer.Layer<ProcuratHttpClient, never, HttpClient.HttpClient> {
    return Layer.effect(
      this,
      Effect.gen(function* () {
        return (yield* HttpClient.HttpClient).pipe(
          HttpClient.mapRequest((request) =>
            request.pipe(
              HttpClientRequest.acceptJson,
              HttpClientRequest.prependUrl(baseUrl),
              HttpClientRequest.setHeader('X-API-KEY', apiKey),
            ),
          ),
          HttpClient.filterStatusOk,
          HttpClient.catchTag('HttpClientError', (error) =>
            Effect.gen(function* () {
              const endpoint = error.request.url;
              if (error.reason._tag !== 'StatusCodeError') {
                return yield* new ProcuratTransportError({ cause: error, endpoint });
              }

              const response = error.reason.response;
              const json = yield* response.json.pipe(
                Effect.flatMap(Schema.decodeUnknownEffect(ProcuratErrorSchema)),
                Effect.orDie,
              );
              const details = {
                message: json.error,
                code: json.code,
                endpoint,
                status: response.status,
              };

              switch (response.status) {
                case 400:
                  return yield* new ProcuratBadRequestError(details);
                case 401:
                  return yield* new ProcuratUnauthorizedError(details);
                case 404:
                  return yield* new ProcuratNotFoundError(details);
                default:
                  return yield* new ProcuratServerError(details);
              }
            }),
          ),
        );
      }),
    );
  }
}
