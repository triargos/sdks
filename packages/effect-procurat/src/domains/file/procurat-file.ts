import { Context, Effect, Layer, Option, Stream } from 'effect';
import { Headers, HttpClientRequest } from 'effect/unstable/http';
import { decodeJson, streamBody } from '../../internal/decode';
import { operation } from '../../internal/operation';
import type { ProcuratUnavailableError } from '../../shared/errors';
import { ProcuratHttpClient } from '../../shared/http-client';
import { DirectoryContent } from './file-schema';

/** Encodes each segment while preserving the directory separators. */
const encodePath = (path: string) => path.split('/').map(encodeURIComponent).join('/');

/**
 * The upload endpoint takes multipart and `FormData` needs a materialized `Blob`,
 * so the stream is buffered. The content type is set on the `Response` so `.blob()`
 * returns it directly instead of costing a second full copy.
 * Failure here means the runtime could not allocate the body — a defect, not a
 * condition a caller can recover from.
 */
const streamToBlob = (stream: Stream.Stream<Uint8Array>, contentType: string) =>
  Effect.promise(() =>
    new Response(Stream.toReadableStream(stream), {
      headers: { 'content-type': contentType },
    }).blob(),
  );

/**
 * The endpoints stream arbitrary bytes, so the type is only knowable from the response.
 * An absent `Content-Type` yields `application/octet-stream` — what HTTP already means by
 * an unlabeled body, and what `upload` sends when the caller names no type.
 */
export interface FileDownload {
  readonly contentType: string;
  readonly stream: Stream.Stream<Uint8Array, ProcuratUnavailableError>;
}

export interface UploadParams {
  readonly personId: number;
  readonly path: string;
  readonly fileName: string;
  readonly stream: Stream.Stream<Uint8Array>;
  readonly contentType?: string;
}

export class ProcuratFile extends Context.Service<ProcuratFile>()('ProcuratFile', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const list = (path: string) => http.get(path).pipe(Effect.flatMap(decodeJson(DirectoryContent)));

    const download = (path: string) =>
      http.get(path).pipe(
        Effect.flatMap((response) =>
          streamBody(response).pipe(
            Effect.map(
              (stream): FileDownload => ({
                contentType: Option.getOrElse(
                  Headers.get(response.headers, 'content-type'),
                  () => 'application/octet-stream',
                ),
                stream,
              }),
            ),
          ),
        ),
      );

    /**
     * The multipart body is serialized here instead of sending a `FormData`-tagged
     * body: the undici-backed client hands `FormData` to `dispatcher.request`, which
     * cannot serialize it, so the request leaves without a multipart content type and
     * Procurat rejects it. Bytes also survive `retryTransient` replaying the request,
     * which a one-shot body stream would not.
     */
    const upload = (path: string, params: UploadParams) =>
      Effect.gen(function* () {
        const blob = yield* streamToBlob(params.stream, params.contentType ?? 'application/octet-stream');
        const formData = new FormData();
        formData.append('file', blob, params.fileName);
        // `Response` owns the boundary: it serializes the multipart body and names it in the header.
        const serialized = new Response(formData);
        const bytes = yield* Effect.promise(async () => new Uint8Array(await serialized.arrayBuffer()));
        return yield* http
          .execute(
            HttpClientRequest.post(path).pipe(
              HttpClientRequest.bodyUint8Array(bytes, serialized.headers.get('content-type') ?? 'multipart/form-data'),
            ),
          )
          .pipe(Effect.asVoid);
      });

    const listManagementFiles = operation('file.listManagementFiles', (params: { personId: number; path?: string }) =>
      list(`/files/person/${params.personId}/management/${encodePath(params.path ?? '')}`),
    );

    const listFinanceFiles = operation('file.listFinanceFiles', (params: { personId: number; path?: string }) =>
      list(`/files/person/${params.personId}/finance/${encodePath(params.path ?? '')}`),
    );

    const listPublicFiles = operation('file.listPublicFiles', (params: { path?: string }) =>
      list(`/files/shared/${encodePath(params.path ?? '')}`),
    );

    const downloadManagementFile = operation(
      'file.downloadManagementFile',
      (params: { personId: number; path: string }) =>
        download(`/files/person/${params.personId}/management/download/${encodePath(params.path)}`),
    );

    const downloadFinanceFile = operation('file.downloadFinanceFile', (params: { personId: number; path: string }) =>
      download(`/files/person/${params.personId}/finance/download/${encodePath(params.path)}`),
    );

    const downloadPublicFile = operation('file.downloadPublicFile', (params: { path: string }) =>
      download(`/files/shared/download/${encodePath(params.path)}`),
    );

    const uploadManagementFile = operation('file.uploadManagementFile', (params: UploadParams) =>
      upload(`/files/person/${params.personId}/management/${encodePath(params.path)}`, params),
    );

    const uploadFinanceFile = operation('file.uploadFinanceFile', (params: UploadParams) =>
      upload(`/files/person/${params.personId}/finance/${encodePath(params.path)}`, params),
    );

    return {
      listManagementFiles,
      listFinanceFiles,
      listPublicFiles,
      downloadManagementFile,
      downloadFinanceFile,
      downloadPublicFile,
      uploadManagementFile,
      uploadFinanceFile,
    };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
