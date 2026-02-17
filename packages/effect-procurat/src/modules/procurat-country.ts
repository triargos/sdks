import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientResponse } from '@effect/platform';
import { CountrySchema } from '../schema/country-schema';
import {
  CountryNotFound,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';

export class ProcuratCountry extends Effect.Service<ProcuratCountry>()('ProcuratCountry', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll: () => Effect.Effect<
      ReadonlyArray<CountrySchema>,
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
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
      | CountryNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('country.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/countries/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(CountrySchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new CountryNotFound({ countryId: id })),
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
