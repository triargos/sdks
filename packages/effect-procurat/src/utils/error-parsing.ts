import { Effect } from 'effect';
import { ResponseError } from '@effect/platform/HttpClientError';
import { ParseError } from 'effect/ParseResult';

export function removeUnrecoverableErrors<A, E>(effect: Effect.Effect<A, E | ResponseError | ParseError>) {
  return effect.pipe(Effect.catchTag('ParseError', 'ResponseError', Effect.die));
}