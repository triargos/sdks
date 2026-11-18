import { Schema } from 'effect';

export const County = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
});
export type County = typeof County.Type;
