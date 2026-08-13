import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export interface ActivePanel {
  category: string;
  title: string;
  description: string;
}

interface SystemInfoPanelProps {
  panel: ActivePanel;
  onClose: () => void;
}

/**
 * Floating contextual card shown when a node or the core is clicked. Fixed
 * near the bottom of the visualization rather than anchored to the clicked
 * element, so it never collides with the (continuously rotating) diagram.
 */
export function SystemInfoPanel({ panel, onClose }: SystemInfoPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.35, ease }}
      role="dialog"
      aria-label={panel.title}
      className="absolute bottom-6 left-1/2 z-20 w-[calc(100%-2rem)] max-w-[380px] -translate-x-1/2 overflow-hidden rounded-[20px] border border-[#e5e7eb] bg-white shadow-[0_24px_70px_-20px_rgba(0,0,0,0.18)]"
    >
      <div className="h-[3px] w-full" style={{ background: "#0b90f4" }} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label-xs text-brand">{panel.category}</p>
            <p className="mt-2 text-[17px] font-medium tracking-[-0.01em] text-ink">
              {panel.title}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              {panel.description}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="shrink-0 text-lg leading-none text-faint transition-colors duration-300 hover:text-brand"
          >
            &times;
          </button>
        </div>
        <a
          href="#contact"
          className="group mt-4 inline-flex items-baseline gap-2 text-[13px] font-medium tracking-[0.02em] text-brand transition-colors duration-300 hover:text-ink"
        >
          Explore
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-500 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </a>
      </div>
    </motion.div>
  );
}
