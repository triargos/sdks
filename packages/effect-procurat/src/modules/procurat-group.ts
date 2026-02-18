import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { Effect, Schema } from 'effect';
import {
  GroupNotFound,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';
import { ProcuratHttpClient } from '../http-client';
import { GroupMemberSchema } from '../schema/group-member-schema';
import { GroupSchema } from '../schema/group-schema';
import { GroupSupervisorSchema } from '../schema/group-supervisor-schema';
import { GroupUdfSchema } from '../schema/group-udf-schema';

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
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
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
      | GroupNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('group.findById')(function* ({ groupId }: { groupId: number }) {
      yield* Effect.annotateCurrentSpan({ groupId });
      return yield* http.get(`/groups/${groupId}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new GroupNotFound({ groupId })),
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
      | GroupNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
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
        Effect.catchTag('ProcuratNotFoundError', () => new GroupNotFound({ groupId: id })),
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
      | GroupNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
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
        Effect.catchTag('ProcuratNotFoundError', () => new GroupNotFound({ groupId })),
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
      | GroupNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('group.findSupervisors')(function* ({ groupId }: { groupId: number }) {
      yield* Effect.annotateCurrentSpan({ groupId });
      return yield* http.get(`/groups/${groupId}/supervisors`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupSupervisorSchema))),
        Effect.catchTag('ProcuratNotFoundError', () => new GroupNotFound({ groupId })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    return { findAll, findById, findMembers, findSupervisors, listCustomFields };
  }),
}) {}
