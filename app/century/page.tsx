import Link from "next/link";
import { CenturyView } from "@/components/legacai/CenturyView";
import { DATA_YEAR } from "@/lib/date";
import { C, FONT } from "@/components/legacai-tokens";

export const metadata = {
  title: "Century View · Legacai",
  description: "Your life on a single grid — 1940 to 2080, one dot per year.",
};

export default function CenturyPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: FONT.body, padding: "40px 48px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <Link href="/vault/timeline" style={{ fontFamily: FONT.body, fontSize: 12, color: C.muted, textDecoration: "none" }}>← Vault</Link>
          <span style={{ color: C.borderSoft }}>·</span>
          <span style={{ fontFamily: FONT.mono, fontSize: 11, color: C.muted }}>Century View</span>
        </div>
        <CenturyView year={DATA_YEAR} />
      </div>
    </div>
  );
}
