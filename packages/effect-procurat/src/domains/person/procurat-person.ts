import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { CreatePersonSchema, PersonSchema, SuccessResponseSchema, UpdatePersonSchema } from './person-schema';
import { GroupSupervisorSchema } from '../group/group-supervisor-schema';
import { PersonNotFound, PersonValidationError } from './person-errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const findAll: () => Effect.Effect<
    ReadonlyArray<PersonSchema>,
    ProcuratError | UnknownProcuratError
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
    PersonNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('person.findById')(function* ({ id }: { id: number }) {
    return yield* http.get(`/persons/${id}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(PersonSchema)),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, PersonNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new PersonNotFound({ personId: id })) : Effect.fail(e),
      ),
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
    ProcuratError | UnknownProcuratError
  > = Effect.fn('person.findByFamilyId')(function* ({ familyId }: { familyId: number }) {
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
    PersonValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('person.create')(function* (person: CreatePersonSchema) {
    return yield* HttpClientRequest.post('/persons').pipe(
      HttpClientRequest.schemaBodyJson(CreatePersonSchema)(person),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(PersonSchema)),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, PersonValidationError | ProcuratError> =>
        e.status === 400
          ? Effect.fail(new PersonValidationError({ message: e.message, code: e.code, input: person }))
          : Effect.fail(e),
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
    PersonNotFound | PersonValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('person.update')(function* (person: UpdatePersonSchema) {
    return yield* HttpClientRequest.put(`/persons/${person.id}`).pipe(
      HttpClientRequest.schemaBodyJson(UpdatePersonSchema)(person),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(SuccessResponseSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, PersonNotFound | PersonValidationError | ProcuratError> =>
          e.status === 404
            ? Effect.fail(new PersonNotFound({ personId: person.id }))
            : e.status === 400
              ? Effect.fail(new PersonValidationError({ message: e.message, code: e.code, input: person }))
              : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
      }),
    );
  });

  const findRolesInGroups: (args: {
    id: number;
  }) => Effect.Effect<
    ReadonlyArray<GroupSupervisorSchema>,
    PersonNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('person.findRolesInGroups')(function* ({ id }: { id: number }) {
    return yield* http.get(`/persons/${id}/roles`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupSupervisorSchema))),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, PersonNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new PersonNotFound({ personId: id })) : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  return { findAll, findById, findByFamilyId, findRolesInGroups, create, update };
});

export class ProcuratPerson extends Context.Tag('@triargos/procurat/Person')<
  ProcuratPerson,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratPerson, make);
}
