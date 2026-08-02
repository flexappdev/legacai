import { createBrowserClient } from "@supabase/ssr";

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

export function supabaseConfigured(): boolean {
  return url.startsWith("https://") && anonKey.length > 20;
}

export function createClient() {
  if (!supabaseConfigured()) return null;
  return createBrowserClient(url, anonKey);
}
