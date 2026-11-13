# LegacAI — privacy, consent and stewardship requirements

Requirements, not implementation. `MUST` items block storing real personal
data; `SHOULD` items block the Family scope going live.

## Ownership

- **MUST** record an owner (person or legal entity) for every vault and every item.
- **MUST** treat material about a person as theirs to a degree, even when someone else uploaded it: subject rights below apply regardless of who owns the item.
- **SHOULD** record copyright or licence for third-party material (books, photos taken by others).

## Consent

- **MUST** record a consent basis per item: `self`, `consented`, `public-record`, `legitimate-family-interest`, `unknown`.
- **MUST** treat `unknown` as `private` and never promote it beyond the owner's Personal scope.
- **MUST** keep consent as an append-only record (given, scope, purpose, withdrawn) on the `Person`.
- **MUST** get explicit consent before voice or likeness of a living person other than the owner is used to train or condition an agent.
- **SHOULD** let the owner record **posthumous wishes** (what may be released, to whom, when) as a signed WIKI note.

## Living people (family especially)

- **MUST** flag every `Person` as `living: true | false | unknown`. Unknown is treated as living.
- **MUST** let a living person named in the vault, once they have access, see derived notes about them and request correction or redaction.
- **MUST NOT** let the agent disclose a living person's private details to another member unless a grant covers it.
- **SHOULD** support children: material about a minor is sealed from wider scopes until they reach adulthood and can consent.

## Correction

- **MUST NOT** edit INPUT originals. A correction is a new item or annotation plus an `Event` of type `correct`.
- **MUST** flag LIVE/WIKI notes whose `derivedFrom` includes a corrected item as `needs-review`.
- **SHOULD** show the correction history on any WIKI page.

## Deletion

- **MUST** let the owner fully delete their own Personal-scope data: blobs crypto-shredded, index rows removed, a tombstone `Event` kept (no content, just that a deletion happened).
- **MUST** cascade: derived notes that depend only on deleted items are deleted; notes with other sources are re-derived or flagged.
- **SHOULD** default to **seal** instead of delete for Family-scope history where other members have an interest, and say so to the owner before they choose.
- **MUST** state plainly that copies already exported or released cannot be recalled.

## Access control

- **MUST** derive identity from the authenticated session only (no `x-user-id` or body `userId`).
- **MUST** enforce grants in the API and in the agent's retrieval step, not only in the UI.
- **MUST** log reads of `private` and `sealed` material.
- **SHOULD** require two-of-three guardians for releases, scope promotions and executor access (matches the existing charter).

## Inheritance

- **MUST** name guardians and an executor in `vault.json` before a Century (or longer) plan is sold.
- **MUST** keep the export covenant: a full portable bundle (INPUT + LIVE + WIKI + manifests) is downloadable by the owner at any time, and by the executor after a release event.
- **SHOULD** support a "dead man's switch" (the existing `vault-silence` trigger) with warnings to the owner before it fires.

## Agents

- **MUST** cite record ids for every factual claim; uncited claims are shown as unsupported.
- **MUST** mark agent-authored notes as such until a human reviews them.
- **MUST NOT** let an agent promote scope, raise access, release sealed items or delete anything.
- **SHOULD** keep the prompt and model version used to derive each note, so it can be re-derived later.

## Public docs and demos

- **MUST** use synthetic people in demos, tests and docs. The current `data/vault-corpus.ts` and agent prompt should be replaced (see FINDINGS §3.5).
