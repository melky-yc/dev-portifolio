"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslation, useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { User, Code, Eye, GraduationCap } from "lucide-react"
import {
  fadeSlideUpBlur,
  slideInLeft,
  slideInRight,
} from "@/lib/motion-variants"

interface AboutData {
  who_i_am_pt: string | null
  who_i_am_en: string | null
  what_i_do_pt: string | null
  what_i_do_en: string | null
  my_vision_pt: string | null
  my_vision_en: string | null
  education_pt: string | null
  education_en: string | null
  stat_experience: string | null
  stat_projects: string | null
  stat_production: string | null
  photo_url: string | null
}

const statLabelKeys = [
  "about.stats.experience",
  "about.stats.projects",
  "about.stats.production",
] as const

const accordionItems = [
  { key: "who", icon: User, ptKey: "who_i_am_pt", enKey: "who_i_am_en" },
  { key: "what", icon: Code, ptKey: "what_i_do_pt", enKey: "what_i_do_en" },
  { key: "vision", icon: Eye, ptKey: "my_vision_pt", enKey: "my_vision_en" },
  { key: "education", icon: GraduationCap, ptKey: "education_pt", enKey: "education_en" },
] as const

export function About() {
  const { t } = useTranslation()
  const { locale } = useI18n()
  const [about, setAbout] = useState<AboutData | null>(null)

  const isPt = locale.startsWith("pt")

  useEffect(() => {
    fetch("/api/about")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: AboutData) => setAbout(data))
      .catch(() => setAbout(null))
  }, [])

  const stats = about
    ? [
        { value: about.stat_experience ?? "2+", labelKey: statLabelKeys[0] },
        { value: about.stat_projects ?? "5+", labelKey: statLabelKeys[1] },
        { value: about.stat_production ?? "10+", labelKey: statLabelKeys[2] },
      ]
    : [
        { value: "2+", labelKey: statLabelKeys[0] },
        { value: "5+", labelKey: statLabelKeys[1] },
        { value: "10+", labelKey: statLabelKeys[2] },
      ]

  const photoSrc = about?.photo_url ?? "/photo/profile.png"

  return (
    <section
      id="sobre"
      className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 md:py-24"
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={fadeSlideUpBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="text-left"
        >
          <div className="mb-12 md:mb-16">
            <h2
              id="about-title"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              {t("about.title")}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t("about.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-10 sm:mt-12 sm:gap-12 md:grid-cols-5">
          <motion.div
            className="flex flex-col items-center gap-5 md:col-span-2 md:items-start"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative mx-auto h-44 w-44 md:h-52 md:w-52">
              <div className="absolute inset-0 scale-110 rounded-full bg-indigo-500/20 blur-2xl" />
              <Image
                src={photoSrc}
                alt="Foto de perfil"
                fill
                priority
                sizes="(max-width: 768px) 176px, 208px"
                className="relative z-10 rounded-full object-cover ring-2 ring-white/10 dark:ring-white/10"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Melchisedek Lima
              </h3>
              <p className="text-base text-muted-foreground sm:text-lg">
                Desenvolvedor Full Stack
              </p>
              <div className="mt-6 grid grid-cols-3 divide-x divide-border">
                {stats.map((stat) => (
                  <div
                    key={stat.labelKey}
                    className="flex flex-col items-center gap-0.5 px-2"
                  >
                    <span className="text-xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-center text-[10px] leading-tight text-muted-foreground">
                      {t(stat.labelKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Accordion type="single" collapsible defaultValue="who">
              {accordionItems.map((item) => {
                const Icon = item.icon
                const content = about
                  ? (isPt ? about[item.ptKey] : about[item.enKey]) ?? t(`about.${item.key}_text`)
                  : t(`about.${item.key}_text`)
                return (
                  <AccordionItem key={item.key} value={item.key}>
                    <AccordionTrigger className="text-base font-semibold text-foreground">
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {t(`about.${item.key}`)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                      {content}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
