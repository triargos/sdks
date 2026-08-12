import { HttpClient, HttpClientResponse } from '@effect/platform';
import { RequestError } from '@effect/platform/HttpClientError';
import { Effect, Layer } from 'effect';

export const BASE_URL = 'https://procurat.test';

/** What the stub answers for one path. */
export type StubReply =
  | { readonly status: number; readonly body: unknown }
  /** No response at all — the shape `ProcuratUnavailableError` calls `transport`. */
  | { readonly transportFailure: string };

export interface SentRequest {
  readonly method: string;
  readonly path: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: unknown;
}

export interface StubHttpClient {
  readonly layer: Layer.Layer<HttpClient.HttpClient>;
  readonly sent: ReadonlyArray<SentRequest>;
}

const readBody = (body: { readonly _tag: string; readonly body?: unknown }): unknown => {
  if (body._tag !== 'Uint8Array') return undefined;
  try {
    return JSON.parse(new TextDecoder().decode(body.body as Uint8Array)) as unknown;
  } catch {
    return undefined;
  }
};

/**
 * A real v3 `HttpClient` layer over a route table. The SDK is exercised through its
 * own seam instead of a mocked module, so the layer wiring is part of what is tested.
 */
export const stubHttpClient = (routes: Readonly<Record<string, StubReply>>): StubHttpClient => {
  const sent: Array<SentRequest> = [];

  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) => {
      sent.push({
        method: request.method,
        path: url.pathname,
        headers: request.headers,
        body: readBody(request.body),
      });

      const reply = routes[url.pathname];
      if (reply === undefined) {
        return Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify({ code: 404, error: `no stub route for ${url.pathname}` }), { status: 404 }),
          ),
        );
      }
      if ('transportFailure' in reply) {
        return Effect.fail(
          new RequestError({ request, reason: 'Transport', cause: new Error(reply.transportFailure) }),
        );
      }
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(reply.body), {
            status: reply.status,
            headers: { 'content-type': 'application/json' },
          }),
        ),
      );
    }),
  );

  return { layer, sent };
};
