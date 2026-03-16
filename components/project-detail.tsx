"use client";

import { useEffect, useState } from "react";
import { useTranslation, useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/TagBadge";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ClipboardList,
  ScanFace,
  FileSpreadsheet,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import {
  getProjectDescription,
  getProjectLongDescription,
  type Project,
} from "@/lib/projects";
import { DeviceMockup } from "@/components/DeviceMockup";
import { ImageGallery } from "@/components/ImageGallery";

const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "taskflow-reports": ClipboardList,
  "confere-ai": ScanFace,
  "acad-sheet": FileSpreadsheet,
  "duofinance": Smartphone,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function ProjectDetail({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/projects/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: Project) => {
        setProject(data);
      })
      .catch(() => {
        setProject(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-indigo-500" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">{t("project_page.not_found")}</p>
      </div>
    );
  }

  const description = getProjectDescription(project, locale);
  const longDescription = getProjectLongDescription(project, locale);
  const hasMockup = !!(project.devices?.length || (project.device && project.screenshots?.length));
  const hasGallery = (project.gallery?.length ?? 0) > 0;

  const Icon = projectIcons[slug] || ClipboardList;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-10 sm:py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("project_page.back")}
          </Link>
        </motion.div>

        {hasMockup && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-8"
          >
            <DeviceMockup project={project} />
          </motion.div>
        )}

        {!hasMockup && (
          <motion.div
            className="relative mt-8 flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-secondary"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {project.logo ? (
              <Image
                src={project.logo}
                alt={`Preview do projeto ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain rounded-xl p-8"
                priority
              />
            ) : (
              <Icon className="h-20 w-20 text-muted-foreground" />
            )}
          </motion.div>
        )}

        <motion.h1
          className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {project.title}
        </motion.h1>

        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {project.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} size="md" />
          ))}
        </motion.div>

        {(project.github || project.demo) && (
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {project.github && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  {t("project_page.github")}
                </a>
              </Button>
            )}
            {project.demo && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("project_page.demo")}
                </a>
              </Button>
            )}
          </motion.div>
        )}

        <motion.div
          className="mt-12"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <h2 className="text-lg font-semibold text-foreground">
            {t("project_page.overview")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {longDescription}
          </p>
        </motion.div>

        {hasGallery && (
          <motion.div
            className="mt-12"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={10}
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              {t("project_page.gallery")}
            </h2>
            <ImageGallery
              images={project.gallery!}
              projectName={project.title}
            />
          </motion.div>
        )}

        <motion.div
          className="mt-16 border-t border-border pt-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={11}
        >
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("project_page.back")}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
