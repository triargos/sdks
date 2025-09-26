import { Effect } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { ContactInformationSchema, CreateContactInformationSchema } from '../schema/contact-information-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';
import { CreateContactInformationError } from '../error/contact-information-errors';

export class ProcuratContactInformation extends Effect.Service<ProcuratContactInformation>()(
  'ProcuratContactInformation',
  {
    effect: Effect.gen(function* () {
      const http = yield* ProcuratHttpClient;

      const create = Effect.fn('contactInformation.create')(function* (
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
      return { create };
    }),
  },
) {}
