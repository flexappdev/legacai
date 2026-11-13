# Example vault (synthetic)

This folder is a **template**. Everyone in it is fictional. Copy it into a
private repository or folder to start a real vault; never commit real
personal material to the public `legacai` repo.

## How to read this vault without any software

- `vault.json` says whose vault this is, what it covers and how long it is meant to last.
- `INPUT/` holds the original files exactly as they were captured. Each original
  has a twin file ending in `.meta.json` that says when, where and by whom it was
  captured, plus a SHA-256 fingerprint so you can check it has not changed.
- `LIVE/` holds working notes: summaries, current goals, transcripts. They can be
  rewritten at any time.
- `WIKI/` holds reviewed pages meant to last. Every page lists, in its
  `.meta.json`, the originals it was written from (`derivedFrom`).
- `people.json` lists the people the vault mentions and what they agreed to.
- `grants.json` lists who may see what. Anything not listed is private.
- `events.jsonl` is a diary of every change, one line per event, never edited.

The format is described in `../schemas/` and `../docs/legacai/ARCHITECTURE.md`.
