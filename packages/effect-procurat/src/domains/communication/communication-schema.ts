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

export const ContactPerson = Schema.Struct({
  id: Schema.Number,
  personId: Schema.Number,
  contactPersonId: Schema.Number,
  isEmergency: Schema.NullOr(Schema.Boolean),
  includeAddressOnList: Schema.NullOr(Schema.Boolean),
  includeHomePhoneOnList: Schema.NullOr(Schema.Boolean),
});
export type ContactPerson = typeof ContactPerson.Type;

export class CreateContactInformationAssignment extends Schema.Opaque<CreateContactInformationAssignment>()(
  Schema.Struct({
    personId: Schema.Number,
    contactInfoId: Schema.Number,
    emergencyPriority: Schema.NullOr(Schema.Number),
    isOnList: Schema.NullOr(Schema.Boolean),
  }),
) {}

export const ContactInformationAssignment = Schema.Struct({
  id: Schema.Number,
  personId: Schema.Number,
  contactInfoId: Schema.Number,
  emergencyPriority: Schema.NullOr(Schema.Number),
  isOnList: Schema.Boolean,
});
export type ContactInformationAssignment = typeof ContactInformationAssignment.Type;
