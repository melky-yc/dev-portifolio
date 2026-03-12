import type { ExperienceItem } from "@/components/ExperienceTimeline";

export const experiences: ExperienceItem[] = [
  {
    id: "medsafe-dev",
    company: "Medsafe Brasil",
    role: "Estagiário Full Stack Developer",
    period: "FEV 2026 – ATUAL",
    logo: "/logos/medsafe.png",
    featured: true,
    featuredLabel: "Nível Governamental",
    type: "dev",
    description:
      "Desenvolvimento de sistemas utilizados em operações governamentais do estado do Piauí, com foco em robustez, rastreabilidade e conformidade com requisitos institucionais.",
    bullets: [
      "Desenvolvimento de funcionalidades full stack com Java, Spring Boot e Angular",
      "Manutenção e evolução de APIs REST integradas a sistemas governamentais",
      "Participação em code reviews e adoção de boas práticas de desenvolvimento",
    ],
    tags: ["Java", "Spring Boot", "Angular", "PostgreSQL", "REST API"],
    link: "https://medsafebrasil.com.br",
  },
  {
    id: "medsafe-suporte",
    company: "Medsafe Brasil",
    role: "Estagiário TI – Suporte Técnico",
    period: "JAN 2026 – MAR 2026",
    logo: "/logos/medsafe.png",
    type: "support",
    description:
      "Suporte técnico e manutenção de infraestrutura em ambiente corporativo com processos críticos.",
    bullets: [
      "Suporte técnico a equipes internas e resolução de incidentes",
      "Documentação de processos e manutenção de infraestrutura de TI",
    ],
    tags: ["Suporte TI", "Infraestrutura", "Documentação"],
  },
  {
    id: "confereai",
    company: "ConfereAI",
    role: "Desenvolvedor de Software",
    period: "AGO 2025 – JAN 2026",
    logo: "/logos/confereai.png",
    featured: true,
    featuredLabel: "Produto em Produção",
    type: "dev",
    description:
      "Desenvolvimento em produto real com reconhecimento facial e análise biométrica em tempo real — sistema em uso ativo por empresas clientes.",
    bullets: [
      "Desenvolvimento full stack com React e Node.js",
      "Features backend em Java com Spring Boot",
      "Implementação de lógica de negócios e integração com banco de dados",
      "Colaboração em equipe ágil com entregas semanais",
    ],
    tags: ["React", "Node.js", "Java", "Spring Boot", "WebRTC", "ML"],
    link: "https://confereai.com.br",
  },
  {
    id: "facetec",
    company: "Faculdade FACETEC",
    role: "Professor / Instrutor de TI",
    period: "NOV 2025 – JAN 2026",
    logo: "/logos/facetec.png",
    type: "teaching",
    description:
      "Instrução de turmas em fundamentos de programação e lógica computacional em nível superior.",
    bullets: [
      "Instrução em fundamentos de programação e lógica computacional",
      "Elaboração de materiais didáticos e avaliações práticas",
    ],
    tags: ["Docência", "Programação", "Lógica"],
  },
  {
    id: "grautecnico",
    company: "Grau Técnico",
    role: "Professor / Instrutor de TI",
    period: "SET 2025 – DEZ 2025",
    logo: "/logos/grautecnico.png",
    type: "teaching",
    description:
      "Ensino técnico em informática e programação básica, com acompanhamento individual de alunos.",
    bullets: [
      "Ensino de disciplinas técnicas em informática e programação básica",
      "Acompanhamento individual e suporte em projetos práticos de pesquisa",
    ],
    tags: ["Docência", "Informática", "Suporte Acadêmico"],
  },
  {
    id: "ballet",
    company: "Espaço de Ballet Renascer",
    role: "Suporte Técnico",
    period: "FEV 2025 – MAI 2025",
    type: "support",
    description:
      "Manutenção de equipamentos e automação de processos administrativos para gestão de eventos.",
    bullets: [
      "Manutenção de equipamentos e suporte técnico geral",
      "Organização e automação de processos administrativos",
    ],
    tags: ["Suporte TI", "Automação", "Gestão"],
  },
];
