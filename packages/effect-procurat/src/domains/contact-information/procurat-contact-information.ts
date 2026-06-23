import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { ContactInformationSchema, CreateContactInformationSchema } from './contact-information-schema';
import { ContactInformationNotFound, ContactInformationValidationError } from './contact-information-errors';
import { PersonNotFound } from '../person/person-errors';
import { AddressNotFound } from '../address/address-errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const findAll: () => Effect.Effect<
    ReadonlyArray<ContactInformationSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('contactInformation.findAll')(function* () {
    return yield* http.get('/contactinformation/person').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ContactInformationSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const findById: (args: {
    contactInformationId: number;
  }) => Effect.Effect<
    ContactInformationSchema,
    ContactInformationNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('contactInformation.findById')(function* ({
    contactInformationId,
  }: {
    contactInformationId: number;
  }) {
    return yield* http.get(`/contactinformation/${contactInformationId}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(ContactInformationSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, ContactInformationNotFound | ProcuratError> =>
          e.status === 404
            ? Effect.fail(new ContactInformationNotFound({ contactInformationId }))
            : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const create: (
    contactInformation: CreateContactInformationSchema,
  ) => Effect.Effect<
    ContactInformationSchema,
    ContactInformationValidationError | ProcuratError | UnknownProcuratError
  > = Effect.fn('contactInformation.create')(function* (
    contactInformation: CreateContactInformationSchema,
  ) {
    return yield* HttpClientRequest.post('/contactinformation').pipe(
      HttpClientRequest.schemaBodyJson(CreateContactInformationSchema)(contactInformation),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(ContactInformationSchema)),
      Effect.catchTag(
        'ProcuratError',
        (e): Effect.Effect<never, ContactInformationValidationError | ProcuratError> =>
          e.status === 400
            ? Effect.fail(
                new ContactInformationValidationError({
                  message: e.message,
                  code: e.code,
                  input: contactInformation,
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

  const findByPerson: (args: {
    personId: number;
  }) => Effect.Effect<
    ReadonlyArray<ContactInformationSchema>,
    PersonNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('contactInformation.findByPerson')(function* ({
    personId,
  }: {
    personId: number;
  }) {
    return yield* HttpClientRequest.get(`/contactinformation/person/${personId}`).pipe(
      http.execute,
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ContactInformationSchema))),
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

  const findByAddress: (args: {
    addressId: number;
  }) => Effect.Effect<
    ReadonlyArray<ContactInformationSchema>,
    AddressNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('contactInformation.findByAddress')(function* ({
    addressId,
  }: {
    addressId: number;
  }) {
    return yield* HttpClientRequest.get(`/contactinformation/address/${addressId}`).pipe(
      http.execute,
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ContactInformationSchema))),
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

  return { findAll, findById, create, findByPerson, findByAddress };
});

export class ProcuratContactInformation extends Context.Tag('@triargos/procurat/ContactInformation')<
  ProcuratContactInformation,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratContactInformation, make);
}
