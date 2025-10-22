import { Schema } from 'effect';

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
