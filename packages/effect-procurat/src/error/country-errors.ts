import { Data } from 'effect';
import { ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListCountriesError extends Data.TaggedError('ListCountriesError')<{
  readonly cause: ProcuratServerError;
}> {}

export class CountryNotFoundError extends Data.TaggedError('CountryNotFoundError')<{
  readonly cause: ProcuratNotFoundError;
  readonly countryId: number;
}> {}

export class FindCountryError extends Data.TaggedError('FindCountryError')<{
  readonly cause: ProcuratServerError;
  readonly countryId: number;
}> {}
