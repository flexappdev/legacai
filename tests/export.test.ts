import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/mongoose", () => ({
  APP_ID: "legacai",
  mongoConfigured: () => false,
  getMongoose: async () => null,
}));

vi.mock("@/lib/models/vault-entry", () => ({
  getVaultEntryModel: () => ({ find: () => ({ sort: () => ({ limit: () => ({ lean: async () => [] }) }) }) }),
}));

describe("Export endpoint — export-anytime covenant", () => {
  it("falls back to static corpus when Mongo unavailable", async () => {
    const { GET } = await import("@/app/api/export/[vaultId]/route");
    const req = new Request("http://localhost/api/export/mat-demo");
    const params = Promise.resolve({ vaultId: "mat-demo" });
    const res = await GET(req as never, { params });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.app).toBe("legacai");
    expect(data.entries.length).toBeGreaterThan(0);
    expect(data.version).toBe("1.0");
  });

  it("returns CSV when Accept: text/csv is set", async () => {
    const { GET } = await import("@/app/api/export/[vaultId]/route");
    const req = new Request("http://localhost/api/export/mat-demo", {
      headers: { accept: "text/csv" },
    });
    const params = Promise.resolve({ vaultId: "mat-demo" });
    const res = await GET(req as never, { params });
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("entryDate,category,title,icon");
  });
});
