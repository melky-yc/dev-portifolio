"use client"

import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { User, Code, Eye, GraduationCap } from "lucide-react"

const sectionHeader = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
}

export function About() {
  const { t } = useTranslation()

  const items = [
    { key: "who", icon: User },
    { key: "what", icon: Code },
    { key: "vision", icon: Eye },
    { key: "education", icon: GraduationCap },
  ]

  return (
    <section id="sobre" className="py-24 px-6" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="about-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {t("about.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-12 md:grid-cols-5">
          <motion.div
            className="flex flex-col items-center gap-5 md:col-span-2 md:items-start"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary text-foreground transition-transform duration-500 hover:scale-105 sm:h-44 sm:w-44">
              <img
                src="/photo/profile.png"
                alt="Foto de Melchisedek Lima"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Melchisedek Lima
              </h3>
              <p className="text-base text-muted-foreground sm:text-lg">
                Desenvolvedor Full Stack
              </p>
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
