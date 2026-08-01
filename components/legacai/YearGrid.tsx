"use client";

import { useState } from "react";
import { C, FONT, SHADOW } from "@/components/legacai-tokens";
import { VAULT_ENTRIES } from "@/data/vault-corpus";
import { MONTHS, WEEKDAYS, daysInMonth, iso, nowISO, DATA_YEAR } from "@/lib/date";

interface HoverInfo { dateStr: string; x: number; y: number; title?: string }

export function YearGrid({ year = DATA_YEAR }: { year?: number }) {
  const [hover, setHover] = useState<HoverInfo | null>(null);
  const TODAY = nowISO();

  const legendCell = (style: React.CSSProperties): React.CSSProperties => ({
    width: 14, height: 14, borderRadius: 3, display: "inline-block", verticalAlign: -2, marginRight: 6, ...style,
  });

  const yearHasData = Object.keys(VAULT_ENTRIES).some((d) => d.startsWith(year + "-"));

  return (
    <div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 16, fontFamily: FONT.body, fontSize: 11, color: C.muted }}>
        <span><span style={legendCell({ background: C.accent })} />vault item</span>
        <span><span style={legendCell({ background: C.bg, border: `1px solid ${C.border}` })} />no items</span>
        <span><span style={legendCell({ background: "transparent" })} />not yet lived</span>
      </div>
      {!yearHasData && (
        <div style={{ border: `1px dashed ${C.border}`, borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontFamily: FONT.body, fontSize: 12, color: C.muted }}>
          No vault items recorded for {year}. {year > DATA_YEAR ? "Not yet lived." : "Nothing in the vault for this year."}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(232px, 1fr))", gap: 16 }}>
        {MONTHS.map((mName, mi) => {
          const m = mi + 1;
          const dim = daysInMonth(year, m);
          const firstDow = (new Date(year, mi, 1).getDay() + 6) % 7;
          const cells: (number | null)[] = [...Array(firstDow).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)];
          return (
            <div key={m} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, background: C.card, boxShadow: SHADOW.card }}>
              <div style={{ fontFamily: FONT.display, fontSize: 17, marginBottom: 8, color: C.ink }}>{mName}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                {WEEKDAYS.map((w) => (
                  <div key={w} style={{ fontFamily: FONT.mono, fontSize: 8, color: C.muted, textAlign: "center", paddingBottom: 2 }}>{w[0]}</div>
                ))}
                {cells.map((d, i) => {
                  if (d === null) return <div key={"e" + i} />;
                  const dateStr = iso(year, m, d);
                  const e = VAULT_ENTRIES[dateStr];
                  const isToday = dateStr === TODAY;
                  const future = dateStr > TODAY;
                  return (
                    <div
                      key={dateStr}
                      onMouseEnter={(ev) => {
                        const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
                        setHover({ dateStr, x: r.left + r.width / 2, y: r.top, title: e?.title });
                      }}
                      onMouseLeave={() => setHover(null)}
                      style={{
                        aspectRatio: "1", borderRadius: 4, cursor: e ? "pointer" : "default",
                        fontSize: 9, fontFamily: FONT.mono,
                        background: e ? C.accent : future ? "transparent" : C.bg,
                        color: e ? "#FDFBF6" : future ? C.borderSoft : C.muted,
                        border: `1px solid ${e ? C.accent : isToday ? C.accent : future ? "transparent" : C.borderSoft}`,
                        outline: isToday ? `2px solid ${C.accent}` : "none", outlineOffset: 1,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >{d}</div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {hover && <HoverCard hover={hover} />}
    </div>
  );
}

function HoverCard({ hover }: { hover: HoverInfo }) {
  const TODAY = nowISO();
  const future = hover.dateStr > TODAY;
  const label = hover.title || (future ? "Not yet lived" : "No vault items on this day");
  const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
  return (
    <div style={{
      position: "fixed",
      left: Math.min(Math.max(hover.x, 130), winW - 130),
      top: hover.y - 12, transform: "translate(-50%, -100%)", zIndex: 100, pointerEvents: "none",
      background: C.card, border: `1px solid ${hover.title ? C.accent : C.border}`, borderRadius: 8,
      padding: "8px 12px", maxWidth: 260, boxShadow: SHADOW.lift,
    }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 10, color: C.muted, marginBottom: 3 }}>
        {hover.dateStr}{hover.title ? " · vault item" : ""}
      </div>
      <div style={{ fontFamily: FONT.display, fontStyle: hover.title ? "italic" : "normal", fontSize: 14, color: hover.title ? C.ink : C.muted, lineHeight: 1.35 }}>
        {label}
      </div>
    </div>
  );
}
