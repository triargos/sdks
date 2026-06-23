import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClient, HttpClientRequest } from '@effect/platform';
import { ProcuratError, ProcuratErrorSchema } from './errors';

const make = ({ baseUrl, apiKey }: { baseUrl: string; apiKey: string }) =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    return client.pipe(
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
          const details = yield* error.response.json.pipe(
            Effect.flatMap(Schema.decodeUnknown(ProcuratErrorSchema)),
            Effect.map((json) => ({ status, code: json.code, message: json.error, endpoint })),
            Effect.orElse(() =>
              Effect.succeed({ status, code: status, message: `HTTP ${status}`, endpoint }),
            ),
          );
          return yield* new ProcuratError(details);
        }),
      ),
    );
  });

export class ProcuratHttpClient extends Context.Tag('@triargos/procurat/HttpClient')<
  ProcuratHttpClient,
  Effect.Effect.Success<ReturnType<typeof make>>
>() {
  static layer = (config: { baseUrl: string; apiKey: string }) =>
    Layer.effect(ProcuratHttpClient, make(config));
}
