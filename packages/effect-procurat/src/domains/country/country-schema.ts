import { Schema } from 'effect';

export class Country extends Schema.Class<Country>('Country')({
  id: Schema.Number,
  idx: Schema.String,
  iso: Schema.String,
  name: Schema.String,
}) {}
