"use client"

import { useTranslation, useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, ClipboardList, ScanFace, FileSpreadsheet } from "lucide-react"
import Link from "next/link"
import { projects } from "@/lib/projects"

const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "taskflow-reports": ClipboardList,
  "confere-ai": ScanFace,
  "acad-sheet": FileSpreadsheet,
}

interface ProjectItem {
  slug: string
  title: string
  description: string
  stacks: string[]
}

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function ProjectsAll() {
  const { t } = useTranslation()
  const { messages } = useI18n()
  const items = messages.projects.items as ProjectItem[]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-20 md:pt-24">
        <Link
          href="/#projetos"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("project_page.back")}
        </Link>

        <motion.h1
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {t("projects.title")}
        </motion.h1>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {t("projects.subtitle")}
        </motion.p>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridContainer}
          initial="hidden"
          animate="visible"
        >
          {items.map((project) => {
            const projectMeta = projects.find((p) => p.slug === project.slug)
            const Icon = projectIcons[project.slug] || ClipboardList
            const imageSrc = projectMeta?.image ? `/projects/${projectMeta.image}` : null
            return (
              <motion.div
                key={project.slug}
                variants={cardReveal}
                className="h-full"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg"
                >
                  <div className="relative flex shrink-0 aspect-video items-center justify-center overflow-hidden bg-secondary">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Icon className="h-12 w-12 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-foreground/70" />
                    )}
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
                  </div>

                  <div className="flex flex-1 flex-col p-6 min-h-0">
                    <h2 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-1 flex-wrap content-start gap-2 min-h-[2.5rem]">
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
                    <div className="mt-6 flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground">
                      {t("projects.view")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
