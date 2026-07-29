import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import { ProcuratHttpClient } from '../../shared/http-client';
import {
  ContactInformationAssignment,
  ContactPerson,
  CreateContactInformationAssignment,
  CreateContactPerson,
} from './communication-schema';

export class ProcuratCommunication extends Context.Service<ProcuratCommunication>()('ProcuratCommunication', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findContactPersons = operation('communication.findContactPersons', (params: { personId: number }) =>
      http
        .get(`/communication/person/${params.personId}/contacts`)
        .pipe(Effect.flatMap(decodeJson(Schema.Array(ContactPerson)))),
    );

    const assignContactPerson = operation(
      'communication.assignContactPerson',
      (params: { assignment: CreateContactPerson }) =>
        HttpClientRequest.post(`/communication/person/${params.assignment.personId}/contacts`).pipe(
          HttpClientRequest.schemaBodyJson(CreateContactPerson)(params.assignment),
          Effect.orDie,
          Effect.flatMap(http.execute),
          Effect.flatMap(decodeJson(ContactPerson)),
        ),
    );

    const removeContactPerson = operation(
      'communication.removeContactPerson',
      (params: { personId: number; contactId: number }) =>
        http
          .execute(HttpClientRequest.delete(`/communication/person/${params.personId}/contacts/${params.contactId}`))
          .pipe(Effect.asVoid),
    );

    const findAssignedContactInformation = operation(
      'communication.findAssignedContactInformation',
      (params: { personId: number }) =>
        http
          .get(`/communication/person/${params.personId}/information`)
          .pipe(Effect.flatMap(decodeJson(Schema.Array(ContactInformationAssignment)))),
    );

    const assignContactInformation = operation(
      'communication.assignContactInformation',
      (params: { assignment: CreateContactInformationAssignment }) =>
        HttpClientRequest.post(`/communication/person/${params.assignment.personId}/information`).pipe(
          HttpClientRequest.schemaBodyJson(CreateContactInformationAssignment)(params.assignment),
          Effect.orDie,
          Effect.flatMap(http.execute),
          Effect.flatMap(decodeJson(ContactInformationAssignment)),
        ),
    );

    const removeAssignedContactInformation = operation(
      'communication.removeAssignedContactInformation',
      (params: { personId: number; contactInformationId: number }) =>
        http
          .execute(
            HttpClientRequest.delete(
              `/communication/person/${params.personId}/information/${params.contactInformationId}`,
            ),
          )
          .pipe(Effect.asVoid),
    );

    return {
      findContactPersons,
      assignContactPerson,
      removeContactPerson,
      findAssignedContactInformation,
      assignContactInformation,
      removeAssignedContactInformation,
    };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
