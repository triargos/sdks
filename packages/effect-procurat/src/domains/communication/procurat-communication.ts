import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { PersonNotFound } from '../person/person-errors';
import {
  ContactInformationMappingCreationSchema,
  ContactInformationMappingSchema,
  ContactPersonCreationSchema,
  ContactPersonSchema,
} from './communication-schema';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  // --- Contact Person Mappings ---

  const findContactPersonMappings: (args: {
    personId: number;
  }) => Effect.Effect<
    ReadonlyArray<ContactPersonSchema>,
    PersonNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('communication.findContactPersonMappings')(function* ({
    personId,
  }: {
    personId: number;
  }) {
    return yield* http.get(`/communication/person/${personId}/contacts`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ContactPersonSchema))),
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

  const createContactPerson: (
    personId: number,
    data: ContactPersonCreationSchema,
  ) => Effect.Effect<
    ContactPersonSchema,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('communication.createContactPerson')(function* (
    personId: number,
    data: ContactPersonCreationSchema,
  ) {
    return yield* HttpClientRequest.post(`/communication/person/${personId}/contacts`).pipe(
      HttpClientRequest.schemaBodyJson(ContactPersonCreationSchema)(data),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(ContactPersonSchema)),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
      }),
    );
  });

  const deleteContactPerson: (args: {
    personId: number;
    contactId: number;
  }) => Effect.Effect<
    void,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('communication.deleteContactPerson')(function* ({
    personId,
    contactId,
  }: {
    personId: number;
    contactId: number;
  }) {
    return yield* http
      .execute(HttpClientRequest.del(`/communication/person/${personId}/contacts/${contactId}`))
      .pipe(
        Effect.asVoid,
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
  });

  // --- Contact Information Mappings ---

  const findContactInformationMappings: (args: {
    personId: number;
  }) => Effect.Effect<
    ReadonlyArray<ContactInformationMappingSchema>,
    PersonNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('communication.findContactInformationMappings')(function* ({
    personId,
  }: {
    personId: number;
  }) {
    return yield* http.get(`/communication/person/${personId}/information`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ContactInformationMappingSchema))),
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

  const createContactInformationMapping: (
    personId: number,
    data: ContactInformationMappingCreationSchema,
  ) => Effect.Effect<
    ContactInformationMappingSchema,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('communication.createContactInformationMapping')(function* (
    personId: number,
    data: ContactInformationMappingCreationSchema,
  ) {
    return yield* HttpClientRequest.post(`/communication/person/${personId}/information`).pipe(
      HttpClientRequest.schemaBodyJson(ContactInformationMappingCreationSchema)(data),
      Effect.flatMap(http.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(ContactInformationMappingSchema)),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
      }),
    );
  });

  const deleteContactInformationMapping: (args: {
    personId: number;
    contactInformationId: number;
  }) => Effect.Effect<
    void,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('communication.deleteContactInformationMapping')(function* ({
    personId,
    contactInformationId,
  }: {
    personId: number;
    contactInformationId: number;
  }) {
    return yield* http
      .execute(
        HttpClientRequest.del(`/communication/person/${personId}/information/${contactInformationId}`),
      )
      .pipe(
        Effect.asVoid,
        Effect.catchTags({
          RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        }),
      );
  });

  return {
    findContactPersonMappings,
    createContactPerson,
    deleteContactPerson,
    findContactInformationMappings,
    createContactInformationMapping,
    deleteContactInformationMapping,
  };
});

export class ProcuratCommunication extends Context.Tag('@triargos/procurat/Communication')<
  ProcuratCommunication,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratCommunication, make);
}
