---
'@triargos/effect-procurat': minor
---

feat(address): add findResidents method

- Add `findResidents` to `ProcuratAddress` module
- Calls `GET /addresses/{addressId}/residents` returning `PersonSchema[]`
- Maps 404 to `AddressNotFound` error
