import { Schema } from 'effect';

export const LookupTable = Schema.Struct({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.NullOr(Schema.String),
});
export type LookupTable = typeof LookupTable.Type;

export const MunicipalityCode = Schema.Struct({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.NullOr(Schema.String),
  postalCodes: Schema.Array(Schema.String),
  asvIds: Schema.Array(Schema.String),
});
export type MunicipalityCode = typeof MunicipalityCode.Type;

export const Municipality = Schema.Struct({
  id: Schema.Number,
  label: Schema.NullOr(Schema.String),
  municipalityCode: Schema.NullOr(Schema.String),
  street: Schema.NullOr(Schema.String),
  city: Schema.NullOr(Schema.String),
  postalCode: Schema.NullOr(Schema.String),
});
export type Municipality = typeof Municipality.Type;

export const School = Schema.Struct({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.NullOr(Schema.String),
  schoolTypeId: Schema.NullOr(Schema.Number),
});
export type School = typeof School.Type;

export const SchoolType = Schema.Literals(['GY', 'RS', 'GMS', 'FS', 'BS', 'BFS', 'FOS', 'BOS', 'IGS', 'WS', 'FZ']);

export const BavarianSchool = Schema.Struct({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.NullOr(Schema.String),
  schoolType: Schema.NullOr(SchoolType),
  street: Schema.NullOr(Schema.String),
  building: Schema.NullOr(Schema.String),
  city: Schema.NullOr(Schema.String),
  postalCode: Schema.NullOr(Schema.String),
});
export type BavarianSchool = typeof BavarianSchool.Type;

export const CareType = Schema.Struct({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.NullOr(Schema.String),
  factor: Schema.NullOr(Schema.String),
  description: Schema.NullOr(Schema.String),
});
export type CareType = typeof CareType.Type;

export const CostBearer = Schema.Struct({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.NullOr(Schema.String),
  characteristic: Schema.NullOr(Schema.String),
  identificationNumber: Schema.NullOr(Schema.String),
});
export type CostBearer = typeof CostBearer.Type;
