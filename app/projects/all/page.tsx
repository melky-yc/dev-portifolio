"use client"

import { I18nProvider } from "@/lib/i18n"
import { Header } from "@/components/header"
import { ProjectsAll } from "@/components/projects-all"

export default function ProjectsAllPage() {
  return (
    <I18nProvider>
      <Header />
      <ProjectsAll />
    </I18nProvider>
  )
}
