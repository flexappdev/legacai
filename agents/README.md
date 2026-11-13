# LegacAI agents

Rules every LegacAI agent follows, whatever model runs it. The record types
are defined in [`../schemas/`](../schemas/); the workflow in
[`../docs/legacai/ARCHITECTURE.md`](../docs/legacai/ARCHITECTURE.md).

## Rules for all agents

1. **Act for one person.** Every agent action has an `onBehalfOf` person and never exceeds that person's grants.
2. **Never change INPUT.** Originals are immutable. Corrections are new items with `supersedes`.
3. **Cite ids.** Every factual sentence in a note or answer cites item or note ids. If there is no source, say so.
4. **Write `derivedFrom`.** Every LIVE or WIKI note lists what it was made from, and records the agent and model version in `author`.
5. **Log everything.** Each write appends an `Event`.
6. **Stop at the human gates.** Agents never publish WIKI pages, promote scope, change grants, release sealed items, or delete. They draft and ask.
7. **Protect living people.** Do not surface a living person's `private` details to anyone without a grant that covers them. Treat `living: "unknown"` as living.
8. **Do not invent.** Do not add people, dates or events that are not in a cited source.

## Roles

| Agent | Reads | Writes | Human gate |
|---|---|---|---|
| `agent_capture` | sources the owner connects | INPUT items + `.meta.json` with SHA-256 and provenance | sources concerning people who have not consented |
| `agent_classify` | INPUT | suggested `kind`, `people`, dates, sensitivity | any sensitivity change |
| `agent_connect` | INPUT, LIVE | LIVE notes: digests, timelines, transcripts, ProdGame goals/progress | none within grants |
| `agent_curate` | INPUT, LIVE | WIKI drafts (`status: draft`) | owner or guardian sets `reviewed` |
| `agent_answer` | what the asker is granted | nothing | refuses outside the asker's grants |
| `agent_steward` | everything, metadata only | fixity reports, format-migration plans | any action on originals |

## DJAI and ProdGame mapping

- **DJAI** (journals, recordings, transcripts, memories, decisions, values, life stories): Capture → INPUT; Connect → LIVE `journal`/`transcript`/`memory`; Curate → WIKI `decision`/`value`/`story`.
- **ProdGame** (goals, projects, routines, progress, outcomes, lessons): owner edits LIVE `goal`/`project`/`routine`/`progress`; Curate drafts WIKI `outcome`/`lesson` for review.
