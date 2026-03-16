"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Tablet, Laptop, type LucideIcon } from "lucide-react";
import type { Project, DeviceType } from "@/lib/projects";

const deviceConfig: Record<
  DeviceType,
  { icon: LucideIcon; label: string }
> = {
  mobile: { icon: Smartphone, label: "Mobile" },
  tablet: { icon: Tablet, label: "Tablet" },
  laptop: { icon: Laptop, label: "Desktop" },
};

// ─── Phone Mockup ────────────────────────────────────────────────────────────
function PhoneMockup({
  screenshot,
  alt,
  priority,
}: {
  screenshot: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[260px] h-[530px] rounded-[44px] border-2 border-[#3a3a3a] bg-[#1a1a1a] overflow-hidden flex flex-col items-center shadow-[0_0_0_1px_#0a0a0a,0_30px_80px_rgba(0,0,0,0.6),inset_0_0_0_1px_#2a2a2a]">
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0a0a0a] rounded-[50px] z-10" />
        <div className="absolute inset-1.5 rounded-[38px] overflow-hidden bg-black relative">
          <Image
            src={screenshot}
            alt={alt}
            fill
            sizes="260px"
            className="object-contain rounded-[36px]"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            draggable={false}
          />
        </div>
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-white/35 rounded-[10px] z-10" />
      </div>
    </div>
  );
}

// ─── Laptop Mockup ───────────────────────────────────────────────────────────
function LaptopMockup({
  screenshot,
  alt,
  priority,
}: {
  screenshot: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="flex flex-col items-center max-md:scale-[0.8] max-md:origin-center">
      <div className="w-[560px] max-w-[100vw] bg-[#1e1e1e] rounded-t-xl border-2 border-[#3a3a3a] border-b-0 p-3.5 pt-3 pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.4),inset_0_0_0_1px_#2a2a2a]">
        <div className="relative bg-[#0a0a0a] rounded-md overflow-hidden">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#333] rounded-full z-[5]" />
          {/* Usa proporção 16:9 para encaixar screenshots 1920x1080 sem cortes */}
          <div className="w-full aspect-video overflow-hidden rounded-md bg-black relative">
            <Image
              src={screenshot}
              alt={alt}
              fill
              sizes="(max-width: 768px) 448px, 560px"
              className="object-contain rounded-md"
              priority={priority}
              loading={priority ? undefined : "lazy"}
              draggable={false}
            />
          </div>
        </div>
      </div>
      <div className="w-[600px] max-w-[105vw] h-[18px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-md border-2 border-[#3a3a3a] border-t border-[#444] flex justify-center items-center">
        <div className="w-20 h-2 bg-white/[0.06] rounded border border-white/[0.08]" />
      </div>
      <div className="w-[580px] max-w-[102vw] h-2.5 mt-0.5 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)]" />
    </div>
  );
}

// ─── Tablet Mockup ────────────────────────────────────────────────────────────
function TabletMockup({
  screenshot,
  alt,
  priority,
}: {
  screenshot: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="flex justify-center">
      <div className="relative w-[340px] h-[460px] rounded-[26px] border-2 border-[#3a3a3a] bg-[#1a1a1a] overflow-hidden flex justify-center items-center shadow-[0_0_0_1px_#0a0a0a,0_30px_80px_rgba(0,0,0,0.5),inset_0_0_0_1px_#2a2a2a]">
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#333] rounded-full z-10" />
        <div className="absolute inset-2.5 rounded-[18px] overflow-hidden bg-black relative">
          <Image
            src={screenshot}
            alt={alt}
            fill
            sizes="340px"
            className="object-contain rounded-[16px]"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            draggable={false}
          />
        </div>
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[60px] h-[3px] bg-white/30 rounded-[10px] z-10" />
      </div>
    </div>
  );
}

export interface DeviceMockupProps {
  project: Project;
}

