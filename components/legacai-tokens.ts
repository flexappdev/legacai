/**
 * Design tokens + data shared by the landing, /vault dashboard and
 * /checkout/[plan] routes. Keep this file free of JSX so it stays cheap
 * to import from both server and client components.
 */

export const C = {
  bg: "#FBF9F4", card: "#FFFFFF", elev: "#F4F1E9", hover: "#F7F5EE",
  ink: "#1F2A37", muted: "#5C6B7A", dim: "#98A3B0",
  accent: "#175E54", accentDeep: "#0F4A42", accentLight: "#2E7D6E",
  accentDim: "rgba(23,94,84,0.07)", accentGlow: "rgba(23,94,84,0.18)",
  gold: "#A9853F", goldDim: "rgba(169,133,63,0.10)",
  agent: "#1F6F60", agentDim: "rgba(31,111,96,0.08)", agentGlow: "rgba(31,111,96,0.22)",
  border: "rgba(31,42,55,0.10)", borderSoft: "rgba(31,42,55,0.06)", borderHover: "rgba(23,94,84,0.4)",
  success: "#1E7F4F", danger: "#B4423C", info: "#A9853F", warm: "#A85D5D",
} as const;

export const FONT = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', sans-serif",
  mono: "ui-monospace, 'SF Mono', Menlo, monospace",
} as const;

export const SHADOW = {
  card: "0 1px 2px rgba(31,42,55,0.04), 0 8px 28px rgba(31,42,55,0.06)",
  lift: "0 2px 4px rgba(31,42,55,0.05), 0 16px 44px rgba(31,42,55,0.10)",
} as const;

