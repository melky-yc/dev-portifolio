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
    .from("projects")
    .select(
      `
      *,
      project_devices (
        id,
        device_type,
        screenshot_urls,
        order_index
      )
    `
    )
    .order("order_index", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  const items = (data ?? []).map((row: any) => ({
    slug: row.slug as string,
    title: row.title as string,
    description: {
      pt: (row.description_pt as string) ?? "",
      en: (row.description_en as string) ?? "",
    },
    longDescription:
      row.long_description_pt || row.long_description_en
        ? {
            pt: (row.long_description_pt as string | null) ?? "",
            en: (row.long_description_en as string | null) ?? "",
          }
        : undefined,
    tags: (row.tags as string[] | null) ?? [],
    logo: (row.logo_url as string | null) ?? "",
    accentColor: (row.accent_color as string | null) ?? "#6366f1",
    github: (row.github_url as string | null) ?? undefined,
    demo: (row.demo_url as string | null) ?? undefined,
    gallery: (row.gallery_urls as string[] | null) ?? [],
    devices: Array.isArray(row.project_devices)
      ? row.project_devices
          .sort(
            (a: any, b: any) =>
              (a.order_index ?? 0) - (b.order_index ?? 0)
          )
          .map((d: any) => ({
            type: d.device_type as "mobile" | "tablet" | "laptop",
            screenshots: (d.screenshot_urls as string[] | null) ?? [],
          }))
      : undefined,
  }));

  return NextResponse.json(items);
}

