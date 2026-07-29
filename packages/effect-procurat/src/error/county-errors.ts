import { Data } from 'effect';
import { ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListCountiesError extends Data.TaggedError('ListCountiesError')<{
  readonly cause: ProcuratServerError;
}> {}

export class CountyNotFoundError extends Data.TaggedError('CountyNotFoundError')<{
  readonly cause: ProcuratNotFoundError;
  readonly countyId: number;
}> {}

export class FindCountyError extends Data.TaggedError('FindCountyError')<{
  readonly cause: ProcuratServerError;
  readonly countyId: number;
}> {}
