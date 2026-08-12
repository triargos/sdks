import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import { currentDateCodec } from '../../shared/date';
import { ProcuratHttpClient } from '../../shared/http-client';
import {
  type CreateFollowUp,
  createFollowUpFields,
  FollowUp,
  type UpdateFollowUp,
  updateFollowUpFields,
} from './follow-up-schema';

export class ProcuratFollowUp extends Context.Service<ProcuratFollowUp>()('ProcuratFollowUp', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;
    const date = yield* currentDateCodec;

    const findAll = operation('followUp.findAll', () =>
      http.get('/followups').pipe(Effect.flatMap(decodeJson(Schema.Array(FollowUp)))),
    );

    const findById = operation('followUp.findById', (params: { id: number }) =>
      http.get(`/followups/${params.id}`).pipe(Effect.flatMap(decodeJson(FollowUp))),
    );

    /** Follow-ups that reference the person, not the ones assigned to them. */
    const findByPerson = operation('followUp.findByPerson', (params: { personId: number }) =>
      http.get(`/followups/persons/${params.personId}`).pipe(Effect.flatMap(decodeJson(Schema.Array(FollowUp)))),
    );

    const findByAssignee = operation('followUp.findByAssignee', (params: { personId: number }) =>
      http.get(`/followups/assignees/${params.personId}`).pipe(Effect.flatMap(decodeJson(Schema.Array(FollowUp)))),
    );

    const create = operation('followUp.create', (params: { followUp: CreateFollowUp }) =>
      HttpClientRequest.post('/followups').pipe(
        HttpClientRequest.schemaBodyJson(createFollowUpFields(date))(params.followUp),
        Effect.orDie,
        Effect.flatMap(http.execute),
        Effect.flatMap(decodeJson(FollowUp)),
      ),
    );

    const update = operation('followUp.update', (params: { followUp: UpdateFollowUp }) =>
      HttpClientRequest.put(`/followups/${params.followUp.id}`).pipe(
        HttpClientRequest.schemaBodyJson(updateFollowUpFields(date))(params.followUp),
        Effect.orDie,
        Effect.flatMap(http.execute),
        Effect.flatMap(decodeJson(FollowUp)),
      ),
    );

    const deleteFollowUp = operation('followUp.delete', (params: { id: number }) =>
      http.execute(HttpClientRequest.delete(`/followups/${params.id}`)).pipe(Effect.asVoid),
    );

    return { findAll, findById, findByPerson, findByAssignee, create, update, delete: deleteFollowUp };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
