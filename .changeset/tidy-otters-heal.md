---
'@triargos/effect-procurat': patch
---

Allow `null` for `lastUpdateStart`, `lastUpdateEnd`, and `lastUpdateFailed` in the `Health` schema.

The health endpoint returns `null` for these fields until a first update runs. The strict string schema made every `Health` decode fail on such instances, which also broke `health.determineDateStyle` and every operation that calls it first (for example person queries).
