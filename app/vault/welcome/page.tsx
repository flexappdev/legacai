import Link from "next/link";
import { C, FONT, SHADOW } from "@/components/legacai-tokens";
import { Mark } from "@/components/mark";

export const metadata = { title: "Welcome to your Vault — Legacai" };

export default function WelcomePage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <div style={{ maxWidth: 540, width: "100%", padding: "0 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <Mark size={56} radius={14} />
        </div>
        <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 13, color: C.gold, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          Your vault is ready
        </div>
        <h1 style={{ fontFamily: FONT.display, fontSize: 34, fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: 14 }}>
          Welcome to Legacai
        </h1>
        <p style={{ fontFamily: FONT.body, fontSize: 14.5, color: C.muted, lineHeight: 1.75, marginBottom: 36 }}>
          Your encrypted vault is live. The agent is trained and ready. Everything you add from here on
          becomes part of the legacy you leave behind — documents, voice, photos, and your own words.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
          {[
            { n: "Week 1", t: "Capture", d: "Import your documents, photos, and AI conversations" },
            { n: "Week 2", t: "Guardians", d: "Name your guardians and set per-category access" },
            { n: "Week 3", t: "The Exhale", d: "Guided walkthrough with your family and the agent" },
          ].map(s => (
            <div key={s.n} style={{ padding: "16px 14px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
              <div style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase", marginBottom: 6 }}>{s.n}</div>
              <div style={{ fontFamily: FONT.display, fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 4 }}>{s.t}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.muted, lineHeight: 1.55 }}>{s.d}</div>
            </div>
          ))}
        </div>

        <Link
          href="/vault/agent"
          style={{ display: "inline-block", padding: "14px 36px", borderRadius: 12, background: C.accent, color: "#FDFBF6", fontFamily: FONT.body, fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em", marginBottom: 16 }}
        >
          Open my Vault →
        </Link>
        <div style={{ fontFamily: FONT.body, fontSize: 11.5, color: C.dim, lineHeight: 1.6 }}>
          A receipt has been sent to your email. Questions? <a href="mailto:hello@legacai.com" style={{ color: C.accent, textDecoration: "none" }}>hello@legacai.com</a>
        </div>
      </div>
    </div>
  );
}
