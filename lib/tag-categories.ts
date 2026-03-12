export type TagCategory =
  | "backend"
  | "frontend"
  | "mobile"
  | "database"
  | "devops"
  | "ai"
  | "soft"
  | "communication"
  | "automation"
  | "default"

/** Mapeia cada tag para sua categoria. Adicionar novas tags aqui conforme novos projetos. */
export const tagCategoryMap: Record<string, TagCategory> = {
  // Backend — laranja
  Java: "backend",
  "Spring Boot": "backend",
  "Node.js": "backend",
  Python: "backend",
  "REST API": "backend",
  "Spring MVC": "backend",
  "JPA/Hibernate": "backend",

  // Frontend — azul
  React: "frontend",
  "Next.js": "frontend",
  Angular: "frontend",
  AngularJS: "frontend",
  TypeScript: "frontend",
  HTML: "frontend",
  CSS: "frontend",
  "Tailwind CSS": "frontend",
  WebRTC: "frontend",

  // Mobile — roxo
  "React Native": "mobile",
  "Android WebView": "mobile",
  "Mobile App": "mobile",

  // Banco de dados — ciano
  PostgreSQL: "database",
  MySQL: "database",
  Supabase: "database",
  MongoDB: "database",

  // DevOps / ferramentas — cinza azulado
  Docker: "devops",
  Git: "devops",
  GitHub: "devops",
  GitLab: "devops",
  Vercel: "devops",

  // IA / ML — rosa
  "ML Services": "ai",
  ML: "ai",
  "API Gemini": "ai",

  // Automação — âmbar
  VBA: "automation",
  Automação: "automation",
  "Office 365": "automation",
  Excel: "automation",

  // Soft skills / não técnicas — verde
  "Resolução de Problemas": "soft",
  Proatividade: "soft",
  Autodidatismo: "soft",
  "Liderança de Iniciativas": "soft",
  "Pensamento Analítico": "soft",

  // Comunicação técnica — amarelo
  "Comunicação Técnica": "communication",
  Documentação: "communication",
}

/** Estilo visual de cada categoria (CSS inline para compatibilidade com Tailwind v4). */
export const tagCategoryStyles: Record<
  TagCategory,
  { bg: string; border: string; text: string }
> = {
  backend: {
    bg: "rgba(249,115,22,0.10)",
    border: "rgba(249,115,22,0.25)",
    text: "#fb923c",
  },
  frontend: {
    bg: "rgba(59,130,246,0.10)",
    border: "rgba(59,130,246,0.25)",
    text: "#60a5fa",
  },
  mobile: {
    bg: "rgba(139,92,246,0.10)",
    border: "rgba(139,92,246,0.25)",
    text: "#a78bfa",
  },
  database: {
    bg: "rgba(6,182,212,0.10)",
    border: "rgba(6,182,212,0.25)",
    text: "#22d3ee",
  },
  devops: {
    bg: "rgba(100,116,139,0.12)",
    border: "rgba(100,116,139,0.25)",
    text: "#94a3b8",
  },
  ai: {
    bg: "rgba(236,72,153,0.10)",
    border: "rgba(236,72,153,0.25)",
    text: "#f472b6",
  },
  automation: {
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.25)",
    text: "#fbbf24",
  },
  soft: {
    bg: "rgba(16,185,129,0.10)",
    border: "rgba(16,185,129,0.25)",
    text: "#34d399",
  },
  communication: {
    bg: "rgba(234,179,8,0.10)",
    border: "rgba(234,179,8,0.25)",
    text: "#facc15",
  },
  default: {
    bg: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.10)",
    text: "#94a3b8",
  },
}

export function getTagStyle(tag: string) {
  const category = tagCategoryMap[tag] ?? "default"
  return tagCategoryStyles[category]
}
