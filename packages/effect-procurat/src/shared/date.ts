import { Schema, SchemaGetter } from 'effect';

const isoDate = Schema.String.pipe(Schema.check(Schema.isPattern(/^\d{4}-\d{2}-\d{2}$/)), Schema.brand('IsoDate'));

/** A calendar day with no time and no zone, `YYYY-MM-DD`. Compares with `===` and `<`. */
export type IsoDate = typeof isoDate.Type;

const pad = (value: number): string => String(value).padStart(2, '0');

export const IsoDate = Object.assign(isoDate, {
  /**
   * The zone decides which day a `Date` belongs to: `2024-05-01T22:00:00Z` is the
   * 1st in UTC and the 2nd in Berlin. Pass `'local'` for values a user picked.
   */
  fromDate: (date: Date, zone: 'utc' | 'local' = 'utc'): IsoDate =>
    isoDate.make(
      zone === 'utc'
        ? date.toISOString().slice(0, 10)
        : `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    ),

  /** Midnight UTC on that day. */
  toDate: (iso: IsoDate): Date => new Date(`${iso}T00:00:00.000Z`),
});

/**
 * Both wire formats decode, whichever the installation runs. A timestamp keeps its
 * UTC day; anything else passes through and `IsoDate` rejects it if it is garbage.
 */
const isoDatePart = (wire: string): string => {
  if (!wire.includes('T')) return wire;
  const parsed = new Date(wire);
  return Number.isNaN(parsed.getTime()) ? wire : parsed.toISOString().slice(0, 10);
};

/** Encodes `2024-05-01`. */
export const ProcuratDate: Schema.Codec<IsoDate, string> = Schema.String.pipe(
  Schema.decodeTo(IsoDate, {
    decode: SchemaGetter.transform(isoDatePart),
    encode: SchemaGetter.passthrough({ strict: false }),
  }),
);
