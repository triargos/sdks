import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ContactInformation, CreateContactInformation } from './contact-information-schema';

export class ProcuratContactInformation extends Context.Service<ProcuratContactInformation>()(
  'ProcuratContactInformation',
  {
    make: Effect.gen(function* () {
      const http = yield* ProcuratHttpClient;

      const findAll = operation('contactInformation.findAll', () =>
        http.get('/contactinformation/person').pipe(Effect.flatMap(decodeJson(Schema.Array(ContactInformation)))),
      );

      const findById = operation('contactInformation.findById', (params: { contactInformationId: number }) =>
        http
          .get(`/contactinformation/${params.contactInformationId}`)
          .pipe(Effect.flatMap(decodeJson(ContactInformation))),
      );

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

      const findByAddress = operation('contactInformation.findByAddress', (params: { addressId: number }) =>
        http
          .get(`/contactinformation/address/${params.addressId}`)
          .pipe(Effect.flatMap(decodeJson(Schema.Array(ContactInformation)))),
      );

      return { findAll, findById, create, findByPerson, findByAddress };
    }),
  },
) {
  static readonly layer = Layer.effect(this)(this.make);
}
