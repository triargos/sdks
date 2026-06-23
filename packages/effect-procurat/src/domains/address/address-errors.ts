import { Schema } from 'effect';

export class AddressNotFound extends Schema.TaggedError<AddressNotFound>()('AddressNotFound', {
  addressId: Schema.Number,
}) {}

export class AddressValidationError extends Schema.TaggedError<AddressValidationError>()(
  'AddressValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    input: Schema.Unknown,
  },
) {}
