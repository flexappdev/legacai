# LegacAI — inspection findings (2026-10-10)

What exists in `flexappdev/legacai` at commit `a32edfe`, with evidence.
Findings are things verified in the repo or by running it. Assumptions are
listed separately and marked as such.

Private material is deliberately not quoted here: where the demo corpus holds
names, addresses or health details, this file describes the *kind* of data
only.

## 1. Run results

| Check | Result |
|---|---|
| `npm test` | 8 files, 33/33 tests pass |
| `npm run typecheck` | clean |
| `npm run build` | 28 routes built (Next.js 16.2.10) |
| `next start` smoke | `/`, `/vault/*`, `/login`, `/checkout/*`, `/sitemap.xml` → 200; `/vault` → 307; `/api/vault/entries` without header → 401; `/api/agent/ask` without key → 503 |

## 2. What already exists

### Product and vault concept
- **Positioning:** "an AI agent trained on everything you choose to leave behind" — `README.md`, `GOAL.md`.
- **Vault scopes:** Personal · Family · Business switcher — `components/vault-dashboard.tsx`, `BACKLOG.md` V1.
- **Vault tabs:** Agent, Sources, My Vault, Timeline, Century, Family, Releases, Charter — `components/vault-nav.ts`, `app/vault/[section]/page.tsx`.
- **Horizons:** plans priced as 1-year, 10-year and "century" — `app/checkout/[plan]/page.tsx`; north-star "paid vaults × horizon years" — `GOAL.md`.
- **Century Charter:** export-anytime, two-of-three guardianship, endowment-backed horizon, agent persistence, right to be forgotten, data sovereignty — listed in the agent system prompt, `app/api/agent/ask/route.ts`.
- **Release plans:** triggers `auto-date`, `manual-guardians`, `vault-silence` with sign-offs — `lib/models/release.ts`.
- **Family access matrix:** 4 members × 6 categories (UI only, static) — `components/vault-dashboard.tsx`.

### Data and APIs
- **Models (Mongo FLEET, `app='legacai'`):** `VaultEntry` (title, category, icon, notes, sourceId, entryDate), `Asset` (s3Key, mime, size, curated, vaultEntryId), `ReleasePlan` — `lib/models/*.ts`.
- **Categories:** `doc | photo | audio | video | ai | journal | book` — same enum in all three models and `data/vault-corpus.ts`.
- **APIs:** `/api/vault/entries` (GET/POST), `/api/export/[vaultId]` (JSON + CSV), `/api/agent/ask` (Claude, returns `{answer, cites[]}`), Stripe checkout + webhook.
- **Demo corpus:** 10 dated entries — `data/vault-corpus.ts`; seeded by `scripts/seed-vault.ts`.

### Agentic AI
- One agent: a Q&A proxy whose context is a flat list of entry titles plus a hard-coded family/guardian/release summary — `app/api/agent/ask/route.ts`.
- Citations are recovered by regex from `[...]` brackets in the model's text; they are titles, not record ids.

### Not found in this repo
- **DJAI** — no files, identifiers or docs mention it (`rg -i djai` → 0 hits outside this doc set).
- **ProdGame** — no files, identifiers or docs mention it.
- **INPUT / LIVE / WIKI workflow** — not present; there is a single flat `VaultEntry` layer.
- **Provenance** — no checksums, capture metadata, importer, or derived-from links on any model.
- **Consent records, subject rights, correction or deletion flows** — the charter names them, no code implements them.
- **Portable on-disk vault format** — export is a JSON/CSV dump of entry titles only; assets are not included.

## 3. Risks found while running it

These matter before any real personal data goes in.

1. **Spoofable identity.** `/api/vault/entries` trusts a client-sent `x-user-id` header (`app/api/vault/entries/route.ts:6`). Anyone can read or write any user's entries by setting it.
2. **Unauthenticated export.** `/api/export/[vaultId]` falls back to `userId = vaultId` with no session check (`app/api/export/[vaultId]/route.ts:11`). Verified: `GET /api/export/someone-else` → 200 with entries.
3. **Agent reads any vault.** `/api/agent/ask` takes `userId` from the request body (`app/api/agent/ask/route.ts:68`).
4. **`/admin` is open when Supabase env is missing.** Middleware passes through by design, so `/admin` returns 200 locally (`lib/supabase/middleware.ts:11`).
5. **Real-looking private data in public code.** `data/vault-corpus.ts` and the agent system prompt include named family members, a property deed, guardian mandates and a health record with a named clinician. These ship in public pages and the repo. *Assumption:* this may be intentional demo data; it should still be replaced with a synthetic family.
6. **`middleware.ts` is deprecated in Next 16** (renamed to `proxy.ts`) — `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.

## 4. Assumptions (not verified)

- DJAI and ProdGame may exist in other `flexappdev` repos; this session can only see `flexappdev/legacai`.
- The "century" plan is the product's current longest horizon; 1,000 and 10,000 years are new scope from this brief.
- Mongo FLEET remains the operational store; nothing in the repo commits to a long-term archival store yet.
