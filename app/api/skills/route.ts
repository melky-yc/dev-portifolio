import { NextResponse } from "next/server";
import { createSupabaseOrErrorResponse } from "@/app/api/_utils/supabase";

export const runtime = "nodejs";

export async function GET() {
  const { supabase, response } = createSupabaseOrErrorResponse();
  if (response) return response;

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json(data ?? []);
}

