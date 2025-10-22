import { Schema } from 'effect';
import { CreatePersonSchema, UpdatePersonSchema } from '../schema/person-schema';
import { ProcuratBadRequestError, ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListPersonsError extends Schema.TaggedError<ListPersonsError>()('ListPersonsError', {
  cause: ProcuratServerError,
}) {}

export class PersonNotFoundError extends Schema.TaggedError<PersonNotFoundError>()("PersonNotFoundError", {
    cause: ProcuratNotFoundError,
    personId: Schema.Number
}) {
}

export class FindPersonError extends Schema.TaggedError<FindPersonError>()("FindPersonError", {
    cause: ProcuratServerError,
    personId: Schema.Number
}) {
}

export class CreatePersonError extends Schema.TaggedError<CreatePersonError>()("CreatePersonError", {
  cause: Schema.Union(ProcuratServerError, ProcuratBadRequestError),
  data: CreatePersonSchema
}) {}

export class UpdatePersonError extends Schema.TaggedError<UpdatePersonError>()("UpdatePersonError", {
  cause: Schema.Union(ProcuratServerError, ProcuratBadRequestError),
  data: UpdatePersonSchema
}) {}