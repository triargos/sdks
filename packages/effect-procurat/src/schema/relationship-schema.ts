import { Schema } from 'effect';

export const ChildInRelationshipTypeSchema = Schema.Literals([
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
]);
export const ParentInRelationshipTypeSchema = Schema.Literals([
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
]);

const BaseRelationshipFieldSchema = Schema.Struct({
  childRelationshipType: ChildInRelationshipTypeSchema,
  parentRelationshipType: ParentInRelationshipTypeSchema,
  physical: Schema.Boolean,
  custody: Schema.Boolean,
  realParent: Schema.Boolean,
  notes: Schema.NullOr(Schema.String),
});

export const AddParentToChildSchema = Schema.Struct({
  parentId: Schema.Number,
  ...BaseRelationshipFieldSchema.fields,
});
export type AddParentToChildSchema = typeof AddParentToChildSchema.Type;

export const AddChildToParentSchema = Schema.Struct({
  childId: Schema.Number,
  ...BaseRelationshipFieldSchema.fields,
});
export type AddChildToParentSchema = typeof AddChildToParentSchema.Type;

export class CreatedRelationShipSchema extends Schema.Class<CreatedRelationShipSchema>('CreatedRelationshipSchema')({
  id: Schema.Number,
}) {}

export const RelationshipTypeSchema = Schema.Literals([
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
]);

export class RelationshipSchema extends Schema.Class<RelationshipSchema>('RelationshipSchema')({
  personId: Schema.Number,
  relationshipType: RelationshipTypeSchema,
  custody: Schema.Boolean,
  physical: Schema.Boolean,
  realParent: Schema.Boolean,
  notes: Schema.NullOr(Schema.String),
}) {}
