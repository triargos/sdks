import { Config, Context, Effect, Layer, type Redacted } from 'effect';
import type { HttpClient } from 'effect/unstable/http';
import { ProcuratHttpClient } from './http-client';
import { ProcuratAddress } from './modules/procurat-address';
import { ProcuratCommunication } from './modules/procurat-communication';
import { ProcuratContactInformation } from './modules/procurat-contact-information';
import { ProcuratCountry } from './modules/procurat-country';
import { ProcuratCounty } from './modules/procurat-county';
import { ProcuratFile } from './modules/procurat-file';
import { ProcuratGroup } from './modules/procurat-group';
import { ProcuratGroupMember } from './modules/procurat-group-member';
import { ProcuratLookupTable } from './modules/procurat-lookup-table';
import { ProcuratPerson } from './modules/procurat-person';
import { ProcuratRelationship } from './modules/procurat-relationship';
import { ProcuratReligion } from './modules/procurat-religion';

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
);

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
  static layer(options: {
    readonly apiKey: Redacted.Redacted<string>;
    readonly baseUrl: string;
  }): Layer.Layer<ProcuratClient, never, HttpClient.HttpClient> {
    return Layer.effect(this)(this.make).pipe(Layer.provide(modules), Layer.provide(ProcuratHttpClient.layer(options)));
  }

  /** Reads `PROCURAT_API_KEY` and `PROCURAT_BASE_URL` unless given other configs. */
  static layerConfig(options?: {
    readonly apiKey?: Config.Config<Redacted.Redacted<string>>;
    readonly baseUrl?: Config.Config<string>;
  }): Layer.Layer<ProcuratClient, Config.ConfigError, HttpClient.HttpClient> {
    return Layer.unwrap(
      Effect.gen(function* () {
        const apiKey = yield* options?.apiKey ?? Config.redacted('PROCURAT_API_KEY');
        const baseUrl = yield* options?.baseUrl ?? Config.string('PROCURAT_BASE_URL');
        return ProcuratClient.layer({ apiKey, baseUrl });
      }),
    );
  }
}

export type ProcuratClientShape = Context.Service.Shape<typeof ProcuratClient>;
