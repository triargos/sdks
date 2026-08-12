import { Schema } from 'effect';
import { type DateCodec, ProcuratDate } from '../../shared/date';
import { membersOf } from '../../shared/literals';

export const AbsenceQueryType = Schema.Literals(['all', 'today', 'schoolyear']);
export type AbsenceQueryType = typeof AbsenceQueryType.Type;
export const AbsenceQueryTypes = membersOf(AbsenceQueryType)({
  All: 'all',
  Today: 'today',
  SchoolYear: 'schoolyear',
});

export class Absence extends Schema.Class<Absence>('Absence')({
  id: Schema.Number,
  personId: Schema.Number,
  date: ProcuratDate,
  excused: Schema.Boolean,
  parentsInformed: Schema.Boolean,
  note: Schema.NullOr(Schema.String),
  medicalCertificateReceived: Schema.NullOr(ProcuratDate),
  medicalCertificateRequested: Schema.NullOr(ProcuratDate),
  medicalCertificateRequired: Schema.Boolean,
}) {}

/** The codec is a parameter only while the API rolls over. See `shared/date`. */
export const createAbsenceFields = (date: DateCodec) =>
  Schema.Struct({
    personId: Schema.Number,
    startDate: date,
    endDate: date,
    includeWeekend: Schema.Boolean,
    excused: Schema.Boolean,
    parentsInformed: Schema.Boolean,
    note: Schema.optionalKey(Schema.String),
    medicalCertificateReceived: Schema.optionalKey(date),
    medicalCertificateRequested: Schema.optionalKey(date),
    medicalCertificateRequired: Schema.Boolean,
  });

export class CreateAbsence extends Schema.Opaque<CreateAbsence>()(createAbsenceFields(ProcuratDate)) {}

export const updateAbsenceFields = (date: DateCodec) =>
  Schema.Struct({
    id: Schema.Number,
    personId: Schema.Number,
    date,
    excused: Schema.Boolean,
    parentsInformed: Schema.Boolean,
    note: Schema.NullOr(Schema.String),
    medicalCertificateReceived: Schema.NullOr(date),
    medicalCertificateRequested: Schema.NullOr(date),
    medicalCertificateRequired: Schema.Boolean,
  });

export class UpdateAbsence extends Schema.Opaque<UpdateAbsence>()(updateAbsenceFields(ProcuratDate)) {}
