"use client";

import { useEffect, useState } from "react";
import { useTranslation, useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  projects as staticProjects,
  getProjectDescription,
  type Project,
} from "@/lib/projects";
import { ProjectCardEditorial } from "@/components/ProjectCardEditorial";

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export function ProjectsAll() {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: Project[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // fallback estático
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-16 pb-10 sm:pb-12 pt-16 sm:pt-20 md:pt-24">
        <Link
          href="/#projetos"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("project_page.back")}
        </Link>

        <motion.h1
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {t("projects.title")}
        </motion.h1>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {t("projects.subtitle")}
        </motion.p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridContainer}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <ProjectCardEditorial
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={getProjectDescription(project, locale)}
              logo={project.logo}
              tags={project.tags}
              device={project.devices?.[0]?.type ?? project.device}
              accentColor={project.accentColor}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
