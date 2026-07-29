import { Schema } from 'effect';

const JsonData = Schema.Record(Schema.String, Schema.Unknown);

export class GroupMember extends Schema.Class<GroupMember>('GroupMember')({
  id: Schema.Number,
  groupId: Schema.Number,
  personId: Schema.Number,
  entryDate: Schema.DateFromString,
  exitDate: Schema.NullOr(Schema.DateFromString),
  jsonData: Schema.NullOr(JsonData),
  grade: Schema.NullOr(Schema.Number),
}) {}

export class AddMemberToGroup extends Schema.Opaque<AddMemberToGroup>()(
  Schema.Struct({
    personId: Schema.Number,
    entryDate: Schema.NullOr(Schema.DateFromString),
    grade: Schema.NullOr(Schema.Number),
  }),
) {}

export class UpdateGroupMembership extends Schema.Opaque<UpdateGroupMembership>()(
  Schema.Struct({
    jsonData: JsonData,
  }),
) {}
