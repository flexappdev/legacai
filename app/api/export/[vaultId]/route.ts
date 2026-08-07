import { NextRequest, NextResponse } from "next/server";
import { getMongoose, APP_ID } from "@/lib/mongoose";
import { getVaultEntryModel } from "@/lib/models/vault-entry";
import { VAULT_ENTRIES } from "@/data/vault-corpus";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ vaultId: string }> }
) {
  const { vaultId } = await params;
  const userId = req.headers.get("x-user-id") ?? vaultId;

  const conn = await getMongoose();

  let entries;
  if (conn) {
    const VaultEntry = getVaultEntryModel();
    entries = await VaultEntry.find({ app: APP_ID, userId }).sort({ entryDate: -1 }).lean();
  } else {
    // Fall back to static corpus when DB unavailable — export-anytime covenant must hold
    entries = Object.entries(VAULT_ENTRIES).map(([date, e]) => ({
      entryDate: date,
      title: e.title,
      category: e.category,
      icon: e.icon,
    }));
  }

  const payload = {
    exported_at: new Date().toISOString(),
    vault: vaultId,
    app: APP_ID,
    version: "1.0",
    entry_count: entries.length,
    entries,
  };

  const accept = req.headers.get("accept") ?? "";
  if (accept.includes("text/csv")) {
    const csv = [
      "entryDate,category,title,icon",
      ...entries.map(e => {
        const d = "entryDate" in e ? String(e.entryDate) : "";
        return `${d},${e.category},"${e.title}",${e.icon}`;
      }),
    ].join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="legacai-vault-${vaultId}.csv"`,
      },
    });
  }

  return NextResponse.json(payload, {
    headers: {
      "Content-Disposition": `attachment; filename="legacai-vault-${vaultId}.json"`,
    },
  });
}
