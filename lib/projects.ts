export interface Project {
  slug: string
  title: string
  stacks: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    slug: "taskflow-reports",
    title: "Taskflow Reports",
    stacks: ["Java", "Spring Boot", "PostgreSQL", "React", "REST API"],
    github: "https://github.com/melchisedeksl",
  },
  {
    slug: "face-presence",
    title: "FacePresence",
    stacks: ["Angular", "Spring Boot", "REST API", "MySQL", "WebSocket"],
    github: "https://github.com/melchisedeksl",
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
