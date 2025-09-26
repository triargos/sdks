import { Schema } from 'effect';

export const ContactInformationMediumSchema = Schema.Literal('telephone', 'email', 'mobile', 'fax');

export const ContactInformationTypeSchema = Schema.Literal('private', 'address', 'work', 'external');

export const ContactInformationBaseSchema = Schema.Struct({
  medium: ContactInformationMediumSchema,
  externalName: Schema.Null,
  content: Schema.String,
  comment: Schema.NullOr(Schema.String),
  secret: Schema.NullOr(Schema.Boolean),
});

export class CreatePersonalContactInformationSchema extends Schema.Class<CreatePersonalContactInformationSchema>(
  'CreatePersonalContactInformationSchema',
)({
  type: ContactInformationTypeSchema.pipe(Schema.pickLiteral('private', 'work')),
  addressId: Schema.Null,
  personId: Schema.Number,
  ...ContactInformationBaseSchema.fields,
}) {}

export class CreateAddressContactInformationSchema extends Schema.Class<CreateAddressContactInformationSchema>(
  'CreateAddressContactInformationSchema',
)({
  type: ContactInformationTypeSchema.pipe(Schema.pickLiteral('address')),
  addressId: Schema.Number,
  personId: Schema.Null,
  ...ContactInformationBaseSchema.fields,
}) {}

export class CreateExternalContactInformationSchema extends Schema.Class<CreateExternalContactInformationSchema>(
  'CreateExternalContactInformationSchema',
)({
  type: ContactInformationTypeSchema.pipe(Schema.pickLiteral('external')),
  personId: Schema.Null,
  addressId: Schema.Null,
  ...ContactInformationBaseSchema.fields,
  externalName: Schema.String,
}) {}

export const CreateContactInformationSchema = Schema.Union(
  CreatePersonalContactInformationSchema,
  CreateAddressContactInformationSchema,
  CreateExternalContactInformationSchema,
);
export type CreateContactInformationSchema = Schema.Schema.Type<typeof CreateContactInformationSchema>;

export class ContactInformationSchema extends Schema.Class<ContactInformationSchema>('ContactInformationSchema')({
  id: Schema.Number,
  order: Schema.Number,
  type: ContactInformationTypeSchema,
  medium: ContactInformationMediumSchema,
  personId: Schema.NullOr(Schema.Number),
  addressId: Schema.NullOr(Schema.Number),
  externalName: Schema.NullOr(Schema.String),
  secret: Schema.Boolean,
}) {}
