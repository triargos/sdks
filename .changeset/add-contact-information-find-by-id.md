---
'@triargos/effect-procurat': minor
---

feat(contact-information): add findById method

- Add `findById` method to `ProcuratContactInformation` service
- Query a single contact information record via `GET /contactinformation/{contactInformationId}`
- Add `ContactInformationNotFound` domain error, mapped from `ProcuratNotFoundError`
