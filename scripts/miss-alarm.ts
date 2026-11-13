/**
 * CLI for the LegacAI miss alarm.
 *
 *   npx tsx scripts/miss-alarm.ts [repoRoot]
 *
 * Reads vault/.sweep-state.json (lastRun) and vault/input/djai/ file names,
 * prints one line per miss and exits 1, or prints nothing and exits 0.
 * Read-only: it never writes to the vault.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { checkMisses, djDatesFromFiles } from "../lib/ops/miss-alarm";

const root = process.argv[2] ?? process.cwd();
const statePath = path.join(root, "vault", ".sweep-state.json");
const djDir = path.join(root, "vault", "input", "djai");

let sweepLastRun: string | null = null;
if (existsSync(statePath)) {
  sweepLastRun = JSON.parse(readFileSync(statePath, "utf8")).lastRun ?? null;
}
const djDates = existsSync(djDir) ? djDatesFromFiles(readdirSync(djDir)) : [];

const lines = checkMisses({ now: new Date(), sweepLastRun, djDates });
if (lines.length) {
  console.log(lines.join("\n"));
  process.exit(1);
}
