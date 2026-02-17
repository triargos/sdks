import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { CreatePersonSchema, PersonSchema, SuccessResponseSchema, UpdatePersonSchema } from '../schema/person-schema';
import {
  PersonNotFound,
  PersonValidationError,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';

export class ProcuratPerson extends Effect.Service<ProcuratPerson>()('ProcuratPerson', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll: () => Effect.Effect<
      ReadonlyArray<PersonSchema>,
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('person.findAll')(function* () {
      return yield* http.get('/persons').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(PersonSchema))),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    const findById: (args: {
      id: number;
    }) => Effect.Effect<
      PersonSchema,
      | PersonNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('persons.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/persons/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(PersonSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new PersonNotFound({ personId: id })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    const findByFamilyId: (args: {
      familyId: number;
    }) => Effect.Effect<
      ReadonlyArray<PersonSchema>,
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('persons.findByFamilyId')(function* ({ familyId }: { familyId: number }) {
      return yield* http.get(`/persons/family/${familyId}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(PersonSchema))),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    const create: (
      person: CreatePersonSchema,
    ) => Effect.Effect<
      PersonSchema,
      | PersonValidationError
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('person.create')(function* (person: CreatePersonSchema) {
      return yield* HttpClientRequest.post('/persons').pipe(
        HttpClientRequest.schemaBodyJson(CreatePersonSchema)(person),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(PersonSchema)),
        Effect.catchTag('ProcuratBadRequestError', (cause) =>
          new PersonValidationError({ message: cause.message, code: cause.code, input: person }),
        ),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
        }),
      );
    });

    const update: (
      person: UpdatePersonSchema,
    ) => Effect.Effect<
      SuccessResponseSchema,
      | PersonNotFound
      | PersonValidationError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('person.update')(function* (person: UpdatePersonSchema) {
      return yield* HttpClientRequest.put(`/persons/${person.id}`).pipe(
        HttpClientRequest.schemaBodyJson(UpdatePersonSchema)(person),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(SuccessResponseSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new PersonNotFound({ personId: person.id })),
        Effect.catchTag('ProcuratBadRequestError', (cause) =>
          new PersonValidationError({ message: cause.message, code: cause.code, input: person }),
        ),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
        }),
      );
    });

    return { findAll, findById, findByFamilyId, create, update };
  }),
}) {}
