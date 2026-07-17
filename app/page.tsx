"use client";
import { useState, useEffect, useRef } from "react";

/* ═══ LEGACAI — your legacy, alive. Heritage light edition. ═══ */

const C = {
  bg: "#FBF9F4", card: "#FFFFFF", elev: "#F4F1E9", hover: "#F7F5EE",
  ink: "#1F2A37", muted: "#5C6B7A", dim: "#98A3B0",
  accent: "#175E54", accentDeep: "#0F4A42", accentLight: "#2E7D6E",
  accentDim: "rgba(23,94,84,0.07)", accentGlow: "rgba(23,94,84,0.18)",
  gold: "#A9853F", goldDim: "rgba(169,133,63,0.10)",
  agent: "#1F6F60", agentDim: "rgba(31,111,96,0.08)", agentGlow: "rgba(31,111,96,0.22)",
  border: "rgba(31,42,55,0.10)", borderSoft: "rgba(31,42,55,0.06)", borderHover: "rgba(23,94,84,0.4)",
  success: "#1E7F4F", danger: "#B4423C", info: "#A9853F", warm: "#A85D5D",
};
const FONT = { display: "'Playfair Display', Georgia, serif", body: "'DM Sans', sans-serif", mono: "ui-monospace, 'SF Mono', Menlo, monospace" };
const SHADOW = { card: "0 1px 2px rgba(31,42,55,0.04), 0 8px 28px rgba(31,42,55,0.06)", lift: "0 2px 4px rgba(31,42,55,0.05), 0 16px 44px rgba(31,42,55,0.10)" };

function Mark({ size = 38, color = C.accent, radius = 10 }: { size?: number; color?: string; radius?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: `linear-gradient(150deg, ${color}, ${color === C.accent ? C.accentDeep : color})`,
      display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      boxShadow: `0 4px 14px ${color}30`,
    }}>
      <div style={{ position: "absolute", inset: 3, borderRadius: radius - 4, border: "1px solid rgba(255,255,255,0.35)" }} />
      <span style={{ fontFamily: FONT.display, fontStyle: "italic", fontWeight: 600, color: "#FDFBF6", fontSize: size * 0.55, lineHeight: 1, marginTop: -size * 0.04 }}>L</span>
    </div>
  );
}

/* ── DATA ── */

const assetSources = [
  { id: "docs", icon: "📄", title: "Documents", subtitle: "Deeds, wills, policies", desc: "PDFs, scans, certificates — the paper trail of a life, encrypted and findable.", formats: ["PDF", "Scan", "DOCX"], color: "#175E54", count: 34, pct: 62 },
  { id: "images", icon: "🖼️", title: "Photos & Images", subtitle: "The visual record", desc: "Camera rolls, albums, old scans — each photo can carry its story.", formats: ["JPG", "HEIC", "Album"], color: "#3E6B63", count: 418, pct: 45 },
  { id: "audio", icon: "🎙️", title: "Audio & Voice", subtitle: "Your voice, kept", desc: "Voice memos, recorded wishes, stories told out loud. Some things can't be typed.", formats: ["Memo", "Wishes", "Stories"], color: "#A85D5D", count: 12, pct: 30 },
  { id: "video", icon: "🎬", title: "Video", subtitle: "Moments in motion", desc: "Home videos, messages to the future, the Sunday dinners nobody filmed on purpose.", formats: ["MP4", "MOV", "Message"], color: "#7A5C8F", count: 27, pct: 25 },
  { id: "aichats", icon: "🤖", title: "AI Conversations", subtitle: "How you thought", desc: "ChatGPT, Claude & Gemini exports — years of your thinking, imported in one click.", formats: ["ChatGPT", "Claude", "Gemini"], color: "#175E54", count: 1240, pct: 70 },
  { id: "journals", icon: "📓", title: "Journals & Letters", subtitle: "In your own words", desc: "Diaries, letters to loved ones, notes-app fragments — written memory.", formats: ["Journal", "Letter", "Note"], color: "#1E7F4F", count: 56, pct: 40 },
  { id: "books", icon: "📚", title: "Books & Lists", subtitle: "What shaped you", desc: "Reading lists, recipes, favourite films — the canon of you.", formats: ["Goodreads", "Recipe", "List"], color: "#A9853F", count: 89, pct: 55 },
  { id: "apps", icon: "🔗", title: "Apps & Accounts", subtitle: "The digital estate", desc: "Where every account lives and how to reach it — pointers, never plaintext passwords.", formats: ["Account", "Sub", "Domain"], color: "#5C6B7A", count: 41, pct: 35 },
];

