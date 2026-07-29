import { Context, Effect, Layer } from 'effect';
import type { HttpClient } from 'effect/unstable/http';
import { ProcuratHttpClient } from './http-client';
import { ProcuratAddress } from './modules/procurat-address';
import { ProcuratCommunication } from './modules/procurat-communication';
import { ProcuratContactInformation } from './modules/procurat-contact-information';
import { ProcuratCountry } from './modules/procurat-country';
import { ProcuratCounty } from './modules/procurat-county';
import { ProcuratFile } from './modules/procurat-file';
import { ProcuratGroupMember } from './modules/procurat-group-member';
import { ProcuratGroup } from './modules/procurat-group';
import { ProcuratLookupTable } from './modules/procurat-lookup-table';
import { ProcuratPerson } from './modules/procurat-person';
import { ProcuratRelationship } from './modules/procurat-relationship';
import { ProcuratReligion } from './modules/procurat-religion';

export class ProcuratClient extends Context.Service<ProcuratClient>()('ProcuratClient', {
  make: Effect.gen(function* () {
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

    return {
      person,
      address,
      groupMember,
      contactInformation,
      relationship,
      group,
      country,
      county,
      religion,
      lookupTable,
      communication,
      file,
    };
  }),
}) {
  static layer({
    apiKey,
    baseUrl,
  }: {
    apiKey: string;
    baseUrl: string;
  }): Layer.Layer<ProcuratClient, never, HttpClient.HttpClient> {
    return Layer.effect(this, this.make).pipe(
      Layer.provide(
        Layer.mergeAll(
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
        ),
      ),
      Layer.provide(ProcuratHttpClient.layer({ apiKey, baseUrl })),
    );
  }
}
