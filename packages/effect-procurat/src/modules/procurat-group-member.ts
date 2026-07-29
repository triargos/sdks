import { Context, Effect, Layer } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { ProcuratHttpClient } from '../http-client';
import { decodeJson } from '../internal/decode';
import { operation } from '../internal/operation';
import { AddMemberToGroup, GroupMember, UpdateGroupMembership } from '../schema/group-member-schema';

export class ProcuratGroupMember extends Context.Service<ProcuratGroupMember>()('ProcuratGroupMember', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const addToGroup = operation('groupMember.addToGroup', (params: { groupId: number; member: AddMemberToGroup }) =>
      HttpClientRequest.post(`/groups/${params.groupId}/members`).pipe(
        HttpClientRequest.schemaBodyJson(AddMemberToGroup)(params.member),
        Effect.orDie,
        Effect.flatMap(http.execute),
        Effect.flatMap(decodeJson(GroupMember)),
      ),
    );

    const updateMembership = operation(
      'groupMember.updateMembership',
      (params: { groupId: number; personId: number; membership: UpdateGroupMembership }) =>
        HttpClientRequest.put(`/groups/${params.groupId}/members/${params.personId}`).pipe(
          HttpClientRequest.schemaBodyJson(UpdateGroupMembership)(params.membership),
          Effect.orDie,
          Effect.flatMap(http.execute),
          Effect.flatMap(decodeJson(GroupMember)),
        ),
    );

    return { addToGroup, updateMembership };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
