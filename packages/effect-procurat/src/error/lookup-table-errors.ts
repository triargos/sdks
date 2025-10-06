import { Schema } from 'effect';
import { ProcuratServerError } from './procurat-errors';

export class ListLookupsError extends Schema.TaggedError<ListLookupsError>()('ListLookupsError', {
  cause: ProcuratServerError,
  lookupType: Schema.String,
}) {}
