---
'@triargos/effect-procurat': patch
---

Add the missing `email` field to `updatePersonFields` / `UpdatePerson`. The
Procurat server's `PersonService.handleEmailUpdate` treats an absent `email` in
the PUT body as "delete this person's email contact information", so the SDK
silently stripping the field deleted emails on every `person.update`.
