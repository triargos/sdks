import { Schema } from 'effect';

// ============================================
// DOMAIN ERRORS (appear in Effect error channel)
// ============================================

// --- NotFound errors (one per entity with findById) ---

export class PersonNotFound extends Schema.TaggedError<PersonNotFound>()('PersonNotFound', {
  personId: Schema.Number,
}) {}

export class GroupNotFound extends Schema.TaggedError<GroupNotFound>()('GroupNotFound', {
  groupId: Schema.Number,
}) {}

export class AddressNotFound extends Schema.TaggedError<AddressNotFound>()('AddressNotFound', {
  addressId: Schema.Number,
}) {}

export class CountryNotFound extends Schema.TaggedError<CountryNotFound>()('CountryNotFound', {
  countryId: Schema.Number,
}) {}

export class CountyNotFound extends Schema.TaggedError<CountyNotFound>()('CountyNotFound', {
  countyId: Schema.Number,
}) {}

export class ReligionNotFound extends Schema.TaggedError<ReligionNotFound>()('ReligionNotFound', {
  religionId: Schema.Number,
}) {}

export class GroupMembershipNotFound extends Schema.TaggedError<GroupMembershipNotFound>()(
  'GroupMembershipNotFound',
  {
    groupId: Schema.Number,
    personId: Schema.Number,
  },
) {}

// --- ValidationError errors (one per entity with create/update) ---

export class PersonValidationError extends Schema.TaggedError<PersonValidationError>()(
  'PersonValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    input: Schema.Unknown,
  },
) {}

export class AddressValidationError extends Schema.TaggedError<AddressValidationError>()(
  'AddressValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    input: Schema.Unknown,
  },
) {}

export class GroupMemberValidationError extends Schema.TaggedError<GroupMemberValidationError>()(
  'GroupMemberValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    groupId: Schema.Number,
    memberId: Schema.Number,
  },
) {}

export class ContactInformationValidationError extends Schema.TaggedError<ContactInformationValidationError>()(
  'ContactInformationValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    input: Schema.Unknown,
  },
) {}

export class RelationshipValidationError extends Schema.TaggedError<RelationshipValidationError>()(
  'RelationshipValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    kind: Schema.Literal('addChildToParent', 'addParentToChild'),
    personToAddId: Schema.Number,
    basePersonId: Schema.Number,
  },
) {}

// ============================================
// UNKNOWN / INFRASTRUCTURE ERRORS
// ============================================

export class UnknownProcuratError extends Schema.TaggedError<UnknownProcuratError>()(
  'UnknownProcuratError',
  {
    message: Schema.String,
    cause: Schema.Unknown,
  },
) {}

// ============================================
// BASE HTTP ERRORS (used internally, mapped to domain errors or surfaced as-is)
// ============================================

export class ProcuratErrorSchema extends Schema.Class<ProcuratErrorSchema>('ProcuratErrorSchema')({
  code: Schema.Number,
  error: Schema.String,
}) {}

const ProcuratErrorDetailsSchema = Schema.Struct({
  status: Schema.Number,
  message: Schema.String,
  code: Schema.Number,
  endpoint: Schema.String,
});

export class ProcuratNotFoundError extends Schema.TaggedError<ProcuratNotFoundError>()(
  'ProcuratNotFoundError',
  ProcuratErrorDetailsSchema,
) {}

export class ProcuratUnauthorizedError extends Schema.TaggedError<ProcuratUnauthorizedError>()(
  'ProcuratUnauthorizedError',
  ProcuratErrorDetailsSchema,
) {}

export class ProcuratServerError extends Schema.TaggedError<ProcuratServerError>()(
  'ProcuratServerError',
  ProcuratErrorDetailsSchema,
) {}

export class ProcuratBadRequestError extends Schema.TaggedError<ProcuratBadRequestError>()(
  'ProcuratBadRequestError',
  ProcuratErrorDetailsSchema,
) {}
