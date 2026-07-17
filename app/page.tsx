"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  C, FONT, SHADOW,
  ASSET_SOURCES, VAULT_TYPES, PLANS, CHANNELS, AGENT_QA,
} from "@/components/legacai-tokens";
import { Mark } from "@/components/mark";

const SECTION_IDS = ["hero", "how", "vaults", "sources", "agent", "pricing"] as const;

function useOnScreen(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis] as const;
}

function Section({ children, id, style }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  const [ref, vis] = useOnScreen(0.05);
  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)",
        scrollMarginTop: 80,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children, blue }: { children: React.ReactNode; blue?: boolean }) {
  return (
    <div style={{
      display: "inline-block", padding: "6px 20px", borderRadius: 100,
      background: blue ? C.agentDim : C.accentDim,
      border: `1px solid ${blue ? "rgba(31,111,96,0.2)" : "rgba(23,94,84,0.18)"}`,
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

function LinkBtn({
  href, children, primary, blue, style: s, prefetch,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  blue?: boolean;
  style?: React.CSSProperties;
  prefetch?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const solid = blue ? `linear-gradient(150deg, ${C.agent}, #14584A)` : `linear-gradient(150deg, ${C.accent}, ${C.accentDeep})`;
  const base: React.CSSProperties = {
    display: "inline-block", textDecoration: "none",
    padding: primary ? "16px 40px" : "14px 32px", borderRadius: 10,
    fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT.body,
    letterSpacing: "0.05em", transition: "all 0.3s", border: "none",
    ...(primary
      ? { background: solid, color: "#FDFBF6", boxShadow: `0 8px 24px ${blue ? C.agentGlow : C.accentGlow}` }
      : { background: C.card, color: C.ink, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }),
    ...s,
  };
  const isExternal = /^https?:\/\//.test(href);
  const isHash = href.startsWith("#") || href.startsWith("/#");
  if (isExternal || isHash) {
    return <a href={href} style={base} {...rest}>{children}</a>;
  }
  return <Link href={href} prefetch={prefetch} style={base} {...rest}>{children}</Link>;
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

export default function LandingPage() {
  // On mount, restore scroll position from hash so /#pricing links deep-link correctly.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.location.hash.replace(/^#/, "");
    if (raw && (SECTION_IDS as readonly string[]).includes(raw)) {
      // Defer until after paint so the target section has real height.
      requestAnimationFrame(() => {
        document.getElementById(raw)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  }, []);

  const goTo = (id: string) => {
    if (typeof window !== "undefined") {
      // Push a real URL like /#pricing so nav is bookmarkable + back-navigable.
      window.history.replaceState(null, "", `/#${id}`);
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", background: C.bg, color: C.ink, fontFamily: FONT.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 40px", background: "rgba(251,249,244,0.88)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <a href="#hero" onClick={(e) => { e.preventDefault(); goTo("hero"); }} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textDecoration: "none" }}>
          <Mark size={38} />
          <div>
            <span style={{ fontFamily: FONT.display, fontSize: 21, fontWeight: 700, color: C.ink }}>Legacai</span>
            <span style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 12, color: C.gold, marginLeft: 10, verticalAlign: "middle" }}>your legacy, alive</span>
          </div>
        </a>
        <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {[["How It Works", "how"], ["Vaults", "vaults"], ["Sources", "sources"], ["Agent", "agent"], ["Pricing", "pricing"]].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); goTo(id); }}
              style={{ color: C.muted, fontSize: 13, cursor: "pointer", fontFamily: FONT.body, fontWeight: 500, textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <LinkBtn href="/vault" primary style={{ padding: "10px 24px", fontSize: 12, letterSpacing: "0.08em" }}>OPEN LEGACAI</LinkBtn>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px 40px", textAlign: "center", position: "relative", scrollMarginTop: 80 }}>
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
            <LinkBtn href="/vault" primary blue>MEET YOUR AGENT</LinkBtn>
            <LinkBtn href="#how" onClick={(e) => { e.preventDefault(); goTo("how"); }}>How It Works ↓</LinkBtn>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 64 }}>
            {ASSET_SOURCES.map(s => (
              <a key={s.id} href="#sources" onClick={(e) => { e.preventDefault(); goTo("sources"); }}
                style={{ width: 106, padding: "16px 8px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, textAlign: "center", textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 10.5, fontWeight: 600, color: C.ink }}>{s.title}</div>
              </a>
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
          {ASSET_SOURCES.map(s => (
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
            {VAULT_TYPES.map(vt => (
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

      {/* HOW */}
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

      {/* AGENT */}
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
          <Bubble from="agent" cites={AGENT_QA[2].cites}>{AGENT_QA[2].a}</Bubble>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginTop: 40 }}>
          {CHANNELS.map(ch => (
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
            {PLANS.map(p => (
              <div key={p.slug} data-testid={`plan-${p.years}`} style={{
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
                <LinkBtn href={`/checkout/${p.slug}`} primary={p.highlight} blue={p.name === "Century Vault"} style={{ width: "100%", textAlign: "center" }}>{p.cta}</LinkBtn>
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
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Link href="/vault" style={{ fontFamily: FONT.body, fontSize: 12, color: C.muted, textDecoration: "none" }}>My Vault</Link>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); goTo("pricing"); }} style={{ fontFamily: FONT.body, fontSize: 12, color: C.muted, textDecoration: "none" }}>Pricing</a>
            <span style={{ fontFamily: FONT.body, fontSize: 12, color: C.dim }}>© 2026 Legacai</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
