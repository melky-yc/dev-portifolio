"use client";

import Image from "next/image";
import { Smartphone, Laptop, Tablet, Monitor } from "lucide-react";
import type { ProjectDevice } from "@/lib/projects";

const deviceConfig: Record<
  ProjectDevice,
  { icon: React.ComponentType<{ size?: number }>; label: string }
> = {
  mobile: { icon: Smartphone, label: "Mobile" },
  laptop: { icon: Laptop, label: "Web" },
  tablet: { icon: Tablet, label: "Tablet" },
  web: { icon: Monitor, label: "Web" },
};

const ACCENT_GRADIENTS: readonly string[] = [
  "linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2))",
  "linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(126, 34, 206, 0.2))",
  "linear-gradient(to bottom right, rgba(16, 185, 129, 0.2), rgba(13, 148, 136, 0.2))",
  "linear-gradient(to bottom right, rgba(244, 63, 94, 0.2), rgba(219, 39, 119, 0.2))",
  "linear-gradient(to bottom right, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))",
  "linear-gradient(to bottom right, rgba(14, 165, 233, 0.2), rgba(79, 70, 229, 0.2))",
];

function getAccentGradient(projectName: string): string {
  const index = (projectName?.charCodeAt(0) ?? 0) % ACCENT_GRADIENTS.length;
  return ACCENT_GRADIENTS[index];
}

export interface ProjectCardThumbnailProps {
  /** Path completo da logo (ex: "/projects/taskflow-logo.png"). Null = fallback com iniciais. */
  logo: string | null;
  /** Nome do projeto (para iniciais e alt). */
  projectName: string;
  /** Device opcional para o badge. */
  device?: ProjectDevice | null;
}

export function ProjectCardThumbnail({
  logo,
  projectName,
  device,
}: ProjectCardThumbnailProps) {
  const accentGradient = getAccentGradient(projectName);
  const DeviceConfig = device ? deviceConfig[device] : null;

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-t-xl bg-[#0f0f0f]">
      {/* Gradiente de fundo sutil baseado no projeto */}
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: accentGradient }}
      />

      {/* Grid pattern decorativo */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow central */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {logo ? (
          <div className="relative h-full w-full max-h-[110px] max-w-[260px] overflow-hidden rounded-xl">
            <Image
              src={logo}
              alt={`${projectName} logo`}
              fill
              sizes="(max-width: 640px) 260px, 260px"
              className="object-contain object-center drop-shadow-lg rounded-xl"
            />
          </div>
        ) : (
          <span className="select-none text-4xl font-bold tracking-widest text-white/20">
            {projectName?.slice(0, 2).toUpperCase() ?? "??"}
          </span>
        )}
      </div>

      {/* Badge de device (canto inferior direito) */}
      {DeviceConfig && (
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md">
            <DeviceConfig.icon size={11} />
            <span>{DeviceConfig.label}</span>
          </div>
        </div>
      )}

      {/* Gradiente de fade na base */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#111] to-transparent" />
    </div>
  );
}
