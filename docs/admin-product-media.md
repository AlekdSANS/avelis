# Admin product media and reference data

## Managed product images

`POST /api/admin/uploads/products` accepts `multipart/form-data` under the
`images` field. The endpoint requires an authenticated `ADMIN` database user.
It accepts at most 10 JPEG, PNG, or WebP files per request and limits each file
to 8 MB. The server verifies the detected file signature against the declared
MIME type, generates an opaque filename, and returns:

```json
{
  "data": [
    {
      "url": "/uploads/products/<uuid>.webp",
      "storageKey": "products/<uuid>.webp",
      "mimeType": "image/webp",
      "sizeBytes": 123456
    }
  ]
}
```

The product create/update contract stores this metadata with `ProductImage`.
External HTTP URLs and existing root-relative paths remain supported and have
no managed storage metadata.

`DELETE /api/admin/uploads/products` accepts `{ "storageKey": "..." }`. It is
ADMIN-only, rejects traversal/unmanaged keys, refuses files still referenced by
a `ProductImage`, and is idempotent when a managed file is already absent.

Unsaved uploads are removed immediately when an editor card is removed or the
in-app discard action is confirmed. Images removed from an existing product
are deleted only after the database update commits. If a browser/process exits
abruptly before cleanup, an unreferenced file can remain and should be handled
by a future orphan-cleanup job.

The current adapter writes to `server/uploads/products` and exposes files from
`/uploads/products`. Production must mount `server/uploads` on durable shared
storage. Ephemeral or multi-instance hosting should replace the
`ImageStorage` adapter with object storage; product records already use
provider-neutral storage keys and public URLs.

## Reference lifecycle

Fragrance notes and collections use `isActive` soft deactivation. Existing
product relations remain editable and visible in the admin editor with an
Inactive label. Inactive records cannot be newly attached. Public product
responses and public collection lists omit inactive reference records.

Admin endpoints:

- `GET|POST /api/admin/notes`
- `PATCH|DELETE /api/admin/notes/:id`
- `GET|POST /api/admin/collections`
- `PATCH|DELETE /api/admin/collections/:id`

All endpoints validate input and require the existing `requireAuth` and
`requireAdmin` middleware chain.
