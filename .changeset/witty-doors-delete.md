---
'@triargos/effect-procurat': minor
---

Add file delete operations: `deleteManagementFile`, `deleteFinanceFile`, and `deletePublicFile` on `ProcuratFile`.

All three file areas accept `DELETE` in the Procurat API, but the SDK had no way to remove a file once uploaded. The new operations fire the request and return void — the `SuccessResponse` body carries nothing a caller can act on, matching the existing `contactInformation.delete` precedent. Purely additive.
