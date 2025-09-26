import { Effect, Layer } from 'effect';
import { ProcuratPerson } from './modules/procurat-person';
import { ProcuratAddress } from './modules/procurat-address';
import { ProcuratGroupMember } from './modules/procurat-group-member';
import { ProcuratContactInformation } from './modules/procurat-contact-information';
import { ProcuratHttpClient } from './http-client';
import { ProcuratRelationship } from './modules/procurat-relationship';

export class ProcuratClient extends Effect.Service<ProcuratClient>()('ProcuratClient', {
  dependencies: [
    ProcuratPerson.Default,
    ProcuratAddress.Default,
    ProcuratGroupMember.Default,
    ProcuratContactInformation.Default,
    ProcuratRelationship.Default,
  ],
  effect: Effect.gen(function* () {
    const person = yield* ProcuratPerson;
    const address = yield* ProcuratAddress;
    const groupMember = yield* ProcuratGroupMember;
    const contactInformation = yield* ProcuratContactInformation;
    const relationship = yield* ProcuratRelationship;

    return { person, address, groupMember, contactInformation, relationship };
  }),
}) {
  static layer({ apiKey, baseUrl }: { apiKey: string; baseUrl: string }) {
    return Layer.provideMerge(ProcuratClient.Default, ProcuratHttpClient.Default({ apiKey, baseUrl }));
  }
}