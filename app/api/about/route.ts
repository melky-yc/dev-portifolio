import { NextResponse } from "next/server";
import { createSupabaseOrErrorResponse } from "@/app/api/_utils/supabase";
const ABOUT_ID = "00000000-0000-0000-0000-000000000001";

export const runtime = "nodejs";

export async function GET() {
  const { supabase, response } = createSupabaseOrErrorResponse();
  if (response) return response;

  const { data, error } = await supabase
    .from("about")
    .select("*")
    .eq("id", ABOUT_ID)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  if (!data) {
    return NextResponse.json(
      { error: "Registro de about não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

