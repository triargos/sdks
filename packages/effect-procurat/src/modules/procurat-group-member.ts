import { Effect } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { AddMemberToGroupSchema, GroupMemberSchema, UpdateGroupMembershipSchema } from '../schema/group-member-schema';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import {
  GroupMembershipNotFound,
  GroupMemberValidationError,
  GroupNotFound,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';

export class ProcuratGroupMember extends Effect.Service<ProcuratGroupMember>()('ProcuratGroupMember', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const addToGroup: (
      groupId: number,
      member: AddMemberToGroupSchema,
    ) => Effect.Effect<
      GroupMemberSchema,
      | GroupNotFound
      | GroupMemberValidationError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('groupMember.addToGroup')(function* (groupId: number, member: AddMemberToGroupSchema) {
      return yield* HttpClientRequest.post(`/groups/${groupId}/members`).pipe(
        HttpClientRequest.schemaBodyJson(AddMemberToGroupSchema)(member),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupMemberSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new GroupNotFound({ groupId })),
        Effect.catchTag('ProcuratBadRequestError', (cause) =>
          new GroupMemberValidationError({
            message: cause.message,
            code: cause.code,
            groupId,
            memberId: member.personId,
          }),
        ),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
        }),
      );
    });

    const updateMembership: (
      groupId: number,
      args: { personId: number; membership: UpdateGroupMembershipSchema },
    ) => Effect.Effect<
      GroupMemberSchema,
      | GroupMembershipNotFound
      | GroupMemberValidationError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('groupMember.updateMembership')(function* (
      groupId: number,
      { personId, membership }: { personId: number; membership: UpdateGroupMembershipSchema },
    ) {
      return yield* HttpClientRequest.put(`/groups/${groupId}/members/${personId}`).pipe(
        HttpClientRequest.schemaBodyJson(UpdateGroupMembershipSchema)(membership),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupMemberSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new GroupMembershipNotFound({ groupId, personId })),
        Effect.catchTag('ProcuratBadRequestError', (cause) =>
          new GroupMemberValidationError({
            message: cause.message,
            code: cause.code,
            groupId,
            memberId: personId,
          }),
        ),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
        }),
      );
    });

    return { addToGroup, updateMembership };
  }),
}) {}
