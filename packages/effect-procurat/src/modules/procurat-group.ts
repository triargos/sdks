import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientResponse } from '@effect/platform';
import { GroupSchema } from '../schema/group-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { FindGroupError, GroupNotFoundError, ListGroupsError } from '../error/group-errors';

export class ProcuratGroup extends Effect.Service<ProcuratGroup>()('ProcuratGroup', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = Effect.fn('group.findAll')(function* () {
      return http.get(`/groups`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(GroupSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListGroupsError({ cause }),
        }),
      );
    });

    const findById = Effect.fn('group.findById')(function* ({ groupId }: { groupId: number }) {
      yield* Effect.annotateCurrentSpan({ groupId });
      return http.get(`/groups/${groupId}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(GroupSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', Effect.die),
        Effect.catchTags({
          ProcuratNotFoundError: (cause) => new GroupNotFoundError({ groupId, cause }),
          ProcuratServerError: (cause) => new FindGroupError({ groupId, cause }),
        }),
      );
    });

    return { findAll, findById };
  }),
}) {}
