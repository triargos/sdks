import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { ProcuratHttpClient } from '../http-client';
import { decodeJson } from '../internal/decode';
import { operation } from '../internal/operation';
import { AddChildToParent, AddParentToChild, CreatedRelationship, Relationship } from '../schema/relationship-schema';

export class ProcuratRelationship extends Context.Service<ProcuratRelationship>()('ProcuratRelationship', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const addParentToChild = operation(
      'relationship.addParentToChild',
      (params: { childId: number; relationship: AddParentToChild }) =>
        HttpClientRequest.post(`/relationships/person/${params.childId}/parent`).pipe(
          HttpClientRequest.schemaBodyJson(AddParentToChild)(params.relationship),
          Effect.orDie,
          Effect.flatMap(http.execute),
          Effect.flatMap(decodeJson(CreatedRelationship)),
        ),
    );

    const addChildToParent = operation(
      'relationship.addChildToParent',
      (params: { parentId: number; relationship: AddChildToParent }) =>
        HttpClientRequest.post(`/relationships/person/${params.parentId}/child`).pipe(
          HttpClientRequest.schemaBodyJson(AddChildToParent)(params.relationship),
          Effect.orDie,
          Effect.flatMap(http.execute),
          Effect.flatMap(decodeJson(CreatedRelationship)),
        ),
    );

    const findRelationshipsForPerson = operation(
      'relationship.findRelationshipsForPerson',
      (params: { personId: number }) =>
        http
          .get(`/relationships/person/${params.personId}`)
          .pipe(Effect.flatMap(decodeJson(Schema.Array(Relationship)))),
    );

    return { addParentToChild, addChildToParent, findRelationshipsForPerson };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
