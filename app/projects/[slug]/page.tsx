"use client"

import { use } from "react"
import { I18nProvider } from "@/lib/i18n"
import { ProjectDetail } from "@/components/project-detail"

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)

  return (
    <I18nProvider>
      <ProjectDetail slug={slug} />
    </I18nProvider>
  )
}
