"use client"

import { useTranslation, useI18n } from "@/lib/i18n"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code,
  Monitor,
  Briefcase,
  GraduationCap,
  Wrench,
} from "lucide-react"

/* ── Types ── */
interface ExperienceItem {
  period: string
  company: string
  role: string
  bullets: string[]
}

/* ── Icon resolver ── */
function getRoleIcon(role: string) {
  const r = role.toLowerCase()
  if (r.includes("full stack") || r.includes("desenvolvedor") || r.includes("software"))
    return Code
  if (r.includes("suporte") || r.includes("support"))
    return r.includes("estagiario") || r.includes("intern") ? Monitor : Wrench
  if (r.includes("professor") || r.includes("instrutor") || r.includes("instructor"))
    return GraduationCap
  return Briefcase
}

/* ── Animation variants ── */
const ease = [0.22, 1, 0.36, 1] as const

const sectionHeader = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
}

const cardSlide = (direction: "left" | "right") => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -50 : 50,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
})

const periodFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease, delay: 0.2 },
  },
}

const markerPop = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 22 },
  },
}

const lineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.5, ease },
  },
}

/* ── Timeline entry ── */
function TimelineEntry({
  item,
  index,
  total,
}: {
  item: ExperienceItem
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isLeft = index % 2 === 0
  const isFirst = index === 0
  const isLast = index === total - 1
  const Icon = getRoleIcon(item.role)

  return (
    <div ref={ref}>
      <div className="hidden md:block">
        <div className="grid grid-cols-[1fr_40px_1fr] items-start">
          <div className="flex justify-end pr-8">
            {isLeft ? (
              <motion.div
                className="group w-full rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:border-muted-foreground/25 hover:shadow-md"
                variants={cardSlide("left")}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <CardBody item={item} Icon={Icon} />
              </motion.div>
            ) : (
              <motion.p
                className="mt-2.5 text-right text-xs font-medium tracking-widest uppercase text-muted-foreground/50"
                variants={periodFade}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {item.period}
              </motion.p>
            )}
          </div>

          <div className="flex flex-col items-center">
            {!isFirst ? (
              <motion.div
                className="w-px origin-top bg-border"
                style={{ height: 20 }}
                variants={lineGrow}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              />
            ) : (
              <div style={{ height: 20 }} />
            )}

            <motion.div
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                isFirst
                  ? "border-foreground bg-foreground"
                  : "border-border bg-background hover:border-muted-foreground/40"
              }`}
              variants={markerPop}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <Icon
                className={`h-4 w-4 ${
                  isFirst ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              />
            </motion.div>

            {!isLast && (
              <motion.div
                className="w-px flex-1 origin-top bg-border"
                variants={lineGrow}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              />
            )}
          </div>

          <div className="pl-8">
            {!isLeft ? (
              <motion.div
                className="group w-full rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:border-muted-foreground/25 hover:shadow-md"
                variants={cardSlide("right")}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <CardBody item={item} Icon={Icon} />
              </motion.div>
            ) : (
              <motion.p
                className="mt-2.5 text-xs font-medium tracking-widest uppercase text-muted-foreground/50"
                variants={periodFade}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {item.period}
              </motion.p>
            )}
          </div>
        </div>

        {!isLast && <div className="h-0" />}
      </div>

      <div className="flex gap-4 md:hidden">
        <div className="flex flex-col items-center">
          {!isFirst ? (
            <motion.div
              className="w-px origin-top bg-border"
              style={{ height: 16 }}
              variants={lineGrow}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />
          ) : (
            <div style={{ height: 4 }} />
          )}
          <motion.div
            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
              isFirst
                ? "border-foreground bg-foreground"
                : "border-border bg-background"
            }`}
            variants={markerPop}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Icon
              className={`h-3.5 w-3.5 ${
                isFirst ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            />
          </motion.div>
          {!isLast && (
            <motion.div
              className="w-px flex-1 origin-top bg-border"
              variants={lineGrow}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />
          )}
        </div>

        <motion.div
          className="group mb-4 flex-1 rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:border-muted-foreground/25 hover:shadow-md"
          variants={cardSlide("right")}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <CardBody item={item} Icon={Icon} showPeriod />
        </motion.div>
      </div>
    </div>
  )
}

/* ── Card body ── */
function CardBody({
  item,
  Icon,
  showPeriod = false,
}: {
  item: ExperienceItem
  Icon: React.ComponentType<{ className?: string }>
  showPeriod?: boolean
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {showPeriod && (
            <p className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground/60">
              {item.period}
            </p>
          )}
          <h3 className="text-pretty text-sm font-semibold text-foreground sm:text-base">
            {item.company}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
            {item.role}
          </p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary transition-colors duration-300 group-hover:bg-foreground/5">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
      {item.bullets.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {item.bullets.map((bullet, bi) => (
            <li
              key={bi}
              className="flex gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

/* ── Section ── */
export function Experience() {
  const { t } = useTranslation()
  const { messages } = useI18n()
  const items = messages.experience.items as ExperienceItem[]

  return (
    <section
      id="experiencia"
      className="py-24 px-6"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="experience-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {t("experience.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-4xl">
          {items.map((item, index) => (
            <TimelineEntry
              key={index}
              item={item}
              index={index}
              total={items.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
