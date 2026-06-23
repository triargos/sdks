import { Context, Effect, Layer } from 'effect';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { AddMemberToGroupSchema, GroupMemberSchema, UpdateGroupMembershipSchema } from './group-member-schema';
import { GroupMembershipNotFound, GroupMemberValidationError } from './group-member-errors';
import { GroupNotFound } from '../group/group-errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const addToGroup: (
    groupId: number,
    member: AddMemberToGroupSchema,
  ) => Effect.Effect<
    GroupMemberSchema,
    GroupNotFound | GroupMemberValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('groupMember.addToGroup')(function* (groupId: number, member: AddMemberToGroupSchema) {
    return yield* HttpClientRequest.post(`/groups/${groupId}/members`).pipe(
      HttpClientRequest.schemaBodyJson(AddMemberToGroupSchema)(member),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupMemberSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, GroupNotFound | GroupMemberValidationError | ProcuratError> =>
          e.status === 404
            ? Effect.fail(new GroupNotFound({ groupId }))
            : e.status === 400
              ? Effect.fail(
                  new GroupMemberValidationError({
                    message: e.message,
                    code: e.code,
                    groupId,
                    memberId: member.personId,
                  }),
                )
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

  const updateMembership: (
    groupId: number,
    args: { personId: number; membership: UpdateGroupMembershipSchema },
  ) => Effect.Effect<
    GroupMemberSchema,
    GroupMembershipNotFound | GroupMemberValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('groupMember.updateMembership')(function* (
    groupId: number,
    { personId, membership }: { personId: number; membership: UpdateGroupMembershipSchema },
  ) {
    return yield* HttpClientRequest.put(`/groups/${groupId}/members/${personId}`).pipe(
      HttpClientRequest.schemaBodyJson(UpdateGroupMembershipSchema)(membership),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupMemberSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, GroupMembershipNotFound | GroupMemberValidationError | ProcuratError> =>
          e.status === 404
            ? Effect.fail(new GroupMembershipNotFound({ groupId, personId }))
            : e.status === 400
              ? Effect.fail(
                  new GroupMemberValidationError({
                    message: e.message,
                    code: e.code,
                    groupId,
                    memberId: personId,
                  }),
                )
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

  return { addToGroup, updateMembership };
});

export class ProcuratGroupMember extends Context.Tag('@triargos/procurat/GroupMember')<
  ProcuratGroupMember,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratGroupMember, make);
}
