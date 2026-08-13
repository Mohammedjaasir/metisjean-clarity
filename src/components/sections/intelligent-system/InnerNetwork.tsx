import { motion, type MotionValue } from "motion/react";

interface InnerNetworkProps {
  center: number;
  innerRadius: number;
  revealOpacity: MotionValue<number>;
  reduced: boolean;
}

/** Deterministic angle/radius/timing per node — never random per render. */
const NODES = [
  { angle: 18, radiusFactor: 0.85, delay: 0 },
  { angle: 61, radiusFactor: 0.55, delay: 0.3 },
  { angle: 104, radiusFactor: 0.75, delay: 0.6 },
  { angle: 147, radiusFactor: 0.45, delay: 0.9 },
  { angle: 190, radiusFactor: 0.9, delay: 1.2 },
  { angle: 233, radiusFactor: 0.6, delay: 1.5 },
  { angle: 276, radiusFactor: 0.8, delay: 1.8 },
  { angle: 319, radiusFactor: 0.5, delay: 2.1 },
  { angle: 40, radiusFactor: 0.65, delay: 2.4 },
  { angle: 132, radiusFactor: 0.35, delay: 0.15 },
  { angle: 214, radiusFactor: 0.7, delay: 0.45 },
  { angle: 300, radiusFactor: 0.4, delay: 0.75 },
];

/** Nodes connect to their two angular neighbours, forming a light mesh. */
const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
  [8, 1],
  [9, 3],
  [10, 5],
  [11, 7],
];

function nodePoint(center: number, innerRadius: number, angle: number, radiusFactor: number) {
  const rad = (angle * Math.PI) / 180;
  const r = innerRadius * radiusFactor;
  return { x: center + r * Math.cos(rad), y: center + r * Math.sin(rad) };
}

/**
 * Small mesh of nodes living inside the innermost ring, giving the core an
 * "intelligence being processed" texture. Nodes pulse on independent
 * timers; edges are static thin lines following the mesh structure above
 * (never a random particle field).
 */
export function InnerNetwork({ center, innerRadius, revealOpacity, reduced }: InnerNetworkProps) {
  const points = NODES.map((n) => nodePoint(center, innerRadius, n.angle, n.radiusFactor));

  return (
    <motion.g style={{ opacity: revealOpacity }}>
      {EDGES.map(([a, b], i) => {
        const pa = points[a]!;
        const pb = points[b]!;
        return (
          <line
            key={i}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke="#0b90f4"
            strokeOpacity={0.18}
            strokeWidth={0.75}
          />
        );
      })}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={2}
          fill="#0b90f4"
          animate={reduced ? false : { opacity: [0.35, 0.9, 0.35], scale: [1, 1.4, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: NODES[i]!.delay,
          }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
    </motion.g>
  );
}
