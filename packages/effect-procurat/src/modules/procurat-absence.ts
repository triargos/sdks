import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import {
  AbsenceQueryType,
  AbsenceSchema,
  CreateAbsenceSchema,
  UpdateAbsenceSchema,
} from '../schema/absence-schema';
import {
  AbsenceNotFound,
  AbsenceValidationError,
  GroupNotFound,
  PersonNotFound,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';

export class ProcuratAbsence extends Effect.Service<ProcuratAbsence>()('ProcuratAbsence', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll: (args?: {
      type?: AbsenceQueryType;
    }) => Effect.Effect<
      ReadonlyArray<AbsenceSchema>,
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('absence.findAll')(function* ({ type }: { type?: AbsenceQueryType } = {}) {
      yield* Effect.annotateCurrentSpan({ type });
      return yield* HttpClientRequest.get('/absences').pipe(
        HttpClientRequest.setUrlParams(type ? { type } : {}),
        http.execute,
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(AbsenceSchema))),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    const findById: (args: {
      id: number;
    }) => Effect.Effect<
      AbsenceSchema,
      | AbsenceNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('absence.findById')(function* ({ id }: { id: number }) {
      yield* Effect.annotateCurrentSpan({ id });
      return yield* http.get(`/absences/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(AbsenceSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new AbsenceNotFound({ absenceId: id })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    const findByPerson: (args: {
      personId: number;
      type?: AbsenceQueryType;
    }) => Effect.Effect<
      ReadonlyArray<AbsenceSchema>,
      | PersonNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('absence.findByPerson')(function* ({
      personId,
      type,
    }: {
      personId: number;
      type?: AbsenceQueryType;
    }) {
      yield* Effect.annotateCurrentSpan({ personId, type });
      return yield* HttpClientRequest.get(`/absences/person/${personId}`).pipe(
        HttpClientRequest.setUrlParams(type ? { type } : {}),
        http.execute,
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(AbsenceSchema))),
        Effect.catchTag('ProcuratNotFoundError', () => new PersonNotFound({ personId })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    const findByGroup: (args: {
      groupId: number;
      type?: AbsenceQueryType;
    }) => Effect.Effect<
      ReadonlyArray<AbsenceSchema>,
      | GroupNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('absence.findByGroup')(function* ({
      groupId,
      type,
    }: {
      groupId: number;
      type?: AbsenceQueryType;
    }) {
      yield* Effect.annotateCurrentSpan({ groupId, type });
      return yield* HttpClientRequest.get(`/absences/group/${groupId}`).pipe(
        HttpClientRequest.setUrlParams(type ? { type } : {}),
        http.execute,
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(AbsenceSchema))),
        Effect.catchTag('ProcuratNotFoundError', () => new GroupNotFound({ groupId })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    const create: (
      absence: CreateAbsenceSchema,
    ) => Effect.Effect<
      AbsenceSchema,
      | AbsenceValidationError
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('absence.create')(function* (absence: CreateAbsenceSchema) {
      return yield* HttpClientRequest.post('/absences').pipe(
        HttpClientRequest.schemaBodyJson(CreateAbsenceSchema)(absence),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(AbsenceSchema)),
        Effect.catchTag(
          'ProcuratBadRequestError',
          (cause) => new AbsenceValidationError({ message: cause.message, code: cause.code, input: absence }),
        ),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
        }),
      );
    });

    const update: (
      absence: UpdateAbsenceSchema,
    ) => Effect.Effect<
      AbsenceSchema,
      | AbsenceNotFound
      | AbsenceValidationError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('absence.update')(function* (absence: UpdateAbsenceSchema) {
      return yield* HttpClientRequest.put(`/absences/${absence.id}`).pipe(
        HttpClientRequest.schemaBodyJson(UpdateAbsenceSchema)(absence),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(AbsenceSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new AbsenceNotFound({ absenceId: absence.id })),
        Effect.catchTag(
          'ProcuratBadRequestError',
          (cause) => new AbsenceValidationError({ message: cause.message, code: cause.code, input: absence }),
        ),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
        }),
      );
    });

    const deleteAbsence: (args: {
      id: number;
    }) => Effect.Effect<
      void,
      | AbsenceNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('absence.delete')(function* ({ id }: { id: number }) {
      yield* Effect.annotateCurrentSpan({ id });
      return yield* http.execute(HttpClientRequest.del(`/absences/${id}`)).pipe(
        Effect.asVoid,
        Effect.catchTag('ProcuratNotFoundError', () => new AbsenceNotFound({ absenceId: id })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    return { findAll, findById, findByPerson, findByGroup, create, update, delete: deleteAbsence };
  }),
}) {}
