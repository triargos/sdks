import { Schema } from 'effect';

const JsonDataSchema = Schema.Record({
  key: Schema.String,
  value: Schema.Unknown,
})

export class GroupMemberSchema extends Schema.Class<GroupMemberSchema>('GroupMemberSchema')({
  id: Schema.Number,
  groupId: Schema.Number,
  personId: Schema.Number,
  entryDate: Schema.DateFromString,
  exitDate: Schema.NullOr(Schema.DateFromString),
  //TODO: We're missing JSON Data here
  jsonData: Schema.NullOr(JsonDataSchema),
  grade: Schema.NullOr(Schema.Number),
}) {}

export class AddMemberToGroupSchema extends Schema.Class<AddMemberToGroupSchema>('AddMemberToGroupSchema')({
  personId: Schema.Number,
  entryDate: Schema.NullOr(Schema.Date),
  grade: Schema.NullOr(Schema.Number),
}) {}

export class UpdateGroupMembershipSchema extends Schema.Class<UpdateGroupMembershipSchema>('UpdateGroupMembershipSchema')({
  jsonData: JsonDataSchema
}) {}
