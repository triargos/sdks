import { Data } from 'effect';
import { ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListReligionsError extends Data.TaggedError('ListReligionsError')<{
  readonly cause: ProcuratServerError;
}> {}

export class ReligionNotFoundError extends Data.TaggedError('ReligionNotFoundError')<{
  readonly cause: ProcuratNotFoundError;
  readonly religionId: number;
}> {}

export class FindReligionError extends Data.TaggedError('FindReligionError')<{
  readonly cause: ProcuratServerError;
  readonly religionId: number;
}> {}
