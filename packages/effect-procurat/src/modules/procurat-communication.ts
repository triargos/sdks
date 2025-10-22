import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { Effect } from 'effect';
import { CreateContactPersonError } from '../error/communication-errors';
import { ProcuratCommonErrors } from '../error/procurat-errors';
import { ProcuratHttpClient } from '../http-client';
import { ContactPersonCreationSchema, ContactPersonSchema } from '../schema/communication-schema';
import { removeUnrecoverableErrors } from '../utils/error-parsing';

export class ProcuratCommunication extends Effect.Service<ProcuratCommunication>()('ProcuratCommunication', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const createContactPerson: (
      personId: number,
      data: ContactPersonCreationSchema,
    ) => Effect.Effect<ContactPersonSchema, CreateContactPersonError | ProcuratCommonErrors> = Effect.fn(
      'communication.createContactPerson',
    )(function* (personId: number, data: ContactPersonCreationSchema) {
      return yield* HttpClientRequest.post(`/communication/person/${personId}/contacts`).pipe(
        HttpClientRequest.schemaBodyJson(ContactPersonCreationSchema)(data),
        Effect.flatMap(http.execute),
        Effect.flatMap(HttpClientResponse.schemaBodyJson(ContactPersonSchema)),
        removeUnrecoverableErrors,
        Effect.catchTag('HttpBodyError', 'ProcuratNotFoundError', Effect.die),
        Effect.catchTag(
          'ProcuratServerError',
          'ProcuratBadRequestError',
          (cause) => new CreateContactPersonError({ cause, data }),
        ),
      );
    });

    return { createContactPerson };
  }),
}) {}
