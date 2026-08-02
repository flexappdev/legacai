"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mark } from "@/components/mark";
import { C, FONT, SHADOW } from "@/components/legacai-tokens";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/vault/agent";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(error ? "Authentication failed — try again." : null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    if (!supabaseConfigured()) {
      setErr("Auth not configured — contact the vault administrator.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) { setLoading(false); return; }

    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(from)}`;
    const { error: sbErr } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });

    if (sbErr) {
      setErr(sbErr.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: none; border-color: ${C.accent} !important; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 420, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 24 }}>
            <Mark size={40} radius={10} />
          </Link>
          <div style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 700, color: C.ink }}>Sign in to your vault</div>
          <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 13, color: C.gold, marginTop: 6 }}>your legacy, alive</div>
        </div>

        <div style={{ background: C.card, borderRadius: 20, padding: 32, boxShadow: SHADOW.lift, border: `1px solid ${C.border}` }}>
          {sent ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✉</div>
              <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, color: C.ink, marginBottom: 10 }}>Check your email</div>
              <p style={{ fontFamily: FONT.body, fontSize: 13.5, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
                We sent a magic link to <strong style={{ color: C.ink }}>{email}</strong>. Click it to open your vault.
              </p>
              <p style={{ fontFamily: FONT.body, fontSize: 11.5, color: C.dim }}>
                No email? Check spam or{" "}
                <button onClick={() => setSent(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.accent, fontFamily: FONT.body, fontSize: 11.5, padding: 0 }}>
                  try again
                </button>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 10,
                    border: `1px solid ${C.border}`, background: C.bg,
                    fontFamily: FONT.body, fontSize: 14, color: C.ink,
                    transition: "border-color 0.15s",
                  }}
                />
              </div>

              {err && (
                <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(180,66,60,0.08)", border: "1px solid rgba(180,66,60,0.2)", fontFamily: FONT.body, fontSize: 12.5, color: C.danger, marginBottom: 16 }}>
                  {err}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                style={{
                  width: "100%", padding: "13px 0", borderRadius: 10,
                  background: C.accent, color: "#FDFBF6",
                  fontFamily: FONT.body, fontSize: 14, fontWeight: 700,
                  border: "none", cursor: "pointer",
                }}
              >
                {loading ? "Sending…" : "Send magic link"}
              </button>

              <p style={{ fontFamily: FONT.body, fontSize: 11.5, color: C.dim, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                No password. One click, then you&apos;re in.
              </p>
            </form>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/" style={{ fontFamily: FONT.body, fontSize: 12, color: C.dim, textDecoration: "none" }}>← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
