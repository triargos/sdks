---
'@triargos/effect-procurat': minor
---

refactor(errors): consolidate error handling with UnknownProcuratError

- Consolidate 13 individual error files into single `src/errors.ts`
- Remove `src/utils/error-parsing.ts`
- Add `UnknownProcuratError` for infrastructure errors (network, parse, body serialization)
- Map `RequestError`, `ResponseError`, `ParseError`, `HttpBodyError` to `UnknownProcuratError` via `catchTags`
- Surface all Procurat HTTP errors (`ProcuratNotFoundError`, `ProcuratUnauthorizedError`, `ProcuratServerError`, `ProcuratBadRequestError`) in error channel
- Add explicit type annotations on all module functions
- Update CI workflow to support beta releases on `next` branch
