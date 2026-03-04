export interface Project {
  slug: string
  title: string
  stacks: string[]
  github?: string
  demo?: string
  /** Nome do arquivo em public/projects (ex: "taskflow.png"). Usado na rota /projects/<image>. */
  image?: string
}

export const projects: Project[] = [
  {
    slug: "taskflow-reports",
    title: "Taskflow Reports",
    stacks: ["Java", "Spring Boot", "PostgreSQL", "React", "REST API"],
    github: "https://github.com/melchisedeksl",
    image: "taskflow.png",
  },
  {
    slug: "confere-ai",
    title: "FacePresence",
    stacks: ["Angular", "Spring Boot", "REST API", "MySQL", "WebSocket"],
    github: "https://github.com/melchisedeksl",
    image: "confereai.png",
  },
  {
    slug: "acad-sheet",
    title: "AcadSheet Automation",
    stacks: ["Excel", "Office 365", "Automation", "VBA"],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
