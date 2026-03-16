// scripts/seed-systems.ts
// Rodar com: npx tsx scripts/seed-systems.ts
// Requer: .env.local com NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
// Executar após o seed principal (experiences já populadas).

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function getExperienceId(company: string, role: string): Promise<string | null> {
  const { data } = await supabase
    .from("experiences")
    .select("id")
    .eq("company", company)
    .eq("role", role)
    .maybeSingle();
  return data?.id ?? null;
}

async function main() {
  console.log("🌱 Inserindo sistemas das experiências...\n");

  const medsafeDevId = await getExperienceId("Medsafe Brasil", "Estagiário Full Stack Developer");
  if (medsafeDevId) {
    const systems = [
      {
        experience_id: medsafeDevId,
        name: "Piauí Paciente Integrado",
        logo_url: null,
        screenshot_url: null,
        role: "Desenvolvimento Full Stack",
        involvement_type: "dev",
        description:
          "Participei da equipe de desenvolvimento do sistema de gestão de pacientes utilizado pela rede de saúde do estado do Piauí. Atuei como desenvolvedor full stack com Angular, Java e MySQL.",
        tags: ["Angular", "Java", "MySQL", "REST API"],
        confidential: false,
        order_index: 0,
      },
      {
        experience_id: medsafeDevId,
        name: "Piauí Primeira Infância",
        logo_url: null,
        screenshot_url: null,
        role: "Desenvolvimento de Sistema Interno",
        involvement_type: "dev",
        description:
          "Desenvolvimento do sistema interno TaskFlow Reports para suporte às operações do programa Piauí Primeira Infância.",
        tags: ["React", "Next.js", "PostgreSQL", "Supabase"],
        confidential: false,
        order_index: 1,
      },
    ];
    for (const s of systems) {
      const { error } = await supabase.from("experience_systems").upsert(s, {
        onConflict: "experience_id,name",
      });
      if (error) console.error(`❌ ${s.name}:`, error.message);
      else console.log(`✅ Sistema: ${s.name} (${s.role})`);
    }
  } else {
    console.log("⚠️ Medsafe Full Stack não encontrada; pulando sistemas desse cargo.");
  }

  const medsafeSupportId = await getExperienceId("Medsafe Brasil", "Estagiário TI – Suporte Técnico");
  if (medsafeSupportId) {
    const s = {
      experience_id: medsafeSupportId,
      name: "Piauí Primeira Infância",
      logo_url: null,
      screenshot_url: null,
      role: "Suporte N1/N2 e Capacitações",
      involvement_type: "mixed",
      description:
        "Suporte técnico N1/N2 ao programa, participação em capacitações e workshops para treinamento de agentes de saúde, educação e assistência social.",
      tags: ["Suporte TI", "Capacitação", "N1/N2"],
      confidential: false,
      order_index: 0,
    };
    const { error } = await supabase.from("experience_systems").upsert(s, {
      onConflict: "experience_id,name",
    });
    if (error) console.error(`❌ ${s.name}:`, error.message);
    else console.log(`✅ Sistema: ${s.name} (${s.role})`);
  } else {
    console.log("⚠️ Medsafe Suporte não encontrada; pulando sistemas desse cargo.");
  }

  console.log("\n🎉 Seed de sistemas concluído!");
  process.exit(0);
}

main().catch((err) => {
  console.error("💥 Erro:", err);
  process.exit(1);
});
