"use client";
import { useState } from "react";
import Link from "next/link";
import {
  C, FONT, SHADOW,
  AGENT_QA,
} from "@/components/legacai-tokens";
import { Mark } from "@/components/mark";

const NAV = [
  { id: "agent", glyph: "❖", label: "The Agent" },
  { id: "sources", glyph: "▤", label: "Sources & Inbox" },
  { id: "vault", glyph: "▣", label: "My Vault" },
  { id: "family", glyph: "◉", label: "Family Circle" },
  { id: "releases", glyph: "✉", label: "Release Plans" },
  { id: "charter", glyph: "§", label: "Century Charter" },
] as const;

type PageId = (typeof NAV)[number]["id"];
type VaultKind = "personal" | "family" | "business";

const VAULT_LABEL: Record<VaultKind, string> = {
  personal: "Personal Vault — Mat",
  family: "Family Vault — The Siems",
  business: "Business Vault — Mat's Co.",
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

export default function VaultPage() {
  const [page, setPage] = useState<PageId>("agent");
  const [vault, setVault] = useState<VaultKind>("family");

  const currentSubtitle: Record<PageId, string> = {
    agent: "Ask the vault anything — every answer cites its source",
    sources: "8 connected sources · items awaiting curation",
    vault: "Six life categories · guided items · fill at your pace",
    family: "The Siems circle · every member builds their own vault",
    releases: "Who receives what, and when — every plan reversible",
    charter: "The commitments that make a 100-year promise credible",
  };

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

        <div style={{ flex: 1, padding: "0 12px" }}>
          {NAV.map(item => (
            <div
              key={item.id}
              data-testid={`nav-${item.id}`}
              onClick={() => setPage(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 16px",
                borderRadius: 10, marginBottom: 4, cursor: "pointer",
                background: page === item.id ? C.accentDim : "transparent",
                border: `1px solid ${page === item.id ? "rgba(23,94,84,0.2)" : "transparent"}`,
              }}
            >
              <span style={{ fontSize: 14, width: 22, textAlign: "center", color: page === item.id ? C.accent : C.dim }}>{item.glyph}</span>
              <span style={{ fontFamily: FONT.body, fontSize: 13, color: page === item.id ? C.accent : C.muted, fontWeight: page === item.id ? 700 : 500 }}>{item.label}</span>
            </div>
          ))}
        </div>

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
          {NAV.find(n => n.id === page)?.label}
        </h1>
        <p style={{ fontFamily: FONT.body, fontSize: 13, color: C.muted, margin: "6px 0 0" }}>{currentSubtitle[page]}</p>

        {page === "agent" && (
          <div style={{ maxWidth: 640, marginTop: 30, background: C.card, border: "1px solid rgba(31,111,96,0.2)", borderRadius: 20, padding: 28, boxShadow: SHADOW.lift }}>
            {AGENT_QA.slice(0, 2).map((qa, i) => (
              <div key={i}>
                <Bubble from="user">{qa.q}</Bubble>
                <Bubble from="agent" cites={qa.cites}>{qa.a}</Bubble>
              </div>
            ))}
          </div>
        )}

        {page !== "agent" && (
          <div style={{ marginTop: 30, padding: 28, borderRadius: 16, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, maxWidth: 640 }}>
            <p style={{ fontFamily: FONT.body, fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>
              This section unlocks in the next release loop — see the roadmap in the README.
              Explore the Agent tab to feel the shape of the product today.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
