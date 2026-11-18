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

export const Role = Schema.Struct({
  active: Schema.Boolean,
  name: SupervisorRole,
  displayName: Schema.String,
  comment: Schema.NullOr(Schema.String),
});
export type Role = typeof Role.Type;

export const GroupSupervisor = Schema.Struct({
  groupId: Schema.Number,
  personId: Schema.Number,
  roles: Schema.Array(Role),
});
export type GroupSupervisor = typeof GroupSupervisor.Type;
