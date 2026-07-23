import { notFound } from "next/navigation";
import VaultDashboard from "@/components/vault-dashboard";
import { NAV, type PageId } from "@/components/vault-nav";

const ALLOWED = new Set<string>(NAV.map((n) => n.id));

export function generateStaticParams() {
  return NAV.map((n) => ({ section: n.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!ALLOWED.has(section)) return { title: "Vault — Legacai" };
  const label = NAV.find((n) => n.id === section)?.label ?? "Vault";
  return { title: `${label} — Legacai` };
}

export default async function VaultSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!ALLOWED.has(section)) notFound();
  return <VaultDashboard section={section as PageId} />;
}
