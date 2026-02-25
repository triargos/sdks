---
'@triargos/effect-procurat': minor
---

feat(person): add findRolesInGroups method

- Add `findRolesInGroups` to `ProcuratPerson` for `GET /persons/{id}/roles`
- Returns `ReadonlyArray<GroupSupervisorSchema>` with person's roles across groups
