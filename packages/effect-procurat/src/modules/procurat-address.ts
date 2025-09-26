import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { AddressSchema, CreateAddressSchema } from '../schema/address-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { AddressNotFoundError, CreateAddressError, FindAddressError, ListAddressesError } from '../error/address-errors';

export class ProcuratAddress extends Effect.Service<ProcuratAddress>()('ProcuratAddress', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = Effect.fn('address.findAll')(function* () {
      return yield* http.get('/addresses').pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(AddressSchema))),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratNotFoundError', 'ProcuratBadRequestError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new ListAddressesError({ cause }),
        }),
      );
    });

    const findById = Effect.fn('address.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/addresses/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(AddressSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('ProcuratBadRequestError', Effect.die),
        Effect.catchTags({
          ProcuratServerError: (cause) => new FindAddressError({ cause, addressId: id }),
          ProcuratNotFoundError: (cause) => new AddressNotFoundError({ cause, addressId: id }),
        }),
      );
    });

    const create  = Effect.fn("address.create")(function* (address: CreateAddressSchema) {
      return yield* HttpClientRequest.post("/addresses").pipe(
        HttpClientRequest.schemaBodyJson(CreateAddressSchema)(address),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(AddressSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag("ProcuratNotFoundError", "HttpBodyError", Effect.die),
        Effect.catchTag("ProcuratBadRequestError", "ProcuratServerError", (cause) => new CreateAddressError({cause, data: address}))
      )
    })

    return { findAll, findById, create };
  }),
}) {}
