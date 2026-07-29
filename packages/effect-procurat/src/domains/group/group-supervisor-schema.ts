import { Schema } from 'effect';
import { membersOf } from '../../shared/literals';

export const SupervisorRole = Schema.Literals(['teacher', 'supervisor', 'educator', 'treasurer']);
export type SupervisorRole = typeof SupervisorRole.Type;
export const SupervisorRoles = membersOf(SupervisorRole)({
  Teacher: 'teacher',
  Supervisor: 'supervisor',
  Educator: 'educator',
  Treasurer: 'treasurer',
});

export class Role extends Schema.Class<Role>('Role')({
  active: Schema.Boolean,
  name: SupervisorRole,
  displayName: Schema.String,
  comment: Schema.NullOr(Schema.String),
}) {}

export class GroupSupervisor extends Schema.Class<GroupSupervisor>('GroupSupervisor')({
  groupId: Schema.Number,
  personId: Schema.Number,
  roles: Schema.Array(Role),
}) {}