const vaultTypes = [
  { id: "personal", glyph: "I", title: "Personal Vault", line: "For you", desc: "Your private archive and agent — journals, health wishes, the things only you know. Visibility starts at Private; you decide what ever leaves." },
  { id: "family", glyph: "II", title: "Family Vault", line: "For the ones that matter", desc: "Every member builds their own vault inside a shared circle. Guardians, permissions per category, and one agent the whole family can ask." },
  { id: "business", glyph: "III", title: "Business Vault", line: "For what you built", desc: "Founder knowledge, key contacts, succession notes, credentials pointers. The handbook your successor will wish they had — already written." },
];

const pricing = [
  { name: "1-Year Vault", price: "£99", period: "/year", years: "1", desc: "Everything, renewed yearly", features: ["All 8 asset sources", "100 GB encrypted vault", "Legacai Agent · Finder + Narrator", "6 family members", "AI chat importers", "Considerate weekly prompts", "Professional read-only sharing"], cta: "Start 1-Year Vault", highlight: false },
  { name: "10-Year Vault", price: "£799", period: "one-off", years: "10", desc: "Sort it once. A decade, done.", features: ["Everything in 1-Year", "500 GB · 10 years guaranteed", "Voice-reply agent", "Annual vault review ritual", "Legacy letter templates", "Release plans & triggers", "Save vs yearly"], cta: "Secure 10 Years", highlight: true },
  { name: "Century Vault", price: "£2,999", period: "one-off", years: "100", desc: "A hundred years of you", features: ["Everything in 10-Year", "1 TB · endowment-backed", "Multi-region + archival media", "Guardians across generations", "Agent persistence charter", "Printed summary each decade", "Export-anytime covenant"], cta: "Begin the Century", highlight: false },
];

const channels = [
  { icon: "🖥️", label: "Web" }, { icon: "📱", label: "iOS & Android" }, { icon: "📺", label: "Smart TV" },
  { icon: "⌚", label: "Wearables" }, { icon: "💬", label: "Messaging bridge" }, { icon: "🔊", label: "Voice assistants" },
];

const agentQA = [
  { q: "Where is the Kraków flat deed?", a: "The deed is in Documents → Essentials, uploaded by Mat on 3 July. Story note: \"Original held by solicitor A. Nowak, ul. Floriańska — copy here. Land registry number in the same folder.\"", cites: ["📄 flat-deed-2019.pdf", "📓 Story note"] },
  { q: "Tell me about Mum & Dad's wedding", a: "From Maria's voice story and 48 tagged photos: they married in June 1981 at St. Anne's. Maria says the band played until 4am and Pawel \"danced like the floor owed him money.\" Three photos show the first dance.", cites: ["◉ How we met, 1979", "▣ Wedding album"] },
  { q: "What did Mat think about starting the business?", a: "Across 62 imported AI conversations from 2024–25, one idea keeps returning: \"build things that feel like colleagues, not tools.\" The clearest thread is in the March 2025 sessions on his agent model — it reads like a manifesto.", cites: ["🤖 AI export · 62 convos", "📓 Journal, Mar 2025"] },
  { q: "Who do we call if something happens?", a: "People & Contacts lists: solicitor A. Nowak (Essentials), GP Dr. Wiśniewska (Health), and Karolina & Pawel hold the Guardian mandate with release-plan access. Full contact sheet attached.", cites: ["👥 Contact sheet", "§ Guardian mandate"] },
];

/* ── REUSABLE ── */

function useOnScreen(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis] as const;
}

function Section({ children, id, style }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  const [ref, vis] = useOnScreen(0.05);
  return (
    <section id={id} ref={ref as React.RefObject<HTMLElement>} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)", ...style,
    }}>{children}</section>
  );
}

