"use client"

import { TechIcon } from "@/lib/tech-icons"

const techs = [
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Angular",
  "React",
  "TypeScript",
  "Docker",
  "Git",
  "Python",
  "MySQL",
  "Node.js",
  "REST API",
]

export function TechMarquee() {
  const doubled = [...techs, ...techs]

  return (
    <div
      className="relative overflow-hidden"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="animate-marquee flex w-max items-center gap-12 py-4">
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
          >
            <TechIcon name={tech} size={20} className="flex-shrink-0 text-muted-foreground/80" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
