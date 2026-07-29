import { Schema } from 'effect';

export const ContactPersonCreationSchema = Schema.Struct({
  personId: Schema.Number,
  contactPersonId: Schema.Number,
  isEmergency: Schema.NullOr(Schema.Boolean),
  includeAddressOnList: Schema.NullOr(Schema.Boolean),
  includeHomePhoneOnList: Schema.NullOr(Schema.Boolean),
});
export type ContactPersonCreationSchema = typeof ContactPersonCreationSchema.Type;

export class ContactPersonSchema extends Schema.Class<ContactPersonSchema>('ContactPersonSchema')({
  id: Schema.Number,
  personId: Schema.Number,
  contactPersonId: Schema.Number,
  isEmergency: Schema.NullOr(Schema.Boolean),
  includeAddressOnList: Schema.NullOr(Schema.Boolean),
  includeHomePhoneOnList: Schema.NullOr(Schema.Boolean),
}) {}
