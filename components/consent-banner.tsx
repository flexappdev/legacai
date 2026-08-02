"use client";
import { useState, useEffect } from "react";
import { C, FONT } from "@/components/legacai-tokens";

const STORAGE_KEY = "legacai_consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch { /* private browsing */ }
  }, []);

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, "granted"); } catch { /* */ }
    setVisible(false);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  }

  function decline() {
    try { localStorage.setItem(STORAGE_KEY, "denied"); } catch { /* */ }
    setVisible(false);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
  }

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500,
      background: C.card, borderTop: `1px solid ${C.border}`,
      padding: "16px 24px", display: "flex", alignItems: "center",
      gap: 16, flexWrap: "wrap", boxShadow: "0 -4px 24px rgba(31,42,55,0.08)",
    }}>
      <p style={{ flex: 1, fontFamily: FONT.body, fontSize: 12.5, color: C.muted, lineHeight: 1.6, margin: 0, minWidth: 200 }}>
        We use analytics to understand how the vault is used — no advertising, no third parties.
        {" "}<a href="/privacy" style={{ color: C.accent, textDecoration: "none" }}>Privacy policy</a>.
      </p>
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{ padding: "8px 18px", borderRadius: 8, fontFamily: FONT.body, fontSize: 12.5, fontWeight: 600, color: C.muted, background: "transparent", border: `1px solid ${C.borderSoft}`, cursor: "pointer" }}
        >Decline</button>
        <button
          onClick={accept}
          style={{ padding: "8px 18px", borderRadius: 8, fontFamily: FONT.body, fontSize: 12.5, fontWeight: 700, color: "#FDFBF6", background: C.accent, border: "none", cursor: "pointer" }}
        >Accept</button>
      </div>
    </div>
  );
}
