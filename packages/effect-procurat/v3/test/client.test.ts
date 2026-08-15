import { assert, describe, it } from '@effect/vitest';
import { Chunk, Effect, Layer, Redacted, Schedule, Stream } from 'effect';

import { IsoDate, ProcuratClient, type DateFormat, ProcuratRetry } from '../../dist/v3/index.js';
import type { ProcuratError } from '../../dist/v3/errors.js';
import { BASE_URL, stubHttpClient, type StubReply } from './stub-http-client.js';

/** `assert.strictEqual` does not narrow, and every field worth asserting sits behind the tag. */
const withTag = <T extends ProcuratError['_tag']>(
  failure: ProcuratError,
  tag: T,
): Extract<ProcuratError, { _tag: T }> => {
  assert.strictEqual(failure._tag, tag);
  return failure as Extract<ProcuratError, { _tag: T }>;
};

/** Retries would only make the failure tests slow; the mapping is what is under test. */
const noRetry = ProcuratRetry.layer({
  while: () => false,
  schedule: Schedule.stop,
  times: 0,
});

const clientWith = (routes: Readonly<Record<string, StubReply>>, dateFormat?: DateFormat) => {
  const stub = stubHttpClient(routes);
  const layer = ProcuratClient.layer({
    baseUrl: BASE_URL,
    apiKey: Redacted.make('test-key'),
    dateFormat,
  }).pipe(Layer.provide(Layer.mergeAll(stub.layer, noRetry)));
  return { stub, layer };
};

const countryWire = { id: 3, idx: 'IE', iso: 'IRL', name: 'Ireland' };

const addressWire = {
  id: 42,
  street: 'Baker Street',
  zip: 'NW1 6XE',
  city: 'London',
  nameline2: null,
  additional: null,
  district: null,
  poBox: null,
  poBoxZip: null,
  countyId: null,
  countryId: 1,
};

const createAddress = {
  personId: null,
  street: 'Baker Street',
  city: 'London',
  zip: 'NW1 6XE',
  countryId: 1,
  additional: null,
  nameline2: null,
  district: null,
  poBoxZip: null,
  poBox: null,
  countyId: null,
};

const absenceWire = {
  id: 5,
  personId: 7,
  date: '2024-05-01',
  excused: true,
  parentsInformed: true,
  note: null,
  medicalCertificateReceived: null,
  medicalCertificateRequested: null,
  medicalCertificateRequired: false,
};

const createAbsence = {
  personId: 7,
  startDate: IsoDate.make('2024-05-01'),
  endDate: IsoDate.make('2024-05-03'),
  includeWeekend: false,
  excused: true,
  parentsInformed: true,
  medicalCertificateRequired: false,
};

const groupWire = {
  id: 1,
  parentGroupId: null,
  name: 'Choir',
  shortName: 'CHR',
  type: 'GROUP',
  grades: [],
  schoolYear: null,
  additionalType: null,
  sortKey: 0,
};

describe('ProcuratClient over a v3 HttpClient', () => {
  it.effect('decodes a canned response through the full layer stack', () =>
    Effect.gen(function* () {
      const { layer, stub } = clientWith({ '/countries/3': { status: 200, body: countryWire } });

      const country = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.country.findById({ id: 3 });
      }).pipe(Effect.provide(layer));

      assert.strictEqual(country.name, 'Ireland');
      assert.strictEqual(stub.sent[0]?.path, '/countries/3');
      assert.strictEqual(stub.sent[0]?.headers['x-api-key'], 'test-key');
    }),
  );

  it.effect('sends an encoded body on create and decodes the answer', () =>
    Effect.gen(function* () {
      const { layer, stub } = clientWith({ '/addresses': { status: 200, body: addressWire } });

      const address = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.address.create({ address: createAddress });
      }).pipe(Effect.provide(layer));

      assert.strictEqual(address.id, 42);
      assert.strictEqual(stub.sent[0]?.method, 'POST');
      assert.deepStrictEqual(stub.sent[0]?.body, createAddress);
    }),
  );

  /**
   * Typechecking is the point: a download stream must be the caller's own `effect`
   * `Stream`. If the bundled declarations carry their own copy, its `unique symbol`
   * type id differs and `Stream.runCollect` here rejects the value.
   */
  it.effect('hands back a stream the caller’s own effect combinators accept', () =>
    Effect.gen(function* () {
      const { layer } = clientWith({ '/files/shared/download/note.txt': { status: 200, body: 'file-bytes' } });

      const bytes = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        const stream = yield* client.file.downloadPublicFile({ path: 'note.txt' });
        return yield* Stream.runCollect(stream);
      }).pipe(Effect.provide(layer));

      const decoded = new TextDecoder().decode(
        Uint8Array.from(Chunk.toReadonlyArray(bytes).flatMap((chunk) => [...chunk])),
      );
      assert.strictEqual(decoded, JSON.stringify('file-bytes'));
    }),
  );
});

