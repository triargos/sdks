import { Schema } from 'effect';

export class RoleSchema extends Schema.Class<RoleSchema>('RoleSchema')({
  active: Schema.Boolean,
  name: Schema.Literal('teacher', 'supervisor', 'educator', 'treasurer'),
  displayName: Schema.String,
  comment: Schema.NullOr(Schema.String),
}) {}

export class GroupSupervisorSchema extends Schema.Class<GroupSupervisorSchema>('GroupSupervisorSchema')({
  groupId: Schema.Number,
  personId: Schema.Number,
  roles: Schema.Array(RoleSchema),
}) {}
