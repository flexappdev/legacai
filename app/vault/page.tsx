"use client";
import Link from "next/link";
import { C, FONT, SHADOW } from "@/components/legacai-tokens";
import { Mark } from "@/components/mark";

export default function VaultPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: FONT.body, display: "flex", flexDirection: "column" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 40px", background: "rgba(251,249,244,0.88)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Mark size={34} />
          <span style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, color: C.ink }}>Legacai</span>
        </Link>
        <Link href="/" style={{ fontFamily: FONT.body, fontSize: 12, color: C.muted, textDecoration: "none" }}>← Home</Link>
      </nav>
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 40px" }}>
        <div data-testid="vault-placeholder" style={{
          maxWidth: 520, textAlign: "center", background: C.card,
          border: `1px solid ${C.border}`, borderRadius: 20, padding: 48, boxShadow: SHADOW.lift,
        }}>
          <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 44, color: C.gold, marginBottom: 20 }}>◈</div>
          <h1 style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 700, color: C.ink, margin: "0 0 14px" }}>
            The Vault
          </h1>
          <p style={{ fontFamily: FONT.body, fontSize: 15, color: C.muted, lineHeight: 1.7, margin: 0 }}>
            This section unlocks in the next release loop —
          </p>
        </div>
      </main>
    </div>
  );
}
