// lib/projects.ts

export type DeviceType = "mobile" | "tablet" | "laptop"

export interface ProjectDevice {
  type: DeviceType
  screenshots: string[]
}

export interface Project {
  slug: string
  title: string

  description: {
    pt: string
    en: string
  }

  longDescription?: {
    pt: string
    en: string
  }

  tags: string[]
  logo: string

  /** Cor de acento do projeto (glow, link, borda no card). Ex: "#0ea5e9" */
  accentColor?: string

  github?: string
  demo?: string

  device?: DeviceType
  screenshots?: string[]

  devices?: ProjectDevice[]

  gallery?: string[]
}

export const projects: Project[] = [
  // ─── Single device ───────────────────────────────────────────────────────
  {
    slug: "taskflow-reports",
    title: "Taskflow Reports",
    description: {
      pt: "Sistema interno de gerenciamento e rastreabilidade de demandas técnicas, com controle de relatórios operacionais e automação de processos.",
      en: "Internal system for task management and traceability of technical demands, with operational report control and process automation.",
    },
    longDescription: {
      pt: "O Taskflow Reports é um sistema completo de gerenciamento de demandas desenvolvido para otimizar o fluxo de trabalho operacional de equipes técnicas. Equipes técnicas frequentemente lidam com rastreabilidade fragmentada de demandas, relatórios manuais e falta de visibilidade sobre o progresso de tarefas críticas. A arquitetura foi construída com Spring Boot no backend, garantindo robustez e escalabilidade. O frontend em React oferece uma interface responsiva e intuitiva. PostgreSQL foi escolhido pela confiabilidade em modelagem relacional complexa. O principal desafio foi modelar o sistema de permissões e níveis de acesso sem comprometer a performance das consultas. A solução envolveu uso estratégico de JPA com queries otimizadas. Redução de 40% no tempo de geração de relatórios e melhoria significativa na rastreabilidade de demandas da equipe.",
      en: "Taskflow Reports is a complete demand management system developed to optimize the operational workflow of technical teams. Technical teams often deal with fragmented demand traceability, manual reports, and lack of visibility over the progress of critical tasks. The architecture was built with Spring Boot on the backend, ensuring robustness and scalability. The React frontend offers a responsive and intuitive interface. PostgreSQL was chosen for its reliability in complex relational modeling. The main challenge was modeling the permissions system and access levels without compromising query performance. The solution involved strategic use of JPA with optimized queries. 40% reduction in report generation time and significant improvement in team demand traceability.",
    },
    tags: ["React", "Next.js", "PostgreSQL", "Supabase", "REST API"],
    logo: "/projects/taskflow-logo.png",
    accentColor: "#0ea5e9",
    github: "https://github.com/melchisedeksl",
    device: "laptop",
    screenshots: [
      "/projects/taskflow-reports/desktop-1.png",
      "/projects/taskflow-reports/desktop-2.png",
    ],
    gallery: ["/projects/taskflow-reports/gallery-1.png"],
  },

  {
    slug: "confere-ai",
    title: "Confere AI",
    description: {
      pt: "Sistema web de registro de ponto com reconhecimento facial, análise de microexpressões e métricas biométricas em tempo real.",
      en: "Web application for attendance control with facial recognition, micro-expression analysis, and biometric metrics in real time.",
    },
    longDescription: {
      pt: "O Confere AI é uma plataforma de controle de presença baseada em visão computacional. A aplicação realiza detecção facial em tempo real, aplica malha facial (facial mesh), extrai métricas biométricas e possibilita análise emocional por IA durante o processo de autenticação. Sistemas convencionais de registro de ponto dependem de autenticação manual (cartão, senha ou biometria simples), o que permite fraudes como marcação por terceiros e não oferece validação comportamental ou análise contextual do usuário. Next.js foi adotado para garantir performance e organização estrutural no frontend. WebRTC viabiliza captura de vídeo em tempo real diretamente no navegador. A utilização de Face Mesh permite extração precisa de landmarks faciais. O backend em Spring Boot foi estruturado para suportar autenticação, persistência de registros e futura escalabilidade com serviços de machine learning. Garantir baixa latência na renderização da malha facial e no processamento das métricas biométricas foi o principal desafio técnico. Sistema funcional com autenticação biométrica em tempo real, exibição dinâmica de métricas faciais e arquitetura preparada para expansão com modelos avançados de análise emocional.",
      en: "Confere AI is a computer vision-based attendance control platform. The application performs real-time facial detection, applies facial mesh, extracts biometric metrics, and enables emotional analysis by AI during the authentication process. Traditional attendance control systems rely on manual authentication (card, password, or simple biometrics), which allows for fraud like marking by third parties and does not offer behavioral validation or contextual analysis of the user. Next.js was adopted to ensure structural organization and performance in the frontend. WebRTC enables real-time video capture directly in the browser. The use of Face Mesh allows accurate extraction of facial landmarks. The Spring Boot backend was structured to support authentication, record persistence, and future scalability with machine learning services. Ensuring low latency in facial mesh rendering and biometric metric processing was the main technical challenge. Functional system with real-time biometric authentication, dynamic display of facial metrics, and architecture prepared for expansion with advanced emotional analysis models.",
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "Python", "ML Services", "REST API", "API Gemini", "WebRTC"],
    logo: "/projects/confere-ai-logo.png",
    accentColor: "#8b5cf6",
    github: "https://github.com/melchisedeksl",
    device: "laptop",
    screenshots: [
      "/projects/confere-ai/desktop-1.png",
    ],
  },

  {
    slug: "acad-sheet",
    title: "AcadSheet Automation",
    description: {
      pt: "Sistema de planilhas automatizadas para controle acadêmico, reduzindo 30% do tempo em tarefas administrativas manuais.",
      en: "Automated spreadsheet system for academic control, reducing 30% of time on manual administrative tasks.",
    },
    longDescription: {
      pt: "O AcadSheet Automation é uma solução de automação de planilhas desenvolvida para instituições de ensino que precisam otimizar seus processos acadêmicos. Instituições de ensino gastam horas por semana em tarefas manuais de preenchimento, cálculo de notas e geração de relatórios acadêmicos. A escolha por VBA e Office 365 foi estratégica, pois permite integração direta com ferramentas já utilizadas pelas instituições, sem necessidade de infraestrutura adicional. Garantir compatibilidade entre diferentes versões do Excel e lidar com volumes variados de dados sem comprometer a performance das macros. Redução de 30% no tempo gasto em tarefas administrativas e eliminação de erros manuais no cálculo de notas e frequências.",
      en: "AcadSheet Automation is a spreadsheet automation solution developed for educational institutions that need to optimize their academic processes. Educational institutions spend hours per week on manual tasks of filling in, calculating grades, and generating academic reports. The choice of VBA and Office 365 was strategic, as it allows direct integration with tools already used by institutions, without the need for additional infrastructure. Ensuring compatibility between different Excel versions and handling varying data volumes without compromising macro performance. 30% reduction in time spent on administrative tasks and elimination of manual errors in grade and attendance calculations.",
    },
    tags: ["Excel", "Office 365", "Automação", "VBA"],
    logo: "/projects/acad-sheet-logo.svg",
    accentColor: "#f59e0b",
  },

  // ─── Multi device ─────────────────────────────────────────────────────────
  {
    slug: "duofinance",
    title: "DuoFinance",
    description: {
      pt: "Aplicativo de finanças pessoais com gestão de gastos e visão consolidada.",
      en: "Personal finance app with expense management and consolidated view.",
    },
    longDescription: {
      pt: "O DuoFinance é um aplicativo mobile de finanças pessoais que permite controle de gastos, categorização e visão consolidada das finanças. Usuários precisam de uma forma simples e rápida de registrar gastos e acompanhar o orçamento sem planilhas complexas. React Native foi escolhido para entrega nativa em Android com reaproveitamento de código. Supabase fornece backend (auth e banco) com baixa operação. Tailwind via NativeWind para UI consistente. Integrar fluxo WebView para funcionalidades específicas mantendo a experiência nativa e a performance do app. App funcional com registro de gastos, categorias e visão em tempo real do saldo e despesas.",
      en: "DuoFinance is a mobile personal finance app for expense tracking, categorization and a consolidated view of finances. Users need a simple, quick way to log expenses and track budget without complex spreadsheets. React Native was chosen for native Android delivery with code reuse. Supabase provides backend (auth and database) with low maintenance. Tailwind via NativeWind for consistent UI. Integrating WebView flow for specific features while keeping the native experience and app performance. Functional app with expense logging, categories and real-time view of balance and expenses.",
    },
    tags: ["React Native", "TypeScript", "Tailwind CSS", "Supabase"],
    logo: "/projects/duofinance-logo.png",
    accentColor: "#10b981",
    devices: [
      {
        type: "mobile",
        screenshots: [
          "/projects/duofinance.png",
          "/projects/duofinance/mobile-2.png",
        ],
      },
      {
        type: "tablet",
        screenshots: ["/projects/duofinance/tablet-1.png"],
      },
      {
        type: "laptop",
        screenshots: ["/projects/duofinance/desktop-1.png"],
      },
    ],
    gallery: [
      "/projects/duofinance.png",
      "/projects/duofinance/gallery-2.png",
    ],
  },
]

export function getProjectDescription(project: Project, locale: string): string {
  return locale === "en"
    ? (project.description.en ?? project.description.pt)
    : project.description.pt
}

export function getProjectLongDescription(project: Project, locale: string): string {
  if (!project.longDescription) return getProjectDescription(project, locale)
  return locale === "en"
    ? (project.longDescription.en ?? project.longDescription.pt)
    : project.longDescription.pt
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
