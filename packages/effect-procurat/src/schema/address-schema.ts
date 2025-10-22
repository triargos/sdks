import {Schema} from "effect";

export class AddressSchema extends Schema.Class<AddressSchema>("AddressSchema")({
    id: Schema.Number,
    street: Schema.NullOr(Schema.String),
    zip: Schema.NullOr(Schema.String),
    city: Schema.String,
    nameline2: Schema.NullOr(Schema.String),
    additional: Schema.NullOr(Schema.String),
    district: Schema.NullOr(Schema.String),
    poBox: Schema.NullOr(Schema.String),
    poBoxZip: Schema.NullOr(Schema.String),
    countyId: Schema.NullOr(Schema.Number),
    countryId: Schema.NullOr(Schema.Number),
}) {}


export class CreateAddressSchema extends Schema.Class<CreateAddressSchema>("CreateAddressSchema")({
  street: Schema.String,
  city: Schema.String,
  zip: Schema.String,
  countryId: Schema.Number,
  additional: Schema.NullOr(Schema.String),
  nameline2: Schema.NullOr(Schema.String),
  district: Schema.NullOr(Schema.String),
  poBoxZip: Schema.NullOr(Schema.String),
  poBox: Schema.NullOr(Schema.String),
  countyId: Schema.NullOr(Schema.Number),
}){}