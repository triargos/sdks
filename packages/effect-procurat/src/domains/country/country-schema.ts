import { Schema } from 'effect';

export const Country = Schema.Struct({
  id: Schema.Number,
  idx: Schema.String,
  iso: Schema.String,
  name: Schema.String,
});
export type Country = typeof Country.Type;
