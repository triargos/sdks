---
'@triargos/effect-procurat': patch
---

Fix the `/v3` declarations bundling a copy of `effect`'s types.

The download signatures (`file.downloadManagementFile`, `downloadFinanceFile`, `downloadPublicFile`) referred to an inlined `Stream` declaration. Its `unique symbol` type id is a different type than the one in the consumer's own `effect` install, so passing a download stream to any `Stream` combinator failed with `Property '[StreamTypeId]' is missing`. At runtime the value was always the caller's `Stream` — only the declaration was foreign.

`effect` and `@effect/platform` subpaths are now externalized in the declaration build, so consumers can drop any cast around `client.file.download*`.
