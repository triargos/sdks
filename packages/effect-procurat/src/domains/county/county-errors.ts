import { Schema } from 'effect';

export class CountyNotFound extends Schema.TaggedError<CountyNotFound>()('CountyNotFound', {
  countyId: Schema.Number,
}) {}
