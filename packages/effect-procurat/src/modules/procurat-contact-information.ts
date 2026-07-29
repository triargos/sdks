import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { ProcuratHttpClient } from '../http-client';
import { decodeJson } from '../internal/decode';
import { operation } from '../internal/operation';
import { ContactInformation, CreateContactInformation } from '../schema/contact-information-schema';

export class ProcuratContactInformation extends Context.Service<ProcuratContactInformation>()(
  'ProcuratContactInformation',
  {
    make: Effect.gen(function* () {
      const http = yield* ProcuratHttpClient;

      const create = operation(
        'contactInformation.create',
        (params: { contactInformation: CreateContactInformation }) =>
          HttpClientRequest.post('/contactinformation').pipe(
            HttpClientRequest.schemaBodyJson(CreateContactInformation)(params.contactInformation),
            Effect.orDie,
            Effect.flatMap(http.execute),
            Effect.flatMap(decodeJson(ContactInformation)),
          ),
      );

      const findByPerson = operation('contactInformation.findByPerson', (params: { personId: number }) =>
        http
          .get(`/contactinformation/person/${params.personId}`)
          .pipe(Effect.flatMap(decodeJson(Schema.Array(ContactInformation)))),
      );

      return { create, findByPerson };
    }),
  },
) {
  static readonly layer = Layer.effect(this)(this.make);
}
