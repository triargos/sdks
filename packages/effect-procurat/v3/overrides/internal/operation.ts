import { Context, Effect } from 'effect';
import type { ProcuratError } from '../shared/errors';

// v4 spells a reference as a const; v3 spells it as a class.
export class CurrentOperation extends Context.Reference<CurrentOperation>()('ProcuratCurrentOperation', {
  defaultValue: () => 'unknown',
}) {}

/**
 * Names the span and the operation carried on any error raised inside `body`.
 * The `ProcuratError` bound is the seam that keeps foreign errors — `HttpBodyError`,
 * `ParseError` — from reaching a public signature.
 */
export const operation =
  <Args extends ReadonlyArray<any>, A, R>(name: string, body: (...args: Args) => Effect.Effect<A, ProcuratError, R>) =>
  (...args: Args): Effect.Effect<A, ProcuratError, R> =>
    body(...args).pipe(Effect.provideService(CurrentOperation, name), Effect.withSpan(name));