function SectionLabel({ children, blue }: { children: React.ReactNode; blue?: boolean }) {
  return (
    <div style={{
      display: "inline-block", padding: "6px 20px", borderRadius: 100,
      background: blue ? C.agentDim : C.accentDim, border: `1px solid ${blue ? "rgba(31,111,96,0.2)" : "rgba(23,94,84,0.18)"}`,
      color: blue ? C.agent : C.accent, fontSize: 11, fontFamily: FONT.body,
      fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20,
    }}>{children}</div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: C.ink, lineHeight: 1.14, margin: "0 0 16px" }}>{children}</h2>;
}
function SectionSub({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: FONT.body, fontSize: 16, color: C.muted, lineHeight: 1.7, maxWidth: 620, margin: "0 auto" }}>{children}</p>;
}

function Btn({ children, primary, blue, onClick, style: s }: { children: React.ReactNode; primary?: boolean; blue?: boolean; onClick?: () => void; style?: React.CSSProperties }) {
  const solid = blue ? `linear-gradient(150deg, ${C.agent}, #14584A)` : `linear-gradient(150deg, ${C.accent}, ${C.accentDeep})`;
  const base: React.CSSProperties = {
    padding: primary ? "16px 40px" : "14px 32px", borderRadius: 10,
    fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT.body,
    letterSpacing: "0.05em", transition: "all 0.3s", border: "none",
    ...(primary
      ? { background: solid, color: "#FDFBF6", boxShadow: `0 8px 24px ${blue ? C.agentGlow : C.accentGlow}` }
      : { background: C.card, color: C.ink, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }),
    ...s,
  };
  return <button onClick={onClick} style={base}>{children}</button>;
}

