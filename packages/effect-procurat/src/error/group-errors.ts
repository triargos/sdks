import { Schema } from 'effect';

import { ProcuratNotFoundError } from './procurat-errors';

export class GroupNotFoundError extends Schema.TaggedError<GroupNotFoundError>()("GroupNotFoundError", {
  groupId: Schema.Number,
  cause: ProcuratNotFoundError
}) {}