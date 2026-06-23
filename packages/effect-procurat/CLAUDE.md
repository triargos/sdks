# Effect-Procurat SDK

An Effect-based SDK for the Procurat API (German school management system). Strongly-typed,
Effect-based wrapper with a small error surface and schema validation, organized per domain.

## Package Info

- **Package name:** `@triargos/effect-procurat`
- **Peer dependencies:** `effect@^3.18.4`, `@effect/platform@^0.92.1`
- **Build:** ESM-only, TypeScript strict mode

## Exports

```typescript
import { ProcuratClient } from "@triargos/effect-procurat"                  // Main client (Context.Tag)
import { PersonSchema, ... } from "@triargos/effect-procurat/schemas"       // All schemas
import { ProcuratError, PersonNotFound, ... } from "@triargos/effect-procurat/errors"  // All errors
```

The consumer must provide a platform `HttpClient` layer (e.g. `FetchHttpClient.layer`); `ProcuratClient.layer({ apiKey, baseUrl })` requires it and provides `ProcuratClient`.

## File Structure

Schemas, errors, and the implementation are grouped **per domain**. Cross-cutting infrastructure
lives under `shared/`. The `./schemas` and `./errors` entrypoints are barrels that re-export from the
domain folders.

```
src/
├── index.ts                          # export { ProcuratClient }
├── client.ts                         # ProcuratClient orchestrator (Context.Tag)
├── schemas.ts                        # barrel: re-exports every domains/*/*-schema
├── errors.ts                         # barrel: re-exports shared/errors + every domains/*/*-errors
│
├── shared/
│   ├── errors.ts                     # ProcuratError, UnknownProcuratError, ProcuratErrorSchema
│   └── http-client.ts                # ProcuratHttpClient (Context.Tag wrapping platform HttpClient)
│
└── domains/<entity>/
    ├── <entity>-schema.ts            # data schemas (keep original filenames; a domain may hold several)
    ├── <entity>-errors.ts           # domain errors — ONLY if this entity owns any
    └── procurat-<entity>.ts         # the service (Context.Tag)
```

Errors are keyed by **entity** but raised by **many** domains (e.g. `PersonNotFound` is raised by
person, absence, communication, contact-information, relationship). Each `<Entity>NotFound` /
`<Entity>ValidationError` lives in that entity's folder; other domains import it across folders.
Domains that own no error of their own (`communication`, `file`, `lookup-table`) have no `*-errors.ts`.

## Error model

The error surface is intentionally small. Two infrastructure errors plus per-entity domain errors:

| Error | When | What the consumer does |
|-------|------|------------------------|
| `ProcuratError` `{ status, code, message, endpoint }` | Any non-OK HTTP response not mapped to a domain error (401, 403, 5xx, unmapped 4xx) | Switch on `status` — re-auth on 401, retry on 5xx |
| `UnknownProcuratError` `{ message, cause }` | No usable response: network, body serialization, or schema decode failure | Log, retry, generic error |
| `<Entity>NotFound` | A `findById` / `update` / `delete` 404, mapped per entity | Show 404, create, fallback |
| `<Entity>ValidationError` `{ message, code, input, ... }` | A `create` / `update` 400, mapped per entity | Surface to user, fix input, retry |

There is **one** transport error (`ProcuratError`), not four. The HTTP client (`shared/http-client.ts`)
turns every non-OK response into a `ProcuratError`; a method maps the statuses it cares about (404, 400)
to domain errors and lets the rest flow through. GET/list operations map nothing, so they never carry a
spurious bad-request error.

### Mapping pattern

A method that maps a status to a domain error uses a single `catchTag('ProcuratError', ...)` that
switches on `e.status`. The handler **requires an explicit return annotation** and each branch must be
`Effect.fail(...)` — without the annotation, `catchTag` collapses the union and the types won't compile.