export function DeviceMockup({ project }: DeviceMockupProps) {
  const isMultiDevice = (project.devices?.length ?? 0) > 1;
  const [activeDeviceIndex, setActiveDeviceIndex] = useState(0);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const currentDevice = isMultiDevice
    ? project.devices![activeDeviceIndex]
    : project.devices?.[0] ?? (project.device && project.screenshots
        ? { type: project.device, screenshots: project.screenshots }
        : null);

  if (!currentDevice?.screenshots?.length) return null;

  const screenshots = currentDevice.screenshots;
  const totalScreenshots = screenshots.length;
  const currentScreenshot = screenshots[activeScreenshot]!;
  const deviceType = currentDevice.type;
  const { icon: DeviceIcon, label } = deviceConfig[deviceType];

  const navigate = useCallback(
    (dir: "left" | "right") => {
      setDirection(dir);
      setActiveScreenshot((prev) =>
        dir === "right"
          ? (prev + 1) % totalScreenshots
          : (prev - 1 + totalScreenshots) % totalScreenshots
      );
    },
    [totalScreenshots]
  );

  const handleDeviceSelect = useCallback((i: number) => {
    setActiveDeviceIndex(i);
    setActiveScreenshot(0);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 py-6 px-4 md:py-8 rounded-2xl bg-[radial-gradient(ellipse_at_center_top,rgba(0,0,0,0.03)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center_top,rgba(255,255,255,0.04)_0%,transparent_60%)] border border-gray-200 dark:border-white/5 backdrop-blur-sm">
      {isMultiDevice ? (
        <div className="flex flex-wrap justify-center gap-2">
          {project.devices!.map((d, i) => {
            const { icon: Icon, label: l } = deviceConfig[d.type];
            const isActive = activeDeviceIndex === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleDeviceSelect(i)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ease-out ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground"
                }`}
              >
                <Icon size={15} />
                <span>{l}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-muted-foreground bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full">
          <DeviceIcon size={14} className="opacity-80" />
          <span>{label}</span>
        </div>
      )}

      <div className="relative flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDeviceIndex}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex justify-center"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${activeDeviceIndex}-${activeScreenshot}`}
                custom={direction}
                variants={{
                  enter: (dir: "left" | "right") => ({
                    opacity: 0,
                    x: dir === "right" ? 20 : -20,
                  }),
                  center: { opacity: 1, x: 0 },
                  exit: (dir: "left" | "right") => ({
                    opacity: 0,
                    x: dir === "right" ? -20 : 20,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex justify-center"
              >
                {deviceType === "mobile" && (
                  <PhoneMockup
                    screenshot={currentScreenshot}
                    alt={`${project.title} — tela ${activeScreenshot + 1}`}
                    priority={activeScreenshot === 0}
                  />
                )}
                {deviceType === "tablet" && (
                  <TabletMockup
                    screenshot={currentScreenshot}
                    alt={`${project.title} — tela ${activeScreenshot + 1}`}
                    priority={activeScreenshot === 0}
                  />
                )}
                {deviceType === "laptop" && (
                  <LaptopMockup
                    screenshot={currentScreenshot}
                    alt={`${project.title} — tela ${activeScreenshot + 1}`}
                    priority={activeScreenshot === 0}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {totalScreenshots > 1 && (
        <>
          <div className="flex items-center gap-4 mt-2">
            <button
              type="button"
              onClick={() => navigate("left")}
              className="w-9 h-9 rounded-full border border-border bg-card text-muted-foreground flex items-center justify-center transition-all hover:bg-primary/15 hover:border-primary/40 hover:text-primary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Anterior"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="flex gap-2 items-center">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (i === activeScreenshot) return;
                    setDirection(i > activeScreenshot ? "right" : "left");
                    setActiveScreenshot(i);
                  }}
                  className={`h-1.5 rounded-full border-0 cursor-pointer transition-all duration-300 ${
                    i === activeScreenshot
                      ? "w-5 bg-primary rounded-[10px] shadow-[0_0_8px_var(--primary)]"
                      : "w-1.5 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/30"
                  }`}
                  aria-label={`Ir para tela ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate("right")}
              className="w-9 h-9 rounded-full border border-border bg-card text-muted-foreground flex items-center justify-center transition-all hover:bg-primary/15 hover:border-primary/40 hover:text-primary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Próxima"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <p className="text-xs text-muted-foreground tracking-wide m-0">
            {activeScreenshot + 1} / {totalScreenshots}
          </p>
        </>
      )}
    </div>
  );
}
