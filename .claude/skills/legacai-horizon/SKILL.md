---
name: legacai-horizon
description: Preservation and inheritance audit for LegacAI across 100, 1,000 and 10,000-year horizons: formats, export, consent, guardians and release plans. Use for /legacai-horizon, "will this last", "preservation audit", "inheritance plan", "export my vault".
---

# LegacAI Horizon

Checks that vault content stays understandable, trustworthy, portable and lawful over its target horizon, and reports gaps.

## Horizon rules

| Horizon | Format | Integrity | Access |
|---|---|---|---|
| 100 yrs | Open formats (Markdown, JSON, CSV, FLAC/WAV, TIFF/PNG, PDF/A); export covenant | sha1 + git history | Guardians, release plans, consent per living person |
| 1,000 yrs | Plain text + self-describing schema docs; no proprietary dependency; multiple copies in independent locations | Signed manifests; fixity checks | Successor custodians; language glossary for drift |
| 10,000 yrs | Minimal, human-readable core; visual primer that explains how to read the rest; physical/durable media copies | Redundant manifests across media | Assume no shared language or tech; curated humanity-scope subset only |

## Steps

1. **Inventory** `vault/` by scope × horizon (counts, formats, sizes).
2. **Check** each item against its horizon row: format, provenance link, checksum, consent, guardian.
3. **Check the app covenant:** `/api/export/[vaultId]` returns everything in JSON + CSV; release plans have guardians and sign-offs.
4. **Report** to `vault/live/horizon-audit.md`: pass count, gaps ranked by horizon, and the smallest next fix for each.
5. **Fix only low-risk gaps** (add a missing schema doc, a manifest, a checksum). Anything touching storage providers, permissions or publication waits for the user.

## Rules

- Living people: correction and deletion rights override preservation; record the tombstone, not the content.
- Never move private material into a wider scope to "preserve" it.
