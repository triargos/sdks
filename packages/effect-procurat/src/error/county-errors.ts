import { Schema } from "effect";
import { ProcuratNotFoundError, ProcuratServerError } from "./procurat-errors";


export class ListCountiesError extends Schema.TaggedError<ListCountiesError>()("ListCountiesError", {
  cause: ProcuratServerError
}) {}

export class CountyNotFoundError extends Schema.TaggedError<CountyNotFoundError>()("CountyNotFoundError", {
  cause: ProcuratNotFoundError,
  countyId: Schema.Number
}) {}

export class FindCountyError extends Schema.TaggedError<FindCountyError>()("FindCountyError", {
  cause: ProcuratServerError,
  countyId: Schema.Number
}) {}
