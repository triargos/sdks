import { Schema } from 'effect';
import { ProcuratBadRequestError, ProcuratServerError } from './procurat-errors';

export class CreateRelationshipError extends Schema.TaggedError<CreateRelationshipError>()("CreateRelationshipError", {
  cause: Schema.Union(ProcuratServerError, ProcuratBadRequestError),
  kind: Schema.Literal("addChildToParent", "addParentToChild"),
  personToAddId: Schema.Number,
  basePersonId: Schema.Number,
}) {}