describe('the date format an installation expects', () => {
  it.effect('writes date-only strings by default', () =>
    Effect.gen(function* () {
      const { layer, stub } = clientWith({ '/absences': { status: 200, body: absenceWire } });

      const absence = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.absence.create({ absence: createAbsence });
      }).pipe(Effect.provide(layer));

      assert.strictEqual(absence.date, '2024-05-01');
      assert.deepStrictEqual(stub.sent[0]?.body, { ...createAbsence });
    }),
  );

  it.effect('writes timestamps when the installation still runs the old API', () =>
    Effect.gen(function* () {
      const { layer, stub } = clientWith({ '/absences': { status: 200, body: absenceWire } }, 'timestamp');

      yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.absence.create({ absence: createAbsence });
      }).pipe(Effect.provide(layer));

      assert.deepStrictEqual(stub.sent[0]?.body, {
        ...createAbsence,
        startDate: '2024-05-01T00:00:00.000Z',
        endDate: '2024-05-03T00:00:00.000Z',
      });
    }),
  );

  it.effect('reads a timestamp response whatever the write format is', () =>
    Effect.gen(function* () {
      const { layer } = clientWith(
        { '/absences/5': { status: 200, body: { ...absenceWire, date: '2024-05-01T00:00:00.000Z' } } },
        'iso-date',
      );

      const absence = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.absence.findById({ id: 5 });
      }).pipe(Effect.provide(layer));

      assert.strictEqual(absence.date, '2024-05-01');
    }),
  );
});

describe('error mapping over a v3 HttpClient', () => {
  it.effect('turns a 404 into ProcuratNotFoundError carrying the operation', () =>
    Effect.gen(function* () {
      const { layer } = clientWith({
        '/countries/999': { status: 404, body: { code: 4004, error: 'country not found' } },
      });

      const raised = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.country.findById({ id: 999 });
      }).pipe(Effect.provide(layer), Effect.flip);

      const failure = withTag(raised, 'ProcuratNotFoundError');
      assert.strictEqual(failure.operation, 'country.findById');
      assert.strictEqual(failure.endpoint, `${BASE_URL}/countries/999`);
      assert.strictEqual(failure.status, 404);
      assert.strictEqual(failure.code, 4004);
      assert.strictEqual(failure.message, 'country not found');
    }),
  );

  it.effect('turns a transport failure into ProcuratUnavailableError with no status', () =>
    Effect.gen(function* () {
      const { layer } = clientWith({
        '/countries': { transportFailure: 'connection refused' },
      });

      const raised = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.country.findAll();
      }).pipe(Effect.provide(layer), Effect.flip);

      const failure = withTag(raised, 'ProcuratUnavailableError');
      assert.strictEqual(failure.kind, 'transport');
      assert.strictEqual(failure.status, null);
      assert.strictEqual(failure.operation, 'country.findAll');
    }),
  );

  it.effect('keeps a non-envelope error body as the message instead of failing to decode it', () =>
    Effect.gen(function* () {
      const { layer } = clientWith({
        '/groups/1': { status: 503, body: '<html>bad gateway</html>' },
      });

      const raised = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.group.findById({ groupId: 1 });
      }).pipe(Effect.provide(layer), Effect.flip);

      const failure = withTag(raised, 'ProcuratUnavailableError');
      assert.strictEqual(failure.kind, 'server');
      assert.strictEqual(failure.status, 503);
      assert.strictEqual(failure.code, null);
    }),
  );

  it.effect('reports a body the schema rejects as ProcuratDecodeError, keeping the raw body', () =>
    Effect.gen(function* () {
      const { layer } = clientWith({
        '/groups/1': { status: 200, body: { ...groupWire, id: 'not-a-number' } },
      });

      const raised = yield* Effect.gen(function* () {
        const client = yield* ProcuratClient;
        return yield* client.group.findById({ groupId: 1 });
      }).pipe(Effect.provide(layer), Effect.flip);

      const failure = withTag(raised, 'ProcuratDecodeError');
      assert.deepStrictEqual((failure.body as { id: unknown }).id, 'not-a-number');
    }),
  );
});
