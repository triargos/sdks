import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { ProcuratHttpClient } from '../http-client';
import { decodeJson } from '../internal/decode';
import { operation } from '../internal/operation';
import { GroupMember } from '../schema/group-member-schema';
import { Group } from '../schema/group-schema';
import { GroupUdf } from '../schema/group-udf-schema';

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
      (params: { groupId: number; options?: { status?: 'ACTIVE' | 'INACTIVE' | 'ALL'; includeUdfs?: boolean } }) =>
        HttpClientRequest.get(`/groups/${params.groupId}/members`).pipe(
          HttpClientRequest.setUrlParams({
            status: params.options?.status ?? 'ACTIVE',
            includeUdfs: params.options?.includeUdfs ?? false,
          }),
          http.execute,
          Effect.flatMap(decodeJson(Schema.Array(GroupMember))),
        ),
    );

    const listCustomFields = operation(
      'group.listCustomFields',
      (params: { groupId: number; options?: { includeParentGroups?: boolean } }) =>
        HttpClientRequest.get(`/groups/${params.groupId}/udfs`).pipe(
          HttpClientRequest.setUrlParams({
            includeParentGroups: params.options?.includeParentGroups ?? false,
          }),
          http.execute,
          Effect.flatMap(decodeJson(Schema.Array(GroupUdf))),
        ),
    );

    return { findAll, findById, findMembers, listCustomFields };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
