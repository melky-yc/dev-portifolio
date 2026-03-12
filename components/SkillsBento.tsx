"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Server,
  Globe,
  Smartphone,
  BookOpen,
  Shield,
  Database,
  GitBranch,
  Zap,
} from "lucide-react";
import { TechIcon } from "@/lib/tech-icons";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  featured?: boolean;
}

// ─── Stack de ícones de tecnologia (React Icons) ──────────────────────────────

const techStack = [
  "React",
  "Angular",
  "Next.js",
  "TypeScript",
  "Java",
  "Spring Boot",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Python",
  "Supabase",
  "Tailwind",
];

// ─── Card base ───────────────────────────────────────────────────────────────

function BentoCard({
  children,
  className = "",
  delay = 0,
  featured = false,
}: BentoCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`
        relative rounded-2xl overflow-hidden border p-4 sm:p-5 transition-all duration-300
        ${
          featured
            ? "border-gray-200 dark:border-white/20 bg-white dark:bg-transparent dark:bg-gradient-to-br dark:from-white/[0.07] dark:to-white/[0.03] shadow-sm dark:shadow-none"
            : "border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-gray-300 dark:hover:border-white/14 shadow-sm dark:shadow-none"
        }
        ${className}
      `}
    >
      {featured && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/5 dark:from-blue-500/10 dark:to-violet-500/8 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// ─── Ícone de tech (React Icons) ───────────────────────────────────────────────

function TechIconItem({ name }: { name: string }) {
  return (
    <div
      className="group flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8
        hover:border-gray-300 dark:hover:border-white/18 hover:bg-gray-200 dark:hover:bg-white/8 transition-all duration-200 cursor-default"
    >
      <div className="relative w-4 h-4 shrink-0 flex items-center justify-center [&_svg]:size-4 text-muted-foreground group-hover:text-foreground transition-colors">
        <TechIcon name={name} size={16} className="text-current" />
      </div>
      <span className="text-xs text-gray-600 dark:text-white/50 group-hover:text-gray-900 dark:group-hover:text-white/70 transition-colors font-medium">
        {name}
      </span>
    </div>
  );
}

// ─── Componente Principal ─────────────────────────────────────────────────────

interface SkillsBentoProps {
  title?: string;
  subtitle?: string;
}

export default function SkillsBento({
  title = "Habilidades",
  subtitle = "Tecnologias e o que construo com elas",
}: SkillsBentoProps) {
  return (
    <section
      id="habilidades"
      className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-16"
      aria-labelledby="skills-bento-title"
    >
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <div className="mb-10 md:mb-12">
          <h2
            id="skills-bento-title"
            className="text-2xl font-bold text-foreground sm:text-3xl"
          >
            {title}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
        </div>

        {/* Bento Grid: 2 cols mobile, 3 sm, 4 md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-auto">
          {/* ── Card 1: Destaque governamental (2x2) ── */}
          <BentoCard
            className="col-span-2 row-span-2 flex flex-col justify-between min-h-[240px]"
            delay={0}
            featured
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/20">
                  <Shield size={16} className="text-blue-400" aria-hidden />
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-400">
                  Nível Governamental
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground leading-snug mb-2 sm:text-xl">
                Sistemas em
                <br />
                produção real
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Desenvolvimento de software utilizado em operações do governo
                do estado do Piauí — com foco em robustez, segurança e
                conformidade institucional.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                aria-hidden
              />
              <span className="text-xs text-muted-foreground">
                Em produção · Fev 2026
              </span>
            </div>
          </BentoCard>

          {/* ── Card 2: Backend (1x1) ── */}
          <BentoCard className="col-span-1" delay={0.06}>
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/15 w-fit mb-3">
              <Server size={16} className="text-orange-400" aria-hidden />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Backend</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Java · Spring Boot · Node.js · REST APIs
            </p>
          </BentoCard>

          {/* ── Card 3: Frontend (1x1) ── */}
          <BentoCard className="col-span-1" delay={0.09}>
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/15 w-fit mb-3">
              <Globe size={16} className="text-cyan-400" aria-hidden />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Frontend</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              React · Angular · Next.js · TypeScript
            </p>
          </BentoCard>

          {/* ── Card 4: Mobile (1x1) ── */}
          <BentoCard className="col-span-1" delay={0.12}>
            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/15 w-fit mb-3">
              <Smartphone size={16} className="text-violet-400" aria-hidden />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Mobile</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              React Native · WebView · Android
            </p>
          </BentoCard>

          {/* ── Card 5: Ensino (1x1) ── */}
          <BentoCard className="col-span-1" delay={0.15}>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/15 w-fit mb-3">
              <BookOpen size={16} className="text-emerald-400" aria-hidden />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Docência</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Prof. em faculdade e escola técnica
            </p>
          </BentoCard>

          {/* ── Card 6: Stack de tecnologias (4 colunas) ── */}
          <BentoCard className="col-span-2 md:col-span-4" delay={0.18}>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Stack Técnico
            </p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <TechIconItem key={tech} name={tech} />
              ))}
            </div>
          </BentoCard>

          {/* ── Card 7: Banco de dados (1x1) ── */}
          <BentoCard className="col-span-1" delay={0.21}>
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/15 w-fit mb-3">
              <Database size={16} className="text-teal-400" aria-hidden />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Dados</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              PostgreSQL · MySQL · Supabase
            </p>
          </BentoCard>

          {/* ── Card 8: DevOps / Git (1x1) ── */}
          <BentoCard className="col-span-1" delay={0.24}>
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/15 w-fit mb-3">
              <GitBranch size={16} className="text-pink-400" aria-hidden />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">DevOps</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Git · Docker · GitLab · CI
            </p>
          </BentoCard>

          {/* ── Card 9: Soft skills (2x1) ── */}
          <BentoCard className="col-span-2" delay={0.27}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/15 shrink-0">
                <Zap size={16} className="text-amber-400" aria-hidden />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Comunicação Técnica
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Experiência em ensinar tecnologia para iniciantes e comunicar
                  decisões técnicas para equipes e stakeholders não-técnicos —
                  habilidade rara em devs.
                </p>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
