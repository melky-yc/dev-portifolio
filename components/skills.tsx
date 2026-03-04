"use client"

import { useTranslation, useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { TechIcon } from "@/lib/tech-icons"
import { Layers, Server, Database, Wrench } from "lucide-react"

const sectionHeader = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.97, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const softContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
}

const tagReveal = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

const skillGroups = [
  {
    key: "frontend",
    icon: Layers,
    items: ["Angular", "AngularJS", "React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    key: "backend",
    icon: Server,
    items: ["Java", "Spring Boot", "Node.js", "Python", "Spring MVC", "APIs REST"],
  },
  {
    key: "database",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "Supabase", "Modelagem Relacional", "JPA/Hibernate"],
  },
  {
    key: "tools",
    icon: Wrench,
    items: ["Git", "GitHub", "GitLab", "Docker", "VS Code", "IntelliJ IDEA", "Postman"],
  },
]

export function Skills() {
  const { t } = useTranslation()
  const { messages } = useI18n()

  return (
    <section
      id="habilidades"
      className="py-24 px-6"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="skills-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {t("skills.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillGroups.map((group) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.key}
                className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-md"
                variants={cardReveal}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary transition-colors duration-300 group-hover:bg-foreground/5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t(`skills.${group.key}`)}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="inline-flex items-center gap-2 font-normal transition-colors duration-200 hover:bg-secondary"
                    >
                      <TechIcon name={item} size={14} className="flex-shrink-0 text-muted-foreground" />
                      {item}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-12"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h3 className="text-base font-semibold text-foreground">
            {t("skills.soft_title")}
          </h3>
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            variants={softContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
          >
            {(messages.skills.soft_skills as string[]).map((skill) => (
              <motion.div key={skill} variants={tagReveal}>
                <Badge variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
