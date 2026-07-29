import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { ProcuratHttpClient } from '../http-client';
import { decodeJson } from '../internal/decode';
import { operation } from '../internal/operation';
import { Address, CreateAddress } from '../schema/address-schema';

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

    return { findAll, findById, create };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
