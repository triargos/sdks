import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientRequest } from 'effect/unstable/http';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import { ProcuratHttpClient } from '../../shared/http-client';
import { GroupSupervisor } from '../group/group-supervisor-schema';
import { CreatePerson, Person, UpdatePerson } from './person-schema';

export class ProcuratPerson extends Context.Service<ProcuratPerson>()('ProcuratPerson', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = operation('person.findAll', () =>
      http.get('/persons').pipe(Effect.flatMap(decodeJson(Schema.Array(Person)))),
    );

    const findById = operation('person.findById', (params: { id: number }) =>
      http.get(`/persons/${params.id}`).pipe(Effect.flatMap(decodeJson(Person))),
    );

    const findByFamilyId = operation('person.findByFamilyId', (params: { familyId: number }) =>
      http.get(`/persons/family/${params.familyId}`).pipe(Effect.flatMap(decodeJson(Schema.Array(Person)))),
    );

    const findRolesInGroups = operation('person.findRolesInGroups', (params: { id: number }) =>
      http.get(`/persons/${params.id}/roles`).pipe(Effect.flatMap(decodeJson(Schema.Array(GroupSupervisor)))),
    );

    const create = operation('person.create', (params: { person: CreatePerson }) =>
      HttpClientRequest.post('/persons').pipe(
        HttpClientRequest.schemaBodyJson(CreatePerson)(params.person),
        // Encoding only fails on a value that satisfies the type but not the codec
        // (`new Date('nonsense')`) — a programmer bug with no recovery.
        Effect.orDie,
        Effect.flatMap(http.execute),
        Effect.flatMap(decodeJson(Person)),
      ),
    );

    const update = operation('person.update', (params: { person: UpdatePerson }) =>
      HttpClientRequest.put(`/persons/${params.person.id}`).pipe(
        HttpClientRequest.schemaBodyJson(UpdatePerson)(params.person),
        Effect.orDie,
        Effect.flatMap(http.execute),
        Effect.asVoid,
      ),
    );

    return { findAll, findById, findByFamilyId, findRolesInGroups, create, update };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
