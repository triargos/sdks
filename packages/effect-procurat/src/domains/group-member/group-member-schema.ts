import { Schema } from 'effect';
import { ProcuratDate } from '../../shared/date';
import { membersOf } from '../../shared/literals';

export const GroupMemberStatus = Schema.Literals(['ACTIVE', 'INACTIVE', 'ALL']);
export type GroupMemberStatus = typeof GroupMemberStatus.Type;
export const GroupMemberStatuses = membersOf(GroupMemberStatus)({
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
  All: 'ALL',
});

const JsonData = Schema.Record(Schema.String, Schema.Unknown);

export class GroupMember extends Schema.Class<GroupMember>('GroupMember')({
  id: Schema.Number,
  groupId: Schema.Number,
  personId: Schema.Number,
  entryDate: ProcuratDate,
  exitDate: Schema.NullOr(ProcuratDate),
  jsonData: Schema.NullOr(JsonData),
  grade: Schema.NullOr(Schema.Number),
}) {}

export class AddMemberToGroup extends Schema.Opaque<AddMemberToGroup>()(
  Schema.Struct({
    personId: Schema.Number,
    entryDate: Schema.NullOr(ProcuratDate),
    grade: Schema.NullOr(Schema.Number),
  }),
) {}

export class UpdateGroupMembership extends Schema.Opaque<UpdateGroupMembership>()(
  Schema.Struct({
    jsonData: JsonData,
  }),
) {}
