"use client";

import { useTranslation } from "@/lib/i18n";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { experiences } from "@/data/experiences";

export function ExperienceSection() {
  const { t } = useTranslation();
  return (
    <ExperienceTimeline
      experiences={experiences}
      title={t("experience.title")}
      subtitle={t("experience.subtitle")}
    />
  );
}
