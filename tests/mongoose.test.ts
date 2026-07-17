import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Mongoose FLEET wiring", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("mongoConfigured() is false when MONGODB_URI is empty", async () => {
    vi.stubEnv("MONGODB_URI", "");
    const mod = await import("@/lib/mongoose");
    expect(mod.mongoConfigured()).toBe(false);
  });

  it("getMongoose() returns null when unconfigured (no throw)", async () => {
    vi.stubEnv("MONGODB_URI", "");
    const mod = await import("@/lib/mongoose");
    await expect(mod.getMongoose()).resolves.toBeNull();
  });

  it("exposes APP_ID = 'legacai' for FLEET discriminator", async () => {
    const mod = await import("@/lib/mongoose");
    expect(mod.APP_ID).toBe("legacai");
  });

  it("mongoConfigured() true when URI starts with mongodb", async () => {
    vi.stubEnv("MONGODB_URI", "mongodb+srv://example");
    const mod = await import("@/lib/mongoose");
    expect(mod.mongoConfigured()).toBe(true);
  });
});
