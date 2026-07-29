import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import { ProcuratHttpClient } from '../../shared/http-client';
import { Absence, type AbsenceQueryType, CreateAbsence, UpdateAbsence } from './absence-schema';

const queryParams = (type: AbsenceQueryType | undefined): { readonly type?: AbsenceQueryType } =>
  type === undefined ? {} : { type };

export class ProcuratAbsence extends Context.Service<ProcuratAbsence>()('ProcuratAbsence', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = operation('absence.findAll', (params: { type?: AbsenceQueryType } = {}) =>
      HttpClientRequest.get('/absences').pipe(
        HttpClientRequest.setUrlParams(queryParams(params.type)),
        http.execute,
        Effect.flatMap(decodeJson(Schema.Array(Absence))),
      ),
    );

    const findById = operation('absence.findById', (params: { id: number }) =>
      http.get(`/absences/${params.id}`).pipe(Effect.flatMap(decodeJson(Absence))),
    );

    const findByPerson = operation('absence.findByPerson', (params: { personId: number; type?: AbsenceQueryType }) =>
      HttpClientRequest.get(`/absences/person/${params.personId}`).pipe(
        HttpClientRequest.setUrlParams(queryParams(params.type)),
        http.execute,
        Effect.flatMap(decodeJson(Schema.Array(Absence))),
      ),
    );

    const findByGroup = operation('absence.findByGroup', (params: { groupId: number; type?: AbsenceQueryType }) =>
      HttpClientRequest.get(`/absences/group/${params.groupId}`).pipe(
        HttpClientRequest.setUrlParams(queryParams(params.type)),
        http.execute,
        Effect.flatMap(decodeJson(Schema.Array(Absence))),
      ),
    );

    const create = operation('absence.create', (params: { absence: CreateAbsence }) =>
      HttpClientRequest.post('/absences').pipe(
        HttpClientRequest.schemaBodyJson(CreateAbsence)(params.absence),
        Effect.orDie,
        Effect.flatMap(http.execute),
        Effect.flatMap(decodeJson(Absence)),
      ),
    );

    const update = operation('absence.update', (params: { absence: UpdateAbsence }) =>
      HttpClientRequest.put(`/absences/${params.absence.id}`).pipe(
        HttpClientRequest.schemaBodyJson(UpdateAbsence)(params.absence),
        Effect.orDie,
        Effect.flatMap(http.execute),
        Effect.flatMap(decodeJson(Absence)),
      ),
    );

    const deleteAbsence = operation('absence.delete', (params: { id: number }) =>
      http.execute(HttpClientRequest.delete(`/absences/${params.id}`)).pipe(Effect.asVoid),
    );

    return { findAll, findById, findByPerson, findByGroup, create, update, delete: deleteAbsence };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
