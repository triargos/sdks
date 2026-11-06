import { Schema } from 'effect';
import { describe, expect, it } from 'vitest';

import {
  BavarianSchool,
  CareType,
  CostBearer,
  LookupTable,
  Municipality,
  School,
} from '../src/domains/lookup-table/lookup-table-schema';

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

  it('decodes a School row with a null value', () => {
    const row = Schema.decodeUnknownSync(School)({ id: 5, label: 'Grundschule Nord', value: null, schoolTypeId: 1 });
    expect(row.value).toBeNull();
  });

  it('still decodes a string value', () => {
    expect(Schema.decodeUnknownSync(LookupTable)({ id: 4, label: 'römisch-katholisch', value: 'RK' }).value).toBe('RK');
  });
});

// The other columns of these tables are nullable too, except ID and BEZ.
describe('nullable lookup columns', () => {
  it('decodes a CostBearer row without characteristic or identification number', () => {
    const row = Schema.decodeUnknownSync(CostBearer)({
      id: 3,
      label: 'Jugendamt',
      value: 'JA',
      characteristic: null,
      identificationNumber: null,
    });
    expect([row.characteristic, row.identificationNumber]).toEqual([null, null]);
  });

  it('decodes a School row without a school type', () => {
    const row = Schema.decodeUnknownSync(School)({
      id: 5,
      label: 'Grundschule Nord',
      value: '0815',
      schoolTypeId: null,
    });
    expect(row.schoolTypeId).toBeNull();
  });

  it('decodes a BavarianSchool row with only id and label', () => {
    const row = Schema.decodeUnknownSync(BavarianSchool)({
      id: 6,
      label: 'Gymnasium Süd',
      value: null,
      schoolType: null,
      street: null,
      building: null,
      city: null,
      postalCode: null,
    });
    expect([row.value, row.schoolType, row.street, row.building, row.city, row.postalCode]).toEqual([
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  it('decodes a Municipality row with only an id', () => {
    const row = Schema.decodeUnknownSync(Municipality)({
      id: 7,
      label: null,
      municipalityCode: null,
      street: null,
      city: null,
      postalCode: null,
    });
    expect([row.label, row.municipalityCode]).toEqual([null, null]);
  });
});
