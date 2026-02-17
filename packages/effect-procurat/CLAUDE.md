# Effect-Procurat SDK

An Effect-based SDK for the Procurat API (German school management system). This package provides a strongly-typed, Effect-based wrapper with simplified error handling and schema validation.

## Package Info

- **Package name:** `@triargos/effect-procurat`
- **Peer dependencies:** `effect@^3.18.4`, `@effect/platform@^0.92.1`
- **Build:** ESM-only, TypeScript with strict mode

## Exports

```typescript
import { ProcuratClient } from "@triargos/effect-procurat"        // Main client
import { PersonSchema, ... } from "@triargos/effect-procurat/schemas"  // All schemas
import { PersonNotFound, PersonValidationError, ... } from "@triargos/effect-procurat/errors"  // Domain errors
```

## File Structure

```
src/
├── index.ts                    # Main export (ProcuratClient)
├── client.ts                   # ProcuratClient service orchestrator
├── http-client.ts              # HTTP client wrapper with error handling
├── schemas.ts                  # Schema re-exports
├── errors.ts                   # All errors (domain + base HTTP)
│
├── modules/                    # API operation implementations
│   └── procurat-{entity}.ts    # One file per entity
│
└── schema/                     # Data validation schemas
    └── {entity}-schema.ts      # One file per entity
```

## Error Handling Philosophy

**Core principle:** Surface actionable errors in the error channel. Infrastructure errors (network, parsing, body serialization) are mapped to `UnknownProcuratError`. HTTP-level errors (401, 404, 5xx) from the Procurat API are surfaced as `Procurat*Error` types. Domain-specific errors (`*NotFound`, `*ValidationError`) are mapped from their HTTP counterparts via `catchTag`.

### Error Types

| Error Type | When | What consumer can do |
|------------|------|---------------------|
| `*NotFound` | Entity doesn't exist (mapped from 404) | Show 404, create it, use fallback |
| `*ValidationError` | Bad input (mapped from 400) | Show error to user, fix input, retry |
| `ProcuratUnauthorizedError` | 401 from API | Re-authenticate, show login |
| `ProcuratServerError` | 5xx from API | Retry, show error |
| `ProcuratNotFoundError` | 404 (unmapped, e.g. list ops) | Log, show error |
| `ProcuratBadRequestError` | 400 (unmapped) | Log, show error |
| `UnknownProcuratError` | Network/parse/serialization failure | Log, retry, show generic error |

### Error Pattern

```typescript
// For findById - map 404 to domain error, infrastructure → UnknownProcuratError
http.get(`/entities/${id}`).pipe(
  Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema)),
  Effect.catchTag('ProcuratNotFoundError', () => new EntityNotFound({ entityId: id })),
  Effect.catchTags({
    RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
  }),
)

// For create/update - map 400 to domain error, infrastructure → UnknownProcuratError
HttpClientRequest.post('/entities').pipe(
  HttpClientRequest.schemaBodyJson(CreateEntitySchema)(data),
  Effect.flatMap(http.execute),
  Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema)),
  Effect.catchTag('ProcuratBadRequestError', (cause) =>
    new EntityValidationError({ message: cause.message, code: cause.code, input }),
  ),
  Effect.catchTags({
    RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
  }),
)

// For list operations - infrastructure → UnknownProcuratError
http.get('/entities').pipe(
  Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(Schema))),
  Effect.catchTags({
    RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
    ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
  }),
)
```

### Available Domain Errors

**NotFound errors:**
- `PersonNotFound` - `{ personId }`
- `GroupNotFound` - `{ groupId }`
- `AddressNotFound` - `{ addressId }`
- `CountryNotFound` - `{ countryId }`
- `CountyNotFound` - `{ countyId }`
- `ReligionNotFound` - `{ religionId }`
- `GroupMembershipNotFound` - `{ groupId, personId }`

**Validation errors:**
- `PersonValidationError` - `{ message, code, input }`
- `AddressValidationError` - `{ message, code, input }`
- `GroupMemberValidationError` - `{ message, code, groupId, memberId }`
- `ContactInformationValidationError` - `{ message, code, input }`
- `RelationshipValidationError` - `{ message, code, kind, personToAddId, basePersonId }`

**Infrastructure error:**
- `UnknownProcuratError` - `{ message, cause }` — wraps network errors, parse errors, body serialization errors

### Consumer Example

```typescript
// findById returns: Effect<Person, PersonNotFound | ProcuratUnauthorizedError | ProcuratServerError | ProcuratBadRequestError | UnknownProcuratError>
// create returns: Effect<Person, PersonValidationError | ProcuratNotFoundError | ProcuratUnauthorizedError | ProcuratServerError | UnknownProcuratError>

const person = yield* client.person.findById({ id: 123 });

program.pipe(
  Effect.catchTag("PersonNotFound", (e) => {
    console.log(`Person ${e.personId} not found`);
    return Effect.succeed(null);
  }),
  Effect.catchTag("PersonValidationError", (e) => {
    return Effect.fail(new UserFacingError(e.message));
  }),
  Effect.catchTag("UnknownProcuratError", (e) => {
    console.error("Infrastructure error:", e.message, e.cause);
    return Effect.fail(new UserFacingError("Something went wrong"));
  }),
  // ProcuratUnauthorizedError, ProcuratServerError etc. still in channel for app-level handling
)
```

## How to Add a New Module

### 1. Create the Schema (`src/schema/{entity}-schema.ts`)

