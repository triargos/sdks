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
