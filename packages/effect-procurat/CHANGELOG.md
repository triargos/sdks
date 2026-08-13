# @triargos/effect-procurat

## 2.2.0

### Minor Changes

- f34865a: Add the follow-up module (`procurat.followUp`).

  New operations against `/followups`:
  - `followUp.findAll()` — all follow-ups
  - `followUp.findById({ id })`
  - `followUp.findByPerson({ personId })` — follow-ups that reference the person
  - `followUp.findByAssignee({ personId })` — follow-ups assigned to the person
  - `followUp.create({ followUp })`
  - `followUp.update({ followUp })`
  - `followUp.delete({ id })`

  Follow-up timestamps decode to the Berlin calendar day.

- 570abb0: Add the update and delete operations the SDK was missing on addresses and contact information.

  New operations:
  - `address.update({ address })` — `PUT /addresses/{id}`, takes the new `UpdateAddress` schema
  - `contactInformation.update({ contactInformation })` — `PUT /contactinformation/{id}`, takes a `ContactInformation` so you can fetch, modify and send it back
  - `contactInformation.delete({ contactInformationId })` — `DELETE /contactinformation/{id}`, returns void

  `UpdateAddress` is a separate schema from the `Address` you get back on reads. Reads stay lenient about `street`, `zip` and `city` being null, but the API wants strings on write.

  `CreateAddress` gains a `personId` field to match the API. It accepts `null`, but the field is required, so calls that build a `CreateAddress` need `personId: null` added.

## 2.1.0

### Minor Changes

- 24cc9a9: Add a `dateFormat` option for installations still on the old Procurat API.

  Procurat writes date-only strings (`2024-05-01`) from now on, but an installation
  that has not moved yet only accepts timestamps. Pass `dateFormat: 'timestamp'` to
  `ProcuratClient.layer` or `layerConfig` and the SDK writes the old format:

  ```ts
  ProcuratClient.layer({ apiKey, baseUrl, dateFormat: 'timestamp' });
  ```

  The option defaults to `'iso-date'`. Reading never needs it — a response in
  either format decodes to the same `IsoDate`. The option goes away once the
  rollover is over.

- ba44cd2: Add `procurat.health.determineDateStyle()`.

  It reads the installation's build number and answers which wire format that build
  accepts on write — `'iso-date'` above build 726, `'timestamp'` at or below it:

  ```ts
  const dateFormat = yield * procurat.health.determineDateStyle();
  ```

  Temporary. It goes away with the `dateFormat` option once the rollover is over.

- 24cc9a9: Date fields are ISO date strings (`IsoDate`) instead of `Date`.

  The Procurat API is moving from timestamps (`2024-05-01T00:00:00.000Z`) to
  date-only strings (`2024-05-01`). Every date on the SDK surface — `birthDate`,
  `startDate`, `entryDate` and the rest — is now an `IsoDate`: a branded
  `YYYY-MM-DD` string that carries no time and no zone, so a date can no longer
  shift a day when it crosses a timezone.

  Build one with `IsoDate.make('2024-05-01')` or, from a `Date`,
  `IsoDate.fromDate(value, 'local' | 'utc')` — the zone is the caller's decision
  and is now visible at the call site. `IsoDate.toDate(iso)` returns midnight UTC.

  Decoding accepts both wire formats, so responses from an installation on either
  API version read the same.

- bf2d1af: Add `procurat.health.get()` for `GET /health`.

  It answers with a `Health` schema, so the build and database version of an
  installation are readable without a raw request:

  ```ts
  const health = yield * procurat.health.get();
  health.build; // 4711
  ```

  The three `lastUpdate*` fields stay raw strings: the API declares them as plain
  strings and names no format.

- f91762b: Add an Effect v3 build on the `/v3`, `/v3/schemas` and `/v3/errors` subpaths.

  The v4 sources stay the only source of truth. A codemod with a closed rule table
  generates the v3 build at release time, so both subpaths always describe the same
  SDK. `@effect/platform` is now an optional peer dependency, needed only by v3
  consumers.

## 2.0.0

### Major Changes

- f1e15cf: Port the remaining Procurat endpoints to the Effect v4 SDK and organize the implementation by domain.

  Add absence CRUD, group supervisors and person roles, address residents, contact-information reads, and communication assignment methods. Export schema values, types, and named members for every closed literal set.

  Flatten group query options into each method's `params` object. Replace `communication.createContactPerson({ personId, contactPerson })` with `communication.assignContactPerson({ assignment })`, deriving the URL person ID from the assignment. Operation spans now carry only their name so request payload scalars cannot be traced accidentally.

## 1.0.0

### Major Changes

- 8d7a0bb: Effect v4 and a rebuilt public surface. Every call site changes; there is no compat shim.

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

  | previous failure                                                  | now                                                                        |
  | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
  | any operation-specific not-found error (404)                      | `ProcuratNotFoundError`                                                    |
  | any operation-specific create/update error (400, 409, 422)        | `ProcuratBadRequestError` (carries the rejected `payload`)                 |
  | unauthorized or forbidden response (401, 403)                     | `ProcuratAuthError`                                                        |
  | operation error caused by 5xx, an unmapped status, or no response | `ProcuratUnavailableError` (`kind` distinguishes `server` and `transport`) |
  | response decoding defect                                          | `ProcuratDecodeError` (carries the raw body)                               |

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

## 0.4.4

### Patch Changes

- 51007c0: fix(schema): make city nullable

## 0.4.3

### Patch Changes

- eaa7132: fix(file-module): split into path and file name

## 0.4.2

### Patch Changes

- 077124d: upload files as multipart, not as streams

## 0.4.1

### Patch Changes

- ac51ebe: encode provided file path

## 0.4.0

### Minor Changes

- 57573f5: add file module

## 0.3.1

### Patch Changes

- 39ff8d6: fix care type lookup table schema

## 0.3.0

### Minor Changes

- db1173f: add findByFamily endpoint to persons

## 0.2.1

### Patch Changes

- d2bf81e: fix group type being nullable

## 0.2.0

### Minor Changes

- c8c88e9: add group udf endpoint

## 0.1.4

### Patch Changes

- 3335c21: fix(error): fix error not constructing because of instance problems

## 0.1.3

### Patch Changes

- 30433ac: fix error creation of person module

## 0.1.2

### Patch Changes

- 8626957: fix error schema on contact person

## 0.1.1

### Patch Changes

- 9d92169: fix update person schem to use dates

## 0.1.0

### Minor Changes

- 1ffb899: add country, country, religion, relationship and person features

### Patch Changes

- ef289e4: fix religion schema (lookup val can be nullable)
- ef289e4: fix schema to allow for nullish first names
- ef289e4: rexport missing schemas
- e1aba37: added new lookup module

## 0.0.9

### Patch Changes

- 4f537d1: Initial and experimental release of the package
