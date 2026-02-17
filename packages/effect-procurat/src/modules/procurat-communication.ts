import { HttpClientRequest, HttpClientResponse } from '@effect/platform';
import { Effect } from 'effect';
import {
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from '../errors';
import { ProcuratHttpClient } from '../http-client';
import { ContactPersonCreationSchema, ContactPersonSchema } from '../schema/communication-schema';

export class ProcuratCommunication extends Effect.Service<ProcuratCommunication>()('ProcuratCommunication', {
  effect: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const createContactPerson: (
      personId: number,
      data: ContactPersonCreationSchema,
    ) => Effect.Effect<
      ContactPersonSchema,
      | ProcuratNotFoundError
      | ProcuratUnauthorizedError
      | ProcuratServerError
      | ProcuratBadRequestError
      | UnknownProcuratError
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

    return { createContactPerson };
  }),
}) {}
