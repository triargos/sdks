import { Schema } from "effect";
import { ProcuratNotFoundError, ProcuratServerError } from "./procurat-errors";


export class ListCountriesError extends Schema.TaggedError<ListCountriesError>()("ListCountriesError", {
  cause: ProcuratServerError
}) {}

export class CountryNotFoundError extends Schema.TaggedError<CountryNotFoundError>()("CountryNotFoundError", {
  cause: ProcuratNotFoundError,
  countryId: Schema.Number
}) {}

export class FindCountryError extends Schema.TaggedError<FindCountryError>()("FindCountryError", {
  cause: ProcuratServerError,
  countryId: Schema.Number
}) {} 
