import type { Claim } from './rule';

/**
 * Constructs that exist in Effect v3 under the same name with the same meaning.
 * Claimed without rewriting.
 *
 * Adding a name here is a promise the two majors agree. `Schema.Date` and
 * `Schema.optional` are the counter-examples: same name, different behaviour, so
 * they belong to a rule instead.
 */
export const identicalInV3: ReadonlyArray<Claim> = [
  'effect',

  'Schema.Array',
  'Schema.Boolean',
  'Schema.Class',
  'Schema.Null',
  'Schema.NullOr',
  'Schema.Number',
  'Schema.String',
  'Schema.Struct',
  'Schema.Unknown',

  'Effect.Effect',
  'Effect.asVoid',
  'Effect.flatMap',
  'Effect.gen',
  'Effect.map',
  'Effect.mapError',
  'Effect.orDie',
  'Effect.orElseSucceed',
  'Effect.promise',
  'Effect.provideService',
  'Effect.serviceOption',
  'Effect.withSpan',

  // Both majors take `Layer.effect(tag)(effect)` and `Layer.effect(tag, effect)`.
  'Layer.Layer',
  'Layer.effect',
  'Layer.mergeAll',
  'Layer.provide',
  'Layer.succeed',

  'Data.TaggedError',

  'Stream.Stream',
  'Stream.mapError',
  'Stream.toReadableStream',

  'Config.Config',
  'Config.redacted',
  'Config.string',

  'Redacted.Redacted',
  'Redacted.value',

  'Option.getOrElse',

  'Schedule.Schedule',
  'Schedule.exponential',
  'Schedule.jittered',

  // `HttpClient.HttpClient.With<E>` spells the same in both majors.
  'HttpClient.HttpClient',
  'HttpClient.filterStatusOk',
  'HttpClient.mapRequest',
  'HttpClient.retryTransient',

  'HttpClientRequest.acceptJson',
  'HttpClientRequest.bodyFormData',
  'HttpClientRequest.get',
  'HttpClientRequest.post',
  'HttpClientRequest.prependUrl',
  'HttpClientRequest.put',
  'HttpClientRequest.schemaBodyJson',
  'HttpClientRequest.setHeader',
  'HttpClientRequest.setUrlParams',

  'HttpBody.HttpBody',

  // Type-only named imports, used bare. The module specifier moves; the name does not.
  'HttpClientError',
  'HttpClientResponse',
];
