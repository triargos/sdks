import { Schema } from 'effect';

import { ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListGroupsError extends Schema.TaggedError<ListGroupsError>()("ListGroupsError", {
  cause: ProcuratServerError
}) {}

export class GroupNotFoundError extends Schema.TaggedError<GroupNotFoundError>()("GroupNotFoundError", {
  groupId: Schema.Number,
  cause: ProcuratNotFoundError
}) {}

export class FindGroupError extends Schema.TaggedError<FindGroupError>()("FindGroupError", {
  groupId: Schema.Number,
  cause: ProcuratServerError
}) {}