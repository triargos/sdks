---
'@triargos/effect-procurat': minor
---

feat(contact-information): add findByAddress method

- Add `findByAddress` method to `ProcuratContactInformation` service
- Query contact information by address ID via `GET /contactinformation/address/{addressId}`
- Map `ProcuratNotFoundError` to `AddressNotFound` domain error
