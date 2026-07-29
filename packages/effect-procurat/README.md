# @triargos/effect-procurat

Effect-based SDK for the Procurat API.

## Install

```sh
pnpm add @triargos/effect-procurat effect
```

`effect@^4.0.0-beta.0` is a peer dependency.

## Provide a transport

The SDK does not ship an HTTP transport. Pick one from `effect/unstable/http` and provide it
alongside the client layer — `FetchHttpClient.layer` works everywhere `fetch` does.

```ts
import { Effect, Layer, Redacted } from 'effect';
import { FetchHttpClient } from 'effect/unstable/http';
import { ProcuratClient } from '@triargos/effect-procurat';

const ProcuratLive = ProcuratClient.layer({
  apiKey: Redacted.make(process.env.PROCURAT_API_KEY!),
  baseUrl: 'https://procurat.example.com/api',
}).pipe(Layer.provide(FetchHttpClient.layer));
```

Or read both from the environment (`PROCURAT_API_KEY`, `PROCURAT_BASE_URL`):

```ts
const ProcuratLive = ProcuratClient.layerConfig().pipe(Layer.provide(FetchHttpClient.layer));
```

## Use it

Every method takes a single `params` object and fails with `ProcuratError`.

```ts
import { Effect } from 'effect';
import { ProcuratClient } from '@triargos/effect-procurat';

const program = Effect.gen(function* () {
  const procurat = yield* ProcuratClient;

  const person = yield* procurat.person.findById({ id: 42 });

  const optional = yield* procurat.person
    .findById({ id: 99 })
    .pipe(Effect.catchTag('ProcuratNotFoundError', () => Effect.succeed(null)));

  yield* procurat.person.update({ person: { ...person, comment: 'synced' } });

  return { person, optional };
});
```

Because every operation shares one error union, a fan-out sync collects failures that are already
self-describing — each error carries the `operation` and `endpoint` it came from:

```ts
const results =
  yield *
  Effect.forEach(ids, (id) => procurat.person.findById({ id }), {
    mode: 'either',
    concurrency: 8,
  });
```

## Errors

All failures are `Data.TaggedError` classes; catch them with `Effect.catchTag`.

| tag                       | cause                              | retried |
| ------------------------- | ---------------------------------- | ------- |
| `ProcuratNotFoundError`   | 404                                | no      |
| `ProcuratBadRequestError` | 400, 409, 422                      | no      |
| `ProcuratAuthError`       | 401, 403                           | no      |
| `ProcuratUnavailableError` | 5xx, unmapped status, no response | **yes** |
| `ProcuratDecodeError`     | response shape drift               | no      |

Every error carries `operation` and `endpoint`. HTTP response failures also carry `status`, `code`,
and `message`. `ProcuratBadRequestError` carries the rejected `payload` for dead-lettering.
`ProcuratUnavailableError.kind` distinguishes server and transport failures, while
`ProcuratDecodeError` carries the raw `body` that failed to decode.

An error body that is not Procurat's `{ code, error }` envelope — an HTML page from a reverse
proxy, say — still surfaces as a typed error, with `code: null` and the raw text as `message`.

## Retries

`ProcuratUnavailableError` is retried 3 times with jittered exponential backoff starting at 200ms.
Procurat does not send `Retry-After`, so none is honoured.

Install `ProcuratRetry` to change the policy for every call:

```ts
import { Schedule } from 'effect';
import { ProcuratRetry } from '@triargos/effect-procurat';

const NoRetries = ProcuratRetry.layer({
  while: () => false,
  schedule: Schedule.forever,
  times: 0,
});

const ProcuratLive = ProcuratClient.layer({ apiKey, baseUrl }).pipe(
  Layer.provide(NoRetries),
  Layer.provide(FetchHttpClient.layer),
);
```

## Schemas

Response and request types live on `@triargos/effect-procurat/schemas` — `Person`, `CreatePerson`,
`Address`, `Group`, and so on. Request types are plain object shapes: pass an object literal, no
constructor call.

## File uploads

`file.upload*` buffers the whole stream into memory before sending it, because the endpoint takes
multipart and `FormData` needs a materialized blob. Size uploads accordingly.
