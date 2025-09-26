import { Schema } from 'effect';

const JsonDataSchema = Schema.Record({
  //We allow numbers here to prepare for [id: value] instead of [name: value]
  key: Schema.Union(Schema.String, Schema.Number),
  value: Schema.NullOr(Schema.Union(Schema.Number, Schema.String, Schema.Boolean)),
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
