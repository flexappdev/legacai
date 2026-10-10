# LegacAI — architecture proposal

Status: **proposal**, not yet agreed. Builds on what exists (see
[FINDINGS.md](./FINDINGS.md)). Nothing here changes external services, data or
access permissions.

## 1. One idea

A vault is a **folder of plain, self-describing files under version control**.
The web app, database and agents are views and helpers over that folder. If
every service disappears, the folder still makes sense to a person with a text
editor, and later to a person with no computer at all.

```
            capture                curate                 distil
 sources ─────────▶ INPUT ─────────────▶ LIVE ─────────────▶ WIKI
 (DJAI, uploads,    immutable,           current context,     durable, linked,
  AI chats, docs)   checksummed,         editable, short-     reviewed knowledge
                    provenance           lived summaries      for people + agents
                        ▲                    │                     │
                        └──── derivedFrom ───┴──── derivedFrom ────┘
```

- **INPUT** — originals, never edited. Each item has a SHA-256, capture time, source, importer and consent basis.
- **LIVE** — working context: current goals, open projects, this month's journal digest, who-is-who. Regenerated freely, always pointing back to INPUT.
- **WIKI** — curated pages a human has reviewed: life story chapters, values, decisions, lessons, recipes, business playbooks. Every claim links to INPUT or LIVE ids.

Derived text is never trusted on its own: `derivedFrom` is mandatory for LIVE and WIKI, and the agent only cites ids.

## 2. Five scopes

| Scope | Owner | Typical content | Default horizon |
|---|---|---|---|
| Personal | one person | journals, voice, AI chats, health, private letters | 100 years |
| Family | named guardians (2-of-3) | photos, recipes, stories, release letters, family tree | 100 → 1,000 years |
| Business | company / partners | decisions, playbooks, lessons, IP history | 100 years (plus legal retention) |
| Country | institution or community | local history, oral histories, civic knowledge | 1,000 years |
| Worldwide | public / commons | distilled knowledge meant for anyone | 10,000 years |

Content moves **up** scopes only by an explicit, logged **promotion** (a human
decision, with consent from people it concerns). Nothing is promoted by an agent
alone, and nothing moves down into a narrower scope without the owner knowing.

## 3. Three horizons

| | 100 years | 1,000 years | 10,000 years |
|---|---|---|---|
| **Assume lost** | the company, the app, current cloud accounts | today's software, file formats, encryption keys, institutions, maybe the language | all digital infrastructure, the language, cultural context |
| **Formats** | Markdown, JSON, CSV, PDF/A, FLAC/WAV, PNG/TIFF, MKV (FFV1) | the subset above that is plain text or uncompressed; schemas embedded as prose | etched or printed text and pictures; no decoding step |
| **Copies** | 3-2-1: app storage, git remote, offline drive held by a guardian | multiple independent institutions (libraries, archives, LOCKSS-style) | durable physical media in several places (e.g. archival paper, nickel/glass etching) |
| **Integrity** | SHA-256 fixity checks, signed git commits | checksums + printed manifests, replicated | redundancy and physical durability, not cryptography |
| **Encryption** | yes, with guardian key escrow and crypto-shredding for deletion | only for sealed material with a planned unsealing; released material stored in clear | none: anything on this tier is public by design |
| **Meaning** | README + schema docs | plain-language primer, glossary, dated context notes per collection | pictorial primer, multilingual parallel text (Rosetta approach) |
| **Selection** | most of the vault | curated WIKI and chosen originals | a tiny distilled set, Worldwide scope only |
| **Review cadence** | yearly fixity check, format check every 5–10 years | migration plan per generation (~25 years) | set once, re-copied when media ages |

Practical rule: **each step up in horizon keeps less, in simpler formats, with
fewer secrets**. Personal private material is never placed on the 10,000-year
tier by default.

## 4. Repository structure

The repo is the canonical home for schemas, docs, agent instructions and
portable formats. Personal data does **not** live in this public repo.

