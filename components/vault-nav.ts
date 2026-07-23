export const NAV = [
  { id: "agent", glyph: "❖", label: "The Agent" },
  { id: "sources", glyph: "▤", label: "Sources & Inbox" },
  { id: "vault", glyph: "▣", label: "My Vault" },
  { id: "family", glyph: "◉", label: "Family Circle" },
  { id: "releases", glyph: "✉", label: "Release Plans" },
  { id: "charter", glyph: "§", label: "Century Charter" },
] as const;

export type PageId = (typeof NAV)[number]["id"];
