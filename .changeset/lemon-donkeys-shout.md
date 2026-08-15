---
'@triargos/effect-procurat': major
---

Expose the `Content-Type` header on file downloads.

The download endpoints stream arbitrary files and the response type was thrown away one line before it reached you, so there was no way to tell a PDF from a spreadsheet without guessing from the path.

Breaking change: `file.downloadManagementFile`, `file.downloadFinanceFile` and `file.downloadPublicFile` now answer with `{ contentType, stream }` instead of a bare `Stream`.

```ts
// before
const stream = yield* procurat.file.downloadPublicFile({ path: 'info/note.pdf' });

// after
const { contentType, stream } = yield* procurat.file.downloadPublicFile({ path: 'info/note.pdf' });
```

`contentType` is `'application/octet-stream'` when the installation sends no `Content-Type` — what HTTP already means by an unlabeled body, and what `file.upload*` sends when you name no type.
