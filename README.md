# Legacai — your legacy, alive

An AI agent trained on everything you choose to leave behind — documents,
photographs, voice, journals, and even your ChatGPT and Claude conversations.
For you, for the ones that matter, for now, for the future.

- **Local:** http://localhost:17010
- **Prod:** TBA (Vercel `matsiems` scope · deploy blocked at CLI 403, see BACKLOG.md § V6)
- **Repo:** [flexappdev/legacai](https://github.com/flexappdev/legacai)
- **Fleet role:** site #38 in `~/APPS/` (see [REPOS.md](../REPOS.md))

## Routes

| Path                    | Kind      | Notes                                                                 |
|-------------------------|-----------|-----------------------------------------------------------------------|
| `/`                     | static    | Landing — hero, sources, vaults, how-it-works, agent sample, pricing  |
| `/?lang=fr\|pl\|es`     | static    | Same landing, translated — EN/FR/PL/ES switcher lives in the nav; choice persists via `localStorage` |
| `/#how`, `/#vaults`, `/#sources`, `/#agent`, `/#pricing` | anchor | Deep-linkable sections; `history.replaceState` updates URL on nav click |
| `/vault`                | static    | 307 → `/vault/agent` (default tab)                                    |
| `/vault/agent`          | SSG       | The Agent — vault stats bar, full 4-QA transcript, suggestion chips, disabled "ask" input |
| `/vault/sources`        | SSG       | Sources & Inbox — 8 source cards with curation progress + inbox list (47 pending, TAG/SKIP) |
| `/vault/vault`          | SSG       | My Vault — placeholder ("This section unlocks in the next release loop —") |
| `/vault/family`         | SSG       | Family Circle — 4 members (Mat, Karolina, Pawel, Maria) + 6×4 access matrix + invite CTA |
| `/vault/releases`       | SSG       | Release Plans — birthdays / milestones / contingency, each with queued count + guardian sign-off chips |
| `/vault/charter`        | SSG       | Century Charter — 6 commitments, each with signed date + version stamp |
| `/checkout/1yr`         | SSG       | £99/year — reserved for Stripe checkout (V7)                          |
| `/checkout/10yr`        | SSG       | £799 one-off — MOST POPULAR                                           |
| `/checkout/century`     | SSG       | £2,999 one-off — Century vault                                        |
| `/icon`, `/apple-icon`  | generated | Programmatic Legacai L monogram (next/og)                             |
| `/robots.txt`, `/sitemap.xml` | generated | SEO scaffolding                                                 |

Each vault sidebar item is a real `<Link>` — tabs are bookmarkable, back/forward-navigable, and the URL is the source of truth for the active section (`app/vault/[section]/page.tsx`).

## Stack

- Next.js 16 + React 19 + TypeScript + Tailwind v4 (Turbopack)
- **Auth:** Supabase (`@supabase/ssr`), `/admin` allowlist → `mat@matsiems.com`
- **DB:** Mongo Atlas — shared FLEET cluster, `app='legacai'` discriminator
- **i18n:** EN/FR/PL/ES dictionaries in `components/legacai-i18n.ts`; `useLocale()` hook reads `?lang=` then `localStorage`, defaults to EN
- **Analytics:** GA4 wrapper (`lib/analytics.tsx`), gated on `NEXT_PUBLIC_GA_ID`
- **Icon:** `app/icon.tsx` + `app/apple-icon.tsx` — L mark rendered via `next/og`
- **Deploy:** Vercel (`matsiems` scope)
- **Payments (V7):** Stripe checkout wired to `/checkout/[plan]` routes

## Getting started

```bash
cd ~/APPS/legacai
npm install
npm test              # 27 vitest tests — landing, dashboard, checkout, analytics, mongoose, supabase
npm run typecheck     # tsc --noEmit
npm run build         # production build smoke (10 routes prerender)
npm run dev           # local dev on :17010
```

Env is synced from `~/context-2026/agents/.env` into `.env.local` (git-ignored).

## Roadmap

Seven `/loop` slices from scaffold → monetised. See [`GOAL.md`](./GOAL.md).

| V     | Slice                                                                | Status |
|-------|----------------------------------------------------------------------|--------|
| V1    | Scaffold + JSX landing                                               | ✓      |
| V1.1  | SEO scaffolding (`app/robots.ts`, `app/sitemap.ts`)                  | ✓      |
| V1.2  | Real routes: `/vault`, `/checkout/[plan]` — fix broken pricing CTAs  | ✓      |
| V1.3  | i18n landing (EN/FR/PL/ES) — nav switcher + `?lang=` + localStorage  | ✓      |
| V1.4  | URL-per-tab vault dashboard (`/vault/[section]` × 6)                 | ✓      |
| V1.5  | Vault tabs enriched — stats, inbox, access matrix, sign-offs, charter dates | ✓      |
| V2    | Red-green TDD (27/27 tests green)                                    | ✓      |
| V3    | Supabase auth + `/admin` gate                                        | scaffolded (env-guarded) |
| V4    | Mongo FLEET wiring                                                   | scaffolded (env-guarded) |
| V5    | GA4 + Consent Mode v2                                                | wrapper ready — flip via `/abc-ga sync legacai G-XXXX` |
| V6    | Vercel deploy                                                        | blocked — see `scripts/deploy.sh` |
| V7    | Stripe monetisation                                                  | routes reserved at `/checkout/[plan]` |

Full task list in [`BACKLOG.md`](./BACKLOG.md).

## Non-negotiables

1. **Env-guarded everywhere** — no Supabase key means middleware passes through, never 500s.
2. **No plaintext secrets** — `.env.local` is git-ignored; Vercel envs synced via `/abc-vercel`.
3. **FLEET, not per-app collections** — under the 500-coll Atlas cap.
4. **Every reply cites its source** — no unattributed agent answers.
5. **Every CTA is a real link** — pricing buttons are `<Link>` to `/checkout/[plan]`, not dead SPA state.
6. **Export-anytime covenant** — V7 ships `/api/export/[vault]` alongside the paywall.
