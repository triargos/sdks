import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import { ProcuratHttpClient } from '../../shared/http-client';
import { Person } from '../person/person-schema';
import { Address, CreateAddress } from './address-schema';

export class ProcuratAddress extends Context.Service<ProcuratAddress>()('ProcuratAddress', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = operation('address.findAll', () =>
      http.get('/addresses').pipe(Effect.flatMap(decodeJson(Schema.Array(Address)))),
    );

    const findById = operation('address.findById', (params: { id: number }) =>
      http.get(`/addresses/${params.id}`).pipe(Effect.flatMap(decodeJson(Address))),
    );

    const create = operation('address.create', (params: { address: CreateAddress }) =>
      HttpClientRequest.post('/addresses').pipe(
        HttpClientRequest.schemaBodyJson(CreateAddress)(params.address),
        Effect.orDie,
        Effect.flatMap(http.execute),
        Effect.flatMap(decodeJson(Address)),
      ),
    );

    const findResidents = operation('address.findResidents', (params: { addressId: number }) =>
      http.get(`/addresses/${params.addressId}/residents`).pipe(Effect.flatMap(decodeJson(Schema.Array(Person)))),
    );

    return { findAll, findById, create, findResidents };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
