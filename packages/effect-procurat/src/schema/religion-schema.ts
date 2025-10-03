import { Schema } from "effect";

export class ReligionSchema extends Schema.Class<ReligionSchema>("ReligionSchema")({
  id: Schema.Number,
  name: Schema.String,
  lookupVal: Schema.Number
}) {}
