---
'@triargos/effect-procurat': major
---

Migrate the SDK to Effect v4 and its `effect/unstable/http` client APIs.

This release requires `effect@^4.0.0-beta.0` and removes the `@effect/platform` peer dependency. Consumers must now provide an HTTP transport such as `FetchHttpClient.layer` from `effect/unstable/http`.

Error classes now extend `Data.TaggedError` and are no longer schemas. `ProcuratErrorDetailsSchema` has been removed, `ProcuratErrorSchema` is now a `Schema.Struct`, and the new `ProcuratTransportError` replaces platform request errors in public error channels.

Request input schemas such as `CreatePersonSchema` and `UpdatePersonSchema` are now `Schema.Struct` values. Module methods and operation-error `data` fields accept and carry plain structural objects rather than schema-class instances.
