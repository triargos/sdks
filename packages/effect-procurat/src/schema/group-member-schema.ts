import { Schema } from 'effect';

const JsonDataSchema = Schema.Record(Schema.String, Schema.Unknown);

export class GroupMemberSchema extends Schema.Class<GroupMemberSchema>('GroupMemberSchema')({
  id: Schema.Number,
  groupId: Schema.Number,
  personId: Schema.Number,
  entryDate: Schema.DateFromString,
  exitDate: Schema.NullOr(Schema.DateFromString),
  jsonData: Schema.NullOr(JsonDataSchema),
  grade: Schema.NullOr(Schema.Number),
}) {}

export const AddMemberToGroupSchema = Schema.Struct({
  personId: Schema.Number,
  entryDate: Schema.NullOr(Schema.DateFromString),
  grade: Schema.NullOr(Schema.Number),
});
export type AddMemberToGroupSchema = typeof AddMemberToGroupSchema.Type;

export const UpdateGroupMembershipSchema = Schema.Struct({
  jsonData: JsonDataSchema,
});
export type UpdateGroupMembershipSchema = typeof UpdateGroupMembershipSchema.Type;
