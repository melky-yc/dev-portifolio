"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export interface ImageGalleryProps {
  images: string[];
  projectName: string;
}

const lightboxVariants = {
  enter: { opacity: 0, scale: 0.92 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
};

export function ImageGallery({ images, projectName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setSelectedIndex(index), []);
  const close = useCallback(() => setSelectedIndex(null), []);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, close, goPrev, goNext]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => open(i)}
            className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src={src}
              alt={`${projectName} - imagem ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover rounded-xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40 opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100 flex items-center justify-center">
              <div className="rounded-full border border-gray-300 dark:border-white/15 bg-white/80 dark:bg-white/10 p-2.5 backdrop-blur-sm">
                <Maximize2 size={20} className="text-gray-900 dark:text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Galeria de imagens"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xl"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              variants={lightboxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative flex h-[85vh] max-h-[85vh] w-[90vw] max-w-[90vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]!}
                alt={`${projectName} - imagem ${selectedIndex + 1}`}
                fill
                sizes="90vw"
                className="rounded-xl object-contain"
              />
              <button
                type="button"
                onClick={close}
                className="absolute -top-2 -right-2 rounded-full bg-black/50 p-2 backdrop-blur-sm hover:bg-black/70"
                aria-label="Fechar"
              >
                <X size={20} className="text-white" />
              </button>
            </motion.div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 backdrop-blur-sm hover:bg-black/70"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={28} className="text-white" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 backdrop-blur-sm hover:bg-black/70"
                  aria-label="Próxima"
                >
                  <ChevronRight size={28} className="text-white" />
                </button>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70">
                  {selectedIndex + 1} / {images.length}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
