import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { PersonNotFound } from '../person/person-errors';
import { RelationshipValidationError } from './relationship-errors';
import {
  AddChildToParentSchema,
  AddParentToChildSchema,
  CreatedRelationShipSchema,
  RelationshipSchema,
} from './relationship-schema';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const addParentToChild: (
    childId: number,
    relationship: AddParentToChildSchema,
  ) => Effect.Effect<
    CreatedRelationShipSchema,
    RelationshipValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('relationship.addParentToChild')(function* (
    childId: number,
    relationship: AddParentToChildSchema,
  ) {
    return yield* HttpClientRequest.post(`/relationships/person/${childId}/parent`).pipe(
      HttpClientRequest.schemaBodyJson(AddParentToChildSchema)(relationship),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(CreatedRelationShipSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, RelationshipValidationError | ProcuratError> =>
          e.status === 400
            ? Effect.fail(
                new RelationshipValidationError({
                  message: e.message,
                  code: e.code,
                  kind: 'addParentToChild',
                  personToAddId: relationship.parentId,
                  basePersonId: childId,
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

  const addChildToParent: (
    parentId: number,
    relationship: AddChildToParentSchema,
  ) => Effect.Effect<
    CreatedRelationShipSchema,
    RelationshipValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('relationship.addChildToParent')(function* (
    parentId: number,
    relationship: AddChildToParentSchema,
  ) {
    return yield* HttpClientRequest.post(`/relationships/person/${parentId}/child`).pipe(
      HttpClientRequest.schemaBodyJson(AddChildToParentSchema)(relationship),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(CreatedRelationShipSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, RelationshipValidationError | ProcuratError> =>
          e.status === 400
            ? Effect.fail(
                new RelationshipValidationError({
                  message: e.message,
                  code: e.code,
                  kind: 'addChildToParent',
                  personToAddId: relationship.childId,
                  basePersonId: parentId,
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

  const findRelationshipsForPerson: (args: {
    personId: number;
  }) => Effect.Effect<
    ReadonlyArray<RelationshipSchema>,
    PersonNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('relationship.findRelationshipsForPerson')(function* ({
    personId,
  }: {
    personId: number;
  }) {
    return yield* HttpClientRequest.get(`/relationships/person/${personId}`).pipe(
      http.execute,
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(RelationshipSchema))),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, PersonNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new PersonNotFound({ personId })) : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  return { addParentToChild, addChildToParent, findRelationshipsForPerson };
});

export class ProcuratRelationship extends Context.Tag('@triargos/procurat/Relationship')<
  ProcuratRelationship,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratRelationship, make);
}
