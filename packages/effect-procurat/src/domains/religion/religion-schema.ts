import { Schema } from 'effect';

export const Religion = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  lookupVal: Schema.NullOr(Schema.Number),
});
export type Religion = typeof Religion.Type;
