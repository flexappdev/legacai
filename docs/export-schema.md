# LegacAI export schema · legacai-export/1.0

Self-describing format for `GET /api/export/[vaultId]` (the export-anytime covenant). Written so a reader with no access to this codebase can still interpret an export file.

## JSON (default)

| Field | Type | Meaning |
|---|---|---|
| `exported_at` | ISO 8601 string (UTC) | When the export was made |
| `vault` | string | Vault id the export was requested for |
| `app` | string | Always `legacai` |
| `version` | string | Export format version (`1.0`) |
| `schema` | string | Pointer to this document |
| `entry_count` | integer | Number of items in `entries` |
| `entries` | array of Entry | Vault entries, newest first |

### Entry

| Field | Type | Meaning |
|---|---|---|
| `entryDate` | ISO 8601 date/datetime | Date the memory or item belongs to |
| `title` | string | Human title |
| `category` | enum | `doc`, `photo`, `audio`, `video`, `ai`, `journal`, `book` |
| `icon` | string | Display icon name (cosmetic) |
| `notes` | string, optional | Free-text notes |
| `sourceId` | string, optional | Id of the source item the entry came from |
| `_id`, `userId`, `app`, `createdAt`, `updatedAt` | database fields | Present when exported from the live database |

## CSV (`Accept: text/csv`)

- UTF-8, RFC 4180: CRLF line endings, fields quoted when they contain `,` `"` CR or LF, embedded quotes doubled.
- Header row: `entryDate,category,title,icon,notes,sourceId`.
- Empty field means the value is absent.

## Not yet included

Release plans, guardian sign-offs and binary assets (photos, audio, video) are not in this export yet. See `vault/live/horizon-audit.md`.
