import { motion, type MotionValue } from "motion/react";

interface ConnectionPathProps {
  /** SVG path `d` attribute — a cubic Bezier from a node to (or from) the core. */
  d: string;
  isActive: boolean;
  revealOpacity: MotionValue<number>;
  particleDelay: number;
  reduced: boolean;
}

/**
 * One curved connection between an input/output node and the core: a static
 * grey base line plus a brighter blue overlay that fades in on hover/active,
 * and a small particle riding the same path continuously.
 */
export function ConnectionPath({
  d,
  isActive,
  revealOpacity,
  particleDelay,
  reduced,
}: ConnectionPathProps) {
  return (
    <motion.g style={{ opacity: revealOpacity }}>
      <path d={d} fill="none" stroke="#e2e4e8" strokeWidth={1} />
      <motion.path
        d={d}
        fill="none"
        stroke="#0b90f4"
        strokeWidth={1.5}
        animate={{ opacity: isActive ? 0.9 : 0.15 }}
        transition={{ duration: 0.3 }}
      />
      {!reduced ? (
        <circle r={3} fill="#0b90f4" opacity={isActive ? 1 : 0.5}>
          <animateMotion dur="2.6s" begin={`${particleDelay}s`} repeatCount="indefinite" path={d} />
        </circle>
      ) : null}
    </motion.g>
  );
}
