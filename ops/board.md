# LegacAI board register

_Owner: the `legacai` CEO skill. Reader: the board (Mat). Updated 2026-11-13 (W46)._
_Every number cites its source. "No data" means no source exists yet, never zero._

## 1. KPIs

| KPI | Target | Now (13 Nov, 08:45 UK) | Source |
|---|---|---|---|
| Daily sweeps, November | 30/30 (25/25 if re-baselined from 6 Nov) | 0 recorded | `vault/.sweep-state.json` on every branch; last `lastRun` 2026-10-31 (PR #2) |
| Weekday DJ entries, November | 21/21 (17/17 if re-baselined) | 0 recorded | no `vault/input/djai/` on main or any branch |
| LegacAI scheduled tasks | 2 (sweep 07:00, DJ prompt 18:30) + miss alarm | 0 | account scheduled-task list, read 13 Nov |
| Open draft PRs | 0 older than 7 days | 2 (#1 34 days, #2 13 days) | github.com/flexappdev/legacai/pulls |
| Paid vaults | north star: paid vaults × horizon years | no data | Stripe webhook not live (V5) |
| Funnel visit → ask → checkout → paid | measured weekly | no data | GA4 not live (V6) |
| Run costs per month | within budget | no data | no LegacAI cost ledger yet; first audit W48 |
| Automation coverage | every recurring task automated | 0 of 5 (see §4) | §4 below |

## 2. Budget

| Line | Monthly cap | Actual | Note |
|---|---|---|---|
| Vercel, Supabase, Mongo, S3, Anthropic API, Stripe fees, Resend | not set | no data | Board to set a cap; until then the CEO adds no paid service |

## 3. Decisions log

| # | Opened | Decision | Recommendation | Status |
|---|---|---|---|---|
| D1 | 2026-11-06 | Re-baseline November: count from 6 Nov (25/25, 17/17), full rule in December | Yes | **Open** |
| D2 | 2026-11-06 | Close PR #2, delete its branch, keep person pages in the private folder | Yes | **Open** |
| D3 | 2026-11-06 | Review and merge PR #1 so the vault lands on main | Yes | **Open** |
| D4 | 2026-11-06 | Go-ahead to create the daily sweep (07:00) and weekday DJ prompt (18:30) scheduled tasks, plus the miss alarm | Yes | **Open** (asked 6 Nov, no answer) |
| D5 | 2026-11-13 | Set a monthly run-cost cap | Set one before V5–V7 go live (W48) | Open, not urgent |

Closed decisions move to the bottom with date and outcome; nothing is deleted.

## 4. Automation register

| Workflow | Cadence | Mechanism | Health check | Status |
|---|---|---|---|---|
| Vault sweep (`legacai-sweep`) | daily 07:00 UK | scheduled task | miss alarm, 09:00 | Not scheduled (D4); run by hand |
| DJ prompt (`legacai-djai`) | weekdays 18:30 UK | scheduled task | miss alarm, 21:00 | Not scheduled (D4) |
| Miss alarm | 09:05 and 21:05 UK daily | `scripts/miss-alarm.ts` (`lib/ops/miss-alarm.ts`, tested) | exits 1 with one line per miss | Built W46; not scheduled (D4) |
| Weekly board pack | Mondays | `ops/board-packs/<week>.md` | — | Manual (first: 2026-W46) |
| ProdGame week review | Fridays | `vault/input/prodgame/week-<week>.md` | — | Manual (first: 2026-W46) |
| Monthly cost audit | 1st of month | — | — | Not built (W48) |
| Monthly horizon check | 1st of month | `legacai-horizon` | — | Not built (W49) |

Run rule for every routine: short and quiet, one commit, no message on success, one line on a miss.
