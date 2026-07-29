import { Schema } from 'effect';

export const ContactInformationMedium = Schema.Literals(['telephone', 'email', 'mobile', 'fax']);

export const ContactInformationType = Schema.Literals(['private', 'address', 'work', 'external']);

const ContactInformationBase = Schema.Struct({
  medium: ContactInformationMedium,
  externalName: Schema.Null,
  content: Schema.String,
  comment: Schema.NullOr(Schema.String),
  secret: Schema.NullOr(Schema.Boolean),
});

export class CreatePersonalContactInformation extends Schema.Opaque<CreatePersonalContactInformation>()(
  Schema.Struct({
    type: ContactInformationType.pick(['private', 'work']),
    addressId: Schema.Null,
    personId: Schema.Number,
    ...ContactInformationBase.fields,
  }),
) {}

export class CreateAddressContactInformation extends Schema.Opaque<CreateAddressContactInformation>()(
  Schema.Struct({
    type: ContactInformationType.pick(['address']),
    addressId: Schema.Number,
    personId: Schema.Null,
    ...ContactInformationBase.fields,
  }),
) {}

export class CreateExternalContactInformation extends Schema.Opaque<CreateExternalContactInformation>()(
  Schema.Struct({
    type: ContactInformationType.pick(['external']),
    personId: Schema.Null,
    addressId: Schema.Null,
    ...ContactInformationBase.fields,
    externalName: Schema.String,
  }),
) {}

/** A union of three shapes, so it stays a schema value plus alias — `Opaque` needs a single object type. */
export const CreateContactInformation = Schema.Union([
  CreatePersonalContactInformation,
  CreateAddressContactInformation,
  CreateExternalContactInformation,
]);
export type CreateContactInformation = typeof CreateContactInformation.Type;

export class ContactInformation extends Schema.Class<ContactInformation>('ContactInformation')({
  id: Schema.Number,
  order: Schema.Number,
  type: ContactInformationType,
  medium: ContactInformationMedium,
  personId: Schema.NullOr(Schema.Number),
  addressId: Schema.NullOr(Schema.Number),
  externalName: Schema.NullOr(Schema.String),
  content: Schema.String,
  comment: Schema.NullOr(Schema.String),
  secret: Schema.Boolean,
}) {}
