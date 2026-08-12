---
'@triargos/effect-procurat': minor
---

Add `procurat.health.determineDateStyle()`.

It reads the installation's build number and answers which wire format that build
accepts on write — `'iso-date'` above build 726, `'timestamp'` at or below it:

```ts
const dateFormat = yield* procurat.health.determineDateStyle();
```

Temporary. It goes away with the `dateFormat` option once the rollover is over.
