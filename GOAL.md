# Legacai — GOAL

> Your legacy, alive. An AI agent trained on everything you choose to leave
> behind — documents, photographs, voice, journals, and even your ChatGPT
> and Claude conversations. For you, for the ones that matter, for now,
> for the future — and to be remembered by it.

## 1G alignment

- **Pillar:** A (Apps) — fleet site #38 (rank TBD).
- **Repo:** `flexappdev/legacai` · **Path:** `~/APPS/legacai` · **Port:** `17010`.
- **Stack:** Next.js 15 + React 19 + TypeScript + Tailwind v4 · Supabase auth ·
  Mongo FLEET (`app='legacai'`) · S3 com27 (`legacai/*` prefix) · Vercel
  (`matsiems` scope) · GA4 (post-launch) · Stripe (V7).
- **North-star metric:** paid vaults created × horizon years.

## Prod-ready + monetised in 7 versions (one /loop each)

| V   | Slice                          | Definition of done                                                                |
|-----|--------------------------------|------------------------------------------------------------------------------------|
| V1  | Scaffold + JSX landing         | `npm run dev` on :17010 shows landing → dashboard nav                             |
| V2  | Red-green TDD                  | vitest smoke suite 100% green; playwright home + dashboard smoke                  |
| V3  | Supabase auth + `/admin` gate  | Magic-link login; `mat@matsiems.com` allowlist; env-guarded (no 500 on empty env) |
| V4  | Mongo FLEET wiring             | Cached mongoose; reads from `fleet_pages` / `fleet_items` w/ `app='legacai'`      |
| V5  | GA4 + Consent Mode v2          | `/abc-ga sync legacai G-XXXX` flips tracking live; served HTML shows tag          |
| V6  | Vercel deploy                  | `legacai.vercel.app` LIVE; env synced; SSR healthy; sitemap.xml + robots.txt      |
| V7  | Stripe monetisation            | `/checkout/{1yr,10yr,century}` → Stripe → webhook → vault_orders in FLEET         |

Each V is a `/loop` iteration. After each ship: bump SemVer, commit
`feat(v/X): …`, push, redeploy.

## The /abc-* skill chain

- `/abc-github` — repo create, secrets sync
- `/abc-supabase` — auth env, migrations, RLS
- `/abc-mongo` — FLEET fold, drift check
- `/abc-vercel` — link, env sync, deploy
- `/abc-s3` — `com27/legacai/*` public prefix policy
- `/abc-ga` — GA4 measurement id
- `/abc-stripe` — price ids, webhook
- `/abc-resend` — welcome + release-plan email
- `/abc-diagrams` — architecture, vault flow, guardian mandate
- `/abc-aa` — Amazon affiliate on Books & Lists source

## Non-negotiables

1. **Env-guarded everywhere.** No Supabase key → middleware passes through, no 500.
2. **No plaintext secrets.** `.env.local` is git-ignored; Vercel envs synced via `/abc-vercel`.
3. **FLEET, not per-app collections.** Under the 500-coll Atlas cap — see `/abc-mongo`.
4. **Every reply cites its source.** Agent UI must render `cites[]` — no unattributed answers.
5. **Export-anytime covenant.** V7 must ship the `/api/export/[vault]` endpoint alongside the paywall.
