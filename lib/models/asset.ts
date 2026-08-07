import mongoose, { Schema, type Document, type Model } from "mongoose";
import { APP_ID } from "@/lib/mongoose";

export interface IAsset extends Document {
  app: string;
  userId: string;
  kind: "doc" | "photo" | "audio" | "video" | "ai" | "journal" | "book";
  s3Key: string;
  mimeType: string;
  originalName: string;
  sizeBytes: number;
  curated: boolean;
  vaultEntryId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new Schema<IAsset>(
  {
    app: { type: String, required: true, default: APP_ID, index: true },
    userId: { type: String, required: true, index: true },
    kind: { type: String, required: true, enum: ["doc", "photo", "audio", "video", "ai", "journal", "book"] },
    s3Key: { type: String, required: true },
    mimeType: { type: String, required: true },
    originalName: { type: String, required: true },
    sizeBytes: { type: Number, required: true, default: 0 },
    curated: { type: Boolean, required: true, default: false },
    vaultEntryId: { type: String },
  },
  { timestamps: true }
);

AssetSchema.index({ app: 1, userId: 1, kind: 1 });

export function getAssetModel(): Model<IAsset> {
  return mongoose.models.LegacaiAsset ?? mongoose.model<IAsset>("LegacaiAsset", AssetSchema);
}
