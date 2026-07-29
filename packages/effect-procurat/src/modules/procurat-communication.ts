import { Context, Effect, Layer } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { ProcuratHttpClient } from '../http-client';
import { decodeJson } from '../internal/decode';
import { operation } from '../internal/operation';
import { ContactPerson, CreateContactPerson } from '../schema/communication-schema';

export class ProcuratCommunication extends Context.Service<ProcuratCommunication>()('ProcuratCommunication', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const createContactPerson = operation(
      'communication.createContactPerson',
      (params: { personId: number; contactPerson: CreateContactPerson }) =>
        HttpClientRequest.post(`/communication/person/${params.personId}/contacts`).pipe(
          HttpClientRequest.schemaBodyJson(CreateContactPerson)(params.contactPerson),
          Effect.orDie,
          Effect.flatMap(http.execute),
          Effect.flatMap(decodeJson(ContactPerson)),
        ),
    );

    return { createContactPerson };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
