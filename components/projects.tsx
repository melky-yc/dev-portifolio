"use client";

import { useEffect, useState } from "react";
import { useTranslation, useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  projects as staticProjects,
  getProjectDescription,
  type Project,
} from "@/lib/projects";
import { ProjectCardEditorial } from "@/components/ProjectCardEditorial";

const sectionHeader = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export function Projects() {
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
        // mantém fallback estático se API falhar
      });
  }, []);

  return (
    <section
      id="projetos"
      className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 md:py-24"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-left"
        >
          <div className="mb-12 md:mb-16">
            <h2
              id="projects-title"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              {t("projects.title")}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t("projects.subtitle")}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <ProjectCardEditorial
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={getProjectDescription(project, locale)}
              tags={project.tags}
              logo={project.logo}
              device={project.devices?.[0]?.type ?? project.device}
              accentColor={project.accentColor}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/projects/all">
              <LayoutGrid className="h-4 w-4" />
              {t("projects.view_all")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
