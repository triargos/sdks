import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientResponse } from '@effect/platform';
import { ReligionSchema } from '../schema/religion-schema';
import {
  ReligionNotFound,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';

export class ProcuratReligion extends Effect.Service<ProcuratReligion>()('ProcuratReligion', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll: () => Effect.Effect<
      ReadonlyArray<ReligionSchema>,
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('religion.findAll')(function* () {
      return yield* http.get('/religions').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ReligionSchema))),
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
      ReligionSchema,
      | ReligionNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('religion.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/religions/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(ReligionSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new ReligionNotFound({ religionId: id })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    return { findAll, findById };
  }),
}) {}
