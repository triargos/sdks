---
'@triargos/effect-procurat': minor
---

Lookup tables now decode rows with `null` in a nullable Procurat column. Before, a row with no `LookupVal` (seen in religions, cost bearers and care types) failed the whole lookup call with a `ProcuratDecodeError`.

These fields are now `| null`, in the v4 build and in `/v3`:

- `value` on `LookupTable`, `CareType`, `CostBearer`, `School`, `BavarianSchool` and `MunicipalityCode`
- `CostBearer.characteristic`, `CostBearer.identificationNumber`
- `School.schoolTypeId`
- `BavarianSchool.schoolType`, `street`, `building`, `city`, `postalCode`
- `Municipality.label`, `Municipality.municipalityCode`

Code that used these fields as non-null must handle `null`.
