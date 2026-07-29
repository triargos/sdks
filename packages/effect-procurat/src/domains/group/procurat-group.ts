import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { GroupMember, type GroupMemberStatus } from '../group-member/group-member-schema';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import { ProcuratHttpClient } from '../../shared/http-client';
import { Group } from './group-schema';
import { GroupSupervisor } from './group-supervisor-schema';
import { GroupUdf } from './group-udf-schema';

export class ProcuratGroup extends Context.Service<ProcuratGroup>()('ProcuratGroup', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = operation('group.findAll', () =>
      http.get('/groups').pipe(Effect.flatMap(decodeJson(Schema.Array(Group)))),
    );

    const findById = operation('group.findById', (params: { groupId: number }) =>
      http.get(`/groups/${params.groupId}`).pipe(Effect.flatMap(decodeJson(Group))),
    );

    const findMembers = operation(
      'group.findMembers',
      (params: { groupId: number; status?: GroupMemberStatus; includeUdfs?: boolean }) =>
        HttpClientRequest.get(`/groups/${params.groupId}/members`).pipe(
          HttpClientRequest.setUrlParams({
            status: params.status ?? 'ACTIVE',
            includeUdfs: params.includeUdfs ?? false,
          }),
          http.execute,
          Effect.flatMap(decodeJson(Schema.Array(GroupMember))),
        ),
    );

    const findSupervisors = operation('group.findSupervisors', (params: { groupId: number }) =>
      http.get(`/groups/${params.groupId}/supervisors`).pipe(Effect.flatMap(decodeJson(Schema.Array(GroupSupervisor)))),
    );

    const listCustomFields = operation(
      'group.listCustomFields',
      (params: { groupId: number; includeParentGroups?: boolean }) =>
        HttpClientRequest.get(`/groups/${params.groupId}/udfs`).pipe(
          HttpClientRequest.setUrlParams({
            includeParentGroups: params.includeParentGroups ?? false,
          }),
          http.execute,
          Effect.flatMap(decodeJson(Schema.Array(GroupUdf))),
        ),
    );

    return { findAll, findById, findMembers, listCustomFields, findSupervisors };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
