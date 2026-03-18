"use client"

import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { TechMarquee } from "@/components/tech-marquee"
import Link from "next/link"
import {
  containerStagger,
  fadeSlideUp,
  fadeIn,
  lineReveal,
  fadeScale,
} from "@/lib/motion-variants"

export function Hero() {
  const { t } = useTranslation()

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8"
      aria-label="Hero"
    >
      {/* Glow radial de fundo — funciona em dark e light */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.12),transparent)] opacity-30 dark:opacity-100"
        aria-hidden
      />

      {/* Grid pattern decorativo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(128,128,128,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128,128,128,1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge de disponibilidade */}
        <motion.div
          variants={fadeIn}
          custom={0}
          className="mb-6 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t("hero.available")}
          </span>
        </motion.div>

        <motion.h1
          className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          variants={fadeSlideUp}
          custom={0}
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
          custom={0}
        >
          {t("hero.role")}
        </motion.p>

        <motion.p
          className="mt-2 text-sm text-muted-foreground sm:text-base"
          variants={fadeSlideUp}
          custom={0}
        >
          {t("hero.student")}
        </motion.p>

        <motion.p
          className="mt-1.5 text-xs tracking-widest uppercase text-muted-foreground/60 sm:text-sm"
          variants={fadeSlideUp}
          custom={0}
        >
          {t("hero.location")}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          variants={fadeScale}
        >
          <Button asChild size="lg" className="w-full gap-2 sm:w-auto">
            <a href="#projetos">
              {t("hero.cta_projects")}
              <ArrowDown className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
            <Link href="/cv" target="_blank">
              {t("hero.cta_cv")}
              <Download className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 mt-14 w-full max-w-4xl overflow-hidden sm:mt-16 md:mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      >
        <TechMarquee />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeIn}
        custom={0.8}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground animate-bounce"
        initial="hidden"
        animate="visible"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest">
          scroll
        </span>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  )
}
