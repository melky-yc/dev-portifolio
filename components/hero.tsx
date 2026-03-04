"use client"

import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"
import { motion } from "framer-motion"
import { TechMarquee } from "@/components/tech-marquee"
import Link from "next/link"

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
  },
}

export function Hero() {
  const { t } = useTranslation()

  return (
    <section
      className="relative flex min-h-[100vh] flex-col items-center justify-center px-6"
      aria-label="Hero"
    >
      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          variants={fadeSlideUp}
        >
          {t("hero.name")}
        </motion.h1>

        <motion.div
          className="mx-auto mt-6 h-px w-16 origin-center bg-border"
          variants={lineReveal}
        />

        <motion.p
          className="mt-6 text-base font-medium text-muted-foreground sm:text-lg md:text-xl"
          variants={fadeSlideUp}
        >
          {t("hero.role")}
        </motion.p>

        <motion.p
          className="mt-2 text-sm text-muted-foreground sm:text-base"
          variants={fadeSlideUp}
        >
          {t("hero.student")}
        </motion.p>

        <motion.p
          className="mt-1.5 text-xs tracking-widest uppercase text-muted-foreground/60 sm:text-sm"
          variants={fadeSlideUp}
        >
          {t("hero.location")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          variants={fadeScale}
        >
          <Button asChild size="lg" className="gap-2">
            <a href="#projetos">
              {t("hero.cta_projects")}
              <ArrowDown className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/pdf/cv-melchisedeksl.pdf" target="_blank">
              {t("hero.cta_cv")}
              <Download className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-20 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      >
        <TechMarquee />
      </motion.div>
    </section>
  )
}
