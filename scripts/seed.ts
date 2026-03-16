// scripts/seed.ts
// Rodar com: npm run seed   ou   npx tsx scripts/seed.ts
// Requer: .env.local com NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
// Opcional: rodar scripts/supabase-seed-constraints.sql no Supabase para upsert de experiences

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config(); // fallback .env
import { createClient } from "@supabase/supabase-js";
import { projects } from "../lib/projects";
import { experiences } from "../data/experiences";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "❌ Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// ─── SEED PROJETOS ────────────────────────────────────────────────────────────

async function seedProjects() {
  console.log("🚀 Inserindo projetos...");

  for (const [index, project] of projects.entries()) {
    const devices = project.devices
      ?? (project.device && project.screenshots
        ? [{ type: project.device, screenshots: project.screenshots, order_index: 0 }]
        : []);

    const { data: inserted, error } = await supabase
      .from("projects")
      .upsert(
        {
          slug: project.slug,
          title: project.title,
          description_pt: project.description?.pt ?? "",
          description_en: project.description?.en ?? "",
          long_description_pt: project.longDescription?.pt ?? null,
          long_description_en: project.longDescription?.en ?? null,
          tags: project.tags ?? [],
          logo_url: project.logo ?? null,
          accent_color: project.accentColor ?? "#6366f1",
          github_url: project.github ?? null,
          demo_url: project.demo ?? null,
          gallery_urls: project.gallery ?? [],
          published: true,
          order_index: index,
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (error) {
      console.error(
        `❌ Erro ao inserir projeto "${project.title}":`,
        error.message
      );
      continue;
    }

    if (devices.length > 0) {
      await supabase
        .from("project_devices")
        .delete()
        .eq("project_id", inserted.id);

      const deviceRows = devices.map((d, i) => ({
        project_id: inserted.id,
        device_type: d.type,
        screenshot_urls: d.screenshots ?? [],
        order_index: i,
      }));

      const { error: devError } = await supabase
        .from("project_devices")
        .insert(deviceRows);

      if (devError) {
        console.error(
          `❌ Erro nos devices de "${project.title}":`,
          devError.message
        );
      }
    }

    console.log(`✅ Projeto inserido: ${project.title}`);
  }
}

// ─── SEED EXPERIÊNCIAS ────────────────────────────────────────────────────────
// Limpa a tabela e insere os dados (não exige constraint UNIQUE no banco).

async function seedExperiences() {
  console.log("\n🚀 Inserindo experiências...");

  const { error: deleteError } = await supabase.from("experiences").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) {
    console.error("❌ Erro ao limpar experiências:", deleteError.message);
    return;
  }

  for (const [index, exp] of experiences.entries()) {
    const row = {
      company: exp.company,
      role: exp.role,
      period: exp.period,
      logo_url: exp.logo ?? null,
      description: exp.description ?? null,
      bullets: exp.bullets ?? [],
      tags: exp.tags ?? [],
      type: exp.type,
      featured: exp.featured ?? false,
      featured_label: exp.featuredLabel ?? null,
      link: exp.link ?? null,
      order_index: index,
    };

    const { error } = await supabase.from("experiences").insert(row);

    if (error) {
      console.error(
        `❌ Erro ao inserir experiência "${exp.company} — ${exp.role}":`,
        error.message
      );
      continue;
    }

    console.log(`✅ Experiência inserida: ${exp.company} — ${exp.role}`);
  }
}

// ─── SEED SKILLS ──────────────────────────────────────────────────────────────

const skillsSeed = [
  // frontend
  { name: "Angular", category: "frontend" },
  { name: "AngularJS", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "HTML", category: "frontend" },
  { name: "CSS", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  // backend
  { name: "Java", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "Spring MVC", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "APIs REST", category: "backend" },
  // database
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "Supabase", category: "database" },
  { name: "Modelagem Relacional", category: "database" },
  { name: "JPA/Hibernate", category: "database" },
  // devops / tools
  { name: "Git", category: "devops" },
  { name: "GitHub", category: "devops" },
  { name: "GitLab", category: "devops" },
  { name: "Docker", category: "devops" },
  { name: "VS Code", category: "devops" },
  { name: "IntelliJ IDEA", category: "devops" },
  { name: "Postman", category: "devops" },
] as const;

async function seedSkills() {
  console.log("\n🚀 Inserindo skills...");

  const { error: deleteError } = await supabase
    .from("skills")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) {
    console.error("❌ Erro ao limpar skills:", deleteError.message);
    return;
  }

  const rows = skillsSeed.map((s, index) => ({
    name: s.name,
    category: s.category,
    icon_name: null,
    proficiency: 4,
    order_index: index,
  }));

  const { error } = await supabase.from("skills").insert(rows);
  if (error) {
    console.error("❌ Erro ao inserir skills:", error.message);
    return;
  }

  console.log(`✅ ${rows.length} skills inseridas.`);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Iniciando seed do Supabase...\n");

  await seedProjects();
  await seedExperiences();
  await seedSkills();

  console.log("\n🎉 Seed concluído!");
  process.exit(0);
}

main().catch((err) => {
  console.error("💥 Erro fatal:", err);
  process.exit(1);
});
