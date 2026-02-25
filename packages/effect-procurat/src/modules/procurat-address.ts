import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { AddressSchema, CreateAddressSchema } from '../schema/address-schema';
import { PersonSchema } from '../schema/person-schema';
import {
  AddressNotFound,
  AddressValidationError,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';

export class ProcuratAddress extends Effect.Service<ProcuratAddress>()('ProcuratAddress', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll: () => Effect.Effect<
      ReadonlyArray<AddressSchema>,
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
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
      | AddressNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('address.findById')(function* ({ id }: { id: number }) {
      return yield* http.get(`/addresses/${id}`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(AddressSchema)),
        Effect.catchTag('ProcuratNotFoundError', () => new AddressNotFound({ addressId: id })),
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
      | AddressValidationError
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | UnknownProcuratError
    > = Effect.fn('address.create')(function* (address: CreateAddressSchema) {
      return yield* HttpClientRequest.post('/addresses').pipe(
        HttpClientRequest.schemaBodyJson(CreateAddressSchema)(address),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(AddressSchema)),
        Effect.catchTag('ProcuratBadRequestError', (cause) =>
          new AddressValidationError({ message: cause.message, code: cause.code, input: address }),
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
      | AddressNotFound
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
    > = Effect.fn('address.findResidents')(function* ({ addressId }: { addressId: number }) {
      return yield* http.get(`/addresses/${addressId}/residents`).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(PersonSchema))),
        Effect.catchTag('ProcuratNotFoundError', () => new AddressNotFound({ addressId })),
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
    });

    return { findAll, findById, create, findResidents };
  }),
}) {}
