import { motion, type MotionValue } from "motion/react";

import type { RingDefinition, SystemStage } from "@/components/sections/intelligent-system/data";

interface SystemRingProps {
  ring: RingDefinition;
  center: number;
  maxRadius: number;
  activeStage: SystemStage;
  revealOpacity: MotionValue<number>;
  reduced: boolean;
}

/** Maps a ring key to the ecosystem stage it should highlight alongside. */
function stageForRing(key: RingDefinition["key"]): Exclude<SystemStage, null> {
  if (key === "intelligence") return "intelligence";
  if (key === "analysis") return "data";
  if (key === "automation") return "automation";
  return "impact";
}

/**
 * One rotating ring of the intelligence engine: a thin (solid or dashed)
 * circle carrying its stage label along a curved text path, plus a small
 * particle riding the ring when active. Rotation is a plain CSS animation
 * (independent per ring, alternating direction) — never React state.
 */
export function SystemRing({
  ring,
  center,
  maxRadius,
  activeStage,
  revealOpacity,
  reduced,
}: SystemRingProps) {
  const r = ring.radius * maxRadius;
  const isActive = activeStage === stageForRing(ring.key);
  const pathId = `isys-ring-path-${ring.key}`;

  return (
    <motion.g
      // Rotate around the ring's own centre, not the SVG origin.
      style={{ opacity: revealOpacity, transformOrigin: `${center}px ${center}px` }}
      animate={reduced ? false : { rotate: 360 * ring.direction }}
      transition={{ duration: ring.rotateSeconds, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke={isActive ? "#0b90f4" : "#d9dde3"}
        strokeWidth={isActive ? 1.5 : 1}
        strokeDasharray={ring.dashed ? "5 7" : undefined}
        strokeOpacity={isActive ? 0.9 : 0.55}
      />
      <defs>
        <path
          id={pathId}
          d={`M ${center} ${center - r} A ${r} ${r} 0 0 1 ${center + r} ${center}`}
          fill="none"
        />
      </defs>
      <text
        fill={isActive ? "#0b90f4" : "#9aa0a8"}
        className="text-[8px] tracking-[0.16em] uppercase"
      >
        <textPath href={`#${pathId}`} startOffset="4%">
          {ring.label}
        </textPath>
      </text>
      {isActive ? (
        <circle r={3} fill="#0b90f4">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={`M ${center} ${center - r} A ${r} ${r} 0 1 1 ${center - 0.01} ${center - r}`}
          />
        </circle>
      ) : null}
    </motion.g>
  );
}
