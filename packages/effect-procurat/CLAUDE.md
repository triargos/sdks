# Effect-Procurat SDK

An Effect-based SDK for the Procurat API (German school management system). This package provides a strongly-typed, Effect-based wrapper with comprehensive error handling and schema validation.

## Package Info

- **Package name:** `@triargos/effect-procurat`
- **Peer dependencies:** `effect@^3.18.4`, `@effect/platform@^0.92.1`
- **Build:** ESM-only, TypeScript with strict mode

## Exports

```typescript
import { ProcuratClient } from "@triargos/effect-procurat"        // Main client
import { PersonSchema, ... } from "@triargos/effect-procurat/schemas"  // All schemas
import { PersonNotFoundError, ... } from "@triargos/effect-procurat/errors"  // All errors
```

## File Structure

```
src/
├── index.ts                    # Main export (ProcuratClient)
├── client.ts                   # ProcuratClient service orchestrator
├── http-client.ts              # HTTP client wrapper with error handling
├── schemas.ts                  # Schema re-exports
├── errors.ts                   # Error re-exports
│
├── modules/                    # API operation implementations
│   └── procurat-{entity}.ts    # One file per entity
│
├── schema/                     # Data validation schemas
│   └── {entity}-schema.ts      # One file per entity
│
├── error/                      # Domain-specific errors
│   ├── procurat-errors.ts      # Base HTTP errors (400, 401, 404, 5xx)
│   └── {entity}-errors.ts      # One file per entity
│
└── utils/
    └── error-parsing.ts        # Error filtering utility
```

## How to Add a New Module

### 1. Create the Schema (`src/schema/{entity}-schema.ts`)

```typescript
import { Schema } from "effect"

// Main entity schema (for API responses)
export class EntitySchema extends Schema.Class<EntitySchema>("EntitySchema")({
  id: Schema.Number,
  name: Schema.String,
  optionalField: Schema.NullOr(Schema.String),  // Use NullOr for nullable fields
  createdAt: Schema.NullOr(Schema.DateFromString),
}) {}

// Create schema (no id, minimal required fields)
export class CreateEntitySchema extends Schema.Class<CreateEntitySchema>("CreateEntitySchema")({
  name: Schema.String,
}) {}

// Update schema (all optional except id)
export class UpdateEntitySchema extends Schema.Class<UpdateEntitySchema>("UpdateEntitySchema")({
  id: Schema.Number,
  name: Schema.optional(Schema.String),
}) {}
```

### 2. Create the Errors (`src/error/{entity}-errors.ts`)

```typescript
import { Schema } from "effect"
import {
  ProcuratBadRequestError,
  ProcuratNotFoundError,
  ProcuratServerError,
} from "./procurat-errors.js"

// NotFound error (for findById)
export class EntityNotFoundError extends Schema.TaggedError<EntityNotFoundError>()(
  "EntityNotFoundError",
  {
    entityId: Schema.Number,
    cause: ProcuratNotFoundError,
  }
) {}

// Generic find error (server errors)
export class FindEntityError extends Schema.TaggedError<FindEntityError>()(
  "FindEntityError",
  {
    entityId: Schema.Number,
    cause: ProcuratServerError,
  }
) {}

// List error
export class ListEntitiesError extends Schema.TaggedError<ListEntitiesError>()(
  "ListEntitiesError",
  {
    cause: ProcuratServerError,
  }
) {}

// Create error (include data for retry/logging)
export class CreateEntityError extends Schema.TaggedError<CreateEntityError>()(
  "CreateEntityError",
  {
    cause: Schema.Union(ProcuratServerError, ProcuratBadRequestError),
    data: CreateEntitySchema,
  }
) {}

// Update error
export class UpdateEntityError extends Schema.TaggedError<UpdateEntityError>()(
  "UpdateEntityError",
  {
    entityId: Schema.Number,
    cause: Schema.Union(ProcuratServerError, ProcuratBadRequestError),
    data: UpdateEntitySchema,
  }
) {}
```

### 3. Create the Module (`src/modules/procurat-{entity}.ts`)

