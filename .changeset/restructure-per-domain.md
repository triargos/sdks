---
'@triargos/effect-procurat': minor
---

refactor: restructure into per-domain modules, collapse error model, migrate to Context.Tag

**BREAKING (error surface):** the four per-status transport errors `ProcuratNotFoundError`,
`ProcuratUnauthorizedError`, `ProcuratServerError`, and `ProcuratBadRequestError` are removed and
replaced by a single `ProcuratError { status, code, message, endpoint }`. Discriminate on `status`
instead of catching four separate tags. `UnknownProcuratError` and all domain errors
(`*NotFound` / `*ValidationError`) are unchanged.

- Every method's error channel now reads `... | ProcuratError | UnknownProcuratError` instead of the
  four transport tags. GET/list operations no longer leak `ProcuratBadRequestError`.
- Source is reorganized by domain: `src/domains/<entity>/{<entity>-schema, <entity>-errors, procurat-<entity>}.ts`,
  with cross-cutting infrastructure in `src/shared/{errors,http-client}.ts`. The `./schemas` and `./errors`
  package entrypoints are unchanged (barrels re-export from the new locations).
- All services migrated from `Effect.Service` to `Context.Tag` with a `static layer`.
- No change to method names, signatures, URLs, or runtime behavior.
