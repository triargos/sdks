import { Context, Effect, Layer, Schema } from 'effect';
import { ProcuratHttpClient } from '../../shared/http-client';
import { HttpClientResponse } from '@effect/platform';
import {
  BavarianSchoolSchema,
  CareTypeSchema,
  CostBearerSchema,
  LookupTableSchema,
  MunicipalityCodeSchema,
  MunicipalitySchema,
  SchoolSchema,
} from './lookup-table-schema';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const listTransitions: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listTransitions')(function* () {
    return yield* http.get('/lookups/transition').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listSpecialSupportTypes: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listSpecialSupportTypes')(function* () {
    return yield* http.get('/lookups/special-support').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listSchools: () => Effect.Effect<
    ReadonlyArray<SchoolSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listSchools')(function* () {
    return yield* http.get('/lookups/school').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(SchoolSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listSchoolTypes: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listSchoolTypes')(function* () {
    return yield* http.get('/lookups/school-type').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listSchoolGraduations: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listSchoolGraduations')(function* () {
    return yield* http.get('/lookups/school-graduation').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listRepetitionReasons: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listRepetitionReasons')(function* () {
    return yield* http.get('/lookups/repetition-reason').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listRelocationsReasons: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listRelocationsReasons')(function* () {
    return yield* http.get('/lookups/relocation').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listReligiousEducations: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listReligiousEducations')(function* () {
    return yield* http.get('/lookups/religious-education').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listReligions: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listReligions')(function* () {
    return yield* http.get('/lookups/religion').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listPreviousSchools: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listPreviousSchools')(function* () {
    return yield* http.get('/lookups/previous-school').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listPersonTypes: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listPersonTypes')(function* () {
    return yield* http.get('/lookups/person-type').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listOriginGradeLevels: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listOriginGradeLevels')(function* () {
    return yield* http.get('/lookups/origin-grade-level').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listMunicipalities: () => Effect.Effect<
    ReadonlyArray<MunicipalitySchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listMunicipalities')(function* () {
    return yield* http.get('/lookups/municipality').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(MunicipalitySchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listMunicipalityCodes: () => Effect.Effect<
    ReadonlyArray<MunicipalityCodeSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listMunicipalityCodes')(function* () {
    return yield* http.get('/lookups/municipality-code').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(MunicipalityCodeSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listGuestStudentTypes: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listGuestStudentTypes')(function* () {
    return yield* http.get('/lookups/guest-student-type').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listGradeLevels: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listGradeLevels')(function* () {
    return yield* http.get('/lookups/grade-level').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listForeignLanguages: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listForeignLanguages')(function* () {
    return yield* http.get('/lookups/foreign-language').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listExitReasons: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listExitReasons')(function* () {
    return yield* http.get('/lookups/exit-reason').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listEnrollmentTypes: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listEnrollmentTypes')(function* () {
    return yield* http.get('/lookups/enrollment-type').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listDisordersAndWeaknesses: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listDisordersAndWeaknesses')(function* () {
    return yield* http.get('/lookups/disorder-weakness').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listDepartureReasons: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listDepartureReasons')(function* () {
    return yield* http.get('/lookups/departure-reason').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listCostBearers: () => Effect.Effect<
    ReadonlyArray<CostBearerSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listCostBearers')(function* () {
    return yield* http.get('/lookups/cost-bearer').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(CostBearerSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listCompulsoryEducations: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listCompulsoryEducations')(function* () {
    return yield* http.get('/lookups/compulsory-education').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listCommonLanguages: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listCommonLanguages')(function* () {
    return yield* http.get('/lookups/common-language').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listClassGoals: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listClassGoals')(function* () {
    return yield* http.get('/lookups/class-goal').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listCarePrograms: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listCarePrograms')(function* () {
    return yield* http.get('/lookups/care').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listCareTypes: () => Effect.Effect<
    ReadonlyArray<CareTypeSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listCareTypes')(function* () {
    return yield* http.get('/lookups/care-type').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(CareTypeSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listBavarianSchools: () => Effect.Effect<
    ReadonlyArray<BavarianSchoolSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listBavarianSchools')(function* () {
    return yield* http.get('/lookups/bavarian-schools').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(BavarianSchoolSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listAdmissionAuthorizations: () => Effect.Effect<
    ReadonlyArray<LookupTableSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('lookupTable.listAdmissionAuthorizations')(function* () {
    return yield* http.get('/lookups/admission-authorization').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  return {
    listTransitions,
    listSpecialSupportTypes,
    listSchools,
    listSchoolTypes,
    listSchoolGraduations,
    listRepetitionReasons,
    listRelocationsReasons,
    listReligiousEducations,
    listReligions,
    listPreviousSchools,
    listPersonTypes,
    listOriginGradeLevels,
    listMunicipalities,
    listMunicipalityCodes,
    listGuestStudentTypes,
    listGradeLevels,
    listForeignLanguages,
    listExitReasons,
    listEnrollmentTypes,
    listDisordersAndWeaknesses,
    listDepartureReasons,
    listCostBearers,
    listCompulsoryEducations,
    listCommonLanguages,
    listClassGoals,
    listCarePrograms,
    listCareTypes,
    listBavarianSchools,
    listAdmissionAuthorizations,
  };
});

export class ProcuratLookupTable extends Context.Tag('@triargos/procurat/LookupTable')<
  ProcuratLookupTable,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratLookupTable, make);
}
