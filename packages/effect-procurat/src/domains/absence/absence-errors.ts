import { Schema } from 'effect';

export class AbsenceNotFound extends Schema.TaggedError<AbsenceNotFound>()('AbsenceNotFound', {
  absenceId: Schema.Number,
}) {}

export class AbsenceValidationError extends Schema.TaggedError<AbsenceValidationError>()(
  'AbsenceValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    input: Schema.Unknown,
  },
) {}
