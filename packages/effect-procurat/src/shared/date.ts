import { Context, DateTime, Effect, Option, Schema, SchemaGetter } from 'effect';

const isoDate = Schema.String.pipe(Schema.check(Schema.isPattern(/^\d{4}-\d{2}-\d{2}$/)), Schema.brand('IsoDate'));

/** A calendar day with no time and no zone, `YYYY-MM-DD`. Compares with `===` and `<`. */
export type IsoDate = typeof isoDate.Type;

export const IsoDate = Object.assign(isoDate, {
  /**
   * The zone decides which day a `Date` belongs to: `2024-05-01T22:00:00Z` is the
   * 1st in UTC and the 2nd in Berlin. Pass `'local'` for values a user picked.
   */
  fromDate: (date: Date, zone: 'utc' | 'local' = 'utc'): IsoDate => {
    const instant = DateTime.fromDateUnsafe(date);
    return isoDate.make(
      zone === 'utc'
        ? DateTime.formatIsoDateUtc(instant)
        : DateTime.formatIsoDate(DateTime.setZone(instant, DateTime.zoneMakeLocal())),
    );
  },

  /** Midnight UTC on that day. */
  toDate: (iso: IsoDate): Date => new Date(`${iso}T00:00:00.000Z`),
});

const berlin = DateTime.zoneMakeNamedUnsafe('Europe/Berlin');

/**
 * Both wire formats decode, whichever the installation runs. A timestamp becomes
 * its Berlin day — Procurat stores Berlin midnights as UTC, so `2024-12-09T23:00:00Z`
 * means the 10th. Anything else passes through and `IsoDate` rejects it if it is garbage.
 */
const isoDatePart = (wire: string): string => {
  if (!wire.includes('T')) return wire;
  const parsed = new Date(wire);
  if (Number.isNaN(parsed.getTime())) return wire;
  return DateTime.formatIsoDate(DateTime.setZone(DateTime.fromDateUnsafe(parsed), berlin));
};

export type DateCodec = Schema.Codec<IsoDate, string>;

/** Encodes `2024-05-01`. */
export const ProcuratDate: DateCodec = Schema.String.pipe(
  Schema.decodeTo(IsoDate, {
    decode: SchemaGetter.transform(isoDatePart),
    encode: SchemaGetter.passthrough({ strict: false }),
  }),
);

// ─── Rollover ────────────────────────────────────────────────────────────────
// Everything below serves installations still on the old API. Once they are all
// migrated, delete this block, the `dateFormat` option, and the schema field
// factories; `ProcuratDate` alone stays. The public surface does not change.

/** Encodes `2024-05-01T00:00:00.000Z`, the only format the old API accepts. */
export const ProcuratTimestamp: DateCodec = Schema.String.pipe(
  Schema.decodeTo(IsoDate, {
    decode: SchemaGetter.transform(isoDatePart),
    encode: SchemaGetter.transform((iso) => `${iso}T00:00:00.000Z`),
  }),
);

/** The wire format an installation expects on write. Reads accept both. */
export type DateFormat = 'iso-date' | 'timestamp';

/**
 * Optional. When absent the SDK writes `iso-date`, so installing this service is
 * only needed to talk to an installation still on the old API. `ProcuratClient.layer`
 * installs it from its `dateFormat` option.
 */
export class ProcuratDateFormat extends Context.Service<ProcuratDateFormat, DateFormat>()('ProcuratDateFormat') {
  static readonly defaultFormat: DateFormat = 'iso-date';
}

export const wireDate = (format: DateFormat): DateCodec =>
  format === 'timestamp' ? ProcuratTimestamp : ProcuratDate;

/** Read once per module, at layer construction — not per request. */
export const currentDateCodec: Effect.Effect<DateCodec> = Effect.serviceOption(ProcuratDateFormat).pipe(
  Effect.map((format) => wireDate(Option.getOrElse(format, () => ProcuratDateFormat.defaultFormat))),
);
