import { NextResponse } from "next/server";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

export async function GET() {
  if (supabaseConfigured()) {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:17010"));
}
