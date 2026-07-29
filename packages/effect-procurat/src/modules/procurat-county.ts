import { Context, Effect, Layer, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientResponse } from 'effect/unstable/http';
import { CountySchema } from '../schema/county-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { CountyNotFoundError, FindCountyError, ListCountiesError } from '../error/county-errors';

export class ProcuratCounty extends Context.Service<ProcuratCounty>()('ProcuratCounty', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = Effect.fn('county.findAll')(function* () {
      return yield* http.get('/districts').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(CountySchema))),
        removeUnrecoverableErrors,
        Effect.catchTag(['ProcuratBadRequestError', 'ProcuratNotFoundError'], Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListCountiesError({ cause }),
        }),
      );
    });

    const findById = Effect.fn('county.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/districts/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(CountySchema)),
        removeUnrecoverableErrors,
        Effect.catchTag(['ProcuratBadRequestError'], Effect.die),
        Effect.catchTags({
          ProcuratNotFoundError: (cause) => new CountyNotFoundError({ countyId: id, cause }),
          ProcuratServerError: (cause) => new FindCountyError({ countyId: id, cause }),
        }),
      );
    });

    return { findAll, findById };
  }),
}) {
  static readonly layer = Layer.effect(this, this.make);
}
