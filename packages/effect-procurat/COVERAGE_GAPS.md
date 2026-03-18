# effect-procurat Coverage Gaps

Endpoints available in `procurat-node` that are **not yet implemented** in `effect-procurat`.

## Address

| Endpoint | Method | Description |
|----------|--------|-------------|
| `PUT /addresses/{id}` | `updateAddress` | Update an existing address |

## Absences (entire module missing)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /absences` | `findAll` | List all absences (optional `type` query) |
| `POST /absences` | `create` | Create an absence |
| `GET /absences/{id}` | `findById` | Get absence by ID |
| `PUT /absences/{id}` | `update` | Update an absence |
| `DELETE /absences/{id}` | `delete` | Delete an absence |
| `GET /absences/person/{personId}` | `findByPerson` | Get absences for a person (optional `type` query) |
| `GET /absences/group/{groupId}` | `findByGroup` | Get absences for a group (optional `type` query) |

## Follow-Ups (entire module missing)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /followups` | `findAll` | List all follow-ups |
| `POST /followups` | `create` | Create a follow-up |
| `GET /followups/{id}` | `findById` | Get follow-up by ID |
| `PUT /followups/{id}` | `update` | Update a follow-up |
| `DELETE /followups/{id}` | `delete` | Delete a follow-up |
| `GET /followups/persons/{personId}` | `findForPerson` | Get follow-ups for a person |
| `GET /followups/assignees/{personId}` | `findForAssignee` | Get follow-ups assigned to a person |

## Contact Information

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /contactinformation/{id}` | `findById` | Get contact info by ID |
| `PUT /contactinformation/{id}` | `update` | Update contact information |
| `DELETE /contactinformation/{id}` | `delete` | Delete contact information |

## Communication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /communication/person/{personId}/information` | `listContactInformation` | Get contact info mappings for a person |
| `POST /communication/person/{personId}/information` | `createContactInformation` | Create contact info mapping |
| `DELETE /communication/person/{personId}/information/{contactInformationId}` | `deleteContactInformation` | Delete contact info mapping |
| `GET /communication/person/{personId}/contacts` | `listContactPersons` | Get contact person mappings |
| `DELETE /communication/person/{personId}/contacts/{contactId}` | `deleteContactPerson` | Delete contact person mapping |

## Groups

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /groups?memberId={id}` | `findByMember` | Find groups filtered by member ID |
| `GET /groups/{id}/members/{personId}` | `findMember` | Get a specific group member by person ID |

## Files

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /files/shared/**` | `uploadPublicFile` | Upload a shared/public file |
| `DELETE /files/shared/**` | `deletePublicFile` | Delete a shared file |
| `DELETE /files/person/{personId}/management/**` | `deleteManagementFile` | Delete a management file |
| `DELETE /files/person/{personId}/finance/**` | `deleteFinanceFile` | Delete a finance file |

## Health

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /health` | `getDatabaseInfo` | Get database health/info |

## File Starter

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /filestarter/update/info` | `getUpdateInfo` | Get file starter update info |
| `GET /filestarter/update/download` | `downloadFileStarter` | Download file starter binary |
