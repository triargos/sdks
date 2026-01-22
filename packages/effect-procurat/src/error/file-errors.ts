import { Schema } from 'effect';
import { ProcuratServerError } from './procurat-errors';

export class ListFilesError extends Schema.TaggedError<ListFilesError>()('ListFilesError', {
  cause: ProcuratServerError,
}) {}

export class DownloadFileError extends Schema.TaggedError<DownloadFileError>()('DownloadFileError', {
  cause: ProcuratServerError,
}) {}

export class UploadFileError extends Schema.TaggedError<UploadFileError>()('UploadFileError', {
  cause: ProcuratServerError,
  path: Schema.String,
}) {}
