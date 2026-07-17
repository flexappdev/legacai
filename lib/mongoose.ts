/**
 * Cached Mongoose connection — one connection per Node process.
 * FLEET shape: shared cluster DB, app='legacai' discriminator on shared collections.
 * See /abc-mongo skill for cluster-wide 500-collection cap details.
 */
import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = (process.env.MONGODB_URI ?? "").trim();
export const APP_ID = "legacai";

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}

const cached = global._mongoose ?? { conn: null, promise: null };
if (!global._mongoose) global._mongoose = cached;

export function mongoConfigured(): boolean {
  return MONGODB_URI.startsWith("mongodb");
}

export async function getMongoose(): Promise<Mongoose | null> {
  if (!mongoConfigured()) return null;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
