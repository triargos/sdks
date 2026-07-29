import { Data } from 'effect';
import type { SchemaError } from 'effect/SchemaError';
import type { HttpClientError } from 'effect/unstable/http/HttpClientError';

/** Context carried by every failure that got an HTTP response back. */
export interface ProcuratFailure {
  /** Operation that failed, e.g. `'person.findById'`. */
  readonly operation: string;
  /** Request URL. */
  readonly endpoint: string;
  readonly status: number;
  /** Procurat's `code` from the error body; null when the body wasn't the expected shape. */
  readonly code: number | null;
  readonly message: string;
}

export class ProcuratNotFoundError extends Data.TaggedError('ProcuratNotFoundError')<ProcuratFailure> {}

export class ProcuratBadRequestError extends Data.TaggedError('ProcuratBadRequestError')<
  ProcuratFailure & {
    /** The rejected request body, for dead-lettering. Untyped — serialize it, don't branch on it. */
    readonly payload: unknown;
  }
> {}

/** 401 and 403. With a static API key both mean the same thing: the credentials are wrong. */
export class ProcuratAuthError extends Data.TaggedError('ProcuratAuthError')<ProcuratFailure> {}

/**
 * Raised after the layer's retries are exhausted. `status` is null when no response
 * arrived at all, in which case `cause` carries the platform failure.
 */
export class ProcuratUnavailableError extends Data.TaggedError('ProcuratUnavailableError')<{
  readonly operation: string;
  readonly endpoint: string;
  readonly kind: 'server' | 'transport';
  readonly status: number | null;
  readonly code: number | null;
  readonly message: string;
  readonly cause: HttpClientError | null;
}> {}

export class ProcuratDecodeError extends Data.TaggedError('ProcuratDecodeError')<{
  readonly operation: string;
  readonly endpoint: string;
  /** Raw body as received, so a failure can be diagnosed without reproducing it. */
  readonly body: unknown;
  readonly cause: SchemaError;
}> {}

/** Every failure any operation can produce. */
export type ProcuratError =
  | ProcuratNotFoundError
  | ProcuratBadRequestError
  | ProcuratAuthError
  | ProcuratUnavailableError
  | ProcuratDecodeError;
