import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const ABOUT_ID = "00000000-0000-0000-0000-000000000001";

export async function GET() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: "Supabase não configurado" },
      { status: 503 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
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

