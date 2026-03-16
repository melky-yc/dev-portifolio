import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: "Supabase não configurado" },
      { status: 503 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("experiences")
    .select(
      `
      *,
      company_data:companies!experiences_company_id_fkey (
        logo_url,
        name
      ),
      experience_systems (
        id,
        name,
        logo_url,
        screenshot_url,
        role,
        involvement_type,
        description,
        tags,
        confidential,
        order_index
      )
    `
    )
    .order("order_index", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  const items = (data ?? []).map((row: any) => {
    const logoFromCompany = row.company_data?.logo_url ?? null;
    const logoFromExperience = row.logo_url ?? null;
    const rawSystems = row.experience_systems ?? [];
    const systems = rawSystems
      .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0))
      .map((s: any) => ({
        id: s.id,
        name: s.name,
        logo_url: s.logo_url ?? undefined,
        screenshot_url: s.screenshot_url ?? undefined,
        role: s.role ?? "",
        involvement_type: s.involvement_type,
        description: s.description ?? "",
        tags: s.tags ?? [],
        confidential: s.confidential ?? false,
      }));

    return {
      id: row.id as string,
      company: (row.company_data?.name as string | undefined) ?? (row.company as string),
      role: row.role as string,
      period: row.period as string,
      logo: (logoFromCompany ?? logoFromExperience) ?? undefined,
      description: (row.description as string | null) ?? "",
      bullets: (row.bullets as string[] | null) ?? [],
      tags: (row.tags as string[] | null) ?? [],
      type: row.type as "dev" | "teaching" | "support",
      featured: (row.featured as boolean | null) ?? false,
      featuredLabel: (row.featured_label as string | null) ?? undefined,
      link: (row.link as string | null) ?? undefined,
      systems: systems.length > 0 ? systems : undefined,
    };
  });

  return NextResponse.json(items);
}
