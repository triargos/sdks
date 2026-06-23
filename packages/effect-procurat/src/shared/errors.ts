import { Schema } from 'effect';

/**
 * Raw error body returned by the Procurat API. Decoded internally by the HTTP
 * client to enrich {@link ProcuratError}; not part of a method's error channel.
 */
export class ProcuratErrorSchema extends Schema.Class<ProcuratErrorSchema>('ProcuratErrorSchema')({
  code: Schema.Number,
  error: Schema.String,
}) {}

/**
 * Any non-OK HTTP response from the Procurat API (401, 403, 4xx, 5xx, and any
 * 404/400 a module did not map to a domain error). Discriminate on `status`
 * when you need to react to a specific code (re-auth on 401, retry on 5xx).
 *
 * This single error replaces the former per-status transport errors
 * (`ProcuratNotFoundError` / `ProcuratUnauthorizedError` / `ProcuratServerError`
 * / `ProcuratBadRequestError`) so it no longer leaks four near-identical tags
 * into every method signature.
 */
export class ProcuratError extends Schema.TaggedError<ProcuratError>()('ProcuratError', {
  status: Schema.Number,
  code: Schema.Number,
  message: Schema.String,
  endpoint: Schema.String,
}) {}

/**
 * No usable response was produced: network failure, request/response body
 * serialization, or schema decoding. `cause` holds the underlying error.
 */
export class UnknownProcuratError extends Schema.TaggedError<UnknownProcuratError>()(
  'UnknownProcuratError',
  {
    message: Schema.String,
    cause: Schema.Unknown,
  },
) {}
