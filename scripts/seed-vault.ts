/**
 * Seed the FLEET Mongo cluster with the Siems family demo vault entries.
 * Usage: npx tsx scripts/seed-vault.ts
 */
import mongoose from "mongoose";
import { VAULT_ENTRIES } from "../data/vault-corpus";

const DEMO_USER = "mat-siems-demo";
const APP_ID = "legacai";
const URI = process.env.MONGODB_URI ?? "";

if (!URI.startsWith("mongodb")) {
  console.error("MONGODB_URI not set or invalid");
  process.exit(1);
}

const VaultEntrySchema = new mongoose.Schema(
  {
    app: String,
    userId: String,
    title: String,
    category: String,
    icon: String,
    entryDate: Date,
  },
  { timestamps: true }
);

async function seed() {
  await mongoose.connect(URI, { bufferCommands: false });

  const VaultEntry =
    mongoose.models.VaultEntry ??
    mongoose.model("VaultEntry", VaultEntrySchema);

  const ops = Object.entries(VAULT_ENTRIES).map(([date, entry]) => ({
    updateOne: {
      filter: { app: APP_ID, userId: DEMO_USER, title: entry.title },
      update: {
        $setOnInsert: {
          app: APP_ID,
          userId: DEMO_USER,
          title: entry.title,
          category: entry.category,
          icon: entry.icon,
          entryDate: new Date(date),
        },
      },
      upsert: true,
    },
  }));

  const result = await VaultEntry.bulkWrite(ops);
  console.log(`Upserted ${result.upsertedCount} · matched ${result.matchedCount} vault entries`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
