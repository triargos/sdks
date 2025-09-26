import { Effect } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import {
  AddChildToParentSchema,
  AddParentToChildSchema,
  CreatedRelationShipSchema,
} from '../schema/relationship-schema';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { CreateRelationshipError } from '../error/relationship-errors';

export class ProcuratRelationship extends Effect.Service<ProcuratRelationship>()('ProcuratRelationship', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const addParentToChild = Effect.fn('relationship.addParentToChild')(function* (
      childId: number,
      relationship: AddParentToChildSchema,
    ) {
      return yield* HttpClientRequest.post(`/relationships/person/${childId}/parent`).pipe(
        HttpClientRequest.schemaBodyJson(AddParentToChildSchema)(relationship),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(CreatedRelationShipSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('HttpBodyError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTag(
          'ProcuratServerError',
          'ProcuratBadRequestError',
          (cause) =>
            new CreateRelationshipError({
              kind: 'addParentToChild',
              personToAddId: relationship.parentId,
              basePersonId: childId,
              cause,
            }),
        ),
      );
    });

    const addChildToParent = Effect.fn('relationship.addChildToParent')(function* (
      parentId: number,
      relationship: AddChildToParentSchema,
    ) {
      return yield* HttpClientRequest.post(`/relationships/person/${parentId}/child`).pipe(
        HttpClientRequest.schemaBodyJson(AddChildToParentSchema)(relationship),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(CreatedRelationShipSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('HttpBodyError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTag(
          'ProcuratServerError',
          'ProcuratBadRequestError',
          (cause) =>
            new CreateRelationshipError({
              kind: 'addChildToParent',
              personToAddId: relationship.childId,
              basePersonId: parentId,
              cause,
            }),
        ),
      );
    });
    return { addParentToChild, addChildToParent };
  }),
}) {}