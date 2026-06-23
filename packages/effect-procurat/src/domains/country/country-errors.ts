import { Schema } from 'effect';

export class CountryNotFound extends Schema.TaggedError<CountryNotFound>()('CountryNotFound', {
  countryId: Schema.Number,
}) {}
