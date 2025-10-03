import { Effect, Schedule, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientResponse } from '@effect/platform';
import { ReligionSchema } from '../schema/religion-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { ReligionNotFoundError, FindReligionError, ListReligionsError } from '../error/religion-errors';

export class ProcuratReligion extends Effect.Service<ProcuratReligion>()('ProcuratReligion', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = Effect.fn('religion.findAll')(function* () {
      return yield* http.get('/religions').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ReligionSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListReligionsError({ cause }),
        }),
      );
    });

    const findById = Effect.fn('religion.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/religions/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(ReligionSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', Effect.die),
        Effect.catchTags({
          ProcuratNotFoundError: (cause) => new ReligionNotFoundError({ religionId: id, cause }),
          ProcuratServerError: (cause) => new FindReligionError({ religionId: id, cause }),
        }),
      );
    });

    return {findAll, findById}

  }),
}) {}
