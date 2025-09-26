import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { CreatePersonSchema, PersonSchema } from '../schema/person-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { CreatePersonError, FindPersonError, ListPersonsError, PersonNotFoundError } from '../error/person-errors';

export class ProcuratPerson extends Effect.Service<ProcuratPerson>()('ProcuratPerson', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = Effect.fn('person.findAll')(function* () {
      return yield* http.get('/persons').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(PersonSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratNotFoundError', 'ProcuratBadRequestError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListPersonsError({ cause }),
        }),
      );
    });

    const findById = Effect.fn('persons.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/persons/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(PersonSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new FindPersonError({ personId: id, cause }),
          ProcuratNotFoundError: (cause) => new PersonNotFoundError({ personId: id, cause }),
        }),
      );
    });

    const create = Effect.fn('person.create')(function* (person: CreatePersonSchema) {
      return yield* HttpClientRequest.post('/persons').pipe(
        HttpClientRequest.schemaBodyJson(CreatePersonSchema)(person),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(PersonSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratNotFoundError', 'HttpBodyError', Effect.die),
        Effect.catchTag(
          'ProcuratServerError',
          'ProcuratBadRequestError',
          (cause) => new CreatePersonError({ cause, data: person }),
        ),
      );
    });

    return { findAll, findById, create };
  }),
}) {}
