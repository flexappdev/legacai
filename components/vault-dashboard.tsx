"use client";
import { useState } from "react";
import Link from "next/link";
import {
  C, FONT, SHADOW,
  AGENT_QA, ASSET_SOURCES,
} from "@/components/legacai-tokens";
import { NAV, type PageId } from "@/components/vault-nav";
import { Mark } from "@/components/mark";

type VaultKind = "personal" | "family" | "business";

const VAULT_LABEL: Record<VaultKind, string> = {
  personal: "Personal Vault — Mat",
  family: "Family Vault — The Siems",
  business: "Business Vault — Mat's Co.",
};

const SUBTITLE: Record<PageId, string> = {
  agent: "Ask the vault anything — every answer cites its source",
  sources: "8 connected sources · items awaiting curation",
  vault: "Six life categories · guided items · fill at your pace",
  family: "The Siems circle · every member builds their own vault",
  releases: "Who receives what, and when — every plan reversible",
  charter: "The commitments that make a 100-year promise credible",
};

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

export default function VaultDashboard({ section }: { section: PageId }) {
  const [vault, setVault] = useState<VaultKind>("family");

  return (
    <div style={{ minHeight: "100vh", position: "relative", background: C.bg, color: C.ink, fontFamily: FONT.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 252, background: C.card, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", zIndex: 100, padding: "22px 0" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 22px", marginBottom: 20, textDecoration: "none", color: "inherit" }}>
          <Mark size={36} radius={9} />
          <div>
            <div style={{ fontFamily: FONT.display, fontSize: 16, fontWeight: 700, color: C.ink }}>Legacai</div>
            <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 10.5, color: C.gold }}>your legacy, alive</div>
          </div>
        </Link>

        <div style={{ padding: "0 16px", marginBottom: 22 }}>
          <div style={{ display: "flex", background: C.bg, borderRadius: 10, border: `1px solid ${C.borderSoft}`, padding: 3 }}>
            {(["personal", "family", "business"] as const).map(id => (
              <button
                key={id}
                data-testid={`vault-${id}`}
                onClick={() => setVault(id)}
                style={{
                  flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer",
                  fontFamily: FONT.body, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.03em",
                  background: vault === id ? C.accent : "transparent",
                  color: vault === id ? "#FDFBF6" : C.muted,
                }}
              >
                {id === "personal" ? "Personal" : id === "family" ? "Family" : "Business"}
              </button>
            ))}
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 12px" }}>
          {NAV.map(item => {
            const active = section === item.id;
            return (
              <Link
                key={item.id}
                href={`/vault/${item.id}`}
                data-testid={`nav-${item.id}`}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "11px 16px",
                  borderRadius: 10, marginBottom: 4, cursor: "pointer", textDecoration: "none",
                  background: active ? C.accentDim : "transparent",
                  border: `1px solid ${active ? "rgba(23,94,84,0.2)" : "transparent"}`,
                }}
              >
                <span style={{ fontSize: 14, width: 22, textAlign: "center", color: active ? C.accent : C.dim }}>{item.glyph}</span>
                <span style={{ fontFamily: FONT.body, fontSize: 13, color: active ? C.accent : C.muted, fontWeight: active ? 700 : 500 }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "14px 22px", borderTop: `1px solid ${C.borderSoft}` }}>
          <Link href="/" style={{ background: "none", border: "none", color: C.dim, textDecoration: "none", fontFamily: FONT.body, fontSize: 11, letterSpacing: "0.08em", padding: 0 }}>← Back to Home</Link>
        </div>
      </aside>

      <main style={{ marginLeft: 252, padding: "26px 34px" }}>
        <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: FONT.body, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: C.gold }}>{VAULT_LABEL[vault].toUpperCase()}</span>
          <span style={{ height: 1, flex: 1, background: C.borderSoft }} />
          <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim }}>encrypted · audited · yours</span>
        </div>

        <h1 style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 700, color: C.ink, margin: 0 }}>
          {NAV.find(n => n.id === section)?.label}
        </h1>
        <p style={{ fontFamily: FONT.body, fontSize: 13, color: C.muted, margin: "6px 0 0" }}>{SUBTITLE[section]}</p>

        {section === "agent" && (
          <div style={{ maxWidth: 640, marginTop: 30, background: C.card, border: "1px solid rgba(31,111,96,0.2)", borderRadius: 20, padding: 28, boxShadow: SHADOW.lift }}>
            {AGENT_QA.slice(0, 2).map((qa, i) => (
              <div key={i}>
                <Bubble from="user">{qa.q}</Bubble>
                <Bubble from="agent" cites={qa.cites}>{qa.a}</Bubble>
              </div>
            ))}
          </div>
        )}

        {section === "sources" && (
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 860 }}>
            {ASSET_SOURCES.map(s => (
              <div key={s.id} style={{ padding: 20, borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 700, color: C.ink }}>{s.title}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: s.color, fontWeight: 600 }}>{s.count} items · {s.pct}% curated</div>
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: C.elev, overflow: "hidden", marginBottom: 10 }}>
                  <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 3 }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {s.formats.map(f => (
                    <span key={f} style={{ padding: "3px 9px", borderRadius: 6, fontSize: 10, fontFamily: FONT.body, color: C.muted, background: C.bg, border: `1px solid ${C.borderSoft}` }}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {section === "vault" && (
          <div style={{ marginTop: 30, padding: 40, borderRadius: 20, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.lift, maxWidth: 520, textAlign: "center" }}>
            <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 40, color: C.gold, marginBottom: 16 }}>◈</div>
            <h2 style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 700, color: C.ink, margin: "0 0 10px" }}>The Vault</h2>
            <p style={{ fontFamily: FONT.body, fontSize: 14, color: C.muted, lineHeight: 1.7, margin: 0 }}>
              This section unlocks in the next release loop —
            </p>
          </div>
        )}

        {section === "family" && (
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 860 }}>
            {[
              { name: "Mat Siems", role: "Owner · Founder", initial: "M", tone: C.accent },
              { name: "Karolina", role: "Guardian · Spouse", initial: "K", tone: C.gold },
              { name: "Pawel", role: "Guardian · Brother", initial: "P", tone: C.agent },
              { name: "+ Invite a member", role: "Send them their own vault seat", initial: "+", tone: C.dim },
            ].map(m => (
              <div key={m.name} style={{ padding: 22, borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 23, background: m.tone, color: "#FDFBF6", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontSize: 18, fontWeight: 700, flexShrink: 0 }}>{m.initial}</div>
                <div>
                  <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 700, color: C.ink }}>{m.name}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 11.5, color: C.muted }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {section === "releases" && (
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
            {[
              { when: "On birthdays", who: "Karolina", what: "Voice letter · one per year until she turns 40", icon: "✉" },
              { when: "On milestones", who: "The kids (future)", what: "Wedding day, first job, first flat — a message waiting", icon: "◉" },
              { when: "If something happens", who: "Guardians", what: "Full vault access + release plan · triggered by two-of-three sign-off", icon: "§" },
            ].map(r => (
              <div key={r.when} style={{ padding: 22, borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: C.accentDim, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontSize: 20, flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.gold, textTransform: "uppercase", marginBottom: 4 }}>{r.when} → {r.who}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{r.what}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {section === "charter" && (
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 860 }}>
            {[
              { glyph: "I", title: "Export-anytime covenant", body: "Everything you put in comes back out — one click, standard formats, no lock-in." },
              { glyph: "II", title: "Guardianship two-of-three", body: "No single person can unlock or destroy a vault. Guardians sign together." },
              { glyph: "III", title: "Endowment-backed horizon", body: "Century vaults are pre-funded — runtime, storage, migrations, all provisioned." },
              { glyph: "IV", title: "Agent persistence charter", body: "The Legacai Agent stays reachable for the vault's horizon — voice, web, messaging." },
            ].map(c => (
              <div key={c.title} style={{ padding: 24, borderRadius: 16, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
                <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 26, color: C.gold, marginBottom: 8 }}>{c.glyph}</div>
                <div style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontFamily: FONT.body, fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>{c.body}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
