import Link from "next/link";
import { C, FONT, SHADOW, ASSET_SOURCES } from "@/components/legacai-tokens";
import { Mark } from "@/components/mark";
import { VAULT_ENTRIES } from "@/data/vault-corpus";

export const metadata = { title: "Admin — Legacai", description: "Vault administration dashboard" };

const totalItems = Object.keys(VAULT_ENTRIES).length;
const recentEntries = Object.entries(VAULT_ENTRIES)
  .sort(([a], [b]) => b.localeCompare(a))
  .slice(0, 8);

const totalSourceItems = ASSET_SOURCES.reduce((s, x) => s + x.count, 0);
const avgCuration = Math.round(ASSET_SOURCES.reduce((s, x) => s + x.pct, 0) / ASSET_SOURCES.length);

export default function AdminPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: FONT.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        table { border-collapse: collapse; width: 100%; }
        tr:hover td { background: ${C.elev} !important; }
      `}</style>

      {/* Top bar */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: C.card, borderBottom: `1px solid ${C.border}`, padding: "14px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
          <Mark size={30} radius={7} />
          <span style={{ fontFamily: FONT.display, fontSize: 15, fontWeight: 700, color: C.ink }}>Legacai</span>
        </Link>
        <span style={{ color: C.borderSoft, fontSize: 18 }}>·</span>
        <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: C.gold, textTransform: "uppercase" }}>Admin</span>
        <span style={{ flex: 1 }} />
        <Link href="/vault/agent" style={{ fontFamily: FONT.body, fontSize: 12, color: C.muted, textDecoration: "none" }}>← Vault</Link>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 32px" }}>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
          {[
            { n: String(totalItems), l: "Vault entries", sub: "keyed by ISO date" },
            { n: String(totalSourceItems.toLocaleString()), l: "Source items", sub: "across all 8 sources" },
            { n: `${avgCuration}%`, l: "Avg curation", sub: "across all sources" },
            { n: "3", l: "Guardians", sub: "Karolina · Pawel · Mat" },
          ].map(s => (
            <div key={s.l} style={{ padding: "18px 20px", borderRadius: 14, background: C.card, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
              <div style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 700, color: C.ink }}>{s.n}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 2 }}>{s.l}</div>
              <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 24, alignItems: "start" }}>

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Recent vault entries */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", boxShadow: SHADOW.card }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.borderSoft}`, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase" }}>Recent vault entries</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.dim }}>{totalItems} total</span>
              </div>
              <table>
                <thead>
                  <tr style={{ background: C.elev }}>
                    {["Date", "Title", "Category"].map(h => (
                      <th key={h} style={{ padding: "9px 18px", textAlign: "left", fontFamily: FONT.body, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentEntries.map(([date, entry]) => (
                    <tr key={date}>
                      <td style={{ padding: "11px 18px", borderTop: `1px solid ${C.borderSoft}`, fontFamily: FONT.mono ?? "monospace", fontSize: 11, color: C.dim, whiteSpace: "nowrap" }}>{date}</td>
                      <td style={{ padding: "11px 18px", borderTop: `1px solid ${C.borderSoft}`, fontFamily: FONT.body, fontSize: 12.5, color: C.ink }}>
                        <span style={{ marginRight: 8 }}>{entry.icon}</span>{entry.title}
                      </td>
                      <td style={{ padding: "11px 18px", borderTop: `1px solid ${C.borderSoft}` }}>
                        <span style={{ padding: "3px 9px", borderRadius: 6, fontSize: 10, fontFamily: FONT.body, color: C.muted, background: C.bg, border: `1px solid ${C.borderSoft}` }}>{entry.category}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sources breakdown */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", boxShadow: SHADOW.card }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.borderSoft}` }}>
                <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase" }}>Sources breakdown</span>
              </div>
              {ASSET_SOURCES.map(s => (
                <div key={s.id} style={{ padding: "12px 20px", borderTop: `1px solid ${C.borderSoft}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18, width: 26, textAlign: "center" }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: FONT.body, fontSize: 12.5, fontWeight: 600, color: C.ink }}>{s.title}</span>
                      <span style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.muted }}>{s.count} items</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: C.elev, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 2 }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: FONT.body, fontSize: 11, color: s.color, fontWeight: 700, minWidth: 36, textAlign: "right" }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Guardians */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px", boxShadow: SHADOW.card }}>
              <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Guardians</div>
              {[
                { initial: "K", name: "Karolina", role: "Guardian · Spouse", state: "signed", tone: C.gold },
                { initial: "P", name: "Pawel", role: "Guardian · Brother", state: "signed", tone: C.agent },
                { initial: "Ma", name: "Maria", role: "Read-only", state: "active", tone: C.warm },
              ].map(g => (
                <div key={g.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: g.tone, color: "#FDFBF6", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{g.initial}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT.body, fontSize: 12.5, fontWeight: 600, color: C.ink }}>{g.name}</div>
                    <div style={{ fontFamily: FONT.body, fontSize: 10.5, color: C.muted }}>{g.role}</div>
                  </div>
                  <span style={{ padding: "3px 9px", borderRadius: 100, fontSize: 10, fontFamily: FONT.body, fontWeight: 600, color: C.success, background: "rgba(30,127,79,0.10)", border: "1px solid rgba(30,127,79,0.25)" }}>● {g.state}</span>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px", boxShadow: SHADOW.card }}>
              <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Quick actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Export full vault", icon: "↓", href: "#" },
                  { label: "Rebuild agent index", icon: "⟳", href: "#" },
                  { label: "Review release plans", icon: "✉", href: "/vault/releases" },
                  { label: "View century grid", icon: "◌", href: "/vault/century" },
                  { label: "Charter & compliance", icon: "§", href: "/vault/charter" },
                  { label: "Go to vault home", icon: "❖", href: "/vault/agent" },
                ].map(a => (
                  <Link
                    key={a.label}
                    href={a.href}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: C.bg, border: `1px solid ${C.borderSoft}`, textDecoration: "none", color: "inherit" }}
                  >
                    <span style={{ fontSize: 14, color: C.accent, width: 20, textAlign: "center" }}>{a.icon}</span>
                    <span style={{ fontFamily: FONT.body, fontSize: 12.5, color: C.ink }}>{a.label}</span>
                    <span style={{ marginLeft: "auto", color: C.dim }}>›</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Vault health */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px", boxShadow: SHADOW.card }}>
              <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Vault health</div>
              {[
                { label: "Encryption", status: "Active", ok: true },
                { label: "Guardian quorum", status: "2 of 3 signed", ok: true },
                { label: "Charter version", status: "v1.0 · 2026-07-17", ok: true },
                { label: "Last backup", status: "2026-08-01", ok: true },
                { label: "Supabase auth", status: "Check env vars", ok: false },
              ].map(h => (
                <div key={h.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: h.ok ? C.success : C.danger }}>●</span>
                  <span style={{ flex: 1, fontFamily: FONT.body, fontSize: 12, color: C.ink }}>{h.label}</span>
                  <span style={{ fontFamily: FONT.body, fontSize: 11, color: h.ok ? C.muted : C.danger }}>{h.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
