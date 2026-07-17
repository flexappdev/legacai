# Legacai — your legacy, alive

An AI agent trained on everything you choose to leave behind — documents,
photographs, voice, journals, and even your ChatGPT and Claude conversations.
For you, for the ones that matter, for now, for the future.

- **Local:** http://localhost:17010
- **Prod:** TBA (Vercel `matsiems` scope)
- **Repo:** [flexappdev/legacai](https://github.com/flexappdev/legacai)
- **Fleet role:** site #38 in `~/APPS/` (see [REPOS.md](../REPOS.md))

## Stack

- Next.js 15 + React 19 + TypeScript + Tailwind v4 (Turbopack)
- **Auth:** Supabase (`@supabase/ssr`), `/admin` allowlist → `mat@matsiems.com`
- **DB:** Mongo Atlas — shared FLEET cluster, `app='legacai'` discriminator
- **Analytics:** GA4 wrapper (`lib/analytics.tsx`), gated on `NEXT_PUBLIC_GA_ID`
- **Deploy:** Vercel (`matsiems` scope)
- **Payments (V7):** Stripe checkout · 1yr / 10yr / century vaults

## Getting started

```bash
cd ~/APPS/legacai
npm install
npm test              # 17 vitest tests, all green
npm run typecheck     # tsc --noEmit
npm run build         # production build smoke
npm run dev           # local dev on :17010
```

Env is synced from `~/context-2026/agents/.env` into `.env.local` (git-ignored).

## Roadmap

Seven `/loop` slices from scaffold → monetised. See [`GOAL.md`](./GOAL.md).

| V   | Slice                          |
|-----|--------------------------------|
| V1  | Scaffold + JSX landing ✓       |
| V2  | Red-green TDD ✓                |
| V3  | Supabase auth + `/admin` gate  |
| V4  | Mongo FLEET wiring             |
| V5  | GA4 + Consent Mode v2          |
| V6  | Vercel deploy                  |
| V7  | Stripe monetisation            |

Full task list in [`BACKLOG.md`](./BACKLOG.md).

## Non-negotiables

1. **Env-guarded everywhere** — no Supabase key means middleware passes through, never 500s.
2. **No plaintext secrets** — `.env.local` is git-ignored; Vercel envs synced via `/abc-vercel`.
3. **FLEET, not per-app collections** — under the 500-coll Atlas cap.
4. **Every reply cites its source** — no unattributed agent answers.
5. **Export-anytime covenant** — V7 ships `/api/export/[vault]` alongside the paywall.
