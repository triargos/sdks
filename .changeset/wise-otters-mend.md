---
'@triargos/effect-procurat': patch
---

Fix dates coming back one day early on the `/v3` entry point.

Procurat stores Berlin midnights as UTC, so `2025-05-05T22:00:00Z` means the 6th. The v4 build reads that as `2025-05-06`; the v3 build read the UTC day and answered `2025-05-05`. Every timestamp between 22:00Z and midnight — every value an installation on the old API writes — landed on the previous day.

`v3/shared/date.ts` is a hand-maintained override, and it kept the UTC-day logic when the Berlin shift landed in `src`. It now matches, and a v3 smoke test decodes a Berlin midnight so the two cannot drift apart again unnoticed.
