import { Effect, Layer } from 'effect';
import { ProcuratPerson } from './modules/procurat-person';
import { ProcuratAddress } from './modules/procurat-address';
import { ProcuratGroupMember } from './modules/procurat-group-member';
import { ProcuratContactInformation } from './modules/procurat-contact-information';
import { ProcuratHttpClient } from './http-client';
import { ProcuratRelationship } from './modules/procurat-relationship';
import { ProcuratGroup } from './modules/procurat-group';
import { ProcuratCountry } from './modules/procurat-country';
import { ProcuratCounty } from './modules/procurat-county';
import { ProcuratReligion } from './modules/procurat-religion';
import { ProcuratLookupTable } from './modules/procurat-lookup-table';

export class ProcuratClient extends Effect.Service<ProcuratClient>()('ProcuratClient', {
  dependencies: [
    ProcuratPerson.Default,
    ProcuratAddress.Default,
    ProcuratGroupMember.Default,
    ProcuratContactInformation.Default,
    ProcuratRelationship.Default,
    ProcuratGroup.Default,
    ProcuratCountry.Default,
    ProcuratCounty.Default,
    ProcuratReligion.Default,
    ProcuratLookupTable.Default,
  ],
  effect: Effect.gen(function* () {
    const person = yield* ProcuratPerson;
    const address = yield* ProcuratAddress;
    const groupMember = yield* ProcuratGroupMember;
    const contactInformation = yield* ProcuratContactInformation;
    const relationship = yield* ProcuratRelationship;
    const group = yield* ProcuratGroup;
    const country = yield* ProcuratCountry;
    const county = yield* ProcuratCounty;
    const religion = yield* ProcuratReligion;
    const lookupTable = yield* ProcuratLookupTable;
    const statistics = yield* ProcuratStatistics;

    return { person, address, groupMember, contactInformation, relationship, group, country, county, religion, lookupTable };
  }),
}) {
  static layer({ apiKey, baseUrl }: { apiKey: string; baseUrl: string }) {
    return Layer.provideMerge(ProcuratClient.Default, ProcuratHttpClient.Default({ apiKey, baseUrl }));
  }
}