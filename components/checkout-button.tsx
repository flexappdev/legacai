"use client";
import { useState } from "react";
import { C, FONT } from "@/components/legacai-tokens";
import { track } from "@/lib/analytics";

export function CheckoutButton({ plan, price }: { plan: string; price: string }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handlePay() {
    setLoading(true);
    setErr(null);
    track("plan_selected", { plan, price });
    try {
      const res = await fetch(`/api/checkout/${plan}`, { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErr(data.error ?? "Something went wrong — please try again.");
        setLoading(false);
      }
    } catch {
      setErr("Network error — please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      {err && (
        <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(180,66,60,0.08)", border: "1px solid rgba(180,66,60,0.2)", fontFamily: FONT.body, fontSize: 12.5, color: "#B4423C", marginBottom: 12, lineHeight: 1.5 }}>
          {err}
        </div>
      )}
      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          display: "block", width: "100%", textAlign: "center", padding: "16px 0",
          borderRadius: 10, background: loading ? C.dim : `linear-gradient(150deg, ${C.accent}, ${C.accentDeep})`,
          color: "#FDFBF6", fontFamily: FONT.body, fontSize: 14, fontWeight: 700,
          letterSpacing: "0.05em", border: "none", cursor: loading ? "default" : "pointer",
          transition: "opacity 0.15s",
        }}
      >
        {loading ? "Redirecting…" : `PAY ${price} →`}
      </button>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 14, fontFamily: FONT.body, fontSize: 10, color: C.dim, flexWrap: "wrap" }}>
        <span>▣ AES-256</span><span>§ Guardian mandates</span><span>✉ Export covenant</span>
      </div>
      <div style={{ textAlign: "center", marginTop: 10, fontFamily: FONT.body, fontSize: 10.5, color: C.dim }}>
        14-day full refund · payment held in escrow until vault opens
      </div>
    </div>
  );
}
