import { Data } from 'effect';
import type { UpdateGroupMembershipSchema } from '../schema/group-member-schema';
import { ProcuratBadRequestError, ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class AddGroupMemberError extends Data.TaggedError('AddGroupMemberError')<{
  readonly groupId: number;
  readonly memberId: number;
  readonly cause: ProcuratServerError | ProcuratBadRequestError;
}> {}

export class GroupMembershipNotFoundError extends Data.TaggedError('GroupMembershipNotFoundError')<{
  readonly groupId: number;
  readonly personId: number;
  readonly cause: ProcuratNotFoundError;
}> {}

export class UpdateGroupMembershipError extends Data.TaggedError('UpdateGroupMembershipError')<{
  readonly groupId: number;
  readonly personId: number;
  readonly data: UpdateGroupMembershipSchema;
  readonly cause: ProcuratServerError | ProcuratBadRequestError;
}> {}
