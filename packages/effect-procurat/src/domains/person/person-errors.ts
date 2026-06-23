import { Schema } from 'effect';

export class PersonNotFound extends Schema.TaggedError<PersonNotFound>()('PersonNotFound', {
  personId: Schema.Number,
}) {}

export class PersonValidationError extends Schema.TaggedError<PersonValidationError>()(
  'PersonValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    input: Schema.Unknown,
  },
) {}
