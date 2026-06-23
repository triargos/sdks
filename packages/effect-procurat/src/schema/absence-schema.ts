import { Schema } from 'effect';

export const AbsenceQueryTypeSchema = Schema.Literal('all', 'today', 'schoolyear');
export type AbsenceQueryType = Schema.Schema.Type<typeof AbsenceQueryTypeSchema>;

export class AbsenceSchema extends Schema.Class<AbsenceSchema>('AbsenceSchema')({
  id: Schema.Number,
  personId: Schema.Number,
  date: Schema.DateFromString,
  excused: Schema.Boolean,
  parentsInformed: Schema.Boolean,
  note: Schema.NullOr(Schema.String),
  medicalCertificateReceived: Schema.NullOr(Schema.DateFromString),
  medicalCertificateRequested: Schema.NullOr(Schema.DateFromString),
  medicalCertificateRequired: Schema.Boolean,
}) {}

export class CreateAbsenceSchema extends Schema.Class<CreateAbsenceSchema>('CreateAbsenceSchema')({
  personId: Schema.Number,
  startDate: Schema.Date,
  endDate: Schema.Date,
  includeWeekend: Schema.Boolean,
  excused: Schema.Boolean,
  parentsInformed: Schema.Boolean,
  note: Schema.optional(Schema.String),
  medicalCertificateReceived: Schema.optional(Schema.Date),
  medicalCertificateRequested: Schema.optional(Schema.Date),
  medicalCertificateRequired: Schema.Boolean,
}) {}

export class UpdateAbsenceSchema extends Schema.Class<UpdateAbsenceSchema>('UpdateAbsenceSchema')({
  id: Schema.Number,
  personId: Schema.Number,
  date: Schema.Date,
  excused: Schema.Boolean,
  parentsInformed: Schema.Boolean,
  note: Schema.NullOr(Schema.String),
  medicalCertificateReceived: Schema.NullOr(Schema.Date),
  medicalCertificateRequested: Schema.NullOr(Schema.Date),
  medicalCertificateRequired: Schema.Boolean,
}) {}
