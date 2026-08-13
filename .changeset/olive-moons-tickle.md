---
'@triargos/effect-procurat': minor
---

Add the update and delete operations the SDK was missing on addresses and contact information.

New operations:

- `address.update({ address })` — `PUT /addresses/{id}`, takes the new `UpdateAddress` schema
- `contactInformation.update({ contactInformation })` — `PUT /contactinformation/{id}`, takes a `ContactInformation` so you can fetch, modify and send it back
- `contactInformation.delete({ contactInformationId })` — `DELETE /contactinformation/{id}`, returns void

`UpdateAddress` is a separate schema from the `Address` you get back on reads. Reads stay lenient about `street`, `zip` and `city` being null, but the API wants strings on write.

`CreateAddress` gains a `personId` field to match the API. It accepts `null`, but the field is required, so calls that build a `CreateAddress` need `personId: null` added.
