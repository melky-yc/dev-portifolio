"use client"

import Image from "next/image"
import { useTranslation } from "@/lib/i18n"
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

const stats = [
  { value: "2+", labelKey: "about.stats.experience" },
  { value: "5+", labelKey: "about.stats.projects" },
  { value: "Gov", labelKey: "about.stats.production" },
] as const

export function About() {
  const { t } = useTranslation()

  const items = [
    { key: "who", icon: User },
    { key: "what", icon: Code },
    { key: "vision", icon: Eye },
    { key: "education", icon: GraduationCap },
  ]

  return (
    <section
      id="sobre"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-16"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeSlideUpBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
        >
          <h2
            id="about-title"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {t("about.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">{t("about.subtitle")}</p>
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
                src="/photo/profile.png"
                alt="Foto de Melchisedek Lima"
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
                    key={stat.value}
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
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <AccordionItem key={item.key} value={item.key}>
                    <AccordionTrigger className="text-base font-semibold text-foreground">
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {t(`about.${item.key}`)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {t(`about.${item.key}_text`)}
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
