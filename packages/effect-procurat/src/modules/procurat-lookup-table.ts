import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientResponse } from '@effect/platform';
import {
  BavarianSchoolSchema,
  CareTypeSchema,
  CostBearerSchema,
  LookupTableSchema,
  MunicipalityCodeSchema,
  MunicipalitySchema,
  SchoolSchema,
} from '../schema/lookup-table-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { ListLookupsError } from '../error/lookup-table-errors';

export class ProcuratLookupTable extends Effect.Service<ProcuratLookupTable>()('ProcuratLookupTable', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const listTransitions = Effect.fn('lookupTable.listTransitions')(function* () {
      return yield* http.get('/lookups/transition').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'transitions' }),
        }),
      );
    });

    const listSpecialSupportTypes = Effect.fn('lookupTable.listSpecialSupportTypes')(function* () {
      return yield* http.get('/lookups/special-support').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'special-support-types' }),
        }),
      );
    });

    const listSchools = Effect.fn('lookupTable.listSchools')(function* () {
      return yield* http.get('/lookups/school').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(SchoolSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'schools' }),
        }),
      );
    });

    const listSchoolTypes = Effect.fn('lookupTable.listSchoolTypes')(function* () {
      return yield* http.get('/lookups/school-type').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'school-types' }),
        }),
      );
    });

    const listSchoolGraduations = Effect.fn('lookupTable.listSchoolGraduations')(function* () {
      return yield* http.get('/lookups/school-graduation').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'school-graduations' }),
        }),
      );
    });

    const listRepetitionReasons = Effect.fn('lookupTable.listRepetitionReasons')(function* () {
      return yield* http.get('/lookups/repetition-reason').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'repetition-reasons' }),
        }),
      );
    });

    const listRelocationsReasons = Effect.fn('lookupTable.listRelocationsReasons')(function* () {
      return yield* http.get('/lookups/relocation').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'relocation-reasons' }),
        }),
      );
    });

    const listReligiousEducations = Effect.fn('lookupTable.listReligiousEducations')(function* () {
      return yield* http.get('/lookups/religious-education').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'religious-educations' }),
        }),
      );
    });

    const listReligions = Effect.fn('lookupTable.listReligions')(function* () {
      return yield* http.get('/lookups/religion').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'religions' }),
        }),
      );
    });

    const listPreviousSchools = Effect.fn('lookupTable.listPreviousSchools')(function* () {
      return yield* http.get('/lookups/previous-school').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'previous-schools' }),
        }),
      );
    });

    const listPersonTypes = Effect.fn('lookupTable.listPersonTypes')(function* () {
      return yield* http.get('/lookups/person-type').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'person-types' }),
        }),
      );
    });

    const listOriginGradeLevels = Effect.fn('lookupTable.listOriginGradeLevels')(function* () {
      return yield* http.get('/lookups/origin-grade-level').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'origin-grade-levels' }),
        }),
      );
    });

    const listMunicipalities = Effect.fn('lookupTable.listMunicipalities')(function* () {
      return yield* http.get('/lookups/municipality').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(MunicipalitySchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'municipalities' }),
        }),
      );
    });

    const listMunicipalityCodes = Effect.fn('lookupTable.listMunicipalityCodes')(function* () {
      return yield* http.get('/lookups/municipality-code').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(MunicipalityCodeSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'municipality-codes' }),
        }),
      );
    });

    const listGuestStudentTypes = Effect.fn('lookupTable.listGuestStudentTypes')(function* () {
      return yield* http.get('/lookups/guest-student-type').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'guest-student-types' }),
        }),
      );
    });

    const listGradeLevels = Effect.fn('lookupTable.listGradeLevels')(function* () {
      return yield* http.get('/lookups/grade-level').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'grade-levels' }),
        }),
      );
    });

    const listForeignLanguages = Effect.fn('lookupTable.listForeignLanguages')(function* () {
      return yield* http.get('/lookups/foreign-language').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'foreign-languages' }),
        }),
      );
    });

    const listExitReasons = Effect.fn('lookupTable.listExitReasons')(function* () {
      return yield* http.get('/lookups/exit-reason').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'exit-reasons' }),
        }),
      );
    });

    const listEnrollmentTypes = Effect.fn('lookupTable.listEnrollmentTypes')(function* () {
      return yield* http.get('/lookups/enrollment-type').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'enrollment-types' }),
        }),
      );
    });

    const listDisordersAndWeaknesses = Effect.fn('lookupTable.listDisordersAndWeaknesses')(function* () {
      return yield* http.get('/lookups/disorder-weakness').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'disorders-and-weaknesses' }),
        }),
      );
    });

    const listDepartureReasons = Effect.fn('lookupTable.listDepartureReasons')(function* () {
      return yield* http.get('/lookups/departure-reason').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'departure-reasons' }),
        }),
      );
    });

    const listCostBearers = Effect.fn('lookupTable.listCostBearers')(function* () {
      return yield* http.get('/lookups/cost-bearer').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(CostBearerSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'cost-bearers' }),
        }),
      );
    });

    const listCompulsoryEducations = Effect.fn('lookupTable.listCompulsoryEducations')(function* () {
      return yield* http.get('/lookups/compulsory-education').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'compulsory-educations' }),
        }),
      );
    });

    const listCommonLanguages = Effect.fn('lookupTable.listCommonLanguages')(function* () {
      return yield* http.get('/lookups/common-language').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'common-languages' }),
        }),
      );
    });

    const listClassGoals = Effect.fn('lookupTable.listClassGoals')(function* () {
      return yield* http.get('/lookups/class-goal').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'class-goals' }),
        }),
      );
    });

    const listCarePrograms = Effect.fn('lookupTable.listCarePrograms')(function* () {
      return yield* http.get('/lookups/care').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'care-programs' }),
        }),
      );
    });

    const listCareTypes = Effect.fn('lookupTable.listCareTypes')(function* () {
      return yield* http.get('/lookups/care-type').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(CareTypeSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'care-types' }),
        }),
      );
    });

    const listBavarianSchools = Effect.fn('lookupTable.listBavarianSchools')(function* () {
      return yield* http.get('/lookups/bavarian-schools').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(BavarianSchoolSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'bavarian-schools' }),
        }),
      );
    });

    const listAdmissionAuthorizations = Effect.fn('lookupTable.listAdmissionAuthorizations')(function* () {
      return yield* http.get('/lookups/admission-authorization').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(LookupTableSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListLookupsError({ cause, lookupType: 'admission-authorizations' }),
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
  }),
}) {}
