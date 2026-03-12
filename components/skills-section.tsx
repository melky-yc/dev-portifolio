"use client";

import { useTranslation } from "@/lib/i18n";
import SkillsBento from "@/components/SkillsBento";

export function SkillsSection() {
  const { t } = useTranslation();
  return (
    <SkillsBento
      title={t("skills.title")}
      subtitle={t("skills.subtitle")}
    />
  );
}
