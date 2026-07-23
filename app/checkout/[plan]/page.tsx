import Link from "next/link";
import { notFound } from "next/navigation";
import { C, FONT, SHADOW, PLANS, planBySlug, VAULT_TYPES } from "@/components/legacai-tokens";
import { Mark } from "@/components/mark";

export async function generateStaticParams() {
  return PLANS.map((p) => ({ plan: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  const p = planBySlug(plan);
  if (!p) return { title: "Checkout — Legacai" };
  return {
    title: `Secure your ${p.name} — Legacai`,
    description: `${p.desc}. ${p.price} ${p.period}.`,
  };
}

export default async function CheckoutPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  const p = planBySlug(plan);
  if (!p) notFound();

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: FONT.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 40px", background: "rgba(251,249,244,0.9)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}>
          <Mark size={36} />
          <span style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, color: C.ink }}>Legacai</span>
          <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim, letterSpacing: "0.12em", marginLeft: 8 }}>SECURE ORDER</span>
        </Link>
        <Link href="/#pricing" style={{ background: "none", border: "none", color: C.muted, textDecoration: "none", fontFamily: FONT.body, fontSize: 12.5 }}>← Back to pricing</Link>
      </nav>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "48px 40px 96px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 100,
            background: C.accentDim, border: "1px solid rgba(23,94,84,0.18)",
            color: C.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em",
            textTransform: "uppercase", marginBottom: 20,
          }}>Secure Your {p.name}</div>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.15 }}>
            {p.desc}.<br />
            <span style={{ fontStyle: "italic", color: C.accent }}>{p.price} {p.period}.</span>
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 28, alignItems: "start" }}>
          {/* LEFT — plan detail */}
          <div>
            <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.accent, marginBottom: 12 }}>
              I · WHAT YOU GET
            </div>
            <div style={{ padding: 32, borderRadius: 18, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, marginBottom: 32 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.borderSoft}` }}>
                  <div style={{ width: 22, height: 22, borderRadius: 11, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.accent, flexShrink: 0 }}>✓</div>
                  <span style={{ fontFamily: FONT.body, fontSize: 13.5, color: C.ink }}>{f}</span>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.accent, marginBottom: 12 }}>
              II · CHOOSE YOUR VAULT
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
              {VAULT_TYPES.map(vt => (
                <div key={vt.id} style={{ padding: 16, borderRadius: 14, background: C.card, border: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 18, color: C.gold, marginBottom: 6 }}>{vt.glyph}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 12.5, fontWeight: 700, color: C.ink }}>{vt.title}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.muted, marginTop: 2 }}>{vt.line}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.accent, marginBottom: 12 }}>
              III · WHAT HAPPENS NEXT
            </div>
            <div style={{ padding: 24, borderRadius: 16, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
              {[
                ["Today", "Vault created instantly", "Your encrypted vault opens the moment the order completes — categories, checklist and importers ready."],
                ["Week 1", "The capture week", "Guided imports: documents, photos, voice — and your AI conversations. Considerate prompts do the pacing."],
                ["Week 2", "Guardians & release plans", "Name your guardians, set per-category access, record your wishes in your own voice."],
                ["Week 3", "The Exhale session", "A guided walkthrough where your family meets the vault — and the agent — for the first time."],
              ].map(([when, t, d], i) => (
                <div key={t} style={{ display: "flex", gap: 16, marginBottom: i < 3 ? 18 : 0, position: "relative" }}>
                  {i < 3 && <div style={{ position: "absolute", left: 15, top: 34, width: 1, height: "calc(100% - 8px)", background: C.borderSoft }} />}
                  <div style={{ width: 32, height: 32, borderRadius: 16, background: C.accentDim, border: "1px solid rgba(23,94,84,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontStyle: "italic", fontSize: 13, color: C.accent, flexShrink: 0, position: "relative", zIndex: 2 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: C.ink }}>
                      {t} <span style={{ fontSize: 10.5, color: C.gold, fontWeight: 600, marginLeft: 6 }}>{when.toUpperCase()}</span>
                    </div>
                    <div style={{ fontFamily: FONT.body, fontSize: 12, color: C.muted, lineHeight: 1.6, marginTop: 2 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — summary */}
          <div style={{ position: "sticky", top: 92 }}>
            <div style={{ padding: 28, background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: SHADOW.card }}>
              <h3 style={{ fontFamily: FONT.display, fontSize: 19, fontWeight: 700, color: C.ink, margin: "0 0 18px" }}>Order summary</h3>
              {[
                ["Plan", p.name],
                ["Horizon", `${p.years} year${p.years === "1" ? "" : "s"} · guaranteed`],
                ["Price", `${p.price} ${p.period}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${C.borderSoft}` }}>
                  <span style={{ fontFamily: FONT.body, fontSize: 12.5, color: C.muted }}>{k}</span>
                  <span style={{ fontFamily: FONT.body, fontSize: 12.5, fontWeight: 600, color: C.ink }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0 4px" }}>
                <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: C.ink }}>Due today</span>
                <span style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 700, color: C.accent }}>{p.price}</span>
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim, marginBottom: 18 }}>
                {p.slug === "1yr" ? "then yearly · cancel anytime" : "one payment · no renewals for the full horizon"}
              </div>

              <div style={{
                padding: "14px 16px", borderRadius: 12, background: C.goldDim,
                border: "1px solid rgba(169,133,63,0.3)", marginBottom: 16,
              }}>
                <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8A7440", marginBottom: 4 }}>
                  STRIPE CHECKOUT · V7
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 11.5, color: "#8A7440", lineHeight: 1.55 }}>
                  Live payments arrive in the V7 monetisation slice. Until then, this is the reserved
                  checkout route — deep-linkable, cite-able, and ready for Stripe to plug in.
                </div>
              </div>

              <Link href="/vault" style={{
                display: "block", textAlign: "center", padding: "16px 0", borderRadius: 10, width: "100%",
                background: `linear-gradient(150deg, ${C.accent}, ${C.accentDeep})`, color: "#FDFBF6",
                fontFamily: FONT.body, fontSize: 14, fontWeight: 700, letterSpacing: "0.05em",
                textDecoration: "none",
              }}>PREVIEW MY VAULT →</Link>

              <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 16, fontFamily: FONT.body, fontSize: 10, color: C.dim, flexWrap: "wrap" }}>
                <span>▣ AES-256</span><span>§ Guardian mandates</span><span>✉ Export covenant</span>
              </div>
              <div style={{ textAlign: "center", marginTop: 10, fontFamily: FONT.body, fontSize: 10.5, color: C.dim }}>
                14-day full refund · payment held in escrow until vault opens
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
