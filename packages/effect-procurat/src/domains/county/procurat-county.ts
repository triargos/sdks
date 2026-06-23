import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { CountySchema } from './county-schema';
import { CountyNotFound } from './county-errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const findAll: () => Effect.Effect<
    ReadonlyArray<CountySchema>,
    ProcuratError | UnknownProcuratError
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
    CountyNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('county.findById')(function* ({ id }: { id: number }) {
    return yield* http.get(`/districts/${id}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(CountySchema)),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, CountyNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new CountyNotFound({ countyId: id })) : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  return { findAll, findById };
});

export class ProcuratCounty extends Context.Tag('@triargos/procurat/County')<
  ProcuratCounty,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratCounty, make);
}
