---
'@triargos/effect-procurat': minor
---

Date fields are ISO date strings (`IsoDate`) instead of `Date`.

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
