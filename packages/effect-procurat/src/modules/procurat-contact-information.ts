import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ContactInformationSchema, CreateContactInformationSchema } from '../schema/contact-information-schema';
import {
  ContactInformationValidationError,
  PersonNotFound,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';

export class ProcuratContactInformation extends Effect.Service<ProcuratContactInformation>()(
  'ProcuratContactInformation',
  {
    effect: Effect.gen(function* () {
      const http = yield* ProcuratHttpClient;

      const create: (
        contactInformation: CreateContactInformationSchema,
      ) => Effect.Effect<
        ContactInformationSchema,
        | ContactInformationValidationError
        | ProcuratNotFoundError
        | ProcuratUnauthorizedError
        | ProcuratServerError
        | UnknownProcuratError
      > = Effect.fn('contactInformation.create')(function* (
        contactInformation: CreateContactInformationSchema,
      ) {
        return yield* HttpClientRequest.post('/contactinformation').pipe(
          HttpClientRequest.schemaBodyJson(CreateContactInformationSchema)(contactInformation),
          Effect.flatMap(http.execute),
          Effect.flatMap(HttpClientResponse.schemaBodyJson(ContactInformationSchema)),
          Effect.catchTag('ProcuratBadRequestError', (cause) =>
            new ContactInformationValidationError({
              message: cause.message,
              code: cause.code,
              input: contactInformation,
            }),
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
        | PersonNotFound
        | ProcuratUnauthorizedError
        | ProcuratServerError
        | ProcuratBadRequestError
        | UnknownProcuratError
      > = Effect.fn('contactInformation.findByPerson')(function* ({
        personId,
      }: {
        personId: number;
      }) {
        return yield* HttpClientRequest.get(`/contactinformation/person/${personId}`).pipe(
          http.execute,
          Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ContactInformationSchema))),
          Effect.catchTag('ProcuratNotFoundError', () => new PersonNotFound({ personId })),
          Effect.catchTags({
            RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          }),
        );
      });

      return { create, findByPerson };
    }),
  },
) {}