function Bubble({ from, children, cites }: { from: "agent" | "user"; children: React.ReactNode; cites?: string[] | null }) {
  const isAgent = from === "agent";
  return (
    <div style={{ display: "flex", justifyContent: isAgent ? "flex-start" : "flex-end", marginBottom: 14 }}>
      {isAgent && <div style={{ marginRight: 10 }}><Mark size={30} color={C.agent} radius={15} /></div>}
      <div style={{ maxWidth: "78%" }}>
        <div style={{
          padding: "12px 16px", borderRadius: isAgent ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
          background: isAgent ? C.card : C.accentDim,
          border: `1px solid ${isAgent ? "rgba(31,111,96,0.18)" : "rgba(23,94,84,0.16)"}`,
          boxShadow: isAgent ? SHADOW.card : "none",
          fontFamily: FONT.body, fontSize: 13, color: C.ink, lineHeight: 1.65,
        }}>{children}</div>
        {cites && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {cites.map(c => (
              <span key={c} style={{ padding: "4px 10px", borderRadius: 8, fontSize: 10.5, fontFamily: FONT.body, color: C.agent, background: C.agentDim, border: "1px solid rgba(31,111,96,0.18)" }}>{c}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ LANDING ═══ */

function LandingPage({ onNavigate }: { onNavigate: (page: string, plan?: string) => void }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 40px", background: "rgba(251,249,244,0.88)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`, opacity: v ? 1 : 0, transition: "all 0.8s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <Mark size={38} />
          <div>
            <span style={{ fontFamily: FONT.display, fontSize: 21, fontWeight: 700, color: C.ink }}>Legacai</span>
            <span style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 12, color: C.gold, marginLeft: 10, verticalAlign: "middle" }}>your legacy, alive</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {[["How It Works", "how"], ["Vaults", "vaults"], ["Sources", "sources"], ["Pricing", "pricing"]].map(([label, id]) => (
            <span key={id} onClick={() => scrollTo(id)} style={{ color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: FONT.body, fontWeight: 500 }}>{label}</span>
          ))}
          <Btn primary onClick={() => onNavigate("dashboard")} style={{ padding: "10px 24px", fontSize: 12, letterSpacing: "0.08em" }}>OPEN LEGACAI</Btn>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px 40px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "130vw", height: "70vh", background: "radial-gradient(ellipse at center, rgba(23,94,84,0.05) 0%, rgba(169,133,63,0.04) 45%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 5, maxWidth: 980, margin: "0 auto" }}>
          <SectionLabel blue>Your Legacy AI Agent</SectionLabel>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(40px, 5.5vw, 74px)", fontWeight: 700, color: C.ink, lineHeight: 1.08, margin: "0 0 28px" }}>
            Storage keeps your files.<br />
            <span style={{ color: C.accent, fontStyle: "italic" }}>Legacai keeps you.</span>
          </h1>
          <p style={{ fontFamily: FONT.body, fontSize: 17, color: C.muted, lineHeight: 1.75, maxWidth: 660, margin: "0 auto 44px" }}>
            An AI agent trained on everything you choose to leave behind — documents, photographs, voice, journals,
            even your ChatGPT and Claude conversations. For you, for the ones that matter, for now,
            for the future — and to be remembered by it.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn primary blue onClick={() => onNavigate("dashboard")}>MEET YOUR AGENT</Btn>
            <Btn onClick={() => scrollTo("how")}>How It Works ↓</Btn>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 64 }}>
            {assetSources.map(s => (
              <div key={s.id} style={{ width: 106, padding: "16px 8px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 10.5, fontWeight: 600, color: C.ink }}>{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <Section id="sources" style={{ padding: "96px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <SectionLabel>Asset Sources</SectionLabel>
          <SectionTitle>Everything that makes you, ingestible</SectionTitle>
          <SectionSub>Eight sources feed one vault — including the first legacy importer for your ChatGPT, Claude and Gemini conversations.</SectionSub>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {assetSources.map(s => (
            <div key={s.id} style={{ padding: 26, borderRadius: 16, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT.body, fontSize: 16, fontWeight: 700, color: C.ink }}>{s.title}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 11, color: s.color, fontWeight: 600 }}>{s.subtitle}</div>
                </div>
              </div>
              <p style={{ fontFamily: FONT.body, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 14px" }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.formats.map(f => (
                  <span key={f} style={{ padding: "5px 12px", borderRadius: 8, fontSize: 11, fontFamily: FONT.body, color: C.muted, background: C.bg, border: `1px solid ${C.borderSoft}` }}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* VAULTS */}
      <Section id="vaults" style={{ padding: "96px 40px", background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>The Vault Principle</SectionLabel>
            <SectionTitle>One principle. Three vaults.</SectionTitle>
            <SectionSub>Everything worth keeping lives in a vault with an owner, a circle, and a horizon.</SectionSub>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {vaultTypes.map(vt => (
              <div key={vt.id} style={{ padding: 32, borderRadius: 18, background: C.bg, border: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 30, color: C.gold, marginBottom: 16 }}>{vt.glyph}</div>
                <h3 style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 700, color: C.ink, margin: "0 0 4px" }}>{vt.title}</h3>
                <div style={{ fontFamily: FONT.body, fontSize: 11.5, color: C.accent, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>{vt.line}</div>
                <p style={{ fontFamily: FONT.body, fontSize: 13.5, color: C.muted, lineHeight: 1.75, margin: 0 }}>{vt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS (simplified) */}
      <Section id="how" style={{ padding: "96px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <SectionLabel>How It Works</SectionLabel>
          <SectionTitle>Capture · Curate · Converse · Continue</SectionTitle>
          <SectionSub>Most tools store your life. Legacai lets the people you love ask it questions — today, and long after.</SectionSub>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { n: "01", t: "Capture", d: "Connect every source of you — documents, photos, voice, journals, and your AI conversations." },
            { n: "02", t: "Curate", d: "Tag each item Private, Family, Legacy or Public — and add the story only you can tell." },
            { n: "03", t: "Converse", d: "Your Legacai Agent answers your family with citations to real vault items. Never invented." },
            { n: "04", t: "Continue", d: "Release plans decide who receives what, and when. Your agent persists for your vault's horizon." },
          ].map(s => (
            <div key={s.n} style={{ padding: 22, borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
              <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 28, color: C.accent, opacity: 0.5, marginBottom: 6 }}>{s.n}</div>
              <h3 style={{ fontFamily: FONT.display, fontSize: 19, fontWeight: 700, color: C.ink, margin: "0 0 8px" }}>{s.t}</h3>
              <p style={{ fontFamily: FONT.body, fontSize: 12.5, color: C.muted, lineHeight: 1.65, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* AGENT SAMPLE */}
      <Section id="agent" style={{ padding: "96px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <SectionLabel blue>The Legacai Agent</SectionLabel>
          <SectionTitle>Your family asks. You answer — always.</SectionTitle>
          <SectionSub>Trained only on your curated vault. Every reply cites real items.</SectionSub>
        </div>
        <div style={{ maxWidth: 640, margin: "0 auto", background: C.card, border: "1px solid rgba(31,111,96,0.2)", borderRadius: 20, padding: 28, boxShadow: SHADOW.lift }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.borderSoft}` }}>
            <Mark size={34} color={C.agent} radius={17} />
            <div>
              <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 700, color: C.ink }}>Mat&apos;s Legacai</div>
              <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.success }}>● Live · cites every answer</div>
            </div>
          </div>
          <Bubble from="user">What did Dad think about starting the business?</Bubble>
          <Bubble from="agent" cites={agentQA[2].cites}>{agentQA[2].a}</Bubble>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginTop: 40 }}>
          {channels.map(ch => (
            <div key={ch.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 100, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, fontFamily: FONT.body, fontSize: 12, color: C.muted }}>
              <span style={{ fontSize: 15 }}>{ch.icon}</span>{ch.label}
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" style={{ padding: "96px 40px", background: C.card, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>Pricing</SectionLabel>
            <SectionTitle>Pay for time, not features</SectionTitle>
            <SectionSub>Every plan is the full platform. You choose how long your vault is guaranteed to survive.</SectionSub>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }}>
            {pricing.map(p => (
              <div key={p.name} data-testid={`plan-${p.years}`} style={{
                padding: 32, borderRadius: 20, position: "relative", display: "flex", flexDirection: "column",
                background: p.highlight ? "linear-gradient(180deg, rgba(23,94,84,0.05), #FFFFFF)" : C.bg,
                border: `1px solid ${p.highlight ? "rgba(23,94,84,0.35)" : C.border}`,
                boxShadow: p.highlight ? SHADOW.lift : "none",
              }}>
                {p.highlight && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 100, background: `linear-gradient(150deg, ${C.accent}, ${C.accentDeep})`, fontFamily: FONT.body, fontSize: 10, fontWeight: 700, color: "#FDFBF6", letterSpacing: "0.12em" }}>MOST POPULAR</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 30, fontWeight: 700, color: p.name === "Century Vault" ? C.gold : C.accent }}>{p.years}<span style={{ fontSize: 14, color: C.dim, fontStyle: "normal" }}>yr</span></div>
                  <div style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.name}</div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: FONT.display, fontSize: 40, fontWeight: 700, color: C.ink }}>{p.price}</span>
                  <span style={{ fontFamily: FONT.body, fontSize: 14, color: C.dim }}>{p.period}</span>
                </div>
                <p style={{ fontFamily: FONT.body, fontSize: 13, color: C.muted, marginBottom: 22 }}>{p.desc}</p>
                <div style={{ flex: 1, marginBottom: 22 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 9, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.accent, flexShrink: 0 }}>✓</div>
                      <span style={{ fontFamily: FONT.body, fontSize: 12.5, color: C.muted }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Btn primary={p.highlight} blue={p.name === "Century Vault"} onClick={() => onNavigate("order", p.name)} style={{ width: "100%" }}>{p.cta}</Btn>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: "44px 40px 32px", borderTop: `1px solid ${C.border}`, background: C.card }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Mark size={30} radius={8} />
            <span style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 700, color: C.ink }}>Legacai</span>
            <span style={{ fontFamily: FONT.body, fontSize: 12, color: C.dim, marginLeft: 8, fontStyle: "italic" }}>Your legacy, alive.</span>
          </div>
          <span style={{ fontFamily: FONT.body, fontSize: 12, color: C.dim }}>© 2026 Legacai · Privacy · Longevity Charter · GDPR</span>
        </div>
      </footer>
    </div>
  );
}

