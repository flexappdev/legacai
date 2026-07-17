import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_ALLOWLIST = new Set(["mat@matsiems.com"]);

export async function updateSession(request: NextRequest) {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

  // Env not wired — pass through cleanly. Never 500 the site over auth.
  if (!url.startsWith("https://") || anonKey.length < 20) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // /admin gate — only the allowlisted user (mat@matsiems.com).
  if (path.startsWith("/admin")) {
    if (!user || !user.email || !ADMIN_ALLOWLIST.has(user.email)) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/login";
      redirect.searchParams.set("from", path);
      return NextResponse.redirect(redirect);
    }
  }

  return supabaseResponse;
}
