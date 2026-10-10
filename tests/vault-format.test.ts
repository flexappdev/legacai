import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "../vault-template");
const SCHEMAS = path.resolve(__dirname, "../schemas");

const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));

function sidecars(layer: string) {
  const dir = path.join(ROOT, layer);
  return readdirSync(dir)
    .filter(f => f.endsWith(".meta.json"))
    .map(f => readJson(path.join(dir, f)));
}

function required(schema: string): string[] {
  return readJson(path.join(SCHEMAS, schema)).required;
}

const items = sidecars("INPUT");
const notes = [...sidecars("LIVE"), ...sidecars("WIKI")];
const people = readJson(path.join(ROOT, "people.json")) as { id: string }[];
const ids = new Set([...items, ...notes].map(r => r.id));

describe("vault-template format", () => {
  it("has a valid manifest", () => {
    const vault = readJson(path.join(ROOT, "vault.json"));
    for (const key of required("vault.schema.json")) expect(vault).toHaveProperty(key);
    expect(vault.formatVersion).toBe("legacai-vault/1");
  });

  it("every INPUT sidecar has required provenance and a matching checksum", () => {
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      for (const key of required("item.schema.json")) expect(item, `${item.id}.${key}`).toHaveProperty(key);
      const bytes = readFileSync(path.join(ROOT, item.file));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(item.sha256);
    }
  });

  it("every LIVE/WIKI note traces back to existing records", () => {
    for (const note of notes) {
      for (const key of required("note.schema.json")) expect(note, `${note.id}.${key}`).toHaveProperty(key);
      expect(existsSync(path.join(ROOT, note.file))).toBe(true);
      expect(note.derivedFrom.length).toBeGreaterThan(0);
      for (const src of note.derivedFrom) expect(ids.has(src), `${note.id} → ${src}`).toBe(true);
    }
  });

  it("WIKI notes are human-reviewed and agent authors name their principal", () => {
    for (const note of notes) {
      if (note.layer === "wiki") expect(note.reviewedBy).toBeTruthy();
      if (note.author.type === "agent") expect(note.author.onBehalfOf).toBeTruthy();
    }
  });

  it("every referenced person exists", () => {
    const personIds = new Set(people.map(p => p.id));
    for (const r of [...items, ...notes]) for (const p of r.people ?? []) expect(personIds.has(p), p).toBe(true);
  });

  it("event log is valid JSON lines targeting known records", () => {
    const lines = readFileSync(path.join(ROOT, "events.jsonl"), "utf8").trim().split("\n");
    for (const line of lines) {
      const e = JSON.parse(line);
      for (const key of required("event.schema.json")) expect(e).toHaveProperty(key);
      for (const t of e.targets) expect(ids.has(t), t).toBe(true);
    }
  });
});
