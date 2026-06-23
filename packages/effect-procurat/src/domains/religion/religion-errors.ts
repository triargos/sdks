import { Schema } from 'effect';

export class ReligionNotFound extends Schema.TaggedError<ReligionNotFound>()('ReligionNotFound', {
  religionId: Schema.Number,
}) {}
