import { Schema } from 'effect';

export class Address extends Schema.Class<Address>('Address')({
  id: Schema.Number,
  street: Schema.NullOr(Schema.String),
  zip: Schema.NullOr(Schema.String),
  city: Schema.NullOr(Schema.String),
  nameline2: Schema.NullOr(Schema.String),
  additional: Schema.NullOr(Schema.String),
  district: Schema.NullOr(Schema.String),
  poBox: Schema.NullOr(Schema.String),
  poBoxZip: Schema.NullOr(Schema.String),
  countyId: Schema.NullOr(Schema.Number),
  countryId: Schema.NullOr(Schema.Number),
}) {}

export class CreateAddress extends Schema.Opaque<CreateAddress>()(
  Schema.Struct({
    personId: Schema.NullOr(Schema.Number),
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
  }),
) {}

/**
 * Encode-side schema for `PUT /addresses/{id}`. The read `Address` class stays lenient
 * (`NullOr` street/zip/city) for decode tolerance, so reusing it would let callers send
 * `null` where the API demands a string. `AddressDTO` carries no `personId`, so neither does this.
 */
export class UpdateAddress extends Schema.Opaque<UpdateAddress>()(
  Schema.Struct({
    id: Schema.Number,
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
  }),
) {}
