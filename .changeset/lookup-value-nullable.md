---
'@triargos/effect-procurat': minor
---

Lookup tables now decode rows whose `value` is `null`. Procurat's `LookupVal` column is nullable, and rows with no value (seen in religions, cost bearers and care types) failed every lookup call with a `ProcuratDecodeError`.

`value` on `LookupTable`, `CareType`, `CostBearer`, `School`, `BavarianSchool` and `MunicipalityCode` is now `string | null`, in the v4 build and in `/v3`. Code that used `value` as a `string` must handle `null`.
