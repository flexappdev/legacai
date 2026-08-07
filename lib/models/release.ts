import mongoose, { Schema, type Document, type Model } from "mongoose";
import { APP_ID } from "@/lib/mongoose";

export type ReleaseStatus = "draft" | "active" | "triggered" | "cancelled";
export type TriggerKind = "auto-date" | "manual-guardians" | "vault-silence";

export interface IReleasePlan extends Document {
  app: string;
  userId: string;
  title: string;
  description: string;
  recipient: string;
  triggerKind: TriggerKind;
  triggerDate?: Date;
  silenceDays?: number;
  itemCount: number;
  status: ReleaseStatus;
  signoffs: Array<{ name: string; email: string; signedAt?: Date }>;
  createdAt: Date;
  updatedAt: Date;
}

const SignoffSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    signedAt: { type: Date },
  },
  { _id: false }
);

const ReleasePlanSchema = new Schema<IReleasePlan>(
  {
    app: { type: String, required: true, default: APP_ID, index: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    recipient: { type: String, required: true },
    triggerKind: { type: String, required: true, enum: ["auto-date", "manual-guardians", "vault-silence"] },
    triggerDate: { type: Date },
    silenceDays: { type: Number },
    itemCount: { type: Number, required: true, default: 0 },
    status: { type: String, required: true, default: "draft", enum: ["draft", "active", "triggered", "cancelled"] },
    signoffs: { type: [SignoffSchema], default: [] },
  },
  { timestamps: true }
);

ReleasePlanSchema.index({ app: 1, userId: 1, status: 1 });

export function getReleasePlanModel(): Model<IReleasePlan> {
  return mongoose.models.ReleasePlan ?? mongoose.model<IReleasePlan>("ReleasePlan", ReleasePlanSchema);
}
