import { Schema } from 'effect';

export class ContactInformationNotFound extends Schema.TaggedError<ContactInformationNotFound>()(
  'ContactInformationNotFound',
  {
    contactInformationId: Schema.Number,
  },
) {}

export class ContactInformationValidationError extends Schema.TaggedError<ContactInformationValidationError>()(
  'ContactInformationValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    input: Schema.Unknown,
  },
) {}
