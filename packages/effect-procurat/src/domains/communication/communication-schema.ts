import { Schema } from 'effect';

// --- Contact Person Mapping Schemas ---

export class ContactPersonCreationSchema extends Schema.Class<ContactPersonCreationSchema>(
  'ContactPersonCreationSchema',
)({
  personId: Schema.Number,
  contactPersonId: Schema.Number,
  isEmergency: Schema.NullOr(Schema.Boolean),
  includeAddressOnList: Schema.NullOr(Schema.Boolean),
  includeHomePhoneOnList: Schema.NullOr(Schema.Boolean),
}) {}

export class ContactPersonSchema extends Schema.Class<ContactPersonSchema>('ContactPersonSchema')({
  id: Schema.Number,
  personId: Schema.Number,
  contactPersonId: Schema.Number,
  isEmergency: Schema.NullOr(Schema.Boolean),
  includeAddressOnList: Schema.NullOr(Schema.Boolean),
  includeHomePhoneOnList: Schema.NullOr(Schema.Boolean),
}) {}

// --- Contact Information Mapping Schemas ---

export class ContactInformationMappingCreationSchema extends Schema.Class<ContactInformationMappingCreationSchema>(
  'ContactInformationMappingCreationSchema',
)({
  personId: Schema.Number,
  contactInfoId: Schema.Number,
  emergencyPriority: Schema.NullOr(Schema.Number),
  isOnList: Schema.NullOr(Schema.Boolean),
}) {}

export class ContactInformationMappingSchema extends Schema.Class<ContactInformationMappingSchema>(
  'ContactInformationMappingSchema',
)({
  id: Schema.Number,
  personId: Schema.Number,
  contactInfoId: Schema.Number,
  emergencyPriority: Schema.NullOr(Schema.Number),
  isOnList: Schema.Boolean,
}) {}
