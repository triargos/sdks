---
'@triargos/effect-procurat': minor
---

Add `procurat.health.get()` for `GET /health`.

It answers with a `Health` schema, so the build and database version of an
installation are readable without a raw request:

```ts
const health = yield* procurat.health.get();
health.build; // 4711
```

The three `lastUpdate*` fields stay raw strings: the API declares them as plain
strings and names no format.
