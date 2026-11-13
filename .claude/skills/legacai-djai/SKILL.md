---
name: legacai-djai
description: DJAI daily journal capture into the LegacAI vault: voice notes, transcripts, memories, decisions, values and life stories. Use for /djai, "journal this", "today's entry", "capture this memory", or when a recording or transcript is shared for the vault.
---

# DJAI (Daily Journal AI)

Turns raw daily material into a clean journal entry in `vault/input/djai/`, ready for the sweep.

## Steps

1. **Take the input** as given (text, transcript, voice-note summary). Keep the original verbatim as `vault/input/djai/YYYY-MM-DD/<slug>.source.md` (or note its original path if it lives elsewhere).
2. **Write the entry** `YYYY-MM-DD/<slug>.md` with front-matter: `date`, `scope`, `horizon`, `people` (pseudonymous ids), `mood`, `tags`, `source`.
3. **Sections:** What happened · Decisions · Values expressed · Memories and stories · Open loops (become ProdGame candidates).
4. **Life story thread:** if the entry adds to a recurring story, append a one-line pointer to `vault/live/stories/<slug>.md`.
5. **Ask once** at the end: anything to keep private, anyone who must consent before this leaves the personal scope.

## Rules

- The entry is derived; it always links to its source. Never paraphrase without the link.
- Default scope is personal and horizon 100 unless the user says otherwise.
- Do not invent feelings, quotes or events. Mark inference as inference.
