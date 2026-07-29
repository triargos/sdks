import { Context, Layer, Schedule } from 'effect';
import type { ProcuratError } from './errors';

export interface ProcuratRetryPolicy {
  readonly while: (error: ProcuratError) => boolean;
  readonly schedule: Schedule.Schedule<unknown>;
  readonly times: number;
}

/**
 * Optional. When absent `ProcuratHttpClient.layer` applies `defaultPolicy`, so
 * installing this service is only needed to override it.
 */
export class ProcuratRetry extends Context.Service<ProcuratRetry, ProcuratRetryPolicy>()('ProcuratRetry') {
  static readonly defaultPolicy: ProcuratRetryPolicy = {
    while: (error) => error._tag === 'ProcuratUnavailableError',
    schedule: Schedule.exponential('200 millis').pipe(Schedule.jittered),
    times: 3,
  };

  static readonly default: Layer.Layer<ProcuratRetry> = Layer.succeed(this)(this.defaultPolicy);

  static layer(policy: ProcuratRetryPolicy): Layer.Layer<ProcuratRetry> {
    return Layer.succeed(this)(policy);
  }
}
