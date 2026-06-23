import { Schema } from 'effect';

export class GroupNotFound extends Schema.TaggedError<GroupNotFound>()('GroupNotFound', {
  groupId: Schema.Number,
}) {}
