import mongoose, { Schema, type Document, type Model } from "mongoose";
import { APP_ID } from "@/lib/mongoose";

export interface IVaultEntry extends Document {
  app: string;
  userId: string;
  title: string;
  category: "doc" | "photo" | "audio" | "video" | "ai" | "journal" | "book";
  icon: string;
  notes?: string;
  sourceId?: string;
  entryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VaultEntrySchema = new Schema<IVaultEntry>(
  {
    app: { type: String, required: true, default: APP_ID, index: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ["doc", "photo", "audio", "video", "ai", "journal", "book"] },
    icon: { type: String, required: true },
    notes: { type: String },
    sourceId: { type: String },
    entryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

VaultEntrySchema.index({ app: 1, userId: 1, entryDate: -1 });

export function getVaultEntryModel(): Model<IVaultEntry> {
  return mongoose.models.VaultEntry ?? mongoose.model<IVaultEntry>("VaultEntry", VaultEntrySchema);
}
