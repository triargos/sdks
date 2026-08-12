import { Schema } from 'effect';
import { type DateCodec, ProcuratDate } from '../../shared/date';
import { membersOf } from '../../shared/literals';

export const Gender = Schema.Literals(['male', 'female', 'other']);
export type Gender = typeof Gender.Type;
export const Genders = membersOf(Gender)({ Male: 'male', Female: 'female', Other: 'other' });

export const FamilyRole = Schema.Literals(['father', 'mother', 'child', 'etc', 'parent', 'son', 'daughter']);
export type FamilyRole = typeof FamilyRole.Type;
export const FamilyRoles = membersOf(FamilyRole)({
  Father: 'father',
  Mother: 'mother',
  Child: 'child',
  Etc: 'etc',
  Parent: 'parent',
  Son: 'son',
  Daughter: 'daughter',
});

export class Person extends Schema.Class<Person>('Person')({
  id: Schema.Number,
  firstName: Schema.NullOr(Schema.String),
  lastName: Schema.NullOr(Schema.String),
  allFirstNames: Schema.NullOr(Schema.String),
  gender: Schema.NullOr(Gender),
  addressId: Schema.NullOr(Schema.Number),
  familyId: Schema.NullOr(Schema.Number),
  familyRole: Schema.NullOr(FamilyRole),
  birthDate: Schema.NullOr(ProcuratDate),
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
  deathDate: Schema.NullOr(ProcuratDate),
}) {}

/** The codec is a parameter only while the API rolls over. See `shared/date`. */
export const createPersonFields = (date: DateCodec) =>
  Schema.Struct({
    firstName: Schema.String,
    lastName: Schema.String,
    allFirstNames: Schema.NullOr(Schema.String),
    gender: Gender,
    addressId: Schema.Number,
    familyId: Schema.NullOr(Schema.Number),
    familyRole: FamilyRole,
    birthDate: Schema.NullOr(date),
    birthPlace: Schema.NullOr(Schema.String),
    birthCountryId: Schema.NullOr(Schema.Number),
    nationalityId: Schema.NullOr(Schema.Number),
  });

export class CreatePerson extends Schema.Opaque<CreatePerson>()(createPersonFields(ProcuratDate)) {}

export const updatePersonFields = (date: DateCodec) =>
  Schema.Struct({
    id: Schema.Number,
    firstName: Schema.NullOr(Schema.String),
    lastName: Schema.NullOr(Schema.String),
    gender: Schema.NullOr(Gender),
    addressId: Schema.NullOr(Schema.Number),
    familyId: Schema.NullOr(Schema.Number),
    familyRole: Schema.NullOr(FamilyRole),
    birthDate: Schema.NullOr(date),
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
    deathDate: Schema.NullOr(date),
  });

export class UpdatePerson extends Schema.Opaque<UpdatePerson>()(updatePersonFields(ProcuratDate)) {}
