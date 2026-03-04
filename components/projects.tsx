"use client"

import { useTranslation, useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ClipboardList, ScanFace, FileSpreadsheet, LayoutGrid } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "taskflow-reports": ClipboardList,
  "face-presence": ScanFace,
  "acad-sheet": FileSpreadsheet,
}

interface ProjectItem {
  slug: string
  title: string
  description: string
  stacks: string[]
}

export function Projects() {
  const { t } = useTranslation()
  const { messages } = useI18n()
  const items = messages.projects.items as ProjectItem[]

  return (
    <section
      id="projetos"
      className="py-24 px-6"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="projects-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {t("projects.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {items.map((project) => {
            const Icon = projectIcons[project.slug] || ClipboardList
            return (
              <motion.div key={project.slug} variants={cardReveal}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg"
                >
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-secondary">
                    <Icon className="h-12 w-12 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-foreground/70" />
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stacks.map((stack) => (
                        <Badge
                          key={stack}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {stack}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-foreground">
                      {t("projects.view")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          variants={cardReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/projects/all">
              <LayoutGrid className="h-4 w-4" />
              {t("projects.view_all")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
