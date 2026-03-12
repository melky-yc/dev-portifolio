"use client"

import type { IconType } from "react-icons"
import { Code } from "lucide-react"
import {
  SiAngular,
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiHibernate,
  SiHtml5,
  SiIntellijidea,
  SiLinux,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpring,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVscodium,
} from "react-icons/si"

const iconMap: Record<string, IconType> = {
  Angular: SiAngular,
  AngularJS: SiAngular,
  "APIs REST": SiPostman,
  CSS: SiCss,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  HTML: SiHtml5,
  "IntelliJ IDEA": SiIntellijidea,
  Java: SiOpenjdk,
  "JPA/Hibernate": SiHibernate,
  Linux: SiLinux,
  "Modelagem Relacional": SiPostgresql,
  MySQL: SiMysql,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Postman: SiPostman,
  Python: SiPython,
  React: SiReact,
  "REST API": SiPostman,
  "Spring Boot": SiSpringboot,
  "Spring MVC": SiSpring,
  Supabase: SiSupabase,
  "Tailwind CSS": SiTailwindcss,
  Tailwind: SiTailwindcss,
  TypeScript: SiTypescript,
  "VS Code": SiVscodium,
}

const fallbackIcon = Code

export function getTechIcon(name: string): IconType {
  return iconMap[name] ?? fallbackIcon
}

export function TechIcon({
  name,
  className,
  size = 16,
}: {
  name: string
  className?: string
  size?: number
}) {
  const Icon = getTechIcon(name)
  return <Icon className={className} size={size} aria-hidden />
}
