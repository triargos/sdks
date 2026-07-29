import { Data } from 'effect';
import { ProcuratServerError } from './procurat-errors';

export class ListFilesError extends Data.TaggedError('ListFilesError')<{
  readonly cause: ProcuratServerError;
}> {}

export class DownloadFileError extends Data.TaggedError('DownloadFileError')<{
  readonly cause: ProcuratServerError;
}> {}

export class UploadFileError extends Data.TaggedError('UploadFileError')<{
  readonly cause: ProcuratServerError;
  readonly path: string;
}> {}
