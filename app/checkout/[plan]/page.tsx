import Link from "next/link";
import { notFound } from "next/navigation";
import { C, FONT, SHADOW, PLANS, planBySlug } from "@/components/legacai-tokens";
import { Mark } from "@/components/mark";

export async function generateStaticParams() {
  return PLANS.map((p) => ({ plan: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  const p = planBySlug(plan);
  if (!p) return { title: "Checkout — Legacai" };
  return {
    title: `Secure your ${p.name} — Legacai`,
    description: `${p.desc}. ${p.price} ${p.period}.`,
  };
}

export default async function CheckoutPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  const p = planBySlug(plan);
  if (!p) notFound();

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: FONT.body, display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 40px", background: "rgba(251,249,244,0.88)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Mark size={34} />
          <span style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, color: C.ink }}>Legacai</span>
        </Link>
        <Link href="/#pricing" style={{ fontFamily: FONT.body, fontSize: 12, color: C.muted, textDecoration: "none" }}>← Pricing</Link>
      </nav>
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 40px" }}>
        <div data-testid="checkout-placeholder" style={{
          maxWidth: 520, textAlign: "center", background: C.card,
          border: `1px solid ${C.border}`, borderRadius: 20, padding: 48, boxShadow: SHADOW.lift,
        }}>
          <div style={{ fontFamily: FONT.display, fontStyle: "italic", fontSize: 44, color: C.gold, marginBottom: 20 }}>◈</div>
          <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>{p.name}</div>
          <h1 style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 700, color: C.ink, margin: "0 0 14px" }}>
            Checkout
          </h1>
          <p style={{ fontFamily: FONT.body, fontSize: 15, color: C.muted, lineHeight: 1.7, margin: 0 }}>
            This section unlocks in the next release loop —
          </p>
        </div>
      </main>
    </div>
  );
}
