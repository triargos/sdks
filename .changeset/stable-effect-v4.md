---
'@triargos/effect-procurat': minor
---

Target Effect `4.0.0` stable. The peer range is now `^3.18.5 || ^4.0.0`.

Effect 4.0.0 moved the HTTP stack from `effect/unstable/http` to `effect/http`, so the v4 build now imports from there. Import `FetchHttpClient` (or any other transport) from `effect/http`. Effect `4.0.0-beta.*` and `-rc.*` are no longer supported. The `/v3` subpath is unchanged.
