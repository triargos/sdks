import { Schema } from 'effect';

export class GroupMembershipNotFound extends Schema.TaggedError<GroupMembershipNotFound>()(
  'GroupMembershipNotFound',
  {
    groupId: Schema.Number,
    personId: Schema.Number,
  },
) {}

export class GroupMemberValidationError extends Schema.TaggedError<GroupMemberValidationError>()(
  'GroupMemberValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    groupId: Schema.Number,
    memberId: Schema.Number,
  },
) {}
