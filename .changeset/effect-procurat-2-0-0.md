---
'@triargos/effect-procurat': major
---

Port the remaining Procurat endpoints to the Effect v4 SDK and organize the implementation by domain.

Add absence CRUD, group supervisors and person roles, address residents, contact-information reads, and communication assignment methods. Export schema values, types, and named members for every closed literal set.

Flatten group query options into each method's `params` object. Replace `communication.createContactPerson({ personId, contactPerson })` with `communication.assignContactPerson({ assignment })`, deriving the URL person ID from the assignment. Operation spans now carry only their name so request payload scalars cannot be traced accidentally.
