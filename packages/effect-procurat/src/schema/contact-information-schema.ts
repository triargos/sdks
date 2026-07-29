import { Schema } from 'effect';

export const ContactInformationMediumSchema = Schema.Literals(['telephone', 'email', 'mobile', 'fax']);

export const ContactInformationTypeSchema = Schema.Literals(['private', 'address', 'work', 'external']);

export const ContactInformationBaseSchema = Schema.Struct({
  medium: ContactInformationMediumSchema,
  externalName: Schema.Null,
  content: Schema.String,
  comment: Schema.NullOr(Schema.String),
  secret: Schema.NullOr(Schema.Boolean),
});

export const CreatePersonalContactInformationSchema = Schema.Struct({
  type: ContactInformationTypeSchema.pick(['private', 'work']),
  addressId: Schema.Null,
  personId: Schema.Number,
  ...ContactInformationBaseSchema.fields,
});
export type CreatePersonalContactInformationSchema = typeof CreatePersonalContactInformationSchema.Type;

export const CreateAddressContactInformationSchema = Schema.Struct({
  type: ContactInformationTypeSchema.pick(['address']),
  addressId: Schema.Number,
  personId: Schema.Null,
  ...ContactInformationBaseSchema.fields,
});
export type CreateAddressContactInformationSchema = typeof CreateAddressContactInformationSchema.Type;

export const CreateExternalContactInformationSchema = Schema.Struct({
  type: ContactInformationTypeSchema.pick(['external']),
  personId: Schema.Null,
  addressId: Schema.Null,
  ...ContactInformationBaseSchema.fields,
  externalName: Schema.String,
});
export type CreateExternalContactInformationSchema = typeof CreateExternalContactInformationSchema.Type;

export const CreateContactInformationSchema = Schema.Union([
  CreatePersonalContactInformationSchema,
  CreateAddressContactInformationSchema,
  CreateExternalContactInformationSchema,
]);
export type CreateContactInformationSchema = typeof CreateContactInformationSchema.Type;

export class ContactInformationSchema extends Schema.Class<ContactInformationSchema>('ContactInformationSchema')({
  id: Schema.Number,
  order: Schema.Number,
  type: ContactInformationTypeSchema,
  medium: ContactInformationMediumSchema,
  personId: Schema.NullOr(Schema.Number),
  addressId: Schema.NullOr(Schema.Number),
  externalName: Schema.NullOr(Schema.String),
  content: Schema.String,
  comment: Schema.NullOr(Schema.String),
  secret: Schema.Boolean,
}) {}
