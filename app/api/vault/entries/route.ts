import { NextRequest, NextResponse } from "next/server";
import { getMongoose, APP_ID } from "@/lib/mongoose";
import { getVaultEntryModel } from "@/lib/models/vault-entry";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const conn = await getMongoose();
  if (!conn) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const VaultEntry = getVaultEntryModel();
  const entries = await VaultEntry.find({ app: APP_ID, userId })
    .sort({ entryDate: -1 })
    .limit(200)
    .lean();

  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const conn = await getMongoose();
  if (!conn) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const body = await req.json();
  const { title, category, icon, notes, sourceId, entryDate } = body;

  if (!title || !category || !icon || !entryDate) {
    return NextResponse.json({ error: "title, category, icon, entryDate required" }, { status: 400 });
  }

  const VaultEntry = getVaultEntryModel();
  const entry = await VaultEntry.create({
    app: APP_ID,
    userId,
    title,
    category,
    icon,
    notes,
    sourceId,
    entryDate: new Date(entryDate),
  });

  return NextResponse.json({ entry }, { status: 201 });
}
