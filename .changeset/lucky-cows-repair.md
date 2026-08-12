---
'@triargos/effect-procurat': minor
---

Add a `dateFormat` option for installations still on the old Procurat API.

Procurat writes date-only strings (`2024-05-01`) from now on, but an installation
that has not moved yet only accepts timestamps. Pass `dateFormat: 'timestamp'` to
`ProcuratClient.layer` or `layerConfig` and the SDK writes the old format:

```ts
ProcuratClient.layer({ apiKey, baseUrl, dateFormat: 'timestamp' });
```

The option defaults to `'iso-date'`. Reading never needs it — a response in
either format decodes to the same `IsoDate`. The option goes away once the
rollover is over.
