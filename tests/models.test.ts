import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/mongoose", () => ({
  APP_ID: "legacai",
  mongoConfigured: () => false,
  getMongoose: async () => null,
}));

describe("Vault models — schema shape", () => {
  it("APP_ID discriminator is 'legacai'", async () => {
    const { APP_ID } = await import("@/lib/mongoose");
    expect(APP_ID).toBe("legacai");
  });

  it("VaultEntry model has required fields", async () => {
    const { getVaultEntryModel } = await import("@/lib/models/vault-entry");
    const Model = getVaultEntryModel();
    const paths = Object.keys(Model.schema.paths);
    expect(paths).toContain("app");
    expect(paths).toContain("userId");
    expect(paths).toContain("title");
    expect(paths).toContain("category");
    expect(paths).toContain("entryDate");
  });

  it("Asset model has s3Key and curated fields", async () => {
    const { getAssetModel } = await import("@/lib/models/asset");
    const Model = getAssetModel();
    const paths = Object.keys(Model.schema.paths);
    expect(paths).toContain("s3Key");
    expect(paths).toContain("curated");
    expect(paths).toContain("kind");
  });

  it("ReleasePlan model has signoffs array and triggerKind", async () => {
    const { getReleasePlanModel } = await import("@/lib/models/release");
    const Model = getReleasePlanModel();
    const paths = Object.keys(Model.schema.paths);
    expect(paths).toContain("triggerKind");
    expect(paths).toContain("status");
    expect(paths).toContain("signoffs");
  });
});
