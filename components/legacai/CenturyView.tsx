"use client";

import { useState } from "react";
import Link from "next/link";
import { C, FONT, SHADOW } from "@/components/legacai-tokens";
import { VAULT_ENTRIES } from "@/data/vault-corpus";
import { YEAR_MIN, YEAR_MAX, DATA_YEAR, daysInMonth, iso, nowISO } from "@/lib/date";

interface Hover { x: number; y: number; year?: number; dateStr?: string; title?: string }

export function CenturyView({ year = DATA_YEAR }: { year?: number }) {
  const [current, setCurrent] = useState(year);
  const [hover, setHover] = useState<Hover | null>(null);
  const nowYear = DATA_YEAR;
  const selYearHasData = current === DATA_YEAR;

  const years: number[] = [];
  for (let y = YEAR_MIN; y <= YEAR_MAX; y++) years.push(y);

  return (
    <div>
      <div style={{ marginBottom: 16, maxWidth: 720 }}>
        <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 22, color: C.ink, marginBottom: 4 }}>A hundred and forty years of a life</div>
        <div style={{ fontSize: 13, color: C.muted, fontFamily: FONT.body, lineHeight: 1.6 }}>
          {YEAR_MIN} to {YEAR_MAX} — each dot is a year. Click any to expand it to its days.
          Green dots are years with vault items. Only {DATA_YEAR} holds a record so far.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(22px, 1fr))", gap: 5, maxWidth: 760, marginBottom: 32 }}>
        {years.map((y) => {
          const lived = y < nowYear;
          const isNow = y === nowYear;
          const isSel = y === current;
          const decade = y % 10 === 0;
          const hasItems = Object.keys(VAULT_ENTRIES).some((d) => d.startsWith(y + "-"));
          return (
            <div
              key={y}
              onMouseEnter={(ev) => {
                const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
                setHover({ x: r.left + r.width / 2, y: r.top, year: y });
              }}
              onMouseLeave={() => setHover(null)}
              onClick={() => setCurrent(y)}
              title={`${y}`}
              style={{
                aspectRatio: "1", borderRadius: "50%", cursor: "pointer",
                background: isNow
                  ? C.accent
                  : hasItems
                  ? C.accentLight
                  : lived
                  ? C.elev
                  : "transparent",
                border: isNow
                  ? `2px solid ${C.accent}`
                  : lived
                  ? `1px solid ${C.borderSoft}`
                  : `1px solid ${C.borderSoft}`,
                outline: isSel ? `2px solid ${C.accent}` : decade ? `1px solid ${C.border}` : "none",
                outlineOffset: 2,
              }}
            />
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
        <div style={{ fontFamily: FONT.display, fontSize: 18, color: C.ink }}>{current}</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 11, color: C.muted }}>
          {selYearHasData
            ? "the vault year — hover each day for its item"
            : current > DATA_YEAR
            ? "not yet lived — no items recorded"
            : "before the vault — no items recorded"}
        </div>
        {selYearHasData && (
          <Link href="/vault/timeline" style={{ fontFamily: FONT.body, fontSize: 11, color: C.accent, textDecoration: "none", marginLeft: "auto" }}>
            Full calendar view →
          </Link>
        )}
      </div>

      <YearHeatStrip year={current} setHover={setHover} />

      {hover && <CenturyHoverCard hover={hover} />}
    </div>
  );
}

function YearHeatStrip({ year, setHover }: {
  year: number;
  setHover: (h: Hover | null) => void;
}) {
  const TODAY = nowISO();
  const days: string[] = [];
  for (let m = 1; m <= 12; m++) for (let d = 1; d <= daysInMonth(year, m); d++) days.push(iso(year, m, d));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(11px, 1fr))", gap: 3, maxWidth: 760 }}>
      {days.map((dateStr) => {
        const e = VAULT_ENTRIES[dateStr];
        const future = dateStr > TODAY;
        return (
          <div
            key={dateStr}
            onMouseEnter={(ev) => {
              const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
              setHover({ x: r.left + r.width / 2, y: r.top, dateStr, title: e?.title });
            }}
            onMouseLeave={() => setHover(null)}
            style={{
              aspectRatio: "1", borderRadius: 2, cursor: e ? "pointer" : "default",
              background: e ? C.accent : future ? "transparent" : C.bg,
              border: `1px solid ${e ? C.accent : future ? C.borderSoft : C.borderSoft}`,
            }}
          />
        );
      })}
    </div>
  );
}

function CenturyHoverCard({ hover }: { hover: Hover }) {
  const TODAY = nowISO();
  let title: string, body: string, italic = false;
  if (hover.dateStr) {
    const future = hover.dateStr > TODAY;
    title = hover.dateStr + (hover.title ? " · vault item" : "");
    body = hover.title || (future ? "Not yet lived" : "No vault items recorded");
    italic = !!hover.title;
  } else {
    const y = hover.year!;
    title = String(y);
    if (y < DATA_YEAR) body = `${DATA_YEAR - y} year${DATA_YEAR - y !== 1 ? "s" : ""} before the vault record`;
    else if (y === DATA_YEAR) body = "The vault year — the record starts here";
    else body = `${y - DATA_YEAR} year${y - DATA_YEAR !== 1 ? "s" : ""} ahead · unwritten`;
  }
  const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
  return (
    <div style={{
      position: "fixed",
      left: Math.min(Math.max(hover.x, 130), winW - 130),
      top: hover.y - 12, transform: "translate(-50%, -100%)", zIndex: 100, pointerEvents: "none",
      background: C.card, border: `1px solid ${italic ? C.accent : C.border}`, borderRadius: 8,
      padding: "8px 12px", maxWidth: 260, boxShadow: SHADOW.lift,
    }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 10, color: C.muted, marginBottom: 3 }}>{title}</div>
      <div style={{ fontFamily: FONT.display, fontStyle: italic ? "italic" : "normal", fontSize: 14, color: italic ? C.ink : C.muted, lineHeight: 1.35 }}>
        {body}
      </div>
    </div>
  );
}
