import { Schema } from 'effect';

export const GroupUdfFieldType = Schema.Literal(
  'audit',
  'selection',
  'date',
  'function',
  'long',
  'currency',
  'hierarchyId',
  'boolean',
  'json',
  'float',
  'memo',
  'password',
  'requestKey',
  'sessionKey',
  'storedProcedure',
  'table',
  'foreignKey',
  'idArray',
  'text',
  'view',
  'valueSelection'
);

export const GroupUdfUsage = Schema.Literal('address', 'group', 'person', 'groupMember');

export class GroupUdfSchema extends Schema.Class<GroupUdfSchema>('GroupUdfSchema')({
  id: Schema.Number,
  groupId: Schema.Number,
  groupType: Schema.String,
  groupBaseType: Schema.String,
  name: Schema.String,
  fieldType: GroupUdfFieldType,
  usage: GroupUdfUsage,
  learning: Schema.Boolean,
  referenceTable: Schema.NullOr(Schema.String),
  description: Schema.NullOr(Schema.String),
  active: Schema.Boolean,
  sortIndex: Schema.Number,
}) {}