```
legacai/
├── app/, components/, lib/   Next.js app (existing)
├── docs/legacai/             findings, architecture, privacy, MVP
├── schemas/                  JSON Schemas for the portable vault format
├── agents/                   agent roles, rules and prompts
├── vault-template/           an empty, synthetic example vault
│   ├── vault.json            manifest: scope, horizon, guardians, format version
│   ├── INPUT/                originals + one .meta.json sidecar each
│   ├── LIVE/                 current-context notes (Markdown + front matter)
│   └── WIKI/                 curated pages (Markdown + front matter)
└── tests/vault-format.test.ts  checks the template obeys the rules
```

A real vault is a separate **private** git repo (or folder) created from
`vault-template/`. The app imports from and exports to that format.

## 5. Core data model

Six records, all in `schemas/`. The existing Mongo models map onto them.

| Record | Purpose | Existing equivalent |
|---|---|---|
| `Vault` | scope, horizon, owners, guardians, format version | Personal/Family/Business switcher (UI only) |
| `Person` | anyone the vault concerns; `living` flag, role, consent records | Family Circle (static UI) |
| `Item` (INPUT) | one original + metadata + provenance | `Asset` (+ `VaultEntry` for dated items) |
| `Note` (LIVE / WIKI) | derived text with `kind`, `derivedFrom[]`, author (human/agent), review state | none |
| `Grant` | who may see what, at which layer and sensitivity, from/until when | access matrix (static UI) |
| `Event` | append-only log: import, derive, review, promote, correct, redact, delete, release | none |

`Note.kind` absorbs DJAI and ProdGame without new collections:

- **DJAI:** `journal`, `transcript`, `memory`, `decision`, `value`, `story`
- **ProdGame:** `goal`, `project`, `routine`, `progress`, `outcome`, `lesson`
- **General:** `person-page`, `topic`, `summary`, `release-letter`

Provenance on every `Item`: `sha256`, `capturedAt`, `importedAt`, `source`
(device, service, export file), `importer` (person or agent id), `consentBasis`,
`originalName`, `mimeType`.

## 6. Permissions model

- **Default deny.** Access comes only from a `Grant`.
- **Roles:** `owner`, `guardian`, `member`, `reader`, `executor` (acts after death or incapacity), `agent`, `public`.
- **Grant dimensions:** scope × layer (INPUT/LIVE/WIKI) × sensitivity ceiling × time window × optional condition (a release plan trigger).
- **Sensitivity levels:** `public` < `shared` < `family` < `private` < `sealed`. `sealed` items need a release event to open (date, guardians 2-of-3, or vault silence: the triggers that already exist in `ReleasePlan`).
- **Agents are delegates.** An agent acts for one human principal and never holds more access than that person. Agents may write LIVE notes; WIKI writes, promotions, releases and deletions need a human.
- **Identity comes from the session**, never from a header or request body (fixes risks 1–3 in FINDINGS).

## 7. Privacy, consent and stewardship requirements

See [PRIVACY.md](./PRIVACY.md) for the full list. Headlines:

- Living people other than the owner are the hardest case: they get notice, can ask for correction or redaction of derived content, and are not promoted to wider scopes without consent.
- Corrections never overwrite: they add a new version and an `Event`, and LIVE/WIKI notes that cite the corrected item are flagged for review.
- Deletion is real for the owner's own data (crypto-shred blobs, tombstone in the log). Where others have a legitimate interest (family history), the default is **seal**, not delete, and the owner chooses.
- Inheritance is planned, not inferred: guardians and executors are named in `vault.json` and backed by a legal document outside the app.

## 8. Agents

Defined in [`agents/README.md`](../../agents/README.md):

| Agent | Layer | May write | Needs human for |
|---|---|---|---|
| Capture | → INPUT | new items + sidecars | sensitive sources, people who have not consented |
| Classify | INPUT | tags, people, dates (as suggestions) | sensitivity raise or lower |
| Connect | LIVE | links, timelines, digests | nothing beyond its principal's grants |
| Curate | LIVE → WIKI | WIKI drafts | publishing a WIKI page |
| Answer | read only | nothing | answers outside the asker's grants (refuses) |
| Steward | all | fixity reports, migration plans | any change to originals |

## 9. MVP

See [MVP.md](./MVP.md).
