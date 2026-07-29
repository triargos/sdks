import { Context, Effect, Layer, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { decodeJson } from '../internal/decode';
import { operation } from '../internal/operation';
import {
  BavarianSchool,
  CareType,
  CostBearer,
  LookupTable,
  Municipality,
  MunicipalityCode,
  School,
} from '../schema/lookup-table-schema';

export class ProcuratLookupTable extends Context.Service<ProcuratLookupTable>()('ProcuratLookupTable', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const lookup = <A, I>(name: string, path: string, schema: Schema.Codec<A, I>) =>
      operation(`lookupTable.${name}`, () =>
        http.get(`/lookups/${path}`).pipe(Effect.flatMap(decodeJson(Schema.Array(schema)))),
      );

    return {
      listTransitions: lookup('listTransitions', 'transition', LookupTable),
      listSpecialSupportTypes: lookup('listSpecialSupportTypes', 'special-support', LookupTable),
      listSchools: lookup('listSchools', 'school', School),
      listSchoolTypes: lookup('listSchoolTypes', 'school-type', LookupTable),
      listSchoolGraduations: lookup('listSchoolGraduations', 'school-graduation', LookupTable),
      listRepetitionReasons: lookup('listRepetitionReasons', 'repetition-reason', LookupTable),
      listRelocationsReasons: lookup('listRelocationsReasons', 'relocation', LookupTable),
      listReligiousEducations: lookup('listReligiousEducations', 'religious-education', LookupTable),
      listReligions: lookup('listReligions', 'religion', LookupTable),
      listPreviousSchools: lookup('listPreviousSchools', 'previous-school', LookupTable),
      listPersonTypes: lookup('listPersonTypes', 'person-type', LookupTable),
      listOriginGradeLevels: lookup('listOriginGradeLevels', 'origin-grade-level', LookupTable),
      listMunicipalities: lookup('listMunicipalities', 'municipality', Municipality),
      listMunicipalityCodes: lookup('listMunicipalityCodes', 'municipality-code', MunicipalityCode),
      listGuestStudentTypes: lookup('listGuestStudentTypes', 'guest-student-type', LookupTable),
      listGradeLevels: lookup('listGradeLevels', 'grade-level', LookupTable),
      listForeignLanguages: lookup('listForeignLanguages', 'foreign-language', LookupTable),
      listExitReasons: lookup('listExitReasons', 'exit-reason', LookupTable),
      listEnrollmentTypes: lookup('listEnrollmentTypes', 'enrollment-type', LookupTable),
      listDisordersAndWeaknesses: lookup('listDisordersAndWeaknesses', 'disorder-weakness', LookupTable),
      listDepartureReasons: lookup('listDepartureReasons', 'departure-reason', LookupTable),
      listCostBearers: lookup('listCostBearers', 'cost-bearer', CostBearer),
      listCompulsoryEducations: lookup('listCompulsoryEducations', 'compulsory-education', LookupTable),
      listCommonLanguages: lookup('listCommonLanguages', 'common-language', LookupTable),
      listClassGoals: lookup('listClassGoals', 'class-goal', LookupTable),
      listCarePrograms: lookup('listCarePrograms', 'care', LookupTable),
      listCareTypes: lookup('listCareTypes', 'care-type', CareType),
      listBavarianSchools: lookup('listBavarianSchools', 'bavarian-schools', BavarianSchool),
      listAdmissionAuthorizations: lookup('listAdmissionAuthorizations', 'admission-authorization', LookupTable),
    };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
