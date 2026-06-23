import { Context, Effect, Layer } from 'effect';
import { ProcuratHttpClient } from './shared/http-client';
import { ProcuratPerson } from './domains/person/procurat-person';
import { ProcuratAddress } from './domains/address/procurat-address';
import { ProcuratGroupMember } from './domains/group-member/procurat-group-member';
import { ProcuratContactInformation } from './domains/contact-information/procurat-contact-information';
import { ProcuratRelationship } from './domains/relationship/procurat-relationship';
import { ProcuratGroup } from './domains/group/procurat-group';
import { ProcuratCountry } from './domains/country/procurat-country';
import { ProcuratCounty } from './domains/county/procurat-county';
import { ProcuratReligion } from './domains/religion/procurat-religion';
import { ProcuratLookupTable } from './domains/lookup-table/procurat-lookup-table';
import { ProcuratCommunication } from './domains/communication/procurat-communication';
import { ProcuratFile } from './domains/file/procurat-file';
import { ProcuratAbsence } from './domains/absence/procurat-absence';

const make = Effect.gen(function* () {
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
  const communication = yield* ProcuratCommunication;
  const file = yield* ProcuratFile;
  const absence = yield* ProcuratAbsence;
  return { person, address, groupMember, contactInformation, relationship, group, country, county, religion, lookupTable, communication, file, absence };
});

export class ProcuratClient extends Context.Tag('@triargos/procurat/Client')<
  ProcuratClient,
  Effect.Effect.Success<typeof make>
>() {
  static layer({ apiKey, baseUrl }: { apiKey: string; baseUrl: string }) {
    const modules = Layer.mergeAll(
      ProcuratPerson.layer,
      ProcuratAddress.layer,
      ProcuratGroupMember.layer,
      ProcuratContactInformation.layer,
      ProcuratRelationship.layer,
      ProcuratGroup.layer,
      ProcuratCountry.layer,
      ProcuratCounty.layer,
      ProcuratReligion.layer,
      ProcuratLookupTable.layer,
      ProcuratCommunication.layer,
      ProcuratFile.layer,
      ProcuratAbsence.layer,
    );
    return Layer.effect(ProcuratClient, make).pipe(
      Layer.provide(modules),
      Layer.provide(ProcuratHttpClient.layer({ apiKey, baseUrl })),
    );
  }
}
