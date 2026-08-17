---
'@triargos/effect-procurat': patch
---

Fix file uploads failing with `Current request is not a multipart request` on the undici HTTP client.

`uploadManagementFile` and `uploadFinanceFile` sent a `FormData`-tagged body. `NodeHttpClient.layerUndici` hands that straight to `dispatcher.request`, which cannot serialize web `FormData` — the request leaves without a multipart content type and Procurat rejects it. Fetch- and node-http-backed clients were unaffected.

The upload now serializes the multipart body itself and sends plain bytes with the boundary-bearing content type. This works on every client layer, and the byte body also survives the transient-retry policy replaying the request, which a one-shot body could not. Applies to both the v4 and `/v3` builds.
