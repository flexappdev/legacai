# LegacAI — MVP

Smallest useful slice built from what already exists. Scope: **Personal +
Family**, horizon **100 years**. 1,000 and 10,000-year tiers stay as documented
format choices until the core works.

## Step 0 — make it safe for real data (prerequisite)

Fixes FINDINGS §3. Small, testable, no new services.

1. Read the user from the Supabase session in `/api/vault/entries`, `/api/export/[vaultId]` and `/api/agent/ask`; drop `x-user-id` and body `userId`.
2. Return 401 from `/admin` when auth is not configured instead of passing through.
3. Replace the demo corpus and agent prompt with a synthetic family.
4. Rename `middleware.ts` → `proxy.ts` per Next 16.

## Step 1 — provenance and layers on the existing models

Extend `VaultEntry` / `Asset` rather than adding collections:

- `layer: "input" | "live" | "wiki"`, `scope`, `sensitivity`
- `Asset`: `sha256`, `capturedAt`, `source`, `importer`, `consentBasis`
- `VaultEntry` for LIVE/WIKI: `kind` (DJAI + ProdGame kinds), `derivedFrom[]`, `author: {type, id}`, `reviewedBy`, `status`
- `Event` log collection (FLEET `app='legacai'`)

## Step 2 — portable export (upgrade the export covenant)

`/api/export/[vaultId]` returns a zip in the `vault-template/` layout, valid
against `schemas/`. JSON/CSV stays as a lightweight option.

## Step 3 — DJAI capture

- Daily journal text entry → INPUT item (kind `journal`).
- Voice memo via the planned V9 `MediaRecorder` + S3 upload → INPUT audio; transcript → LIVE `transcript` note with `derivedFrom` = the audio item.

## Step 4 — ProdGame in LIVE

- `goal`, `project`, `routine`, `progress` notes in LIVE, edited by the owner.
- Monthly "lessons" draft by the Curate agent → WIKI after owner review.

## Step 5 — agent answers by id

- Retrieval returns record ids the asker is granted; the model must cite ids; UI renders cites as links to the item.
- Uncited sentences are shown as unsupported.

## Out of MVP

Country and Worldwide scopes, institutional replication, physical media,
multi-language primers, endowment mechanics.

## Suggested order

Step 0 → 1 → 2 can ship as three PRs with tests. 3–5 follow the existing V9
(uploads + voice) backlog item.
