import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { Effect, Schema } from 'effect';
import {
  PersonNotFound,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  RelationshipValidationError,
  UnknownProcuratError,
} from '../errors';
import { ProcuratHttpClient } from '../http-client';
import {
  AddChildToParentSchema,
  AddParentToChildSchema,
  CreatedRelationShipSchema,
  RelationshipSchema,
} from '../schema/relationship-schema';

export class ProcuratRelationship extends Effect.Service<ProcuratRelationship>()('ProcuratRelationship', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const addParentToChild: (
      childId: number,
      relationship: AddParentToChildSchema,
    ) => Effect.Effect<
      CreatedRelationShipSchema,
      | RelationshipValidationError
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('relationship.addParentToChild')(function* (
      childId: number,
      relationship: AddParentToChildSchema,
    ) {
      return yield* HttpClientRequest.post(`/relationships/person/${childId}/parent`).pipe(
        HttpClientRequest.schemaBodyJson(AddParentToChildSchema)(relationship),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(CreatedRelationShipSchema)),
        Effect.catchTag('ProcuratBadRequestError', (cause) =>
          new RelationshipValidationError({
            message: cause.message,
            code: cause.code,
            kind: 'addParentToChild',
            personToAddId: relationship.parentId,
            basePersonId: childId,
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

    const addChildToParent: (
      parentId: number,
      relationship: AddChildToParentSchema,
    ) => Effect.Effect<
      CreatedRelationShipSchema,
      | RelationshipValidationError
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('relationship.addChildToParent')(function* (
      parentId: number,
      relationship: AddChildToParentSchema,
    ) {
      return yield* HttpClientRequest.post(`/relationships/person/${parentId}/child`).pipe(
        HttpClientRequest.schemaBodyJson(AddChildToParentSchema)(relationship),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(CreatedRelationShipSchema)),
        Effect.catchTag('ProcuratBadRequestError', (cause) =>
          new RelationshipValidationError({
            message: cause.message,
            code: cause.code,
            kind: 'addChildToParent',
            personToAddId: relationship.childId,
            basePersonId: parentId,
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

    const findRelationshipsForPerson: (args: {
      personId: number;
    }) => Effect.Effect<
      ReadonlyArray<RelationshipSchema>,
      | PersonNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('relationship.findRelationshipsForPerson')(function* ({
      personId,
    }: {
      personId: number;
    }) {
      return yield* HttpClientRequest.get(`/relationships/person/${personId}`).pipe(
        http.execute,
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(RelationshipSchema))),
        Effect.catchTag('ProcuratNotFoundError', () => new PersonNotFound({ personId })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    return { addParentToChild, addChildToParent, findRelationshipsForPerson };
  }),
}) {}
