import { Schema } from 'effect';
import { AddMemberToGroupSchema, UpdateGroupMembershipSchema } from '../schema/group-member-schema';
import { ProcuratBadRequestError, ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class AddGroupMemberError extends Schema.TaggedError<AddGroupMemberError>()('AddGroupMemberError', {
  groupId: Schema.Number,
  memberId: Schema.Number,
  cause: Schema.Union(ProcuratServerError, ProcuratBadRequestError),
}) {}

export class GroupMembershipNotFoundError extends Schema.TaggedError<GroupMembershipNotFoundError>()(
  'GroupMembershipNotFoundError',
  {
    groupId: Schema.Number,
    personId: Schema.Number,
    cause: ProcuratNotFoundError
  },
) {}

export class UpdateGroupMembershipError extends Schema.TaggedError<UpdateGroupMembershipSchema>()(
  'UpdateGroupMembershipError',
  {
    groupId: Schema.Number,
    personId: Schema.Number,
    data: UpdateGroupMembershipSchema,
    cause: Schema.Union(ProcuratServerError, ProcuratBadRequestError),
  },
) {}
