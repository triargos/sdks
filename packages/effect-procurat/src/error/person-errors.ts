import { Data } from 'effect';
import type { CreatePersonSchema, UpdatePersonSchema } from '../schema/person-schema';
import { ProcuratBadRequestError, ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListPersonsError extends Data.TaggedError('ListPersonsError')<{
  readonly cause: ProcuratServerError;
}> {}

export class PersonNotFoundError extends Data.TaggedError('PersonNotFoundError')<{
  readonly cause: ProcuratNotFoundError;
  readonly personId: number;
}> {}

export class FindPersonError extends Data.TaggedError('FindPersonError')<{
  readonly cause: ProcuratServerError;
  readonly personId: number;
}> {}

export class CreatePersonError extends Data.TaggedError('CreatePersonError')<{
  readonly cause: ProcuratServerError | ProcuratBadRequestError;
  readonly data: CreatePersonSchema;
}> {}

export class UpdatePersonError extends Data.TaggedError('UpdatePersonError')<{
  readonly cause: ProcuratServerError | ProcuratBadRequestError;
  readonly data: UpdatePersonSchema;
}> {}
