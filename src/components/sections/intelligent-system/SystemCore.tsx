import { motion, type MotionValue } from "motion/react";

import { CORE_INFO } from "@/components/sections/intelligent-system/data";

interface SystemCoreProps {
  /** Diameter as a fraction (0–1) of the canvas the core sits inside. */
  sizePct: number;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  onSelect: () => void;
  onEnter: () => void;
  reduced: boolean;
}

/**
 * Central MetisJean intelligence engine: a breathing blue core (subtle
 * scale/opacity loop, independent of scroll) with a tiny pulsing node at its
 * centre. Scroll only controls its initial reveal (opacity/scale below);
 * the breathing loop runs continuously once revealed.
 */
export function SystemCore({
  sizePct,
  opacity,
  scale,
  onSelect,
  onEnter,
  reduced,
}: SystemCoreProps) {
  return (
    <motion.button
      type="button"
      style={{
        opacity,
        scale,
        width: `${sizePct * 100}%`,
        height: `${sizePct * 100}%`,
      }}
      onClick={onSelect}
      onMouseEnter={onEnter}
      aria-label={`View: ${CORE_INFO.label} ${CORE_INFO.title}`}
      className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
    >
      <motion.span
        aria-hidden="true"
        animate={reduced ? false : { scale: [1, 1.03, 1], opacity: [0.95, 1, 0.95] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-full text-center text-white shadow-[0_0_0_1px_rgba(11,144,244,0.25)] transition-transform duration-300 group-hover:scale-105"
        style={{ background: "#0b90f4" }}
      >
        <span className="text-[15px] leading-tight font-medium tracking-[-0.01em] md:text-[19px]">
          {CORE_INFO.label}
        </span>
        <span className="label-xs text-white/75">{CORE_INFO.title}</span>
        <motion.span
          aria-hidden="true"
          animate={reduced ? false : { scale: [1, 1.6, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 size-[6px] rounded-full bg-white"
        />
      </motion.span>
    </motion.button>
  );
}
