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
          <div style={{ maxWidth: 720, marginTop: 30, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {[
                { n: "34", l: "Documents" },
                { n: "418", l: "Photos" },
                { n: "1,240", l: "AI convos" },
                { n: "62%", l: "Curated" },
              ].map(s => (
                <div key={s.l} style={{ padding: 14, borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, textAlign: "center" }}>
                  <div style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 700, color: C.ink }}>{s.n}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ background: C.card, border: "1px solid rgba(31,111,96,0.2)", borderRadius: 20, padding: 28, boxShadow: SHADOW.lift }}>
              {AGENT_QA.map((qa, i) => (
                <div key={i} style={{ marginBottom: i < AGENT_QA.length - 1 ? 4 : 0 }}>
                  <Bubble from="user">{qa.q}</Bubble>
                  <Bubble from="agent" cites={qa.cites}>{qa.a}</Bubble>
                </div>
              ))}

              <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.borderSoft}` }}>
                <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase", marginBottom: 10 }}>Try asking</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    "What did Maria say about the wedding band?",
                    "Show me Dad's business notes",
                    "Who is my guardian solicitor?",
                    "When did I last talk to Dr. Wiśniewska?",
                  ].map(q => (
                    <span key={q} style={{ padding: "6px 12px", borderRadius: 10, background: C.bg, border: `1px solid ${C.borderSoft}`, fontFamily: FONT.body, fontSize: 11.5, color: C.muted, cursor: "pointer" }}>{q}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "center", padding: "10px 14px", background: C.bg, borderRadius: 12, border: `1px solid ${C.borderSoft}` }}>
                <span style={{ color: C.dim, fontSize: 16 }}>⌥</span>
                <input
                  type="text"
                  placeholder="Ask your vault anything — every answer will cite the item"
                  disabled
                  style={{ flex: 1, border: "none", background: "transparent", fontFamily: FONT.body, fontSize: 13, color: C.ink, outline: "none" }}
                />
                <span style={{ fontFamily: FONT.body, fontSize: 10, color: C.dim, letterSpacing: "0.08em", textTransform: "uppercase" }}>Live in V4</span>
              </div>
            </div>
          </div>
        )}

        {section === "sources" && (
          <div style={{ marginTop: 30, maxWidth: 860 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
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

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.gold, textTransform: "uppercase" }}>Inbox · 47 items awaiting curation</span>
              <span style={{ height: 1, flex: 1, background: C.borderSoft }} />
              <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim }}>Auto-imported · pending your tag</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: "🖼️", title: "3 new photos · iCloud · June 2026", source: "Photos & Images", when: "2h ago" },
                { icon: "🤖", title: "12 new ChatGPT conversations", source: "AI Conversations · Mat's export", when: "yesterday" },
                { icon: "🎙️", title: "Voice memo — Karolina · birthday note", source: "Audio & Voice", when: "3 days ago" },
                { icon: "📄", title: "Deed scan — Kraków flat", source: "Documents · from solicitor A. Nowak", when: "1 week ago" },
                { icon: "📚", title: "Recipe list — Maria's summer soups", source: "Books & Lists", when: "2 weeks ago" },
                { icon: "📄", title: "Health form update", source: "Documents · Dr. Wiśniewska", when: "3 weeks ago" },
              ].map(it => (
                <div key={it.title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
                  <span style={{ fontSize: 20, width: 30, textAlign: "center" }}>{it.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: C.ink }}>{it.title}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.muted }}>{it.source} · {it.when}</div>
                  </div>
                  <span style={{ padding: "5px 12px", borderRadius: 8, fontSize: 10.5, fontFamily: FONT.body, fontWeight: 700, color: C.accent, background: C.accentDim, letterSpacing: "0.08em" }}>TAG</span>
                  <span style={{ padding: "5px 12px", borderRadius: 8, fontSize: 10.5, fontFamily: FONT.body, fontWeight: 700, color: C.dim, background: "transparent", border: `1px solid ${C.borderSoft}`, letterSpacing: "0.08em" }}>SKIP</span>
                </div>
              ))}
            </div>
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
          <div style={{ marginTop: 30, maxWidth: 860 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { name: "Mat Siems", role: "Owner · Founder", initial: "M", tone: C.accent, since: "Owner since 2026" },
                { name: "Karolina", role: "Guardian · Spouse", initial: "K", tone: C.gold, since: "Mandate signed 2026-05-01" },
                { name: "Pawel", role: "Guardian · Brother", initial: "P", tone: C.agent, since: "Mandate signed 2026-05-01" },
                { name: "Maria", role: "Read-only · Mother-in-law", initial: "Ma", tone: C.warm, since: "Access via Family circle" },
              ].map(m => (
                <div key={m.name} style={{ padding: 22, borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 23, background: m.tone, color: "#FDFBF6", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{m.initial}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 700, color: C.ink }}>{m.name}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 11.5, color: C.muted }}>{m.role}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim, marginTop: 3 }}>{m.since}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.gold, textTransform: "uppercase" }}>Access matrix</span>
              <span style={{ height: 1, flex: 1, background: C.borderSoft }} />
              <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim }}>Per-category visibility · reversible any time</span>
            </div>
            <div style={{ borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, overflow: "hidden", marginBottom: 22 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", padding: "12px 18px", background: C.elev, fontFamily: FONT.body, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted }}>
                <span>Category</span><span>Mat</span><span>Karolina</span><span>Pawel</span><span>Maria</span>
              </div>
              {[
                ["Documents", "●", "●", "●", "—"],
                ["Photos & Images", "●", "●", "◐", "●"],
                ["Audio & Voice", "●", "●", "◐", "—"],
                ["Journals & Letters", "●", "◐", "—", "—"],
                ["AI Conversations", "●", "◐", "—", "—"],
                ["Books & Lists", "●", "●", "●", "●"],
              ].map(([cat, ...perms]) => (
                <div key={cat} style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", padding: "10px 18px", borderTop: `1px solid ${C.borderSoft}`, fontFamily: FONT.body, fontSize: 12.5, color: C.ink, alignItems: "center" }}>
                  <span style={{ fontWeight: 600 }}>{cat}</span>
                  {perms.map((p, i) => (
                    <span key={i} style={{ color: p === "●" ? C.accent : p === "◐" ? C.gold : C.dim, fontSize: 15 }}>{p}</span>
                  ))}
                </div>
              ))}
              <div style={{ padding: "10px 18px", borderTop: `1px solid ${C.borderSoft}`, fontFamily: FONT.body, fontSize: 10.5, color: C.dim, background: C.bg }}>
                ● full · ◐ on release · — hidden
              </div>
            </div>

            <div style={{ padding: 18, borderRadius: 14, background: C.card, border: `1px dashed ${C.border}`, textAlign: "center" }}>
              <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: C.accent, cursor: "pointer" }}>+ Invite a family member</span>
              <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.muted, marginTop: 3 }}>Send them their own vault seat · they choose what to share back</div>
            </div>
          </div>
        )}

        {section === "releases" && (
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
            {[
              {
                when: "On birthdays", who: "Karolina", what: "Voice letter · one per year until she turns 40",
                icon: "✉", items: 12, trigger: "Auto — every 15 Feb", signoffs: [
                  { name: "Karolina", state: "n/a" }, { name: "Pawel", state: "signed" }, { name: "Mat", state: "signed" },
                ],
              },
              {
                when: "On milestones", who: "The kids (future)", what: "Wedding day, first job, first flat — a message waiting",
                icon: "◉", items: 4, trigger: "Manual · triggered by two of three guardians", signoffs: [
                  { name: "Karolina", state: "signed" }, { name: "Pawel", state: "pending" }, { name: "Mat", state: "signed" },
                ],
              },
              {
                when: "If something happens", who: "Guardians", what: "Full vault access + release plan · triggered by two-of-three sign-off",
                icon: "§", items: 28, trigger: "Contingent · certified event or vault silence 180d", signoffs: [
                  { name: "Karolina", state: "signed" }, { name: "Pawel", state: "signed" }, { name: "Mat", state: "n/a" },
                ],
              },
            ].map(r => (
              <div key={r.when} style={{ padding: 22, borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: C.accentDim, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontSize: 20, flexShrink: 0 }}>{r.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.gold, textTransform: "uppercase", marginBottom: 4 }}>{r.when} → {r.who}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{r.what}</div>
                  </div>
                  <div style={{ textAlign: "right", fontFamily: FONT.body }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: C.accent, lineHeight: 1 }}>{r.items}</div>
                    <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>queued</div>
                  </div>
                </div>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.borderSoft}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.muted }}>{r.trigger}</span>
                  <span style={{ height: 12, width: 1, background: C.borderSoft }} />
                  <div style={{ display: "flex", gap: 6 }}>
                    {r.signoffs.map(s => (
                      <span key={s.name} style={{
                        padding: "3px 10px", borderRadius: 100, fontFamily: FONT.body, fontSize: 10.5, fontWeight: 600,
                        color: s.state === "signed" ? C.success : s.state === "pending" ? C.gold : C.dim,
                        background: s.state === "signed" ? "rgba(30,127,79,0.10)" : s.state === "pending" ? C.goldDim : C.bg,
                        border: `1px solid ${s.state === "signed" ? "rgba(30,127,79,0.25)" : s.state === "pending" ? "rgba(169,133,63,0.25)" : C.borderSoft}`,
                      }}>{s.state === "signed" ? "✓" : s.state === "pending" ? "◐" : "—"} {s.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ padding: 18, borderRadius: 14, background: C.card, border: `1px dashed ${C.border}`, textAlign: "center" }}>
              <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: C.accent, cursor: "pointer" }}>+ New release plan</span>
              <div style={{ fontFamily: FONT.body, fontSize: 11, color: C.muted, marginTop: 3 }}>Every plan is reversible before the trigger fires</div>
            </div>
          </div>
        )}

        {section === "charter" && (
          <div style={{ marginTop: 30, maxWidth: 860 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 22 }}>
              {[
                { glyph: "I", title: "Export-anytime covenant", body: "Everything you put in comes back out — one click, standard formats, no lock-in.", signed: "2026-07-17 · v1.0" },
                { glyph: "II", title: "Guardianship two-of-three", body: "No single person can unlock or destroy a vault. Guardians sign together.", signed: "2026-07-17 · v1.0" },
                { glyph: "III", title: "Endowment-backed horizon", body: "Century vaults are pre-funded — runtime, storage, migrations, all provisioned.", signed: "2026-07-17 · v1.0" },
                { glyph: "IV", title: "Agent persistence charter", body: "The Legacai Agent stays reachable for the vault's horizon — voice, web, messaging.", signed: "2026-07-17 · v1.0" },
                { glyph: "V", title: "Right to be forgotten", body: "You can wind a vault down at any time. Guardians are notified, items are shredded, no shadow copies.", signed: "2026-07-17 · v1.0" },
                { glyph: "VI", title: "Data sovereignty", body: "Vaults stay in the region you pick. Cross-region replicas exist only for Century plans, and only for durability.", signed: "2026-07-17 · v1.0" },
              ].map(c => (
                <div key={c.title} style={{ padding: 24, borderRadius: 16, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
                  <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 26, color: C.gold, marginBottom: 8 }}>{c.glyph}</div>
                  <div style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 12.5, color: C.muted, lineHeight: 1.65, marginBottom: 12 }}>{c.body}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 10, borderTop: `1px solid ${C.borderSoft}` }}>
                    <span style={{ fontFamily: FONT.body, fontSize: 10, color: C.success }}>● Signed</span>
                    <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.muted, letterSpacing: "0.06em" }}>{c.signed}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 18, borderRadius: 14, background: C.bg, border: `1px solid ${C.borderSoft}`, fontFamily: FONT.body, fontSize: 12, color: C.muted, textAlign: "center", lineHeight: 1.7 }}>
              The Charter is versioned. Every material change requires 30 days notice + guardian sign-off before it becomes effective on your vault.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
