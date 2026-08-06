# Legacai — your legacy, alive

An AI agent trained on everything you choose to leave behind — documents,
photographs, voice, journals, and even your ChatGPT and Claude conversations.
For you, for the ones that matter, for now, for the future.

- **Local:** http://localhost:17010
- **Prod:** https://legacai.vercel.app (Vercel `matsiems` scope)
- **Repo:** [flexappdev/legacai](https://github.com/flexappdev/legacai)
- **Fleet role:** site #38 in `~/APPS/` (see [REPOS.md](../REPOS.md))

## Routes

| Path                    | Kind      | Notes                                                                 |
|-------------------------|-----------|-----------------------------------------------------------------------|
| `/`                     | static    | Landing — hero, sources, vaults, how-it-works, agent sample, pricing  |
| `/?lang=fr\|pl\|es`     | static    | Same landing, translated — EN/FR/PL/ES switcher lives in the nav; choice persists via `localStorage` |
| `/#how`, `/#vaults`, `/#sources`, `/#agent`, `/#pricing` | anchor | Deep-linkable sections |
| `/login`                | static    | Magic-link login (Supabase OTP → email → `/auth/callback`)           |
| `/auth/callback`        | dynamic   | OTP exchange → redirects to `?next=` param (default `/vault/agent`)  |
| `/vault`                | static    | 307 → `/vault/agent` (default tab)                                    |
| `/vault/agent`          | SSG       | The Agent — vault stats bar, live Q&A, suggestion chips, real ask input |
| `/vault/sources`        | SSG       | Sources & Inbox — 8 source cards with curation progress + inbox list  |
| `/vault/vault`          | SSG       | My Vault — six life categories with Premium CTAs                      |
| `/vault/family`         | SSG       | Family Circle — 4 members + 6×4 access matrix + invite CTA           |
| `/vault/releases`       | SSG       | Release Plans — birthdays / milestones / contingency + sign-offs      |
| `/vault/charter`        | SSG       | Century Charter — 6 commitments, each with signed date + version stamp|
| `/vault/century`        | SSG       | Century View — decade grid + YearGrid heatmap                         |
| `/vault/welcome`        | static    | Stripe success landing — 3-week onboarding plan + "Open my Vault →"  |
| `/checkout/1yr`         | SSG       | £99/year — Stripe checkout (subscription)                             |
| `/checkout/10yr`        | SSG       | £799 one-off — MOST POPULAR                                           |
| `/checkout/century`     | SSG       | £2,999 one-off — Century vault                                        |
| `/admin`                | static    | Admin dashboard (gated: mat@matsiems.com only via Supabase middleware)|
| `/api/agent/ask`        | dynamic   | Anthropic claude-sonnet-4-6 proxy — vault context system prompt, returns `{ answer, cites[] }` |
| `/api/checkout/[plan]`  | dynamic   | Stripe session creation → returns `{ url }` for redirect              |
| `/api/auth/signout`     | dynamic   | Supabase sign-out → redirects to `/`                                  |
| `/icon`, `/apple-icon`  | generated | Programmatic Legacai L monogram (next/og)                             |
| `/robots.txt`, `/sitemap.xml` | generated | SEO scaffolding                                                 |

Each vault sidebar item is a real `<Link>` — tabs are bookmarkable, back/forward-navigable, and the URL is the source of truth for the active section (`app/vault/[section]/page.tsx`).

## Stack

- Next.js 16 + React 19 + TypeScript + Tailwind v4 (Turbopack)
- **Auth:** Supabase (`@supabase/ssr`) magic-link OTP; `/admin` allowlist → `mat@matsiems.com`
- **AI:** Anthropic claude-sonnet-4-6 proxy at `/api/agent/ask`; env-guarded (503 if no key)
- **DB:** Mongo Atlas — shared FLEET cluster, `app='legacai'` discriminator
- **Payments:** Stripe checkout at `/api/checkout/[plan]`; env-guarded; subscription (1yr) + one-off (10yr/century)
- **i18n:** EN/FR/PL/ES dictionaries in `components/legacai-i18n.ts`; `useLocale()` hook
- **Analytics:** GA4 wrapper (`lib/analytics.tsx`) — `agent_asked`, `plan_selected` events; gated on `NEXT_PUBLIC_GA_ID`
- **Consent:** PECR banner (`components/consent-banner.tsx`) — localStorage + gtag consent update
- **Icon:** `app/icon.tsx` + `app/apple-icon.tsx` — L mark rendered via `next/og`
- **Deploy:** Vercel (`matsiems` scope)

## Getting started

```bash
cd ~/APPS/legacai
npm install
npm test              # 27 vitest tests — landing, dashboard, checkout, analytics, mongoose, supabase
npm run typecheck     # tsc --noEmit
npm run build         # production build smoke
npm run dev           # local dev on :17010
```

Env is synced from `~/context-2026/agents/.env` into `.env.local` (git-ignored).
To activate AI: set `ANTHROPIC_API_KEY` in Vercel env vars.
To activate Stripe: set `STRIPE_SECRET_KEY` + `STRIPE_PRICE_1YR` / `STRIPE_PRICE_10YR` / `STRIPE_PRICE_CENTURY`.
To activate GA4: `/abc-ga sync legacai G-XXXX`.

## Roadmap

| V     | Slice                                                                | Status |
|-------|----------------------------------------------------------------------|--------|
| V1    | Scaffold + JSX landing                                               | ✓      |
| V1.1  | SEO scaffolding (`app/robots.ts`, `app/sitemap.ts`)                  | ✓      |
| V1.2  | Real routes: `/vault`, `/checkout/[plan]` — fix broken pricing CTAs  | ✓      |
| V1.3  | i18n landing (EN/FR/PL/ES) — nav switcher + `?lang=` + localStorage  | ✓      |
| V1.4  | URL-per-tab vault dashboard (`/vault/[section]` × 6)                 | ✓      |
| V1.5  | Vault tabs enriched — stats, inbox, access matrix, sign-offs, charter| ✓      |
| V2    | Red-green TDD (27/27 tests green)                                    | ✓      |
| V2.1  | Supabase magic-link auth + `/login` + `/auth/callback`               | ✓      |
| V2.2  | Anthropic agent proxy `/api/agent/ask` + real vault Q&A              | ✓      |
| V2.3  | Stripe checkout API + `CheckoutButton` + `/vault/welcome`            | ✓      |
| V2.4  | PECR consent banner + GA4 events (`agent_asked`, `plan_selected`)    | ✓      |
| V2.5  | Sign-out route + admin dashboard                                     | ✓      |
| V3    | Supabase RLS + real vault entries per user                           | next   |
| V4    | Mongo FLEET wiring (live vault entries in DB)                        | next   |
| V5    | GA4 live (flip via `/abc-ga sync legacai G-XXXX`)                   | env-gated |
| V6    | Stripe live keys                                                     | env-gated |

Full task list in [`BACKLOG.md`](./BACKLOG.md).

## Non-negotiables

1. **Env-guarded everywhere** — no Supabase key means middleware passes through, never 500s.
2. **No plaintext secrets** — `.env.local` is git-ignored; Vercel envs synced via `/abc-vercel`.
3. **FLEET, not per-app collections** — under the 500-coll Atlas cap.
4. **Every reply cites its source** — no unattributed agent answers.
5. **Every CTA is a real link** — pricing buttons are `<Link>` to `/checkout/[plan]`, not dead SPA state.
6. **Export-anytime covenant** — V7 ships `/api/export/[vault]` alongside the paywall.