```typescript
import { Effect } from "effect"
import { ProcuratHttpClient, schemaBodyJson } from "../http-client.js"
import { removeUnrecoverableErrors } from "../utils/error-parsing.js"
import { EntitySchema, CreateEntitySchema, UpdateEntitySchema } from "../schema/entity-schema.js"
import {
  EntityNotFoundError,
  FindEntityError,
  ListEntitiesError,
  CreateEntityError,
  UpdateEntityError,
} from "../error/entity-errors.js"
import type { ProcuratCommonErrors } from "../error/procurat-errors.js"

export class ProcuratEntity extends Effect.Service<ProcuratEntity>()(
  "ProcuratEntity",
  {
    effect: Effect.gen(function* () {
      const http = yield* ProcuratHttpClient

      // List all entities
      const findAll = Effect.fn("entity.findAll")(function* (): Effect.Effect<
        ReadonlyArray<EntitySchema>,
        ListEntitiesError | ProcuratCommonErrors
      > {
        return yield* http.get("/entities").pipe(
          schemaBodyJson(Schema.Array(EntitySchema)),
          removeUnrecoverableErrors,
          Effect.catchTag("ProcuratServerError", (cause) =>
            new ListEntitiesError({ cause })
          ),
        )
      })

      // Find by ID
      const findById = Effect.fn("entity.findById")(function* (
        entityId: number
      ): Effect.Effect<
        EntitySchema,
        EntityNotFoundError | FindEntityError | ProcuratCommonErrors
      > {
        return yield* http.get(`/entities/${entityId}`).pipe(
          schemaBodyJson(EntitySchema),
          removeUnrecoverableErrors,
          Effect.catchTag("ProcuratNotFoundError", (cause) =>
            new EntityNotFoundError({ entityId, cause })
          ),
          Effect.catchTag("ProcuratServerError", (cause) =>
            new FindEntityError({ entityId, cause })
          ),
        )
      })

      // Create
      const create = Effect.fn("entity.create")(function* (
        data: typeof CreateEntitySchema.Type
      ): Effect.Effect<
        EntitySchema,
        CreateEntityError | ProcuratCommonErrors
      > {
        return yield* http.post("/entities", data).pipe(
          schemaBodyJson(EntitySchema),
          removeUnrecoverableErrors,
          Effect.catchTags({
            ProcuratServerError: (cause) => new CreateEntityError({ cause, data }),
            ProcuratBadRequestError: (cause) => new CreateEntityError({ cause, data }),
          }),
        )
      })

      // Update
      const update = Effect.fn("entity.update")(function* (
        data: typeof UpdateEntitySchema.Type
      ): Effect.Effect<
        SuccessResponseSchema,
        UpdateEntityError | ProcuratCommonErrors
      > {
        return yield* http.put(`/entities/${data.id}`, data).pipe(
          schemaBodyJson(SuccessResponseSchema),
          removeUnrecoverableErrors,
          Effect.catchTags({
            ProcuratServerError: (cause) =>
              new UpdateEntityError({ entityId: data.id, cause, data }),
            ProcuratBadRequestError: (cause) =>
              new UpdateEntityError({ entityId: data.id, cause, data }),
          }),
        )
      })

      return { findAll, findById, create, update }
    }),
  }
) {}
```

### 4. Wire Up the Module

1. **Add schema exports** to `src/schemas.ts`:
   ```typescript
   export * from "./schema/entity-schema.js"
   ```

2. **Add error exports** to `src/errors.ts`:
   ```typescript
   export * from "./error/entity-errors.js"
   ```

3. **Add to ProcuratClient** in `src/client.ts`:
   ```typescript
   import { ProcuratEntity } from "./modules/procurat-entity.js"

   // In the service definition
   const entity = yield* ProcuratEntity

   // In the return object
   return { ..., entity }
   ```

4. **Update build config** if needed (tsup.config.ts entries)

## Conventions & Practices

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Module file | `procurat-{entity}.ts` | `procurat-person.ts` |
| Schema file | `{entity}-schema.ts` | `person-schema.ts` |
| Error file | `{entity}-errors.ts` | `person-errors.ts` |
| Schema class | `{Entity}Schema` | `PersonSchema` |
| Create schema | `Create{Entity}Schema` | `CreatePersonSchema` |
| Update schema | `Update{Entity}Schema` | `UpdatePersonSchema` |
| NotFound error | `{Entity}NotFoundError` | `PersonNotFoundError` |
| Operation error | `{Operation}{Entity}Error` | `CreatePersonError` |

### Function Naming for Tracing

Always use `Effect.fn()` with descriptive names:
- `'entity.findAll'`
- `'entity.findById'`
- `'entity.create'`
- `'entity.update'`
- `'group.findMembers'`

### Error Handling Pipeline

Every HTTP call should follow this pattern:

```typescript
http.get(path).pipe(
  schemaBodyJson(Schema),        // 1. Parse response body
  removeUnrecoverableErrors,     // 2. Die on ParseError/ResponseError
  Effect.catchTag(...),          // 3. Map to domain errors
)
```

### Type Annotations

Add explicit return type annotations for complex functions:

```typescript
const findById = Effect.fn("entity.findById")(function* (
  entityId: number
): Effect.Effect<
  EntitySchema,
  EntityNotFoundError | FindEntityError | ProcuratCommonErrors
> {
  // ...
})
```

### Observability

Add span annotations for contextual data:

```typescript
yield* Effect.annotateCurrentSpan({ entityId, options })
```

### Schema Patterns

- Use `Schema.NullOr()` for nullable API fields
- Use `Schema.DateFromString` for date parsing
- Use `Schema.Literal()` for enums: `Schema.Literal('active', 'inactive')`
- Share base fields with spreading: `...BaseSchema.fields`

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
