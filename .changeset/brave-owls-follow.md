---
'@triargos/effect-procurat': minor
---

Add the follow-up module (`procurat.followUp`).

New operations against `/followups`:

- `followUp.findAll()` — all follow-ups
- `followUp.findById({ id })`
- `followUp.findByPerson({ personId })` — follow-ups that reference the person
- `followUp.findByAssignee({ personId })` — follow-ups assigned to the person
- `followUp.create({ followUp })`
- `followUp.update({ followUp })`
- `followUp.delete({ id })`

Follow-up timestamps decode to the Berlin calendar day.
