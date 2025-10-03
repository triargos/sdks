import { Effect, Schedule, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientResponse } from '@effect/platform';
import { CountrySchema } from '../schema/country-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { CountryNotFoundError, FindCountryError, ListCountriesError } from '../error/country-errors';

export class ProcuratCountry extends Effect.Service<ProcuratCountry>()('ProcuratCountry', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = Effect.fn('country.findAll')(function* () {
      return yield* http.get('/countries').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(CountrySchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListCountriesError({ cause }),
        }),
      );
    });

    const findById = Effect.fn('country.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/countries/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(CountrySchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', Effect.die),
        Effect.catchTags({
          ProcuratNotFoundError: (cause) => new CountryNotFoundError({ countryId: id, cause }),
          ProcuratServerError: (cause) => new FindCountryError({ countryId: id, cause }),
        }),
      );
    });
    
    return {findAll, findById}
    
  }),
}) {}
