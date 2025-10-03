import { Schema } from "effect";


export class CountySchema extends Schema.Class<CountySchema>("CountySchema")({
  id: Schema.Number,
  name: Schema.String,
}) {}