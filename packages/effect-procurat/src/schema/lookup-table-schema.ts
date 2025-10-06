import { Schema } from 'effect';

export class LookupTableSchema extends Schema.Class<LookupTableSchema>('LookupTableSchema')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
}) {}

export class MunicipalityCodeSchema extends Schema.Class<MunicipalityCodeSchema>('MunicipalityCodeSchema')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  postalCodes: Schema.Array(Schema.String),
  asvIds: Schema.Array(Schema.String),
}) {}

export class MunicipalitySchema extends Schema.Class<MunicipalitySchema>('MunicipalitySchema')({
  id: Schema.Number,
  label: Schema.String,
  municipalityCode: Schema.String,
  street: Schema.NullOr(Schema.String),
  city: Schema.NullOr(Schema.String),
  postalCode: Schema.NullOr(Schema.String),
}) {}

export class SchoolSchema extends Schema.Class<SchoolSchema>('SchoolSchema')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  schoolTypeId: Schema.Number,
}) {}

export const SchoolTypeSchema = Schema.Literal('GY', 'RS', 'GMS', 'FS', 'BS', 'BFS', 'FOS', 'BOS', 'IGS', 'WS', 'FZ');

export class BavarianSchoolSchema extends Schema.Class<BavarianSchoolSchema>('BavarianSchoolSchema')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  schoolType: SchoolTypeSchema,
  street: Schema.String,
  building: Schema.String,
  city: Schema.String,
  postalCode: Schema.String,
}) {}

export class CareTypeSchema extends Schema.Class<CareTypeSchema>('CareTypeSchema')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  factor: Schema.String,
  description: Schema.String,
}) {}

export class CostBearerSchema extends Schema.Class<CostBearerSchema>('CostBearerSchema')({
  id: Schema.Number,
  label: Schema.String,
  value: Schema.String,
  characteristic: Schema.String,
  identificationNumber: Schema.String,
}) {}
