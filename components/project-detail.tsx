"use client"

import { useTranslation, useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ClipboardList,
  ScanFace,
  FileSpreadsheet,
} from "lucide-react"
import Link from "next/link"
import { projects } from "@/lib/projects"

const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "taskflow-reports": ClipboardList,
  "confere-ai": ScanFace,
  "acad-sheet": FileSpreadsheet,
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

interface ProjectData {
  slug: string
  title: string
  description: string
  stacks: string[]
  overview: string
  problem: string
  decisions: string
  challenges: string
  results: string
}

export function ProjectDetail({ slug }: { slug: string }) {
  const { t } = useTranslation()
  const { messages } = useI18n()

  const projectData = (messages.projects.items as ProjectData[]).find(
    (p) => p.slug === slug
  )
  const projectMeta = projects.find((p) => p.slug === slug)

  if (!projectData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    )
  }

  const Icon = projectIcons[slug] || ClipboardList
  const imageSrc = projectMeta?.image ? `/projects/${projectMeta.image}` : null

  const sections = [
    { key: "overview", title: t("project_page.overview"), text: projectData.overview },
    { key: "problem", title: t("project_page.problem"), text: projectData.problem },
    { key: "decisions", title: t("project_page.decisions"), text: projectData.decisions },
    { key: "challenges", title: t("project_page.challenges"), text: projectData.challenges },
    { key: "results", title: t("project_page.results"), text: projectData.results },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("project_page.back")}
          </Link>
        </motion.div>

        <motion.div
          className="relative mt-8 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-secondary"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              priority
            />
          ) : (
            <Icon className="h-20 w-20 text-muted-foreground" />
          )}
        </motion.div>

        <motion.h1
          className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {projectData.title}
        </motion.h1>

        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {projectData.stacks.map((stack) => (
            <Badge key={stack} variant="outline" className="font-normal">
              {stack}
            </Badge>
          ))}
        </motion.div>

        {projectMeta && (projectMeta.github || projectMeta.demo) && (
          <motion.div
            className="mt-6 flex gap-3"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {projectMeta.github && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a
                  href={projectMeta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  {t("project_page.github")}
                </a>
              </Button>
            )}
            {projectMeta.demo && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a
                  href={projectMeta.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("project_page.demo")}
                </a>
              </Button>
            )}
          </motion.div>
        )}

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.key}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5 + i}
            >
              <h2 className="text-lg font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 border-t border-border pt-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={10}
        >
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("project_page.back")}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
