import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { VAULT_ENTRIES } from "@/data/vault-corpus";
import { ASSET_SOURCES } from "@/components/legacai-tokens";
import { getMongoose, APP_ID } from "@/lib/mongoose";
import { getVaultEntryModel } from "@/lib/models/vault-entry";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function buildVaultLines(userId?: string): Promise<string> {
  if (userId) {
    const conn = await getMongoose();
    if (conn) {
      const VaultEntry = getVaultEntryModel();
      const entries = await VaultEntry.find({ app: APP_ID, userId })
        .sort({ entryDate: -1 })
        .limit(100)
        .lean();
      if (entries.length > 0) {
        return entries
          .map(e => `- ${String(e.entryDate).slice(0, 10)}: [${e.category}] ${e.icon} ${e.title}`)
          .join("\n");
      }
    }
  }
  // Fall back to static corpus
  return Object.entries(VAULT_ENTRIES)
    .map(([date, e]) => `- ${date}: [${e.category}] ${e.icon} ${e.title}`)
    .join("\n");
}

async function buildVaultContext(userId?: string): Promise<string> {
  const vaultLines = await buildVaultLines(userId);
  return `
You are the Legacai Agent — an AI trained on a family's vault. Answer questions concisely and warmly, always citing the specific vault item that contains the answer.

VAULT ITEMS (keyed by date):
${vaultLines}

CONNECTED SOURCES:
${ASSET_SOURCES.map(s => `- ${s.title}: ${s.count} items, ${s.pct}% curated. Formats: ${s.formats.join(", ")}.`).join("\n")}

FAMILY CIRCLE:
- Mat Siems — Owner/Founder. Has access to all categories.
- Karolina — Guardian (Spouse). Guardian mandate signed 2026-05-01. Access: docs, photos, audio.
- Pawel — Guardian (Brother). Guardian mandate signed 2026-05-01. Access: docs, photos.
- Maria — Mother-in-law (read-only). Access: photos, books.

GUARDIANSHIP: Two-of-three required to trigger release plans.

RELEASE PLANS:
1. Birthday letters to Karolina — auto, every 15 Feb — 12 items queued
2. Milestone messages for future kids — manual trigger — 4 items queued
3. Full vault contingency — if vault silent for 180 days — 28 items queued

CENTURY CHARTER: Signed 2026-07-17 v1.0. Export-anytime covenant, guardianship two-of-three, endowment-backed horizon, agent persistence, right to be forgotten, data sovereignty.

INSTRUCTIONS:
- Answer the question directly in 2–4 sentences
- Always cite the vault item(s) that support your answer using the format: [icon title]
- If the answer isn't in the vault, say so honestly
- Be warm but precise — this is about someone's legacy
`.trim();
}

export async function POST(req: NextRequest) {
  try {
    const { question, userId } = await req.json();
    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json({ error: "question required" }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "Agent not configured" }, { status: 503 });
    }

    const vaultContext = await buildVaultContext(userId);

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      system: vaultContext,
      messages: [{ role: "user", content: question.trim() }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Extract any cited items (lines starting with [ from the answer)
    const citeRegex = /\[([^\]]+)\]/g;
    const cites: string[] = [];
    let match;
    while ((match = citeRegex.exec(text)) !== null) {
      cites.push(match[1]);
    }

    // Clean up inline citations from visible text
    const answer = text.replace(/\s*\[[^\]]+\]/g, "").trim();

    return NextResponse.json({ answer, cites: cites.length > 0 ? cites : null });
  } catch (e) {
    console.error("agent/ask error:", e);
    return NextResponse.json({ error: "Agent unavailable" }, { status: 500 });
  }
}
