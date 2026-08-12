---
'@triargos/effect-procurat': minor
---

Add an Effect v3 build on the `/v3`, `/v3/schemas` and `/v3/errors` subpaths.

The v4 sources stay the only source of truth. A codemod with a closed rule table
generates the v3 build at release time, so both subpaths always describe the same
SDK. `@effect/platform` is now an optional peer dependency, needed only by v3
consumers.
