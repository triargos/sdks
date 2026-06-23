import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { GroupMemberSchema } from '../group-member/group-member-schema';
import { GroupSchema } from './group-schema';
import { GroupSupervisorSchema } from './group-supervisor-schema';
import { GroupUdfSchema } from './group-udf-schema';
import { GroupNotFound } from './group-errors';

type GroupMemberStatus = 'ACTIVE' | 'INACTIVE' | 'ALL';

export interface FindGroupMembersOptions {
  status?: GroupMemberStatus;
  includeUdfs?: boolean;
}

export interface ListCustomFieldsOptions {
  includeParentGroups?: boolean;
}

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const findAll: () => Effect.Effect<
    ReadonlyArray<GroupSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('group.findAll')(function* () {
    return yield* http.get(`/groups`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const findById: (params: {
    groupId: number;
  }) => Effect.Effect<
    GroupSchema,
    GroupNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('group.findById')(function* ({ groupId }: { groupId: number }) {
    yield* Effect.annotateCurrentSpan({ groupId });
    return yield* http.get(`/groups/${groupId}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupSchema)),
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

  const findMembers: (params: {
    id: number;
    options?: FindGroupMembersOptions;
  }) => Effect.Effect<
    ReadonlyArray<GroupMemberSchema>,
    GroupNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('group.findMembers')(function* ({
    id,
    options = {},
  }: {
    id: number;
    options?: FindGroupMembersOptions;
  }) {
    yield* Effect.annotateCurrentSpan({ id, options });

    const { status = 'ACTIVE', includeUdfs = false } = options;

    return yield* HttpClientRequest.get(`/groups/${id}/members`).pipe(
      HttpClientRequest.setUrlParams({
        status,
        includeUdfs,
      }),
      http.execute,
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupMemberSchema))),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, GroupNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new GroupNotFound({ groupId: id })) : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const listCustomFields: (params: {
    groupId: number;
    options?: ListCustomFieldsOptions;
  }) => Effect.Effect<
    ReadonlyArray<GroupUdfSchema>,
    GroupNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('group.listCustomFields')(function* ({
    groupId,
    options = {},
  }: {
    groupId: number;
    options?: ListCustomFieldsOptions;
  }) {
    yield* Effect.annotateCurrentSpan({ groupId, options });

    const { includeParentGroups = false } = options;

    return yield* HttpClientRequest.get(`/groups/${groupId}/udfs`).pipe(
      HttpClientRequest.setUrlParams({
        includeParentGroups,
      }),
      http.execute,
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupUdfSchema))),
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

  const findSupervisors: (params: {
    groupId: number;
  }) => Effect.Effect<
    ReadonlyArray<GroupSupervisorSchema>,
    GroupNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('group.findSupervisors')(function* ({ groupId }: { groupId: number }) {
    yield* Effect.annotateCurrentSpan({ groupId });
    return yield* http.get(`/groups/${groupId}/supervisors`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupSupervisorSchema))),
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

  return { findAll, findById, findMembers, findSupervisors, listCustomFields };
});

export class ProcuratGroup extends Context.Tag('@triargos/procurat/Group')<
  ProcuratGroup,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratGroup, make);
}
