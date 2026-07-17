# Legacai — Backlog

## V1 · Scaffold + JSX landing ✓
- [x] Next.js 15 + TS + Tailwind v4 + Turbopack scaffold
- [x] Legacai landing page dropped in as `app/page.tsx`
- [x] Dashboard shell (Agent · Sources · Vault · Family · Releases · Charter)
- [x] Vault switcher (Personal · Family · Business)
- [x] lucide-react + @supabase/ssr + mongoose installed

## V2 · Red-green TDD (in progress)
- [ ] vitest.config.ts with jsdom + `@testing-library/react`
- [ ] `tests/landing.test.tsx` — hero renders, pricing has 3 plans
- [ ] `tests/dashboard.test.tsx` — nav switches, vault selector works
- [ ] `tests/agent.test.tsx` — bubbles render with cites
- [ ] `tests/analytics.test.ts` — track() no-ops when GA_ID unset
- [ ] `tests/mongoose.test.ts` — mongoConfigured() false when env empty
- [ ] Playwright smoke: `/` loads · nav to dashboard · plan buttons visible

## V3 · Supabase auth
- [ ] `/login` magic-link page
- [ ] `/auth/callback` handler
- [ ] `/admin` layout with allowlist banner
- [ ] Sign-out button in dashboard footer
- [ ] Migration: `vault_owners` (id, email, plan, horizon_years)

## V4 · Mongo FLEET wiring
- [ ] `lib/models/vault.ts` — `getFleetCollection('vaults')` w/ `app='legacai'`
- [ ] `lib/models/asset.ts` — 8 source kinds
- [ ] `lib/models/release.ts` — plan + trigger + status
- [ ] `/api/vault/[id]` GET/POST endpoints
- [ ] Seed script: Siems family demo vault

## V5 · GA4 + Consent Mode v2
- [x] `lib/analytics.tsx` gtag wrapper
- [ ] Consent banner (PECR-compliant)
- [ ] Track: `vault_created`, `plan_selected`, `agent_asked`, `release_scheduled`
- [ ] `/abc-ga sync legacai G-XXXX` when measurement id available

## V6 · Vercel deploy
- [ ] `vercel link --non-interactive --scope matsiems --project legacai`
- [ ] `/abc-vercel` sync .env.local → prod
- [ ] `vercel --prod` first deploy
- [ ] `NEXT_PUBLIC_APP_URL` patched to prod alias
- [ ] `robots.txt` + `sitemap.xml`

## V7 · Stripe monetisation
- [ ] Price IDs: `price_1yr_99`, `price_10yr_799`, `price_century_2999`
- [ ] `/api/checkout/[plan]` — create session
- [ ] `/api/webhooks/stripe` — signature verify, upsert `vault_orders`
- [ ] Success page: `/vault/welcome?session_id=`
- [ ] `/api/export/[vaultId]` — export-anytime covenant endpoint

## Post-V7 (opt-in)
- [ ] Anthropic agent proxy: `/api/agent/ask` with prompt caching
- [ ] Amazon affiliate on Books & Lists source (fs08-21 tag)
- [ ] Resend welcome + weekly capture prompts
- [ ] S3 com27 uploads with `PublicReadLegacai` bucket policy stanza
- [ ] `/abc-diagrams` architecture page

## Fleet cockpit chores
- [ ] Add to `~/APPS/apps-registry.json` (id · port_v2:17010 · role:site · accent:#175E54)
- [ ] Add row to `~/APPS/REPOS.md`
- [ ] Register in `~/APPS/appai/BACKLOG.md` as PBI-legacai-v1
