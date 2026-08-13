import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import type { ArcGalleryItem } from "@/components/hero/arcGalleryData";

const ease = [0.22, 1, 0.36, 1] as const;

interface ArcGalleryModalProps {
  items: ArcGalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Editorial project-viewer overlay for the arc gallery. The clicked card's
 * `layoutId` continues into this modal's image, so Framer Motion animates the
 * shared element from its in-flow card position into the centred frame
 * (FLIP) instead of cross-fading two unrelated nodes.
 */
export function ArcGalleryModal({ items, activeIndex, onClose, onNavigate }: ArcGalleryModalProps) {
  const item = items[activeIndex];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((activeIndex - 1 + items.length) % items.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((activeIndex + 1) % items.length);
      }
    };
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [activeIndex, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4 backdrop-blur-[10px] md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Project viewer: ${item.title}`}
    >
      <button
        type="button"
        aria-label="Close project viewer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="group fixed top-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-transparent text-white transition-colors duration-300 hover:border-brand hover:text-brand md:top-8 md:right-8"
      >
        <span className="text-xl leading-none">&times;</span>
      </button>

      <button
        type="button"
        aria-label="Previous project"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex - 1 + items.length) % items.length);
        }}
        className="fixed top-1/2 left-3 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors duration-300 hover:border-brand hover:text-brand sm:flex md:left-6"
      >
        <span aria-hidden="true">&larr;</span>
      </button>
      <button
        type="button"
        aria-label="Next project"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex + 1) % items.length);
        }}
        className="fixed top-1/2 right-3 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors duration-300 hover:border-brand hover:text-brand sm:flex md:right-6"
      >
        <span aria-hidden="true">&rarr;</span>
      </button>

      <div
        className="flex max-h-full w-full max-w-[1400px] flex-col items-center gap-6 overflow-y-auto md:overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          layoutId={`arc-gallery-card-${activeIndex}`}
          transition={{ duration: 0.6, ease }}
          className="relative w-[90vw] max-w-[80vw] overflow-hidden rounded-[18px] bg-white/5 md:max-h-[70vh] md:w-auto md:rounded-[22px]"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={item.src}
              src={item.src}
              alt={item.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="max-h-[65vh] w-[90vw] max-w-[80vw] object-contain md:max-h-[70vh] md:w-auto"
            />
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.title + activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
            className="w-full max-w-[640px] px-1 pb-4 text-center md:pb-0 md:text-left"
          >
            <p className="label-xs text-brand">{item.category}</p>
            <h2 className="mt-3 text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-[38px]">
              {item.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60 md:text-[17px]">
              {item.description}
            </p>
            {item.year ? <p className="label-xs mt-4 text-white/35">{item.year}</p> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
