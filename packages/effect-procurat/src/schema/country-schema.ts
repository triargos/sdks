import { Schema } from "effect";

export class CountrySchema extends Schema.Class<CountrySchema>("CountrySchema")({
  id: Schema.Number,
  idx: Schema.String,
  iso: Schema.String,
  name: Schema.String
}) {} 