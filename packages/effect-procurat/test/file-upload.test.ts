import { Effect, Layer, Redacted, Stream } from 'effect';
import { HttpClient, type HttpClientRequest, HttpClientResponse } from 'effect/unstable/http';
import { describe, expect, it } from 'vitest';

import { ProcuratFile } from '../src/domains/file/procurat-file';
import { ProcuratHttpClient } from '../src/shared/http-client';

// Captures what would hit the wire, so the test can prove the request is
// well-formed multipart without depending on any client backend's FormData support.
const capturingLayer = (captured: Array<HttpClientRequest.HttpClientRequest>) =>
  Layer.succeed(HttpClient.HttpClient)(
    HttpClient.make((request) => {
      captured.push(request);
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } }),
        ),
      );
    }),
  );

const withCapturedRequests = <A, E>(
  captured: Array<HttpClientRequest.HttpClientRequest>,
  run: (file: ProcuratFile) => Effect.Effect<A, E>,
) =>
  Effect.gen(function* () {
    const file = yield* ProcuratFile;
    yield* run(file);
  }).pipe(
    Effect.provide(
      ProcuratFile.layer.pipe(
        Layer.provide(ProcuratHttpClient.layer({ baseUrl: 'http://procurat.test', apiKey: Redacted.make('key') })),
        Layer.provide(capturingLayer(captured)),
      ),
    ),
    Effect.runPromise,
  );

const uploadThroughSdk = (captured: Array<HttpClientRequest.HttpClientRequest>) =>
  withCapturedRequests(captured, (file) =>
    file.uploadManagementFile({
      personId: 1,
      path: 'docs/reports',
      fileName: 'a.pdf',
      stream: Stream.make(new TextEncoder().encode('hello')),
      contentType: 'application/pdf',
    }),
  );

describe('uploadManagementFile', () => {
  it('sends pre-serialized multipart bytes, not a FormData-tagged body', async () => {
    const captured: Array<HttpClientRequest.HttpClientRequest> = [];
    await uploadThroughSdk(captured);

    const request = captured[0];
    expect(request.method).toBe('POST');
    expect(request.url).toBe('http://procurat.test/files/person/1/management/docs/reports');
    // The undici client cannot serialize a FormData body — it must already be bytes.
    expect(request.body._tag).toBe('Uint8Array');
    expect(request.headers['content-type']).toMatch(/^multipart\/form-data; boundary=/);
  });

  it('produces a body the server can parse back to the file', async () => {
    const captured: Array<HttpClientRequest.HttpClientRequest> = [];
    await uploadThroughSdk(captured);

    const request = captured[0];
    if (request.body._tag !== 'Uint8Array') throw new Error('expected Uint8Array body');
    const parsed = await new Response(request.body.body, {
      headers: { 'content-type': request.headers['content-type'] },
    }).formData();

    const file = parsed.get('file');
    if (!(file instanceof File)) throw new Error('expected a file part named "file"');
    expect(file.name).toBe('a.pdf');
    expect(file.type).toBe('application/pdf');
    expect(await file.text()).toBe('hello');
  });
});

describe('uploadPublicFile', () => {
  it('posts multipart bytes to the shared files endpoint without a person scope', async () => {
    const captured: Array<HttpClientRequest.HttpClientRequest> = [];
    await withCapturedRequests(captured, (file) =>
      file.uploadPublicFile({
        path: 'forms/2024',
        fileName: 'schedule.pdf',
        stream: Stream.make(new TextEncoder().encode('shared')),
        contentType: 'application/pdf',
      }),
    );

    const request = captured[0];
    expect(request.method).toBe('POST');
    expect(request.url).toBe('http://procurat.test/files/shared/forms/2024');
    expect(request.body._tag).toBe('Uint8Array');
    expect(request.headers['content-type']).toMatch(/^multipart\/form-data; boundary=/);
  });
});
