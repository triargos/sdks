import { Schema } from 'effect';

export class Religion extends Schema.Class<Religion>('Religion')({
  id: Schema.Number,
  name: Schema.String,
  lookupVal: Schema.NullOr(Schema.Number),
}) {}
