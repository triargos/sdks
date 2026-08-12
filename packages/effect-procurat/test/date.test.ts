import { Schema } from 'effect';
import { describe, expect, it } from 'vitest';

import { IsoDate, ProcuratDate } from '../src/shared/date';

const decode = Schema.decodeUnknownSync(ProcuratDate);
const encode = Schema.encodeSync(ProcuratDate);

describe('IsoDate', () => {
  it('makes a value from a well-formed day', () => {
    expect(IsoDate.make('2024-05-01')).toBe('2024-05-01');
  });

  it('throws on anything that is not YYYY-MM-DD', () => {
    expect(() => IsoDate.make('banana')).toThrow();
    expect(() => IsoDate.make('2024-05-01T00:00:00.000Z')).toThrow();
  });

  it('reads the UTC day when the zone is utc', () => {
    expect(IsoDate.fromDate(new Date('2024-05-01T22:00:00.000Z'), 'utc')).toBe('2024-05-01');
  });

  it('reads the local day when the zone is local', () => {
    // Local midnight on the 2nd is still the 1st in UTC east of Greenwich.
    // 'local' keeps the day the user picked, whatever the runner's zone.
    expect(IsoDate.fromDate(new Date(2024, 4, 2, 0, 0, 0), 'local')).toBe('2024-05-02');
  });

  it('turns a day into midnight UTC', () => {
    expect(IsoDate.toDate(IsoDate.make('2024-05-01')).toISOString()).toBe('2024-05-01T00:00:00.000Z');
  });
});

describe('ProcuratDate', () => {
  it('decodes a date-only string', () => {
    expect(decode('2024-05-01')).toBe('2024-05-01');
  });

  it('decodes a timestamp to its UTC day', () => {
    expect(decode('2024-05-01T00:00:00.000Z')).toBe('2024-05-01');
    expect(decode('2024-05-01T23:30:00.000+02:00')).toBe('2024-05-01');
  });

  it('rejects a string that is neither', () => {
    expect(() => decode('banana')).toThrow();
  });

  it('checks the shape, not the calendar', () => {
    expect(decode('2024-13-99')).toBe('2024-13-99');
  });

  it('encodes a date-only string', () => {
    expect(encode(IsoDate.make('2024-05-01'))).toBe('2024-05-01');
  });
});
