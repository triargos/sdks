---
'@triargos/effect-procurat': major
---

Output schemas are plain structs instead of `Schema.Class`. Decoded values are plain objects, so they can be stored in Prisma Json columns. `new X(...)`, `instanceof X` and `X.make` no longer work for the output models; `X` is now a `Schema.Struct` with a same-named type (`type X = typeof X.Type`).
