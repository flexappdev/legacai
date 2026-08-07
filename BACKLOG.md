# Legacai — Backlog

## V1 · Scaffold + JSX landing ✓
- [x] Next.js 15 + TS + Tailwind v4 + Turbopack scaffold
- [x] Legacai landing page dropped in as `app/page.tsx`
- [x] Dashboard shell (Agent · Sources · Vault · Timeline · Century · Family · Releases · Charter)
- [x] Vault switcher (Personal · Family · Business)

## V1.1 · SEO scaffolding ✓
- [x] `app/robots.ts`, `app/sitemap.ts`

## V1.2 · Real routes ✓
- [x] `/vault`, `/checkout/[plan]` — pricing CTAs wired to real pages

## V1.3 · i18n landing (EN/FR/PL/ES) ✓
- [x] `components/legacai-i18n.ts` dictionaries + `useLocale()` hook
- [x] Nav language switcher, `?lang=` URL param, localStorage persistence

## V1.4 · URL-per-tab vault dashboard ✓
- [x] `app/vault/[section]/page.tsx` — 8 tabs each with a bookmarkable URL
- [x] `components/vault-nav.ts` — server-safe NAV constants
- [x] `app/vault/page.tsx` → redirect to `/vault/agent`

## V1.5 · Vault tabs enriched ✓
- [x] Agent: stats bar + 4 Q&A examples + chip suggestions + live ask input
- [x] Sources: 8 source cards with progress + inbox rows
- [x] My Vault: six life categories preview + Purchase Vault CTA
- [x] Timeline: YearGrid component
- [x] Century View: CenturyView component (1940–2080 grid)
- [x] Family: 4 member cards + 6×4 access matrix + invite CTA
- [x] Releases: 3 plans + sign-off chips + new plan CTA
- [x] Charter: 6 commitments + signed dates + version stamps

## V2 · Red-green TDD ✓
- [x] vitest + @testing-library/react
- [x] `tests/landing.test.tsx` — hero, 3 plans, 8 sources, CTAs
- [x] `tests/dashboard.test.tsx` — nav, vault switcher, agent bubbles, vault CTAs, releases
- [x] `tests/checkout.test.tsx` — all 3 plans resolve, unknown slug guarded
- [x] `tests/analytics.test.ts` — track() no-op when GA_ID unset
- [x] `tests/mongoose.test.ts` — mongoConfigured() guards
- [x] `tests/supabase.test.ts` — supabaseConfigured() guards

## V2.1 · Supabase magic-link auth ✓
- [x] `/login` magic-link page
- [x] `/auth/callback` OTP exchange handler
- [x] Middleware: env-guarded (pass-through when unconfigured)

## V2.2 · Anthropic agent proxy ✓
- [x] `/api/agent/ask` — Claude sonnet-4-6, vault context system prompt, `{ answer, cites[] }`
- [x] Live ask form in Agent dashboard tab
- [x] Agent prefers live Mongo entries, falls back to static corpus

## V2.3 · Stripe checkout API ✓
- [x] `/api/checkout/[plan]` — session creation, env-guarded
- [x] `CheckoutButton` component — POST + redirect
- [x] `/vault/welcome` — success landing

## V2.4 · PECR consent banner + GA4 ✓
- [x] `consent-banner.tsx` — localStorage + gtag consent update
- [x] `lib/analytics.tsx` — `agent_asked`, `plan_selected` events; gated on `NEXT_PUBLIC_GA_ID`

## V2.5 · Sign-out + admin dashboard ✓
- [x] `/api/auth/signout` route
- [x] `/admin` — allowlist gate (mat@matsiems.com), admin dashboard

## V3 · Mongo FLEET models ✓
- [x] `lib/models/vault-entry.ts` — VaultEntry with `app:'legacai'` discriminator
- [x] `lib/models/asset.ts` — S3 key + kind + vault ref
- [x] `lib/models/release.ts` — release plan + trigger + signoffs
- [x] `/api/vault/entries` GET + POST — authenticated, Mongo-backed
- [x] `scripts/seed-vault.ts` — seed Siems family demo vault
- [x] `tests/models.test.ts` — schema shape assertions (4 tests)

## V4 · Export covenant ✓
- [x] `/api/export/[vaultId]` — JSON + CSV, Mongo or static corpus fallback
- [x] `tests/export.test.ts` — fallback + CSV format (2 tests)

## V5 · Stripe webhook
- [ ] `/api/webhooks/stripe` — signature verify, upsert `LegacaiOrder` (route created, needs `STRIPE_WEBHOOK_SECRET` in Vercel env)
- [ ] Register endpoint in Stripe dashboard: `https://legacai.vercel.app/api/webhooks/stripe`

## V6 · GA4 live
- [ ] `/abc-ga sync legacai G-XXXX` — activate measurement ID
- [ ] `NEXT_PUBLIC_GA_ID` in Vercel env

## V7 · Vercel + env sync
- [ ] `/abc-vercel sync legacai` — push all `.env.local` vars to Vercel production
- [ ] `NEXT_PUBLIC_APP_URL` patched to prod alias
- [ ] `STRIPE_WEBHOOK_SECRET` added to Vercel env

## V8 · Supabase RLS (real vault isolation per user)
- [ ] Supabase migration: `vault_owners (id, email, plan, horizon_years)`
- [ ] RLS policy: `app = auth.uid()` on vault API reads
- [ ] Wire `/api/vault/entries` to pass real user ID from Supabase session

## V9 · S3 uploads + voice capture
- [ ] `/api/upload` — signed S3 URL (com27 bucket, `legacai/` prefix, `PublicReadLegacai` policy)
- [ ] Browser `MediaRecorder` → S3 → vault entry on Sources tab
- [ ] Asset model wired to vault entry on curation

## V10 · Resend drip
- [ ] Welcome email on order completion (Stripe webhook fires it)
- [ ] Weekly "capture prompt" — 3-week onboarding sequence from `/vault/welcome`
- [ ] Resend API key in Vercel env

## Fleet cockpit chores
- [ ] Add to `~/APPS/apps-registry.json` (id:legacai · port_v2:17010 · role:site · accent:#175E54)
- [ ] Add row to `~/APPS/REPOS.md`
