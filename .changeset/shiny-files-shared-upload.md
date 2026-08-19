---
'@triargos/effect-procurat': minor
---

Add `uploadPublicFile` on `ProcuratFile` for `POST /files/shared/**`.

Shared files could already be listed, downloaded, and deleted, but not uploaded. The new operation reuses the existing multipart upload path without a person scope. `UploadParams` now extends a new `UploadFileParams` base (no `personId`); existing callers are unaffected. Purely additive.
