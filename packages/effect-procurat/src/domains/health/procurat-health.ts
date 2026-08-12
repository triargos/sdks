import { Context, Effect, Layer } from 'effect';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import type { DateFormat } from '../../shared/date';
import type { ProcuratError } from '../../shared/errors';
import { ProcuratHttpClient } from '../../shared/http-client';
import { Health } from './health-schema';

/** The first build that accepts date-only strings on write. */
const isoDateBuild = 726;

export class ProcuratHealth extends Context.Service<ProcuratHealth>()('ProcuratHealth', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const get = operation('health.get', () => http.get('/health').pipe(Effect.flatMap(decodeJson(Health))));

    /**
     * TEMPORARY. Asks the installation which wire format it accepts on write, so a caller
     * does not have to read build numbers. Goes with the rollover block in `shared/date`.
     */
    const determineDateStyle = operation(
      'health.determineDateStyle',
      (): Effect.Effect<DateFormat, ProcuratError> =>
        get().pipe(Effect.map((health) => (health.build > isoDateBuild ? 'iso-date' : 'timestamp'))),
    );

    return { get, determineDateStyle };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
