---
name: legacai-sweep
description: Promote LegacAI vault material from INPUT to LIVE to WIKI with scope, horizon, provenance and consent tags. Use for /legacai-sweep, "sweep the legacy vault", "promote to wiki", or after dropping journals, exports or recordings into vault/input/.
---

# LegacAI Sweep

The LegacAI version of the INPUT → LIVE → WIKI sweep, extended for scopes, horizons and consent. Operates on `vault/` in the legacai repo (create the three folders if missing).

## Steps

1. **State:** read `vault/.sweep-state.json` (`lastRun`, `hashes`); create if missing.
2. **Scan `input/`:** sha1 every file; collect new and changed.
3. **Tag each item** in a sidecar `*.meta.json` under `live/meta/` (never edit the input):
   - `scope`: personal | family | business | country | humanity
   - `horizon`: 100 | 1000 | 10000
   - `kind`: journal | recording | transcript | document | photo | ai-chat | goal | project | lesson | decision | other
   - `provenance`: source surface, capture date, author, original path, sha1
   - `people`: pseudonymous ids; `consent`: per person, `granted | pending | n/a`
4. **Extract** entities, decisions, values, lessons, dates and links.
5. **Rewrite `live/`:** `now.md`, `people/<id>.md`, `projects/<slug>.md`, `decisions.md` (newest first, each with a backlink to its input).
6. **Promote to `wiki/`** when an item is stable for ≥3 sweeps, backed by ≥2 inputs, and every living person in it has `consent: granted`. Pages go under `wiki/<scope>/`. Each ends with `## Sources` linking the inputs.
7. **Flag, don't fix:** consent gaps, conflicting facts, and corrections go to `live/review.md` for the user.
8. **Save state; commit** `vault: sweep YYYY-MM-DD (N in, M live, K wiki, F flagged)`. Push only if asked.

## Invariants

- `input/` is append-only; `wiki/` is never deleted (mark `## Deprecated`, or `## Withdrawn` for consent revocation, and remove content but keep the tombstone).
- A correction creates a new version with a link to what it replaces; history stays.
- Over 50 new inputs: process the oldest 50, report how many remain.
