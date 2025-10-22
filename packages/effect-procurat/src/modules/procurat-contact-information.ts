import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ContactInformationSchema, CreateContactInformationSchema } from '../schema/contact-information-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import {
  CreateContactInformationError,
  FindContactInformationByPersonError,
} from '../error/contact-information-errors';
import { PersonNotFoundError, ProcuratCommonErrors } from '../errors';

export class ProcuratContactInformation extends Effect.Service<ProcuratContactInformation>()(
  'ProcuratContactInformation',
  {
    effect: Effect.gen(function* () {
      const http = yield* ProcuratHttpClient;

      const create: (
        contactInformation: CreateContactInformationSchema,
      ) => Effect.Effect<
        ContactInformationSchema,
        CreateContactInformationError | ProcuratCommonErrors
      > = Effect.fn('contactInformation.create')(function* (
        contactInformation: CreateContactInformationSchema,
      ) {
        return yield* HttpClientRequest.post('/contactinformation').pipe(
          HttpClientRequest.schemaBodyJson(CreateContactInformationSchema)(contactInformation),
          Effect.flatMap(http.execute),
          Effect.flatMap(HttpClientResponse.schemaBodyJson(ContactInformationSchema)),
          removeUnrecoverableErrors,
          Effect.catchTag('HttpBodyError', 'ProcuratNotFoundError', Effect.die),
          Effect.catchTag(
            'ProcuratBadRequestError',
            'ProcuratServerError',
            (cause) => new CreateContactInformationError({ cause, data: contactInformation }),
          ),
        );
      });

      const findByPerson: (args: {
        personId: number;
      }) => Effect.Effect<
        ReadonlyArray<ContactInformationSchema>,
        PersonNotFoundError | FindContactInformationByPersonError | ProcuratCommonErrors
      > = Effect.fn('contactInformation.findByPerson')(function* ({ personId }) {
        return yield* HttpClientRequest.get(`/contactinformation/person/${personId}`).pipe(
          http.execute,
          Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ContactInformationSchema))),
          removeUnrecoverableErrors,
          Effect.catchTags({
            ProcuratBadRequestError: Effect.die,
            ProcuratServerError: (cause) => new FindContactInformationByPersonError({ personId, cause }),
            ProcuratNotFoundError: (cause) => new PersonNotFoundError({ personId, cause }),
          }),
        );
      });

      return { create, findByPerson };
    }),
  },
) {}
