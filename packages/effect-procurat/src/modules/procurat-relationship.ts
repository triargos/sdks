import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { Effect, Schema } from 'effect';
import { CreateRelationshipError, ListRelationshipsError } from '../error/relationship-errors';
import { PersonNotFoundError, ProcuratCommonErrors } from '../errors';
import { ProcuratHttpClient } from '../http-client';
import {
  AddChildToParentSchema,
  AddParentToChildSchema,
  CreatedRelationShipSchema,
  RelationshipSchema,
} from '../schema/relationship-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';

export class ProcuratRelationship extends Effect.Service<ProcuratRelationship>()('ProcuratRelationship', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const addParentToChild: (
      childId: number,
      relationship: AddParentToChildSchema,
    ) => Effect.Effect<CreatedRelationShipSchema, CreateRelationshipError | ProcuratCommonErrors> = Effect.fn(
      'relationship.addParentToChild',
    )(function* (childId: number, relationship: AddParentToChildSchema) {
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

    const addChildToParent: (
      parentId: number,
      relationship: AddChildToParentSchema,
    ) => Effect.Effect<CreatedRelationShipSchema, CreateRelationshipError | ProcuratCommonErrors> = Effect.fn(
      'relationship.addChildToParent',
    )(function* (parentId: number, relationship: AddChildToParentSchema) {
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

    const findRelationshipsForPerson: (
      {personId}: {personId: number},
    ) => Effect.Effect<
      ReadonlyArray<RelationshipSchema>,
      PersonNotFoundError | ListRelationshipsError | ProcuratCommonErrors
    > = Effect.fn('relationship.findRelationshipsForPerson')(function* ({personId}) {
      return yield* HttpClientRequest.get(`/relationships/person/${personId}`).pipe(
        http.execute,
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(RelationshipSchema))),
        removeUnrecoverableErrors,
        Effect.catchTags({
          ProcuratBadRequestError: Effect.die,
          ProcuratServerError: (cause) => new ListRelationshipsError({ personId, cause }),
          ProcuratNotFoundError: (cause) => new PersonNotFoundError({ personId, cause }),
        }),
      );
    });

    return { addParentToChild, addChildToParent, findRelationshipsForPerson };
  }),
}) {}
