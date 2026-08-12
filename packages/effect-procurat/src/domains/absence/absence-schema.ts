import { Schema } from 'effect';
import { ProcuratDate } from '../../shared/date';
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

export class CreateAbsence extends Schema.Opaque<CreateAbsence>()(
  Schema.Struct({
    personId: Schema.Number,
    startDate: ProcuratDate,
    endDate: ProcuratDate,
    includeWeekend: Schema.Boolean,
    excused: Schema.Boolean,
    parentsInformed: Schema.Boolean,
    note: Schema.optionalKey(Schema.String),
    medicalCertificateReceived: Schema.optionalKey(ProcuratDate),
    medicalCertificateRequested: Schema.optionalKey(ProcuratDate),
    medicalCertificateRequired: Schema.Boolean,
  }),
) {}

export class UpdateAbsence extends Schema.Opaque<UpdateAbsence>()(
  Schema.Struct({
    id: Schema.Number,
    personId: Schema.Number,
    date: ProcuratDate,
    excused: Schema.Boolean,
    parentsInformed: Schema.Boolean,
    note: Schema.NullOr(Schema.String),
    medicalCertificateReceived: Schema.NullOr(ProcuratDate),
    medicalCertificateRequested: Schema.NullOr(ProcuratDate),
    medicalCertificateRequired: Schema.Boolean,
  }),
) {}
