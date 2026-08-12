# Effect v3 compatibility

`src/` targets Effect v4 and is the only source of truth. The `/v3` subpath is
generated from it at build time by a codemod with a closed rule table. Nothing
generated is committed.

## Commands

Run from `packages/effect-procurat`:

| Command | Does |
| --- | --- |
| `pnpm v3:generate` | rewrite `src/` into `v3/generated/` |
| `pnpm v3:build` | generate, typecheck against `effect@3`, build `dist/v3` |
| `pnpm v3:check` | build, then run the smoke tests against the built artifact |

`pnpm build` runs the v4 build and `v3:build`, so `dist/` always holds both.

## When CI says "unhandled construct"

The claim scan reads every `Namespace.member` the v4 sources touch. A construct
must be either listed in `codemod/identical.ts` (same name, same meaning in v3) or
claimed by a rule in `codemod/rules/`. Anything else fails with a file and line.

Two ways to answer:

- **The construct means the same thing in v3.** Add it to `identical.ts`. That
  entry is a promise the two majors agree — `Schema.Date` and `Schema.optional`
  are the counter-examples that do not.
- **v3 spells it differently.** Add a rule to the module for that namespace and
  list the construct in its `claims`.

A rule that meets a shape it was not written for calls `unhandled` and fails the
same way. Never widen a rule to guess.

## When a file cannot be rewritten mechanically

Hand-port it into `v3/overrides/<same path>`. The codemod copies overrides over the
generated tree verbatim and skips them in the scan.

Every override is a spot the safety valve cannot see semantic drift, so keep the
list short and cover the behaviour in `v3/test/`. Current overrides:

| File | Why |
| --- | --- |
| `internal/match-error.ts` | v4 has one `HttpClientError` with a `reason`; v3 splits it into `RequestError` and `ResponseError` |
| `internal/operation.ts` | `Context.Reference` is const-style in v4, class-style in v3 |
| `shared/literals.ts` | v4 `Schema.Literals<L>` takes an array; v3 `Schema.Literal` is variadic over a non-empty tuple |

## The test environment

`v3/package.json` is a standalone npm project — its own lockfile, excluded from the
pnpm workspace, because an `effect@3` tree cannot live beside the repo's `effect@4`.
It pins the **floor** of the published peer range, so a construct that only exists
in a later v3 minor fails here instead of at a consumer.

`node_modules` must sit at `v3/`, not `v3/test/`: `v3/generated/` resolves `effect`
by walking up, and one level higher it would find `effect@4`.
