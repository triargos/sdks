import { Schema } from 'effect';

export const ChildInRelationshipTypeSchema = Schema.Literal(
  'son',
  'daughter',
  'child',
  'grandson',
  'granddaughter',
  'grandchild',
  'guestchild',
  'guestson',
  'guestdaughter',
  'fosterchild',
  'fosterson',
  'fosterdaughter',
  'other',
);
export const ParentInRelationshipTypeSchema = Schema.Literal(
  'father',
  'mother',
  'grandfather',
  'grandmother',
  'grandparents',
  'guestfather',
  'guestmother',
  'fosterparent',
  'fosterfather',
  'fostermother',
  'other',
);

const BaseRelationshipFieldSchema = Schema.Struct({
  childRelationshipType: ChildInRelationshipTypeSchema,
  parentRelationshipType: ParentInRelationshipTypeSchema,
  physical: Schema.Boolean,
  custody: Schema.Boolean,
  realParent: Schema.Boolean,
  notes: Schema.NullOr(Schema.String),
});

export class AddParentToChildSchema extends Schema.Class<AddParentToChildSchema>('AddParentToChildSchema')({
  parentId: Schema.Number,
  ...BaseRelationshipFieldSchema.fields,
}) {}

export class AddChildToParentSchema extends Schema.Class<AddChildToParentSchema>('AddChildToParentSchema')({
  childId: Schema.Number,
  ...BaseRelationshipFieldSchema.fields,
}) {}

export class CreatedRelationShipSchema extends Schema.Class<CreatedRelationShipSchema>('CreatedRelationshipSchema')({
  id: Schema.Number,
}) {}

export const RelationshipTypeSchema = Schema.Literal(
  'father',
  'son',
  'mother',
  'daughter',
  'child',
  'grandfather',
  'grandmother',
  'grandparents',
  'grandson',
  'granddaughter',
  'grandchild',
  'guestfather',
  'guestmother',
  'guestchild',
  'guestson',
  'guestdaughter',
  'fosterparent',
  'fosterfather',
  'fostermother',
  'fosterchild',
  'fosterson',
  'fosterdaughter',
  'other',
);

export class RelationshipSchema extends Schema.Class<RelationshipSchema>('RelationshipSchema')({
  personId: Schema.Number,
  relationshipType: RelationshipTypeSchema,
  custody: Schema.Boolean,
  physical: Schema.Boolean,
  realParent: Schema.Boolean,
  notes: Schema.NullOr(Schema.String),
}) {}