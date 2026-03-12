"use client"

import dynamic from "next/dynamic"
import { I18nProvider } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"

const About = dynamic(() => import("@/components/about").then((m) => ({ default: m.About })), { ssr: true })
const ExperienceSection = dynamic(() => import("@/components/experience-section").then((m) => ({ default: m.ExperienceSection })), { ssr: true })
const SkillsSection = dynamic(() => import("@/components/skills-section").then((m) => ({ default: m.SkillsSection })), { ssr: true })
const Projects = dynamic(() => import("@/components/projects").then((m) => ({ default: m.Projects })), { ssr: true })
const Contact = dynamic(() => import("@/components/contact").then((m) => ({ default: m.Contact })), { ssr: true })
const Footer = dynamic(() => import("@/components/footer").then((m) => ({ default: m.Footer })), { ssr: true })

export default function Home() {
  return (
    <I18nProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <ExperienceSection />
        <SkillsSection />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  )
}
