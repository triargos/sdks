import { Schema } from 'effect';

export class CreateContactPerson extends Schema.Opaque<CreateContactPerson>()(
  Schema.Struct({
    personId: Schema.Number,
    contactPersonId: Schema.Number,
    isEmergency: Schema.NullOr(Schema.Boolean),
    includeAddressOnList: Schema.NullOr(Schema.Boolean),
    includeHomePhoneOnList: Schema.NullOr(Schema.Boolean),
  }),
) {}

export class ContactPerson extends Schema.Class<ContactPerson>('ContactPerson')({
  id: Schema.Number,
  personId: Schema.Number,
  contactPersonId: Schema.Number,
  isEmergency: Schema.NullOr(Schema.Boolean),
  includeAddressOnList: Schema.NullOr(Schema.Boolean),
  includeHomePhoneOnList: Schema.NullOr(Schema.Boolean),
}) {}

export class CreateContactInformationAssignment extends Schema.Opaque<CreateContactInformationAssignment>()(
  Schema.Struct({
    personId: Schema.Number,
    contactInfoId: Schema.Number,
    emergencyPriority: Schema.NullOr(Schema.Number),
    isOnList: Schema.NullOr(Schema.Boolean),
  }),
) {}

export class ContactInformationAssignment extends Schema.Class<ContactInformationAssignment>(
  'ContactInformationAssignment',
)({
  id: Schema.Number,
  personId: Schema.Number,
  contactInfoId: Schema.Number,
  emergencyPriority: Schema.NullOr(Schema.Number),
  isOnList: Schema.Boolean,
}) {}
