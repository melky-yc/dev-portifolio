"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone, Laptop, Tablet } from "lucide-react";
import { motion } from "framer-motion";
import type { DeviceType } from "@/lib/projects";
import { TagBadge } from "@/components/TagBadge";
import { tagCategoryStyles } from "@/lib/tag-categories";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ProjectCardEditorialProps {
  slug: string;
  title: string;
  description: string;
  logo?: string | null;
  tags?: string[];
  device?: DeviceType | null;
  accentColor?: string;
}

// ─── Device icon + estilo por categoria (alinhado ao sistema de tags) ─────────
const deviceMap: Record<
  DeviceType,
  { icon: React.ComponentType<{ size?: number }>; label: string }
> = {
  mobile: { icon: Smartphone, label: "Mobile App" },
  laptop: { icon: Laptop, label: "Web App" },
  tablet: { icon: Tablet, label: "Tablet App" },
};

const deviceBadgeStyle: Record<
  DeviceType,
  { label: string; bg: string; border: string; text: string }
> = {
  laptop: {
    label: "Web App",
    ...tagCategoryStyles.frontend,
  },
  mobile: {
    label: "Mobile App",
    ...tagCategoryStyles.mobile,
  },
  tablet: {
    label: "Tablet App",
    ...tagCategoryStyles.mobile,
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
export function ProjectCardEditorial({
  slug,
  title,
  description,
  logo,
  tags = [],
  device,
  accentColor = "#6366f1",
}: ProjectCardEditorialProps) {
  const DeviceInfo = device ? deviceMap[device] : null;
  const deviceBadge = device ? deviceBadgeStyle[device] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/7 bg-white dark:bg-[#111111] cursor-pointer transition-colors duration-300 hover:border-gray-300 dark:hover:border-white/14 shadow-sm dark:shadow-none"
    >
      {/* Glow de fundo com accentColor do projeto */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]"
        style={{
          background: `radial-gradient(ellipse at 30% 0%, ${accentColor}, transparent 70%)`,
        }}
      />

      {/* Borda de destaque no hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderColor: `${accentColor}30` }}
      />

      {/* ── Topo: tags + device ───────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-0 pt-4 sm:px-5 sm:pt-5 min-h-[40px]">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          {tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} size="sm" />
          ))}
          {tags.length > 3 && (
            <span className="md:hidden rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-2.5 py-1 text-[10px] font-medium text-gray-500 dark:text-white/40 shrink-0">
              +{tags.length - 3}
            </span>
          )}
          {tags.length > 3 &&
            tags.slice(3).map((tag) => (
              <span key={tag} className="hidden md:inline-flex">
                <TagBadge tag={tag} size="sm" />
              </span>
            ))}
        </div>

        {deviceBadge && DeviceInfo && (
          <span
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
            style={{
              background: deviceBadge.bg,
              borderColor: deviceBadge.border,
              color: deviceBadge.text,
            }}
          >
            <DeviceInfo.icon size={10} />
            {deviceBadge.label}
          </span>
        )}
      </div>

      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div className="px-4 pb-1 pt-4 sm:px-5 sm:pt-5">
        <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gray-200 dark:border-white/8 bg-gray-100 dark:bg-white/3">
          {logo ? (
            <Image
              src={logo}
              alt={`${title} logo`}
              fill
              className="h-full w-full object-cover"
              sizes="56px"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400 dark:text-white/20">
              {title.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* ── Conteúdo ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {title}
        </h3>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-1 border-t border-gray-200 dark:border-white/6 pt-4">
          <Link
            href={`/projects/${slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium transition-all duration-200"
          >
            <span
              style={{ color: accentColor }}
              className="transition-opacity group-hover/link:opacity-80"
            >
              Ver Projeto
            </span>
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
              style={{ color: accentColor }}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
