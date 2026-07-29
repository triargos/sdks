import { Effect } from 'effect';
import type { SchemaError } from 'effect/SchemaError';
import type { HttpClientError } from 'effect/unstable/http/HttpClientError';

export function removeUnrecoverableErrors<A, E>(effect: Effect.Effect<A, E | HttpClientError | SchemaError>) {
  return effect.pipe(Effect.catchTag(['SchemaError', 'HttpClientError'], Effect.die));
}
