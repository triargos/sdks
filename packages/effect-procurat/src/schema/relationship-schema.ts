import { Schema } from 'effect';

export const ChildInRelationshipType = Schema.Literals([
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

export const ParentInRelationshipType = Schema.Literals([
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

const BaseRelationshipFields = Schema.Struct({
  childRelationshipType: ChildInRelationshipType,
  parentRelationshipType: ParentInRelationshipType,
  physical: Schema.Boolean,
  custody: Schema.Boolean,
  realParent: Schema.Boolean,
  notes: Schema.NullOr(Schema.String),
});

export class AddParentToChild extends Schema.Opaque<AddParentToChild>()(
  Schema.Struct({
    parentId: Schema.Number,
    ...BaseRelationshipFields.fields,
  }),
) {}

export class AddChildToParent extends Schema.Opaque<AddChildToParent>()(
  Schema.Struct({
    childId: Schema.Number,
    ...BaseRelationshipFields.fields,
  }),
) {}

export class CreatedRelationship extends Schema.Class<CreatedRelationship>('CreatedRelationship')({
  id: Schema.Number,
}) {}

export const RelationshipType = Schema.Literals([
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

export class Relationship extends Schema.Class<Relationship>('Relationship')({
  personId: Schema.Number,
  relationshipType: RelationshipType,
  custody: Schema.Boolean,
  physical: Schema.Boolean,
  realParent: Schema.Boolean,
  notes: Schema.NullOr(Schema.String),
}) {}
