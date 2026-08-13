---
'@triargos/effect-procurat': major
---

Fix `GroupMemberStatus` to the values Procurat actually accepts: `active`, `inactive`, and `future`.

The old `ACTIVE`, `INACTIVE`, and `ALL` values never worked — Procurat silently treats any unknown status as `active`. So `group.findMembers` with `INACTIVE` or `ALL` returned active members.

Breaking changes:

- `GroupMemberStatuses.All` is gone. Procurat has no "all" — fetch per status if you need everyone.
- `GroupMemberStatuses.Future` is new (`'future'`).
- The literal values are now lowercase. Code that passed raw `'ACTIVE'`/`'INACTIVE'`/`'ALL'` strings no longer compiles — which is the fix, because those calls silently returned the wrong members.
