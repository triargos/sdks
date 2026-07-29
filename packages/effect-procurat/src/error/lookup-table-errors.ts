import { Data } from 'effect';
import { ProcuratServerError } from './procurat-errors';

export class ListLookupsError extends Data.TaggedError('ListLookupsError')<{
  readonly cause: ProcuratServerError;
  readonly lookupType: string;
}> {}
