import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import {
  AbsenceQueryType,
  AbsenceSchema,
  CreateAbsenceSchema,
  UpdateAbsenceSchema,
} from './absence-schema';
import { AbsenceNotFound, AbsenceValidationError } from './absence-errors';
import { PersonNotFound } from '../person/person-errors';
import { GroupNotFound } from '../group/group-errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const findAll: (args?: {
    type?: AbsenceQueryType;
  }) => Effect.Effect<
    ReadonlyArray<AbsenceSchema>,
    ProcuratError | UnknownProcuratError
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
    AbsenceNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('absence.findById')(function* ({ id }: { id: number }) {
    yield* Effect.annotateCurrentSpan({ id });
    return yield* http.get(`/absences/${id}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(AbsenceSchema)),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, AbsenceNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new AbsenceNotFound({ absenceId: id })) : Effect.fail(e),
      ),
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
    PersonNotFound | ProcuratError | UnknownProcuratError
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
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, PersonNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new PersonNotFound({ personId })) : Effect.fail(e),
      ),
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
    GroupNotFound | ProcuratError | UnknownProcuratError
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
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, GroupNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new GroupNotFound({ groupId })) : Effect.fail(e),
      ),
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
    AbsenceValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('absence.create')(function* (absence: CreateAbsenceSchema) {
    return yield* HttpClientRequest.post('/absences').pipe(
      HttpClientRequest.schemaBodyJson(CreateAbsenceSchema)(absence),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(AbsenceSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, AbsenceValidationError | ProcuratError> =>
          e.status === 400
            ? Effect.fail(new AbsenceValidationError({ message: e.message, code: e.code, input: absence }))
            : Effect.fail(e),
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
    AbsenceNotFound | AbsenceValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('absence.update')(function* (absence: UpdateAbsenceSchema) {
    return yield* HttpClientRequest.put(`/absences/${absence.id}`).pipe(
      HttpClientRequest.schemaBodyJson(UpdateAbsenceSchema)(absence),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(AbsenceSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, AbsenceNotFound | AbsenceValidationError | ProcuratError> =>
          e.status === 404
            ? Effect.fail(new AbsenceNotFound({ absenceId: absence.id }))
            : e.status === 400
              ? Effect.fail(new AbsenceValidationError({ message: e.message, code: e.code, input: absence }))
              : Effect.fail(e),
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
    AbsenceNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('absence.delete')(function* ({ id }: { id: number }) {
    yield* Effect.annotateCurrentSpan({ id });
    return yield* http.execute(HttpClientRequest.del(`/absences/${id}`)).pipe(
      Effect.asVoid,
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, AbsenceNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new AbsenceNotFound({ absenceId: id })) : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  return { findAll, findById, findByPerson, findByGroup, create, update, delete: deleteAbsence };
});

export class ProcuratAbsence extends Context.Tag('@triargos/procurat/Absence')<
  ProcuratAbsence,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratAbsence, make);
}
