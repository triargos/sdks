import { Schema } from 'effect';

export class County extends Schema.Class<County>('County')({
  id: Schema.Number,
  name: Schema.String,
}) {}