/* ═══ DASHBOARD (streamlined) ═══ */

function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [page, setPage] = useState("agent");
  const [vault, setVault] = useState("family");
  const nav = [
    { id: "agent", glyph: "❖", label: "The Agent" },
    { id: "sources", glyph: "▤", label: "Sources & Inbox" },
    { id: "vault", glyph: "▣", label: "My Vault" },
    { id: "family", glyph: "◉", label: "Family Circle" },
    { id: "releases", glyph: "✉", label: "Release Plans" },
    { id: "charter", glyph: "§", label: "Century Charter" },
  ];
  const vaultLabel: Record<string, string> = { personal: "Personal Vault — Mat", family: "Family Vault — The Siems", business: "Business Vault — Mat's Co." };
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 252, background: C.card, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", zIndex: 100, padding: "22px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 22px", marginBottom: 20 }}>
          <Mark size={36} radius={9} />
          <div>
            <div style={{ fontFamily: FONT.display, fontSize: 16, fontWeight: 700, color: C.ink }}>Legacai</div>
            <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 10.5, color: C.gold }}>your legacy, alive</div>
          </div>
        </div>
        <div style={{ padding: "0 16px", marginBottom: 22 }}>
          <div style={{ display: "flex", background: C.bg, borderRadius: 10, border: `1px solid ${C.borderSoft}`, padding: 3 }}>
            {[["personal", "Personal"], ["family", "Family"], ["business", "Business"]].map(([id, l]) => (
              <button key={id} data-testid={`vault-${id}`} onClick={() => setVault(id)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: FONT.body, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.03em", background: vault === id ? C.accent : "transparent", color: vault === id ? "#FDFBF6" : C.muted }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, padding: "0 12px" }}>
          {nav.map(item => (
            <div key={item.id} data-testid={`nav-${item.id}`} onClick={() => setPage(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderRadius: 10, marginBottom: 4, cursor: "pointer", background: page === item.id ? C.accentDim : "transparent", border: `1px solid ${page === item.id ? "rgba(23,94,84,0.2)" : "transparent"}` }}>
              <span style={{ fontSize: 14, width: 22, textAlign: "center", color: page === item.id ? C.accent : C.dim }}>{item.glyph}</span>
              <span style={{ fontFamily: FONT.body, fontSize: 13, color: page === item.id ? C.accent : C.muted, fontWeight: page === item.id ? 700 : 500 }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 22px", borderTop: `1px solid ${C.borderSoft}` }}>
          <button onClick={() => onNavigate("hero")} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontFamily: FONT.body, fontSize: 11, letterSpacing: "0.08em", padding: 0 }}>← Back to Home</button>
        </div>
      </div>

      <div style={{ marginLeft: 252, padding: "26px 34px" }}>
        <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: FONT.body, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: C.gold }}>{vaultLabel[vault]?.toUpperCase()}</span>
          <span style={{ height: 1, flex: 1, background: C.borderSoft }} />
          <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim }}>encrypted · audited · yours</span>
        </div>
        <div>
          <h1 style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 700, color: C.ink, margin: 0 }}>{nav.find(n => n.id === page)?.label}</h1>
          <p style={{ fontFamily: FONT.body, fontSize: 13, color: C.muted, margin: "6px 0 0" }}>
            {page === "agent" && "Ask the vault anything — every answer cites its source"}
            {page === "sources" && "8 connected sources · items awaiting curation"}
            {page === "vault" && "Six life categories · guided items · fill at your pace"}
            {page === "family" && "The Siems circle · every member builds their own vault"}
            {page === "releases" && "Who receives what, and when — every plan reversible"}
            {page === "charter" && "The commitments that make a 100-year promise credible"}
          </p>
          {page === "agent" && (
            <div style={{ maxWidth: 640, marginTop: 30, background: C.card, border: "1px solid rgba(31,111,96,0.2)", borderRadius: 20, padding: 28, boxShadow: SHADOW.lift }}>
              {agentQA.slice(0, 2).map((qa, i) => (
                <div key={i}>
                  <Bubble from="user">{qa.q}</Bubble>
                  <Bubble from="agent" cites={qa.cites}>{qa.a}</Bubble>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══ APP ═══ */

export default function Legacai() {
  const [page, setPage] = useState("hero");
  const [, setPlan] = useState("10-Year Vault");
  const nav = (p: string, planName?: string) => { if (planName) setPlan(planName); setPage(p); if (typeof window !== "undefined") window.scrollTo(0, 0); };
  return (
    <div style={{ background: C.bg, minHeight: "100vh", position: "relative", fontFamily: FONT.body, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
      {page === "hero" && <LandingPage onNavigate={nav} />}
      {page === "dashboard" && <Dashboard onNavigate={nav} />}
    </div>
  );
}
