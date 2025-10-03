import { Schema } from "effect";
import { ProcuratNotFoundError, ProcuratServerError } from "./procurat-errors";


export class ListReligionsError extends Schema.TaggedError<ListReligionsError>()("ListReligionsError", {
  cause: ProcuratServerError
}) {}

export class ReligionNotFoundError extends Schema.TaggedError<ReligionNotFoundError>()("ReligionNotFoundError", {
  cause: ProcuratNotFoundError,
  religionId: Schema.Number
}) {}

export class FindReligionError extends Schema.TaggedError<FindReligionError>()("FindReligionError", {
  cause: ProcuratServerError,
  religionId: Schema.Number
}) {}
