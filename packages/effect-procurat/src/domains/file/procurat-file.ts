import { Context, Effect, Layer, Stream } from 'effect';
import { ProcuratHttpClient } from '../../shared/http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import type { HttpClientError } from '@effect/platform';
import { DirectoryContentSchema } from './file-schema';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';

// Encode path segments while preserving directory structure
const encodePath = (path: string) => path.split('/').map(encodeURIComponent).join('/');

// Convert Effect stream to Blob for multipart upload
const streamToBlob = (stream: Stream.Stream<Uint8Array>, contentType: string) =>
  Effect.promise(() => new Response(Stream.toReadableStream(stream)).blob()).pipe(
    Effect.map((blob) => new Blob([blob], { type: contentType })),
  );

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  // List operations
  const listManagementFiles: (args: {
    personId: number;
    path?: string;
  }) => Effect.Effect<
    DirectoryContentSchema,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('file.listManagementFiles')(function* ({
    personId,
    path,
  }: {
    personId: number;
    path?: string;
  }) {
    return yield* http.get(`/files/person/${personId}/management/${encodePath(path ?? '')}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(DirectoryContentSchema)),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listFinanceFiles: (args: {
    personId: number;
    path?: string;
  }) => Effect.Effect<
    DirectoryContentSchema,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('file.listFinanceFiles')(function* ({
    personId,
    path,
  }: {
    personId: number;
    path?: string;
  }) {
    return yield* http.get(`/files/person/${personId}/finance/${encodePath(path ?? '')}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(DirectoryContentSchema)),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listPublicFiles: (args: {
    path?: string;
  }) => Effect.Effect<
    DirectoryContentSchema,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('file.listPublicFiles')(function* ({ path }: { path?: string }) {
    return yield* http.get(`/files/shared/${encodePath(path ?? '')}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(DirectoryContentSchema)),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  // Download operations (stream-based)
  const downloadManagementFile: (args: {
    personId: number;
    path: string;
  }) => Effect.Effect<
    Stream.Stream<Uint8Array, HttpClientError.ResponseError>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('file.downloadManagementFile')(function* ({
    personId,
    path,
  }: {
    personId: number;
    path: string;
  }) {
    return yield* http.get(`/files/person/${personId}/management/download/${encodePath(path)}`).pipe(
      Effect.map((response) => response.stream),
      Effect.catchTag('RequestError', (e) => new UnknownProcuratError({ message: e.message, cause: e })),
    );
  });

  const downloadFinanceFile: (args: {
    personId: number;
    path: string;
  }) => Effect.Effect<
    Stream.Stream<Uint8Array, HttpClientError.ResponseError>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('file.downloadFinanceFile')(function* ({
    personId,
    path,
  }: {
    personId: number;
    path: string;
  }) {
    return yield* http.get(`/files/person/${personId}/finance/download/${encodePath(path)}`).pipe(
      Effect.map((response) => response.stream),
      Effect.catchTag('RequestError', (e) => new UnknownProcuratError({ message: e.message, cause: e })),
    );
  });

  const downloadPublicFile: (args: {
    path: string;
  }) => Effect.Effect<
    Stream.Stream<Uint8Array, HttpClientError.ResponseError>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('file.downloadPublicFile')(function* ({ path }: { path: string }) {
    return yield* http.get(`/files/shared/download/${encodePath(path)}`).pipe(
      Effect.map((response) => response.stream),
      Effect.catchTag('RequestError', (e) => new UnknownProcuratError({ message: e.message, cause: e })),
    );
  });

  // Upload operations (stream API, multipart internally)
  const uploadManagementFile: (args: {
    personId: number;
    path: string;
    fileName: string;
    stream: Stream.Stream<Uint8Array>;
    contentType?: string;
  }) => Effect.Effect<
    void,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('file.uploadManagementFile')(function* ({
    personId,
    path,
    fileName,
    stream,
    contentType = 'application/octet-stream',
  }: {
    personId: number;
    path: string;
    fileName: string;
    stream: Stream.Stream<Uint8Array>;
    contentType?: string;
  }) {
    const blob = yield* streamToBlob(stream, contentType);
    const formData = new FormData();
    formData.append('file', blob, fileName);
    const request = HttpClientRequest.post(`/files/person/${personId}/management/${encodePath(path)}`).pipe(
      HttpClientRequest.bodyFormData(formData),
    );
    return yield* http.execute(request).pipe(
      Effect.asVoid,
      Effect.catchTag('RequestError', (e) => new UnknownProcuratError({ message: e.message, cause: e })),
    );
  });

  const uploadFinanceFile: (args: {
    personId: number;
    path: string;
    fileName: string;
    stream: Stream.Stream<Uint8Array>;
    contentType?: string;
  }) => Effect.Effect<
    void,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('file.uploadFinanceFile')(function* ({
    personId,
    path,
    fileName,
    stream,
    contentType = 'application/octet-stream',
  }: {
    personId: number;
    path: string;
    fileName: string;
    stream: Stream.Stream<Uint8Array>;
    contentType?: string;
  }) {
    const blob = yield* streamToBlob(stream, contentType);
    const formData = new FormData();
    formData.append('file', blob, fileName);
    const request = HttpClientRequest.post(`/files/person/${personId}/finance/${encodePath(path)}`).pipe(
      HttpClientRequest.bodyFormData(formData),
    );
    return yield* http.execute(request).pipe(
      Effect.asVoid,
      Effect.catchTag('RequestError', (e) => new UnknownProcuratError({ message: e.message, cause: e })),
    );
  });

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
});

export class ProcuratFile extends Context.Tag('@triargos/procurat/File')<
  ProcuratFile,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratFile, make);
}
