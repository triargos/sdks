import { Context, Effect } from 'effect';
import type { ProcuratError } from '../error/procurat-errors';

export const CurrentOperation = Context.Reference<string>('ProcuratCurrentOperation', {
  defaultValue: () => 'unknown',
});

/**
 * Only scalars from the first argument are annotated — the rest of an argument
 * can be a stream or a whole request payload, neither of which belongs in a span.
 */
const spanAttributes = (arg: unknown): Record<string, string | number | boolean> => {
  if (typeof arg !== 'object' || arg === null || Array.isArray(arg)) return {};
  const attributes: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(arg)) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      attributes[key] = value;
    }
  }
  return attributes;
};

/**
 * Names the span and the operation carried on any error raised inside `body`.
 * The `ProcuratError` bound is the seam that keeps foreign errors — `HttpBodyError`,
 * `SchemaError` — from reaching a public signature.
 */
export const operation =
  <Args extends ReadonlyArray<any>, A, R>(name: string, body: (...args: Args) => Effect.Effect<A, ProcuratError, R>) =>
  (...args: Args): Effect.Effect<A, ProcuratError, R> =>
    body(...args).pipe(
      Effect.provideService(CurrentOperation, name),
      Effect.withSpan(name, { attributes: spanAttributes(args[0]) }),
    );
