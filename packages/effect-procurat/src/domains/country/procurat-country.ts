import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { CountrySchema } from './country-schema';
import { CountryNotFound } from './country-errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const findAll: () => Effect.Effect<
    ReadonlyArray<CountrySchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('country.findAll')(function* () {
    return yield* http.get('/countries').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(CountrySchema))),
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
    CountrySchema,
    CountryNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('country.findById')(function* ({ id }: { id: number }) {
    return yield* http.get(`/countries/${id}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(CountrySchema)),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, CountryNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new CountryNotFound({ countryId: id })) : Effect.fail(e),
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

export class ProcuratCountry extends Context.Tag('@triargos/procurat/Country')<
  ProcuratCountry,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratCountry, make);
}
