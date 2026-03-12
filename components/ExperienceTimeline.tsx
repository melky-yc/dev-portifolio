"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Building2, ExternalLink, Star, Shield, Briefcase, GraduationCap, Wrench } from "lucide-react";

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  logo?: string;                          // path da logo, ex: "/logos/medsafe.png"
  logoFallbackColor?: string;             // cor de fallback, ex: "#1d4ed8"
  description: string;                    // parágrafo descritivo (NÃO bullet list)
  bullets?: string[];                     // bullets opcionais de responsabilidades
  tags?: string[];                        // ex: ["Java", "Spring Boot", "Angular"]
  type: "dev" | "teaching" | "support";  // ícone do card
  featured?: boolean;                     // destaque especial (ex: gov, grande empresa)
  featuredLabel?: string;                  // ex: "Nível Governamental", "Produto em Produção"
  link?: string;                          // link externo da empresa
}

// ─── Ícone por tipo ──────────────────────────────────────────────────────────

const typeConfig = {
  dev:      { icon: Briefcase,     color: "text-blue-400",    bg: "bg-blue-400/10"   },
  teaching: { icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-400/10"},
  support:  { icon: Wrench,        color: "text-amber-400",   bg: "bg-amber-400/10"  },
};

// ─── Card Individual ─────────────────────────────────────────────────────────

function ExperienceCard({ item, index, side }: {
  item: ExperienceItem;
  index: number;
  side: "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [logoError, setLogoError] = useState(false);
  const TypeConfig = typeConfig[item.type];
  const showLogo = item.logo && !logoError;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex w-full min-w-0 ${side === "left" ? "justify-start pr-12 md:pr-24" : "justify-end pl-12 md:pl-24"}`}
    >
      {/* Conector até a linha central */}
      <div className={`absolute top-8 ${side === "left" ? "right-0 -mr-px" : "left-0 -ml-px"} w-12 md:w-24 h-px bg-gradient-to-r ${side === "left" ? "from-transparent to-border" : "from-border to-transparent"}`} />

      {/* Card — ocupa a largura disponível da coluna (sem max-width restritivo) */}
      <div className={`group relative w-full min-w-0 rounded-2xl border transition-all duration-300
        ${item.featured
          ? "border-border dark:border-white/20 bg-white dark:bg-transparent dark:bg-gradient-to-br dark:from-white/[0.07] dark:to-white/[0.03] shadow-sm dark:shadow-lg dark:shadow-black/30"
          : "border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-gray-300 dark:hover:border-white/15 shadow-sm dark:shadow-none"
        }`}
      >
        {/* Glow nos featured */}
        {item.featured && (
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/5 dark:from-blue-500/15 dark:to-violet-500/10 pointer-events-none" />
        )}

        <div className="relative p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">

            {/* Logo ou fallback */}
            <div className="shrink-0 w-11 h-11 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              {showLogo ? (
                <Image
                  src={item.logo!}
                  alt={`Logo ${item.company}`}
                  width={44}
                  height={44}
                  className="object-contain p-1.5"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Building2 size={20} className="text-gray-400 dark:text-white/30" aria-hidden />
              )}
            </div>

            {/* Título */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-foreground leading-tight">{item.company}</h3>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label={`Abrir site da ${item.company} em nova aba`}
                  >
                    <ExternalLink size={11} aria-hidden />
                  </a>
                )}
              </div>
              <p className={`text-xs mt-0.5 font-medium ${TypeConfig.color} break-words`}>{item.role}</p>
            </div>

            {/* Ícone de tipo */}
            <div className={`shrink-0 p-2 rounded-lg ${TypeConfig.bg}`}>
              <TypeConfig.icon size={14} className={TypeConfig.color} aria-hidden />
            </div>
          </div>

          {/* Badge featured */}
          {item.featured && item.featuredLabel && (
            <div className="flex items-center gap-1.5 mb-3 w-fit px-2.5 py-1 rounded-full
              bg-blue-50 dark:bg-transparent dark:bg-gradient-to-r dark:from-blue-500/20 dark:to-violet-500/20
              border border-blue-200 dark:border-blue-400/25 text-blue-700 dark:text-blue-300 text-[10px] font-semibold tracking-wide uppercase">
              <Shield size={9} aria-hidden />
              {item.featuredLabel}
            </div>
          )}

          {/* Descrição */}
          {item.description && (
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.description}</p>
          )}

          {/* Bullets */}
          {item.bullets && item.bullets.length > 0 && (
            <ul className="space-y-1.5 mb-3">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                  <span className="mt-[5px] shrink-0 w-1 h-1 rounded-full bg-gray-400 dark:bg-white/25" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-200 dark:border-white/5">
              {item.tags.map((tag) => (
                <span key={tag}
                  className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-500 dark:text-white/40 text-[10px] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Dot central na linha ────────────────────────────────────────────────────

function TimelineDot({ featured, period, index }: { featured?: boolean; period: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
    >
      {/* Período */}
      <span className="text-[10px] text-muted-foreground font-mono tracking-wider whitespace-nowrap hidden md:block">
        {period}
      </span>

      {/* Dot */}
      <div className={`relative flex items-center justify-center rounded-full transition-all
        ${featured
          ? "w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/30"
          : "w-5 h-5 bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20"
        }`}
      >
        {featured && <Star size={12} className="text-white relative z-10" fill="white" aria-hidden />}
        {!featured && <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white/40" aria-hidden />}

        {/* Glow pulse nos featured */}
        {featured && (
          <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping pointer-events-none -z-10" aria-hidden />
        )}
      </div>
    </motion.div>
  );
}

// ─── Componente Principal ─────────────────────────────────────────────────────

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  title?: string;
  subtitle?: string;
}

export default function ExperienceTimeline({ experiences, title = "Experiência", subtitle = "Minha trajetória profissional" }: ExperienceTimelineProps) {
  return (
    <section id="experiencia" className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-16" aria-labelledby="experience-title">
      <div className="max-w-6xl mx-auto">

        {/* Título da seção */}
        <div className="mb-12 md:mb-16">
          <h2 id="experience-title" className="text-2xl font-bold text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">

          {/* Linha vertical central */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" aria-hidden />

          {/* Itens */}
          <div className="flex flex-col gap-10">
            {experiences.map((item, index) => {
              const side = index % 2 === 0 ? "left" : "right";

              return (
                <div key={item.id} className="relative flex items-start md:gap-0">

                  {/* Lado esquerdo — card usa toda a largura da coluna */}
                  <div className={`hidden md:flex w-1/2 min-w-0 justify-start ${side === "left" ? "" : "opacity-0 pointer-events-none"}`}>
                    {side === "left" && (
                      <ExperienceCard item={item} index={index} side="left" />
                    )}
                  </div>

                  {/* Dot central */}
                  <TimelineDot featured={item.featured} period={item.period} index={index} />

                  {/* Lado direito — card usa toda a largura da coluna */}
                  <div className={`hidden md:flex w-1/2 min-w-0 justify-end ${side === "right" ? "" : "opacity-0 pointer-events-none"}`}>
                    {side === "right" && (
                      <ExperienceCard item={item} index={index} side="right" />
                    )}
                  </div>

                  {/* Mobile: todos empilhados */}
                  <div className="flex md:hidden w-full">
                    <ExperienceCard item={item} index={index} side="right" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
