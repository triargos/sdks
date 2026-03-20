# @triargos/effect-procurat

## 0.5.0-beta.6

### Minor Changes

- dc47904: feat(communication): add contact information mapping CRUD methods
  - Add findContactInformationMappings, createContactInformationMapping, and deleteContactInformationMapping for managing contact info mappings per person
  - Add findContactPersonMappings and deleteContactPerson for managing contact person mappings
  - Add ContactInformationMappingSchema and ContactInformationMappingCreationSchema

## 0.5.0-beta.5

### Minor Changes

- e44193d: feat(contact-information): add findById method
  - Add `findById` method to `ProcuratContactInformation` service
  - Query a single contact information record via `GET /contactinformation/{contactInformationId}`
  - Add `ContactInformationNotFound` domain error, mapped from `ProcuratNotFoundError`

## 0.5.0-beta.4

### Minor Changes

- afc095b: feat(address): add findResidents method
  - Add `findResidents` to `ProcuratAddress` module
  - Calls `GET /addresses/{addressId}/residents` returning `PersonSchema[]`
  - Maps 404 to `AddressNotFound` error

- 3077c95: feat(contact-information): add findByAddress method
  - Add `findByAddress` method to `ProcuratContactInformation` service
  - Query contact information by address ID via `GET /contactinformation/address/{addressId}`
  - Map `ProcuratNotFoundError` to `AddressNotFound` domain error

## 0.5.0-beta.3

### Minor Changes

- db19ab4: feat(person): add findRolesInGroups method
  - Add `findRolesInGroups` to `ProcuratPerson` for `GET /persons/{id}/roles`
  - Returns `ReadonlyArray<GroupSupervisorSchema>` with person's roles across groups

## 0.5.0-beta.2

### Minor Changes

- 3150a2e: feat(group): add findSupervisors method
  - Add RoleSchema and GroupSupervisorSchema for the /groups/{id}/supervisors endpoint
  - Add findSupervisors method to ProcuratGroup module
  - Export new schemas from schemas entrypoint

### Patch Changes

- 9cc52ad: add group supervisors endpoint

## 0.5.0-beta.1

### Minor Changes

- e0baaec: feat(contact-information): add findAll method
  - Add `findAll` method to `ProcuratContactInformation` to list all contact information for persons

## 0.5.0-beta.0

### Minor Changes

- d046fae: refactor(errors): consolidate error handling with UnknownProcuratError
  - Consolidate 13 individual error files into single `src/errors.ts`
  - Remove `src/utils/error-parsing.ts`
  - Add `UnknownProcuratError` for infrastructure errors (network, parse, body serialization)
  - Map `RequestError`, `ResponseError`, `ParseError`, `HttpBodyError` to `UnknownProcuratError` via `catchTags`
  - Surface all Procurat HTTP errors (`ProcuratNotFoundError`, `ProcuratUnauthorizedError`, `ProcuratServerError`, `ProcuratBadRequestError`) in error channel
  - Add explicit type annotations on all module functions
  - Update CI workflow to support beta releases on `next` branch

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