export type Plan = {
  slug: "1yr" | "10yr" | "century";
  name: string;
  price: string;
  period: string;
  years: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

export const PLANS: Plan[] = [
  {
    slug: "1yr",
    name: "1-Year Vault",
    price: "£99",
    period: "/year",
    years: "1",
    desc: "Everything, renewed yearly",
    features: [
      "All 8 asset sources",
      "100 GB encrypted vault",
      "Legacai Agent · Finder + Narrator",
      "6 family members",
      "AI chat importers",
      "Considerate weekly prompts",
      "Professional read-only sharing",
    ],
    cta: "Start 1-Year Vault",
    highlight: false,
  },
  {
    slug: "10yr",
    name: "10-Year Vault",
    price: "£799",
    period: "one-off",
    years: "10",
    desc: "Sort it once. A decade, done.",
    features: [
      "Everything in 1-Year",
      "500 GB · 10 years guaranteed",
      "Voice-reply agent",
      "Annual vault review ritual",
      "Legacy letter templates",
      "Release plans & triggers",
      "Save vs yearly",
    ],
    cta: "Secure 10 Years",
    highlight: true,
  },
  {
    slug: "century",
    name: "Century Vault",
    price: "£2,999",
    period: "one-off",
    years: "100",
    desc: "A hundred years of you",
    features: [
      "Everything in 10-Year",
      "1 TB · endowment-backed",
      "Multi-region + archival media",
      "Guardians across generations",
      "Agent persistence charter",
      "Printed summary each decade",
      "Export-anytime covenant",
    ],
    cta: "Begin the Century",
    highlight: false,
  },
];

export function planBySlug(slug: string): Plan | undefined {
  return PLANS.find((p) => p.slug === slug);
}

export const ASSET_SOURCES = [
  { id: "docs", icon: "📄", title: "Documents", subtitle: "Deeds, wills, policies", desc: "PDFs, scans, certificates — the paper trail of a life, encrypted and findable.", formats: ["PDF", "Scan", "DOCX"], color: "#175E54", count: 34, pct: 62 },
  { id: "images", icon: "🖼️", title: "Photos & Images", subtitle: "The visual record", desc: "Camera rolls, albums, old scans — each photo can carry its story.", formats: ["JPG", "HEIC", "Album"], color: "#3E6B63", count: 418, pct: 45 },
  { id: "audio", icon: "🎙️", title: "Audio & Voice", subtitle: "Your voice, kept", desc: "Voice memos, recorded wishes, stories told out loud. Some things can't be typed.", formats: ["Memo", "Wishes", "Stories"], color: "#A85D5D", count: 12, pct: 30 },
  { id: "video", icon: "🎬", title: "Video", subtitle: "Moments in motion", desc: "Home videos, messages to the future, the Sunday dinners nobody filmed on purpose.", formats: ["MP4", "MOV", "Message"], color: "#7A5C8F", count: 27, pct: 25 },
  { id: "aichats", icon: "🤖", title: "AI Conversations", subtitle: "How you thought", desc: "ChatGPT, Claude & Gemini exports — years of your thinking, imported in one click.", formats: ["ChatGPT", "Claude", "Gemini"], color: "#175E54", count: 1240, pct: 70 },
  { id: "journals", icon: "📓", title: "Journals & Letters", subtitle: "In your own words", desc: "Diaries, letters to loved ones, notes-app fragments — written memory.", formats: ["Journal", "Letter", "Note"], color: "#1E7F4F", count: 56, pct: 40 },
  { id: "books", icon: "📚", title: "Books & Lists", subtitle: "What shaped you", desc: "Reading lists, recipes, favourite films — the canon of you.", formats: ["Goodreads", "Recipe", "List"], color: "#A9853F", count: 89, pct: 55 },
  { id: "apps", icon: "🔗", title: "Apps & Accounts", subtitle: "The digital estate", desc: "Where every account lives and how to reach it — pointers, never plaintext passwords.", formats: ["Account", "Sub", "Domain"], color: "#5C6B7A", count: 41, pct: 35 },
];

export const VAULT_TYPES = [
  { id: "personal", glyph: "I", title: "Personal Vault", line: "For you", desc: "Your private archive and agent — journals, health wishes, the things only you know. Visibility starts at Private; you decide what ever leaves." },
  { id: "family", glyph: "II", title: "Family Vault", line: "For the ones that matter", desc: "Every member builds their own vault inside a shared circle. Guardians, permissions per category, and one agent the whole family can ask." },
  { id: "business", glyph: "III", title: "Business Vault", line: "For what you built", desc: "Founder knowledge, key contacts, succession notes, credentials pointers. The handbook your successor will wish they had — already written." },
];

export const CHANNELS = [
  { icon: "🖥️", label: "Web" }, { icon: "📱", label: "iOS & Android" }, { icon: "📺", label: "Smart TV" },
  { icon: "⌚", label: "Wearables" }, { icon: "💬", label: "Messaging bridge" }, { icon: "🔊", label: "Voice assistants" },
];

export const AGENT_QA = [
  { q: "Where is the Kraków flat deed?", a: "The deed is in Documents → Essentials, uploaded by Mat on 3 July. Story note: \"Original held by solicitor A. Nowak, ul. Floriańska — copy here. Land registry number in the same folder.\"", cites: ["📄 flat-deed-2019.pdf", "📓 Story note"] },
  { q: "Tell me about Mum & Dad's wedding", a: "From Maria's voice story and 48 tagged photos: they married in June 1981 at St. Anne's. Maria says the band played until 4am and Pawel \"danced like the floor owed him money.\" Three photos show the first dance.", cites: ["◉ How we met, 1979", "▣ Wedding album"] },
  { q: "What did Mat think about starting the business?", a: "Across 62 imported AI conversations from 2024–25, one idea keeps returning: \"build things that feel like colleagues, not tools.\" The clearest thread is in the March 2025 sessions on his agent model — it reads like a manifesto.", cites: ["🤖 AI export · 62 convos", "📓 Journal, Mar 2025"] },
  { q: "Who do we call if something happens?", a: "People & Contacts lists: solicitor A. Nowak (Essentials), GP Dr. Wiśniewska (Health), and Karolina & Pawel hold the Guardian mandate with release-plan access. Full contact sheet attached.", cites: ["👥 Contact sheet", "§ Guardian mandate"] },
];
