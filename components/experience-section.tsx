"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { experiences as staticExperiences } from "@/data/experiences";
import type { ExperienceItem } from "@/components/ExperienceTimeline";

export function ExperienceSection() {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<ExperienceItem[]>(staticExperiences);

  useEffect(() => {
    fetch("/api/experiences")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: ExperienceItem[]) => {
        if (Array.isArray(data) && data.length > 0) setExperiences(data);
      })
      .catch(() => {
        // Mantém fallback estático se API falhar ou não estiver configurada
      });
  }, []);

  return (
    <ExperienceTimeline
      experiences={experiences}
      title={t("experience.title")}
      subtitle={t("experience.subtitle")}
    />
  );
}
