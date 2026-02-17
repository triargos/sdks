import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientResponse } from '@effect/platform';
import { CountySchema } from '../schema/county-schema';
import {
  CountyNotFound,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';

export class ProcuratCounty extends Effect.Service<ProcuratCounty>()('ProcuratCounty', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll: () => Effect.Effect<
      ReadonlyArray<CountySchema>,
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('county.findAll')(function* () {
      return yield* http.get('/districts').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(CountySchema))),
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
      CountySchema,
      | CountyNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('county.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/districts/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(CountySchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new CountyNotFound({ countyId: id })),
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
