---
'@triargos/effect-procurat': major
---

Effect v4 and a rebuilt public surface. Every call site changes; there is no compat shim.

**Provide an HTTP transport.** The SDK now requires `effect@^4.0.0-beta.0` and the
`@effect/platform` peer dependency is gone. `ProcuratClient.layer` no longer supplies a transport —
provide one at the composition root:

```ts
ProcuratClient.layer({ apiKey, baseUrl }).pipe(Layer.provide(FetchHttpClient.layer));
```

**39 operation-specific error classes collapse to 5 actionable tags.** Every operation now fails
with the same `ProcuratError` union, so no operation-specific catch is needed. Each error carries
`operation` and `endpoint`, which keeps it self-describing when collected out of a fanned-out
`Effect.forEach`.

| previous failure | now |
|---|---|
| any operation-specific not-found error (404) | `ProcuratNotFoundError` |
| any operation-specific create/update error (400, 409, 422) | `ProcuratBadRequestError` (carries the rejected `payload`) |
| unauthorized or forbidden response (401, 403) | `ProcuratAuthError` |
| operation error caused by 5xx, an unmapped status, or no response | `ProcuratUnavailableError` (`kind` distinguishes `server` and `transport`) |
| response decoding defect | `ProcuratDecodeError` (carries the raw body) |

`ProcuratCommonErrors` and `ProcuratErrorSchema` are no longer exported. Response shape drift is now
a catchable failure instead of a defect, and an error body that isn't Procurat's `{ code, error }`
envelope no longer kills the fiber.

`ProcuratUnavailableError` is retried three times with jittered exponential backoff. Override the
policy with the new `ProcuratRetry` layer.

**`apiKey` is now `Redacted.Redacted<string>`.** Wrap it with `Redacted.make(...)`, or use the new
`ProcuratClient.layerConfig()` to read `PROCURAT_API_KEY` and `PROCURAT_BASE_URL` from the
environment.

**One argument convention.** Every method takes a single object named `params`:
`person.create({ person })`, `address.create({ address })`,
`relationship.addParentToChild({ childId, relationship })`,
`groupMember.addToGroup({ groupId, member })`,
`groupMember.updateMembership({ groupId, personId, membership })`,
`communication.createContactPerson({ personId, contactPerson })`,
`group.findMembers({ groupId })`. `person.update` now returns `void` rather than the wire envelope.

**The `Schema` suffix is dropped from every exported type** — `PersonSchema` → `Person`,
`CreatePersonSchema` → `CreatePerson`, `DirectoryContentSchema` → `DirectoryContent`, and so on.
`ContactPersonCreationSchema` is now `CreateContactPerson`, `CreatedRelationShipSchema` is
`CreatedRelationship`, `FileSchema` is `FileEntry`, and `SuccessResponseSchema` is gone. Request
types are plain object shapes — pass an object literal, no constructor call. `CountyError` and
`ReligionError` types that previously could not be imported at all are covered by the new union.
