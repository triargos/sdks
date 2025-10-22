import { Schema } from 'effect';

export const GenderSchema = Schema.Literal('male', 'female', 'other');
export const FamilyRoleSchema = Schema.Literal('father', 'mother', 'child', 'etc', 'parent', 'son', 'daughter');

export class PersonSchema extends Schema.Class<PersonSchema>('PersonSchema')({
  id: Schema.Number,
  firstName: Schema.NullOr(Schema.String),
  lastName: Schema.NullOr(Schema.String),
  allFirstNames: Schema.NullOr(Schema.String),
  gender: Schema.NullOr(GenderSchema),
  addressId: Schema.NullOr(Schema.Number),
  familyId: Schema.NullOr(Schema.Number),
  familyRole: Schema.NullOr(FamilyRoleSchema),
  birthDate: Schema.NullOr(Schema.DateFromString),
  birthPlace: Schema.NullOr(Schema.String),
  birthCountryId: Schema.NullOr(Schema.Number),
  languageId: Schema.NullOr(Schema.Number),
  religionId: Schema.NullOr(Schema.Number),
  email: Schema.NullOr(Schema.String),
  birthName: Schema.NullOr(Schema.String),
  academicTitle: Schema.NullOr(Schema.String),
  namePrefix: Schema.NullOr(Schema.String),
  nobilityTitle: Schema.NullOr(Schema.String),
  salutationA: Schema.NullOr(Schema.String),
  salutationB: Schema.NullOr(Schema.String),
  jobTitle: Schema.NullOr(Schema.String),
  comment: Schema.NullOr(Schema.String),
  nationalityId: Schema.NullOr(Schema.Number),
  maritalStatus: Schema.NullOr(Schema.String),
  deathDate: Schema.NullOr(Schema.DateFromString),
}) {}

export class CreatePersonSchema extends Schema.Class<CreatePersonSchema>('CreatePersonSchema')({
  firstName: Schema.String,
  lastName: Schema.String,
  allFirstNames: Schema.NullOr(Schema.String),
  gender: GenderSchema,
  addressId: Schema.Number,
  familyId: Schema.NullOr(Schema.Number),
  familyRole: FamilyRoleSchema,
  birthDate: Schema.NullOr(Schema.DateFromString),
  birthPlace: Schema.NullOr(Schema.String),
  birthCountryId: Schema.NullOr(Schema.Number),
  nationalityId: Schema.NullOr(Schema.Number),


}) {}

export class UpdatePersonSchema extends Schema.Class<UpdatePersonSchema>('UpdatePersonSchema')({
  id: Schema.Number,
  firstName: Schema.NullOr(Schema.String),
  lastName: Schema.NullOr(Schema.String),
  gender: Schema.NullOr(GenderSchema),
  addressId: Schema.NullOr(Schema.Number),
  familyId: Schema.NullOr(Schema.Number),
  familyRole: Schema.NullOr(FamilyRoleSchema),
  birthDate: Schema.NullOr(Schema.String),
  birthPlace: Schema.NullOr(Schema.String),
  birthCountryId: Schema.NullOr(Schema.Number),
  languageId: Schema.NullOr(Schema.Number),
  religionId: Schema.NullOr(Schema.Number),
  allFirstNames: Schema.NullOr(Schema.String),
  birthName: Schema.NullOr(Schema.String),
  academicTitle: Schema.NullOr(Schema.String),
  namePrefix: Schema.NullOr(Schema.String),
  nobilityTitle: Schema.NullOr(Schema.String),
  salutationA: Schema.NullOr(Schema.String),
  salutationB: Schema.NullOr(Schema.String),
  jobTitle: Schema.NullOr(Schema.String),
  comment: Schema.NullOr(Schema.String),
  nationalityId: Schema.NullOr(Schema.Number),
  maritalStatus: Schema.NullOr(Schema.String),
  deathDate: Schema.NullOr(Schema.String),
}) {}

export class SuccessResponseSchema extends Schema.Class<SuccessResponseSchema>('SuccessResponseSchema')({
  code: Schema.Number,
  message: Schema.String,
}) {}
