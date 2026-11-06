import { Schema } from 'effect';
import { describe, expect, it } from 'vitest';

import { CareType, CostBearer, LookupTable } from '../src/domains/lookup-table/lookup-table-schema';

// Procurat's LookupVal column is nullable, and real rows carry null.
describe('lookup value', () => {
  it('decodes a LookupTable row with a null value', () => {
    const row = Schema.decodeUnknownSync(LookupTable)({ id: 1, label: 'ohne Bekenntnis', value: null });
    expect(row.value).toBeNull();
  });

  it('decodes a CareType row with a null value', () => {
    const row = Schema.decodeUnknownSync(CareType)({
      id: 2,
      label: 'Ganztag',
      value: null,
      factor: null,
      description: null,
    });
    expect(row.value).toBeNull();
  });

  it('decodes a CostBearer row with a null value', () => {
    const row = Schema.decodeUnknownSync(CostBearer)({
      id: 3,
      label: 'Jugendamt',
      value: null,
      characteristic: 'JA',
      identificationNumber: '42',
    });
    expect(row.value).toBeNull();
  });

  it('still decodes a string value', () => {
    expect(Schema.decodeUnknownSync(LookupTable)({ id: 4, label: 'römisch-katholisch', value: 'RK' }).value).toBe('RK');
  });
});
