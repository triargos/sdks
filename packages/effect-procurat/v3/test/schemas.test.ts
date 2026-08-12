import { assert, describe, it } from '@effect/vitest';
import { Effect, Schema } from 'effect';

import * as entry from '../../dist/v3/index.js';
import * as errors from '../../dist/v3/errors.js';
import * as schemas from '../../dist/v3/schemas.js';
import { CreatePerson, Genders, Person } from '../../dist/v3/schemas.js';

const personWire = {
  id: 7,
  firstName: 'Ada',
  lastName: 'Lovelace',
  allFirstNames: 'Augusta Ada',
  gender: 'female',
  addressId: 1,
  familyId: null,
  familyRole: 'daughter',
  birthDate: '1815-12-10T00:00:00.000Z',
  birthPlace: 'London',
  birthCountryId: null,
  languageId: null,
  religionId: null,
  email: null,
  birthName: 'Byron',
  academicTitle: null,
  namePrefix: null,
  nobilityTitle: null,
  salutationA: null,
  salutationB: null,
  jobTitle: null,
  comment: null,
  nationalityId: null,
  maritalStatus: null,
  deathDate: null,
};

const undefinedExports = (module: Record<string, unknown>) =>
  Object.entries(module)
    .filter(([, value]) => value === undefined)
    .map(([name]) => name);

describe('the built v3 artifact', () => {
  it('offers the same three entry points as the v4 build', () => {
    assert.deepStrictEqual(Object.keys(entry).sort(), ['ProcuratClient', 'ProcuratHttpClient', 'ProcuratRetry']);
    assert.deepStrictEqual(undefinedExports(errors), []);
    assert.isAbove(Object.keys(errors).length, 4);
  });

  it('constructs every schema it exports', () => {
    assert.deepStrictEqual(undefinedExports(schemas), []);
    assert.isAbove(Object.keys(schemas).length, 50);
  });

  it('keeps the literal member maps in step with their schema', () => {
    assert.deepStrictEqual({ ...Genders }, { Male: 'male', Female: 'female', Other: 'other' });
  });
});

describe('schema decoding on Effect v3', () => {
  it.effect('decodes a person payload, turning the date string into a Date', () =>
    Effect.gen(function* () {
      const person = yield* Schema.decodeUnknown(Person)(personWire);

      assert.strictEqual(person.firstName, 'Ada');
      assert.strictEqual(person.gender, 'female');
      assert.deepStrictEqual(person.birthDate, new Date('1815-12-10T00:00:00.000Z'));
      assert.strictEqual(person.deathDate, null);
    }),
  );

  it.effect('round-trips CreatePerson through decode and encode unchanged', () =>
    Effect.gen(function* () {
      const wire: typeof CreatePerson.Encoded = {
        firstName: 'Ada',
        lastName: 'Lovelace',
        allFirstNames: null,
        gender: 'female',
        addressId: 1,
        familyId: null,
        familyRole: 'daughter',
        birthDate: '1815-12-10T00:00:00.000Z',
        birthPlace: null,
        birthCountryId: null,
        nationalityId: null,
      };

      const decoded = yield* Schema.decodeUnknown(CreatePerson)(wire);
      const encoded = yield* Schema.encode(CreatePerson)(decoded);

      assert.deepStrictEqual(encoded, wire);
    }),
  );

  it.effect('rejects a payload that misses a required field', () =>
    Effect.gen(function* () {
      const result = yield* Effect.either(Schema.decodeUnknown(Person)({ id: 7 }));

      assert.strictEqual(result._tag, 'Left');
    }),
  );
});
