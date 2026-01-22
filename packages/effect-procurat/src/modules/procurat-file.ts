import { Effect, Schema, Stream } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { DirectoryContentSchema } from '../schema/file-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { ListFilesError, DownloadFileError, UploadFileError } from '../error/file-errors';

// Encode path segments while preserving directory structure
const encodePath = (path: string) => path.split('/').map(encodeURIComponent).join('/');

export class ProcuratFile extends Effect.Service<ProcuratFile>()('ProcuratFile', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    // List operations
    const listManagementFiles = Effect.fn('file.listManagementFiles')(function* ({
      personId,
      path,
    }: {
      personId: number;
      path?: string;
    }) {
      return yield* http.get(`/files/person/${personId}/management/${encodePath(path ?? '')}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(DirectoryContentSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListFilesError({ cause }),
        }),
      );
    });

    const listFinanceFiles = Effect.fn('file.listFinanceFiles')(function* ({
      personId,
      path,
    }: {
      personId: number;
      path?: string;
    }) {
      return yield* http.get(`/files/person/${personId}/finance/${encodePath(path ?? '')}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(DirectoryContentSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListFilesError({ cause }),
        }),
      );
    });

    const listPublicFiles = Effect.fn('file.listPublicFiles')(function* ({ path }: { path?: string }) {
      return yield* http.get(`/files/shared/${encodePath(path ?? '')}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(DirectoryContentSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListFilesError({ cause }),
        }),
      );
    });

    // Download operations (stream-based)
    const downloadManagementFile = Effect.fn('file.downloadManagementFile')(function* ({
      personId,
      path,
    }: {
      personId: number;
      path: string;
    }) {
      return yield* http.get(`/files/person/${personId}/management/download/${encodePath(path)}`).pipe(
        Effect.map((response) => response.stream),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new DownloadFileError({ cause }),
        }),
      );
    });

    const downloadFinanceFile = Effect.fn('file.downloadFinanceFile')(function* ({
      personId,
      path,
    }: {
      personId: number;
      path: string;
    }) {
      return yield* http.get(`/files/person/${personId}/finance/download/${encodePath(path)}`).pipe(
        Effect.map((response) => response.stream),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new DownloadFileError({ cause }),
        }),
      );
    });

    const downloadPublicFile = Effect.fn('file.downloadPublicFile')(function* ({ path }: { path: string }) {
      return yield* http.get(`/files/shared/download/${encodePath(path)}`).pipe(
        Effect.map((response) => response.stream),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new DownloadFileError({ cause }),
        }),
      );
    });

    // Upload operations (stream-based)
    const uploadManagementFile = Effect.fn('file.uploadManagementFile')(function* ({
      personId,
      path,
      stream,
      contentType = 'application/octet-stream',
      contentLength,
    }: {
      personId: number;
      path: string;
      stream: Stream.Stream<Uint8Array, never, never>;
      contentType?: string;
      contentLength?: number;
    }) {
      const request = HttpClientRequest.post(`/files/person/${personId}/management/${encodePath(path)}`).pipe(
        HttpClientRequest.bodyStream(stream, { contentType, contentLength }),
      );
      return yield* http.execute(request).pipe(
        Effect.asVoid,
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new UploadFileError({ cause, path }),
        }),
      );
    });

    const uploadFinanceFile = Effect.fn('file.uploadFinanceFile')(function* ({
      personId,
      path,
      stream,
      contentType = 'application/octet-stream',
      contentLength,
    }: {
      personId: number;
      path: string;
      stream: Stream.Stream<Uint8Array, never, never>;
      contentType?: string;
      contentLength?: number;
    }) {
      const request = HttpClientRequest.post(`/files/person/${personId}/finance/${encodePath(path)}`).pipe(
        HttpClientRequest.bodyStream(stream, { contentType, contentLength }),
      );
      return yield* http.execute(request).pipe(
        Effect.asVoid,
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new UploadFileError({ cause, path }),
        }),
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
  }),
}) {}
