import { Context, Effect, Layer } from 'effect';
import { decodeJson } from '../../internal/decode';
import { operation } from '../../internal/operation';
import { ProcuratHttpClient } from '../../shared/http-client';
import { Health } from './health-schema';

export class ProcuratHealth extends Context.Service<ProcuratHealth>()('ProcuratHealth', {
  make: Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const get = operation('health.get', () => http.get('/health').pipe(Effect.flatMap(decodeJson(Health))));

    return { get };
  }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
