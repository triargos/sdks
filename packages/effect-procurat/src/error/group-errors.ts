import { Data } from 'effect';
import { ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListGroupsError extends Data.TaggedError('ListGroupsError')<{
  readonly cause: ProcuratServerError;
}> {}

export class GroupNotFoundError extends Data.TaggedError('GroupNotFoundError')<{
  readonly groupId: number;
  readonly cause: ProcuratNotFoundError;
}> {}

export class FindGroupError extends Data.TaggedError('FindGroupError')<{
  readonly groupId: number;
  readonly cause: ProcuratServerError;
}> {}

export class FindGroupMembersError extends Data.TaggedError('FindGroupMembersError')<{
  readonly groupId: number;
  readonly cause: ProcuratServerError;
}> {}

export class ListCustomFieldsError extends Data.TaggedError('ListCustomFieldsError')<{
  readonly groupId: number;
  readonly cause: ProcuratServerError;
}> {}