```typescript
import { Schema } from "effect"

export class EntitySchema extends Schema.Class<EntitySchema>("EntitySchema")({
  id: Schema.Number,
  name: Schema.String,
  optionalField: Schema.NullOr(Schema.String),
}) {}

export class CreateEntitySchema extends Schema.Class<CreateEntitySchema>("CreateEntitySchema")({
  name: Schema.String,
}) {}

export class UpdateEntitySchema extends Schema.Class<UpdateEntitySchema>("UpdateEntitySchema")({
  id: Schema.Number,
  name: Schema.optional(Schema.String),
}) {}
```

### 2. Add Domain Errors to `src/errors.ts` (if needed)

```typescript
// Only add if the entity has actionable errors

// For findById operations
export class EntityNotFound extends Schema.TaggedError<EntityNotFound>()('EntityNotFound', {
  entityId: Schema.Number,
}) {}

// For create/update operations
export class EntityValidationError extends Schema.TaggedError<EntityValidationError>()(
  'EntityValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    input: Schema.Unknown,
  },
) {}
```

### 3. Create the Module (`src/modules/procurat-{entity}.ts`)

```typescript
import { Effect, Schema } from "effect"
import { HttpClientRequest, HttpClientResponse } from "@effect/platform"
import { ProcuratHttpClient } from "../http-client"
import { EntitySchema, CreateEntitySchema } from "../schema/entity-schema"
import {
  EntityNotFound,
  EntityValidationError,
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
  ProcuratUnauthorizedError,
  UnknownProcuratError,
} from "../errors"

export class ProcuratEntity extends Effect.Service<ProcuratEntity>()(
  "ProcuratEntity",
  {
    effect: Effect.gen(function* () {
      const http = yield* ProcuratHttpClient

      const findAll: () => Effect.Effect<
        ReadonlyArray<EntitySchema>,
        | ProcuratNotFoundError
        | ProcuratUnauthorizedError
        | ProcuratServerError
        | ProcuratBadRequestError
        | UnknownProcuratError
      > = Effect.fn("entity.findAll")(function* () {
        return yield* http.get("/entities").pipe(
          Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(EntitySchema))),
          Effect.catchTags({
            RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          }),
        )
      })

      const findById: (args: {
        id: number;
      }) => Effect.Effect<
        EntitySchema,
        | EntityNotFound
        | ProcuratUnauthorizedError
        | ProcuratServerError
        | ProcuratBadRequestError
        | UnknownProcuratError
      > = Effect.fn("entity.findById")(function* ({ id }: { id: number }) {
        return yield* http.get(`/entities/${id}`).pipe(
          Effect.flatMap(HttpClientResponse.schemaBodyJson(EntitySchema)),
          Effect.catchTag("ProcuratNotFoundError", () => new EntityNotFound({ entityId: id })),
          Effect.catchTags({
            RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
          }),
        )
      })

      const create: (
        data: CreateEntitySchema,
      ) => Effect.Effect<
        EntitySchema,
        | EntityValidationError
        | ProcuratNotFoundError
        | ProcuratUnauthorizedError
        | ProcuratServerError
        | UnknownProcuratError
      > = Effect.fn("entity.create")(function* (data: CreateEntitySchema) {
        return yield* HttpClientRequest.post("/entities").pipe(
          HttpClientRequest.schemaBodyJson(CreateEntitySchema)(data),
          Effect.flatMap(http.execute),
          Effect.flatMap(HttpClientResponse.schemaBodyJson(EntitySchema)),
          Effect.catchTag("ProcuratBadRequestError", (cause) =>
            new EntityValidationError({ message: cause.message, code: cause.code, input: data }),
          ),
          Effect.catchTags({
            RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
            HttpBodyError: (e) => new UnknownProcuratError({ message: String(e), cause: e }),
          }),
        )
      })

      return { findAll, findById, create }
    }),
  }
) {}
```

### 4. Wire Up the Module

1. **Add schema exports** to `src/schemas.ts`:
   ```typescript
   export * from "./schema/entity-schema.js"
   ```

2. **Add to ProcuratClient** in `src/client.ts`:
   ```typescript
   import { ProcuratEntity } from "./modules/procurat-entity.js"

   // In dependencies
   ProcuratEntity.Default,

   // In effect
   const entity = yield* ProcuratEntity

   // In return
   return { ..., entity }
   ```

## Conventions & Practices

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Module file | `procurat-{entity}.ts` | `procurat-person.ts` |
| Schema file | `{entity}-schema.ts` | `person-schema.ts` |
| Schema class | `{Entity}Schema` | `PersonSchema` |
| NotFound error | `{Entity}NotFound` | `PersonNotFound` |
| Validation error | `{Entity}ValidationError` | `PersonValidationError` |

### Function Naming for Tracing

Always use `Effect.fn()` with descriptive names:
- `'entity.findAll'`
- `'entity.findById'`
- `'entity.create'`
- `'entity.update'`

### Observability

Add span annotations for contextual data:

```typescript
yield* Effect.annotateCurrentSpan({ entityId, options })
```

### Schema Patterns

- Use `Schema.NullOr()` for nullable API fields
- Use `Schema.DateFromString` for date parsing
- Use `Schema.Literal()` for enums: `Schema.Literal('active', 'inactive')`

## Scripts

```bash
pnpm build      # Build the package
pnpm dev        # Watch mode
pnpm typecheck  # Type check without emit
pnpm release    # Build and publish
```

<!-- effect-solutions:start -->
## Effect Best Practices

**IMPORTANT:** Always consult effect-solutions before writing Effect code.

1. Run `effect-solutions list` to see available guides
2. Run `effect-solutions show <topic>...` for relevant patterns (supports multiple topics)
3. Search `.reference/effect/` for real implementations (run `effect-solutions setup` first)

Topics: quick-start, project-setup, tsconfig, basics, services-and-layers, data-modeling, error-handling, config, testing, cli.

Never guess at Effect patterns - check the guide first.
<!-- effect-solutions:end -->
