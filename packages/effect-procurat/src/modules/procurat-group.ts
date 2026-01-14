import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { Effect, Schema } from 'effect';
import { FindGroupError, FindGroupMembersError, GroupNotFoundError, ListCustomFieldsError, ListGroupsError } from '../error/group-errors';
import { ProcuratHttpClient } from '../http-client';
import { GroupMemberSchema } from '../schema/group-member-schema';
import { GroupSchema } from '../schema/group-schema';
import { GroupUdfSchema } from '../schema/group-udf-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { ProcuratCommonErrors } from '../error/procurat-errors';

type GroupMemberStatus = 'ACTIVE' | 'INACTIVE' | 'ALL';

interface FindGroupMembersOptions {
  status?: GroupMemberStatus;
  includeUdfs?: boolean;
}

interface ListCustomFieldsOptions {
  includeParentGroups?: boolean;
}

export class ProcuratGroup extends Effect.Service<ProcuratGroup>()('ProcuratGroup', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll: () => Effect.Effect<
      ReadonlyArray<GroupSchema>,
      ListGroupsError | ProcuratCommonErrors
    > = Effect.fn('group.findAll')(function* () {
      return yield* http.get(`/groups`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListGroupsError({ cause }),
        }),
      );
    });

    const findById: (params: {
      groupId: number;
    }) => Effect.Effect<GroupSchema, GroupNotFoundError | FindGroupError | ProcuratCommonErrors> = Effect.fn('group.findById')(function* ({
      groupId,
    }) {
      yield* Effect.annotateCurrentSpan({ groupId });
      return yield* http.get(`/groups/${groupId}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', Effect.die),
        Effect.catchTags({
          ProcuratNotFoundError: (cause) => new GroupNotFoundError({ groupId, cause }),
          ProcuratServerError: (cause) => new FindGroupError({ groupId, cause }),
        }),
      );
    });

    const findMembers: (params: {
      id: number;
      options?: FindGroupMembersOptions;
    }) => Effect.Effect<
      ReadonlyArray<GroupMemberSchema>,
      GroupNotFoundError | FindGroupMembersError | ProcuratCommonErrors
    > = Effect.fn('group.findMembers')(function* ({ id, options = {} }) {
      yield* Effect.annotateCurrentSpan({ id, options });

      const { status = 'ACTIVE', includeUdfs = false } = options;

      return yield* HttpClientRequest.get(`/groups/${id}/members`).pipe(
        HttpClientRequest.setUrlParams({
          status,
          includeUdfs,
        }),
        http.execute,
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupMemberSchema))),
        removeUnrecoverableErrors,
        Effect.catchTags({
          ProcuratBadRequestError: Effect.die,
          ProcuratNotFoundError: (cause) => new GroupNotFoundError({ groupId: id, cause }),
          ProcuratServerError: (cause) => new FindGroupMembersError({ groupId: id, cause }),
        }),
      );
    });

    const listCustomFields: (params: {
      groupId: number;
      options?: ListCustomFieldsOptions;
    }) => Effect.Effect<
      ReadonlyArray<GroupUdfSchema>,
      GroupNotFoundError | ListCustomFieldsError | ProcuratCommonErrors
    > = Effect.fn('group.listCustomFields')(function* ({ groupId, options = {} }) {
      yield* Effect.annotateCurrentSpan({ groupId, options });

      const { includeParentGroups = false } = options;

      return yield* HttpClientRequest.get(`/groups/${groupId}/udfs`).pipe(
        HttpClientRequest.setUrlParams({
          includeParentGroups,
        }),
        http.execute,
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupUdfSchema))),
        removeUnrecoverableErrors,
        Effect.catchTags({
          ProcuratBadRequestError: Effect.die,
          ProcuratNotFoundError: (cause) => new GroupNotFoundError({ groupId, cause }),
          ProcuratServerError: (cause) => new ListCustomFieldsError({ groupId, cause }),
        }),
      );
    });

    return { findAll, findById, findMembers, listCustomFields };
  }),
}) {}
