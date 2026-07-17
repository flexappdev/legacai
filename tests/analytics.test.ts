import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Analytics wrapper", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("is disabled when NEXT_PUBLIC_GA_ID is unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "");
    const mod = await import("@/lib/analytics");
    expect(mod.isAnalyticsEnabled()).toBe(false);
  });

  it("is disabled when NEXT_PUBLIC_GA_ID is malformed", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "not-a-real-id");
    const mod = await import("@/lib/analytics");
    expect(mod.isAnalyticsEnabled()).toBe(false);
  });

  it("is enabled when NEXT_PUBLIC_GA_ID matches G-XXXX", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-ABCDEF1234");
    const mod = await import("@/lib/analytics");
    expect(mod.isAnalyticsEnabled()).toBe(true);
  });

  it("track() is a safe no-op with no gtag on window", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-ABCDEF1234");
    const mod = await import("@/lib/analytics");
    // Delete window.gtag if present so track() must gracefully skip.
    delete (window as unknown as { gtag?: unknown }).gtag;
    expect(() => mod.track("test_event", { foo: "bar" })).not.toThrow();
  });
});
