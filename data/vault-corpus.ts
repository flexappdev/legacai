/** Stub vault entries — keyed by ISO date (YYYY-MM-DD). */

export interface VaultEntry {
  title: string;
  category: "doc" | "photo" | "audio" | "video" | "ai" | "journal" | "book";
  icon: string;
}

export const VAULT_ENTRIES: Record<string, VaultEntry> = {
  "2026-07-03": { title: "Kraków flat deed uploaded", category: "doc", icon: "📄" },
  "2026-07-17": { title: "Century Charter signed", category: "doc", icon: "§" },
  "2026-07-12": { title: "62 AI conversations imported", category: "ai", icon: "🤖" },
  "2026-06-15": { title: "Family photo album — summer 2025", category: "photo", icon: "🖼️" },
  "2026-05-01": { title: "Karolina guardian mandate", category: "doc", icon: "◉" },
  "2026-05-02": { title: "Pawel guardian mandate", category: "doc", icon: "◉" },
  "2026-04-22": { title: "Voice memo — Karolina birthday note", category: "audio", icon: "🎙️" },
  "2026-03-10": { title: "Recipe list — Maria's summer soups", category: "book", icon: "📚" },
  "2026-02-20": { title: "Health form update — Dr. Wiśniewska", category: "doc", icon: "📄" },
  "2026-01-08": { title: "Business manifesto — first draft", category: "journal", icon: "📓" },
};
