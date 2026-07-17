import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Supabase server client", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("supabaseConfigured() false when env is empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
    const mod = await import("@/lib/supabase/server");
    expect(mod.supabaseConfigured()).toBe(false);
  });

  it("supabaseConfigured() false when URL has surrounding whitespace and anon is short", async () => {
    // The corrupted-env trap: whitespace on the URL.
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "   https://x.supabase.co   ");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "short");
    const mod = await import("@/lib/supabase/server");
    // .trim() means the URL passes the https:// check;
    // but the short anon key must still fail the guard.
    expect(mod.supabaseConfigured()).toBe(false);
  });

  it("supabaseConfigured() true with realistic env", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://abcdef.supabase.co");
    vi.stubEnv(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.dummy.dummy",
    );
    const mod = await import("@/lib/supabase/server");
    expect(mod.supabaseConfigured()).toBe(true);
  });
});
