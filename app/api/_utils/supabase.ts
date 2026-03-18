import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function firstEnv(...keys: string[]) {
  for (const k of keys) {
    const v = process.env[k];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return undefined;
}

export function createSupabaseOrErrorResponse() {
  const url = firstEnv("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = firstEnv("SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    const missing = [
      !url ? ["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"] : null,
      !anonKey ? ["SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] : null,
    ].filter(Boolean);

    return {
      supabase: null as ReturnType<typeof createClient> | null,
      response: NextResponse.json(
        {
          error: "Supabase não configurado na Vercel.",
          missing_any_of: missing,
        },
        { status: 500 }
      ),
    };
  }

  return {
    supabase: createClient(url, anonKey),
    response: null as NextResponse | null,
  };
}

