---
name: legacai
description: LegacAI Master: the orchestrator for the LegacAI legacy vault (app, vault and agents). Use for /legacai, "pick up LegacAI", "LegacAI status", "what next on LegacAI", or any ask spanning scopes, horizons, DJAI, ProdGame or the vault.
---

# LegacAI Master (/legacai)

The single entry point for LegacAI: a long-horizon knowledge and legacy vault for what is yours, ours and shared across generations. It reads state, decides which sub-flow applies, runs it, and reports back. It never does silently what a sub-skill owns.

## Model it holds

- **Five scopes:** personal · family · business · country · humanity. Every item carries exactly one owning scope plus optional shared scopes.
- **Three horizons:** 100 · 1,000 · 10,000 years. Every item carries a target horizon; the horizon decides format and redundancy rules (see `legacai-horizon`).
- **Three vault layers:** INPUT (raw, append-only, provenance) → LIVE (current context) → WIKI (durable, linked, cited).
- **Two feeders:** DJAI (journals, recordings, memories, values, decisions) and ProdGame (goals, projects, routines, outcomes, lessons).
- **Canonical home:** the `flexappdev/legacai` repo. Schemas, docs, agent instructions and portable formats live there; private source material never does.

## What to do when invoked

1. **Read state** from the repo: `README.md`, `GOAL.md`, `BACKLOG.md`, `git log -10`, and `vault/` if present (`vault/live/now.md` first). Create nothing yet.
2. **Classify the ask** into one mode:

| Mode | Trigger | Action |
|---|---|---|
| `status` | bare `/legacai`, "where are we" | 5-line picture: last ship, open V-slices, vault counts per layer and scope, top blocker |
| `ship` | "build next", "next V" | Pick the next open BACKLOG slice; red-green TDD; `npm test && npm run typecheck && npm run build`; commit `feat(vX): …`; draft PR |
| `capture` | journal, voice note, transcript | Hand to `legacai-djai` |
| `review` | goals, week, year, lessons | Hand to `legacai-prodgame` |
| `sweep` | "sweep", new files in `vault/input/` | Hand to `legacai-sweep` |
| `preserve` | export, inheritance, "will this last" | Hand to `legacai-horizon` |
| `ask` | a question about the vault | Answer from WIKI then LIVE, every claim cited to a source path |

3. **Run the mode**, then update `vault/live/now.md` (create if missing) with what changed.
4. **Report**: lead with the result, then what needs the user (a decision, a dashboard-only step, a consent sign-off).

## Invariants

- Every agent answer cites its sources (`cites[]` in the app, source paths in docs). No unattributed claims.
- Never write to `vault/input/`, never delete from `vault/wiki/`.
- Private material (names of living people, health, finance, addresses) never enters public docs, commit messages, PR bodies or the static demo corpus. Use placeholders.
- Living people's data needs their recorded consent before it moves beyond the personal scope.
- Export-anytime covenant: anything stored must be exportable in an open format.
- Env-guarded everywhere; no external service, publication or permission change without an explicit ask.

## Hands off to

`legacai-sweep` · `legacai-djai` · `legacai-prodgame` · `legacai-horizon` · and the existing `/abc-*` chain for infra (`/abc-vercel`, `/abc-supabase`, `/abc-mongo`, `/abc-stripe`, `/abc-s3`, `/abc-resend`, `/abc-diagram`).
