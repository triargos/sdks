import { Schema } from 'effect';

export class LookupTable extends Schema.Class<LookupTable>('LookupTable')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
}) {}

export class MunicipalityCode extends Schema.Class<MunicipalityCode>('MunicipalityCode')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  postalCodes: Schema.Array(Schema.String),
  asvIds: Schema.Array(Schema.String),
}) {}

export class Municipality extends Schema.Class<Municipality>('Municipality')({
  id: Schema.Number,
  label: Schema.String,
  municipalityCode: Schema.String,
  street: Schema.NullOr(Schema.String),
  city: Schema.NullOr(Schema.String),
  postalCode: Schema.NullOr(Schema.String),
}) {}

export class School extends Schema.Class<School>('School')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  schoolTypeId: Schema.Number,
}) {}

export const SchoolType = Schema.Literals(['GY', 'RS', 'GMS', 'FS', 'BS', 'BFS', 'FOS', 'BOS', 'IGS', 'WS', 'FZ']);

export class BavarianSchool extends Schema.Class<BavarianSchool>('BavarianSchool')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  schoolType: SchoolType,
  street: Schema.String,
  building: Schema.String,
  city: Schema.String,
  postalCode: Schema.String,
}) {}

export class CareType extends Schema.Class<CareType>('CareType')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  factor: Schema.NullOr(Schema.String),
  description: Schema.NullOr(Schema.String),
}) {}

export class CostBearer extends Schema.Class<CostBearer>('CostBearer')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  characteristic: Schema.String,
  identificationNumber: Schema.String,
}) {}
