import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { AddressSchema, CreateAddressSchema } from './address-schema';
import { PersonSchema } from '../person/person-schema';
import { AddressNotFound, AddressValidationError } from './address-errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const findAll: () => Effect.Effect<
    ReadonlyArray<AddressSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('address.findAll')(function* () {
    return yield* http.get('/addresses').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(AddressSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const findById: (args: {
    id: number;
  }) => Effect.Effect<
    AddressSchema,
    AddressNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('address.findById')(function* ({ id }: { id: number }) {
    return yield* http.get(`/addresses/${id}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(AddressSchema)),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, AddressNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new AddressNotFound({ addressId: id })) : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const create: (
    address: CreateAddressSchema,
  ) => Effect.Effect<
    AddressSchema,
    AddressValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('address.create')(function* (address: CreateAddressSchema) {
    return yield* HttpClientRequest.post('/addresses').pipe(
      HttpClientRequest.schemaBodyJson(CreateAddressSchema)(address),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(AddressSchema)),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, AddressValidationError | ProcuratError> =>
        e.status === 400
          ? Effect.fail(new AddressValidationError({ message: e.message, code: e.code, input: address }))
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

  const findResidents: (args: {
    addressId: number;
  }) => Effect.Effect<
    ReadonlyArray<PersonSchema>,
    AddressNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('address.findResidents')(function* ({ addressId }: { addressId: number }) {
    return yield* http.get(`/addresses/${addressId}/residents`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(PersonSchema))),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, AddressNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new AddressNotFound({ addressId })) : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  return { findAll, findById, create, findResidents };
});

export class ProcuratAddress extends Context.Tag('@triargos/procurat/Address')<
  ProcuratAddress,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratAddress, make);
}
