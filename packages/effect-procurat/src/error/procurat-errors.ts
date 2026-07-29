import { Data, Schema } from 'effect';
import type { HttpClientError } from 'effect/unstable/http/HttpClientError';

export const ProcuratErrorSchema = Schema.Struct({
  code: Schema.Number,
  error: Schema.String,
});

interface ProcuratErrorDetails {
  readonly status: number;
  readonly message: string;
  readonly endpoint: string;
}

export class ProcuratNotFoundError extends Data.TaggedError('ProcuratNotFoundError')<ProcuratErrorDetails> {}

export class ProcuratUnauthorizedError extends Data.TaggedError('ProcuratUnauthorizedError')<ProcuratErrorDetails> {}

export class ProcuratServerError extends Data.TaggedError('ProcuratServerError')<ProcuratErrorDetails> {}

export class ProcuratBadRequestError extends Data.TaggedError('ProcuratBadRequestError')<ProcuratErrorDetails> {}

export class ProcuratTransportError extends Data.TaggedError('ProcuratTransportError')<{
  readonly cause: HttpClientError;
  readonly endpoint: string;
}> {}

export type ProcuratCommonErrors = ProcuratTransportError | ProcuratUnauthorizedError;
