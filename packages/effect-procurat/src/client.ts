import { Config, Context, Effect, Layer, type Redacted } from 'effect';
import type { HttpClient } from 'effect/unstable/http';
import { ProcuratAbsence } from './domains/absence/procurat-absence';
import { ProcuratAddress } from './domains/address/procurat-address';
import { ProcuratCommunication } from './domains/communication/procurat-communication';
import { ProcuratContactInformation } from './domains/contact-information/procurat-contact-information';
import { ProcuratCountry } from './domains/country/procurat-country';
import { ProcuratCounty } from './domains/county/procurat-county';
import { ProcuratFile } from './domains/file/procurat-file';
import { ProcuratGroupMember } from './domains/group-member/procurat-group-member';
import { ProcuratGroup } from './domains/group/procurat-group';
import { ProcuratLookupTable } from './domains/lookup-table/procurat-lookup-table';
import { ProcuratPerson } from './domains/person/procurat-person';
import { ProcuratRelationship } from './domains/relationship/procurat-relationship';
import { ProcuratReligion } from './domains/religion/procurat-religion';
import { type DateFormat, ProcuratDateFormat } from './shared/date';
import { ProcuratHttpClient } from './shared/http-client';

const modules = Layer.mergeAll(
  ProcuratPerson.layer,
  ProcuratAbsence.layer,
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
    const absence = yield* ProcuratAbsence;
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
      absence,
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
  /** `dateFormat` is `'iso-date'` unless the installation still runs the old API. */
  static layer(options: {
    readonly apiKey: Redacted.Redacted<string>;
    readonly baseUrl: string;
    readonly dateFormat?: DateFormat;
  }): Layer.Layer<ProcuratClient, never, HttpClient.HttpClient> {
    return Layer.effect(this)(this.make).pipe(
      Layer.provide(modules),
      Layer.provide(ProcuratHttpClient.layer(options)),
      Layer.provide(Layer.succeed(ProcuratDateFormat)(options.dateFormat ?? ProcuratDateFormat.defaultFormat)),
    );
  }

  /** Reads `PROCURAT_API_KEY` and `PROCURAT_BASE_URL` unless given other configs. */
  static layerConfig(options?: {
    readonly apiKey?: Config.Config<Redacted.Redacted<string>>;
    readonly baseUrl?: Config.Config<string>;
    readonly dateFormat?: DateFormat;
  }): Layer.Layer<ProcuratClient, Config.ConfigError, HttpClient.HttpClient> {
    return Layer.unwrap(
      Effect.gen(function* () {
        const apiKey = yield* options?.apiKey ?? Config.redacted('PROCURAT_API_KEY');
        const baseUrl = yield* options?.baseUrl ?? Config.string('PROCURAT_BASE_URL');
        return ProcuratClient.layer({ apiKey, baseUrl, dateFormat: options?.dateFormat });
      }),
    );
  }
}

export type ProcuratClientShape = Context.Service.Shape<typeof ProcuratClient>;
