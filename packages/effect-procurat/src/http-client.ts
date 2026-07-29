import { Context, Effect, Layer, Option, Redacted } from 'effect';
import { HttpClient, HttpClientRequest } from 'effect/unstable/http';
import type { ProcuratError } from './error/procurat-errors';
import { matchError } from './internal/match-error';
import { ProcuratRetry } from './retry';

export class ProcuratHttpClient extends Context.Service<
  ProcuratHttpClient,
  HttpClient.HttpClient.With<ProcuratError>
>()('ProcuratHttpClient') {
  static layer({
    baseUrl,
    apiKey,
  }: {
    readonly baseUrl: string;
    readonly apiKey: Redacted.Redacted<string>;
  }): Layer.Layer<ProcuratHttpClient, never, HttpClient.HttpClient> {
    return Layer.effect(this)(
      Effect.gen(function* () {
        const policy = Option.getOrElse(yield* Effect.serviceOption(ProcuratRetry), () => ProcuratRetry.defaultPolicy);

        return (yield* HttpClient.HttpClient).pipe(
          HttpClient.mapRequest((request) =>
            request.pipe(
              HttpClientRequest.acceptJson,
              HttpClientRequest.prependUrl(baseUrl),
              // `x-api-key` is in v4's default redacted-header set, so it stays out of logs.
              HttpClientRequest.setHeader('X-API-KEY', Redacted.value(apiKey)),
            ),
          ),
          HttpClient.filterStatusOk,
          // Must stay before retryTransient: the predicate reads the Procurat tag,
          // which only exists once the platform error has been mapped.
          HttpClient.catchTag('HttpClientError', matchError),
          HttpClient.retryTransient({
            while: policy.while,
            schedule: policy.schedule,
            times: policy.times,
          }),
        );
      }),
    );
  }
}
