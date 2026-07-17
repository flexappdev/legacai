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
| `/#how`, `/#vaults`, `/#sources`, `/#agent`, `/#pricing` | anchor | Deep-linkable sections; `history.replaceState` updates URL on nav click |
| `/vault`                | static    | Dashboard — Agent · Sources · Vault · Family · Releases · Charter, Personal/Family/Business switcher |
| `/checkout/1yr`         | SSG       | £99/year — reserved for Stripe checkout (V7)                          |
| `/checkout/10yr`        | SSG       | £799 one-off — MOST POPULAR                                           |
| `/checkout/century`     | SSG       | £2,999 one-off — Century vault                                        |
| `/icon`, `/apple-icon`  | generated | Programmatic Legacai L monogram (next/og)                             |
| `/robots.txt`, `/sitemap.xml` | generated | SEO scaffolding                                                 |

## Stack

- Next.js 16 + React 19 + TypeScript + Tailwind v4 (Turbopack)
- **Auth:** Supabase (`@supabase/ssr`), `/admin` allowlist → `mat@matsiems.com`
- **DB:** Mongo Atlas — shared FLEET cluster, `app='legacai'` discriminator
- **Analytics:** GA4 wrapper (`lib/analytics.tsx`), gated on `NEXT_PUBLIC_GA_ID`
- **Icon:** `app/icon.tsx` + `app/apple-icon.tsx` — L mark rendered via `next/og`
- **Deploy:** Vercel (`matsiems` scope)
- **Payments (V7):** Stripe checkout wired to `/checkout/[plan]` routes

## Getting started

```bash
cd ~/APPS/legacai
npm install
npm test              # 25 vitest tests — landing, dashboard, checkout, analytics, mongoose, supabase
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
| V2    | Red-green TDD (25/25 tests green)                                    | ✓      |
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