```typescript
// findById — map 404 to a domain error, let other statuses pass through
http.get(`/persons/${id}`).pipe(
  Effect.flatMap(HttpClientResponse.schemaBodyJson(PersonSchema)),
  Effect.catchTag('ProcuratError', (e): Effect.Effect<never, PersonNotFound | ProcuratError> =>
    e.status === 404 ? Effect.fail(new PersonNotFound({ personId: id })) : Effect.fail(e),
  ),
  Effect.catchTags({
    RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
  }),
)

// create — map 400 to a validation error
Effect.catchTag('ProcuratError', (e): Effect.Effect<never, PersonValidationError | ProcuratError> =>
  e.status === 400
    ? Effect.fail(new PersonValidationError({ message: e.message, code: e.code, input: person }))
    : Effect.fail(e),
)

// list / findAll — map nothing; ProcuratError just flows through the channel
http.get('/persons').pipe(
  Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(PersonSchema))),
  Effect.catchTags({ RequestError: ..., ResponseError: ..., ParseError: ... }),
)
```

`HttpBodyError` is added to the `catchTags` set only for methods that serialize a request body
(`create` / `update`). Stream download/upload methods that only encounter `RequestError` keep just that.

## Service pattern (Context.Tag)

Services are `Context.Tag` classes (never `Effect.Service`). The dependency (`ProcuratHttpClient`) is
yielded once inside `make`; methods carry no `R`. The layer is a static on the tag. The canonical
example is `src/domains/person/procurat-person.ts`.

```typescript
import { Context, Effect, Layer, Schema } from 'effect'
import { ProcuratHttpClient } from '../../shared/http-client'
import { ProcuratError, UnknownProcuratError } from '../../shared/errors'
import { EntityNotFound, EntityValidationError } from './entity-errors'

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient
  const findById: (args: { id: number }) => Effect.Effect<
    EntitySchema, EntityNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('entity.findById')(function* ({ id }: { id: number }) { /* ... */ })
  return { findById /* , ... */ }
})

export class ProcuratEntity extends Context.Tag('@triargos/procurat/Entity')<
  ProcuratEntity,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratEntity, make)
}
```

The tag's service shape is derived with `Effect.Effect.Success<typeof make>` — no hand-written interface.

## How to add a new domain

1. **Create `src/domains/<entity>/<entity>-schema.ts`** with the `Schema.Class` models
   (`EntitySchema`, `CreateEntitySchema`, `UpdateEntitySchema`).
2. **Create `src/domains/<entity>/<entity>-errors.ts`** *only if* the entity owns errors
   (`EntityNotFound`, `EntityValidationError`). Reuse another entity's error if the failure is about
   that entity (import it from `../<other>/<other>-errors`).
3. **Create `src/domains/<entity>/procurat-<entity>.ts`** following the Context.Tag pattern above and
   the mapping pattern from the error-model section.
4. **Wire it up:**
   - add `export * from './domains/<entity>/<entity>-schema'` to `src/schemas.ts`
   - add `export * from './domains/<entity>/<entity>-errors'` to `src/errors.ts` (if it has errors)
   - in `src/client.ts`: import the tag, add `ProcuratEntity.layer` to `Layer.mergeAll`, yield it in
     `make`, and add it to the returned object.

## Conventions

| Item | Pattern | Example |
|------|---------|---------|
| Domain folder | `src/domains/<entity>/` | `src/domains/person/` |
| Module file | `procurat-<entity>.ts` | `procurat-person.ts` |
| Schema file | `<entity>-schema.ts` | `person-schema.ts` |
| Errors file | `<entity>-errors.ts` | `person-errors.ts` |
| Tag id | `@triargos/procurat/<Name>` | `@triargos/procurat/Person` |
| Span name | `<entity>.<method>` (via `Effect.fn`) | `person.findById` |

- `Schema.NullOr()` for nullable API fields; `Schema.DateFromString` for dates; `Schema.Literal()` for enums.
- Add span annotations for contextual data: `yield* Effect.annotateCurrentSpan({ id })`.

## Scripts

```bash
pnpm build      # clean + tsup (ESM + d.ts)
pnpm dev        # watch
pnpm typecheck  # tsc --noEmit
pnpm release    # build + changeset publish
```

## Effect Best Practices

**IMPORTANT:** Always consult effect-solutions before writing Effect code.
Run `effect-solutions list`, then `effect-solutions show <topic>...` for relevant patterns.
Never guess at Effect patterns — check the guide first.
