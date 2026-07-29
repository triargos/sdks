import { Schema } from 'effect';
import { membersOf } from '../../shared/literals';

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
export type ChildInRelationshipType = typeof ChildInRelationshipType.Type;
export const ChildInRelationshipTypes = membersOf(ChildInRelationshipType)({
  Son: 'son',
  Daughter: 'daughter',
  Child: 'child',
  Grandson: 'grandson',
  Granddaughter: 'granddaughter',
  Grandchild: 'grandchild',
  GuestChild: 'guestchild',
  GuestSon: 'guestson',
  GuestDaughter: 'guestdaughter',
  FosterChild: 'fosterchild',
  FosterSon: 'fosterson',
  FosterDaughter: 'fosterdaughter',
  Other: 'other',
});

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
export type ParentInRelationshipType = typeof ParentInRelationshipType.Type;
export const ParentInRelationshipTypes = membersOf(ParentInRelationshipType)({
  Father: 'father',
  Mother: 'mother',
  Grandfather: 'grandfather',
  Grandmother: 'grandmother',
  Grandparents: 'grandparents',
  GuestFather: 'guestfather',
  GuestMother: 'guestmother',
  FosterParent: 'fosterparent',
  FosterFather: 'fosterfather',
  FosterMother: 'fostermother',
  Other: 'other',
});

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
export type RelationshipType = typeof RelationshipType.Type;
export const RelationshipTypes = membersOf(RelationshipType)({
  Father: 'father',
  Son: 'son',
  Mother: 'mother',
  Daughter: 'daughter',
  Child: 'child',
  Grandfather: 'grandfather',
  Grandmother: 'grandmother',
  Grandparents: 'grandparents',
  Grandson: 'grandson',
  Granddaughter: 'granddaughter',
  Grandchild: 'grandchild',
  GuestFather: 'guestfather',
  GuestMother: 'guestmother',
  GuestChild: 'guestchild',
  GuestSon: 'guestson',
  GuestDaughter: 'guestdaughter',
  FosterParent: 'fosterparent',
  FosterFather: 'fosterfather',
  FosterMother: 'fostermother',
  FosterChild: 'fosterchild',
  FosterSon: 'fosterson',
  FosterDaughter: 'fosterdaughter',
  Other: 'other',
});

export class Relationship extends Schema.Class<Relationship>('Relationship')({
  personId: Schema.Number,
  relationshipType: RelationshipType,
  custody: Schema.Boolean,
  physical: Schema.Boolean,
  realParent: Schema.Boolean,
  notes: Schema.NullOr(Schema.String),
}) {}
