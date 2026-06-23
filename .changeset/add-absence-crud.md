---
'@triargos/effect-procurat': minor
---

feat(absence): add absence CRUD methods

- Add `ProcuratAbsence` module with `findAll`, `findById`, `findByPerson`, `findByGroup`, `create`, `update`, and `delete`
- Add `AbsenceSchema`, `CreateAbsenceSchema`, `UpdateAbsenceSchema`, and `AbsenceQueryTypeSchema`
- Support the `type` query filter (`all`, `today`, `schoolyear`) on list operations
- Add `AbsenceNotFound` and `AbsenceValidationError` domain errors
- Map 404 to `AbsenceNotFound` / `PersonNotFound` / `GroupNotFound` and 400 to `AbsenceValidationError`
- Wire `absence` into `ProcuratClient`
