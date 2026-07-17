/**
 * Supabase server client — env-guarded so a missing URL/key can't 500 the site.
 * Guards against the "corrupted-env" trap (whitespace in *_URL values).
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

export function supabaseConfigured(): boolean {
  return url.startsWith("https://") && anonKey.length > 20;
}

export async function createClient() {
  if (!supabaseConfigured()) return null;
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // called from a Server Component — safe to ignore
        }
      },
    },
  });
}
