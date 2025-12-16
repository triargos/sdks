import { Effect } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { AddMemberToGroupSchema, GroupMemberSchema, UpdateGroupMembershipSchema } from '../schema/group-member-schema';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import {
  AddGroupMemberError,
  GroupMembershipNotFoundError,
  UpdateGroupMembershipError,
} from '../error/group-member-errors';
import { GroupNotFoundError } from '../error/group-errors';

export class ProcuratGroupMember extends Effect.Service<ProcuratGroupMember>()('ProcuratGroupMember', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const addToGroup = Effect.fn('groupMember.addToGroup')(function* (groupId: number, member: AddMemberToGroupSchema) {
      return yield* HttpClientRequest.post(`/groups/${groupId}/members`).pipe(
        HttpClientRequest.schemaBodyJson(AddMemberToGroupSchema)(member),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupMemberSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag(
          'ProcuratServerError',
          'ProcuratBadRequestError',
          (cause) =>
            new AddGroupMemberError({
              groupId,
              memberId: member.personId,
              cause,
            }),
        ),
        Effect.catchTags({
          HttpBodyError: Effect.die,
          ProcuratNotFoundError: (cause) => new GroupNotFoundError({ groupId, cause }),
        }),
      );
    });

    const updateMembership = Effect.fn('groupMember.updateMembership')(function* (
      groupId: number,
      { personId, membership }: { personId: number; membership: UpdateGroupMembershipSchema },
    ) {
      return yield* HttpClientRequest.put(`/groups/${groupId}/members/${personId}`).pipe(
        HttpClientRequest.schemaBodyJson(UpdateGroupMembershipSchema)(membership),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupMemberSchema)),
        removeUnrecoverableErrors,
        Effect.catchTags({
          HttpBodyError: Effect.die,
          ProcuratNotFoundError: (cause) => new GroupMembershipNotFoundError({ groupId, cause, personId }),
        }),
        Effect.catchTag(
          'ProcuratBadRequestError',
          'ProcuratServerError',
          (cause) =>
            new UpdateGroupMembershipError({
              groupId,
              personId,
              data: new UpdateGroupMembershipSchema({...membership}),
              cause,
            }),
        ),
      );
    });
    return { addToGroup, updateMembership };
  }),
}) {}
