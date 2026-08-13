import { motion, useTransform, type MotionValue } from "motion/react";

const STAGES = [
  { label: "Core", range: [0.2, 0.4] as [number, number] },
  { label: "Rings", range: [0.4, 0.55] as [number, number] },
  { label: "Inputs", range: [0.55, 0.7] as [number, number] },
  { label: "Outputs", range: [0.7, 0.85] as [number, number] },
  { label: "Active", range: [0.85, 1.0] as [number, number] },
];

/**
 * Minimal vertical progress rail tracking which build-up stage the scroll
 * position has reached (core → rings → inputs → outputs → fully active).
 * Purely decorative confirmation of the "booting up" sequence in §19–20.
 */
export function SectionProgress({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute top-1/2 left-4 hidden -translate-y-1/2 flex-col gap-4 md:flex lg:left-8">
      {STAGES.map((stage) => (
        <ProgressDigit
          key={stage.label}
          label={stage.label}
          progress={progress}
          range={stage.range}
        />
      ))}
    </div>
  );
}

function ProgressDigit({
  label,
  progress,
  range,
}: {
  label: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;
  const color = useTransform(
    progress,
    [start - 0.02, start, end, end + 0.02],
    ["rgba(0,0,0,0.25)", "#0b90f4", "#0b90f4", "rgba(0,0,0,0.25)"],
  );
  return (
    <motion.span style={{ color }} className="label-xs tracking-[0.18em]">
      {label}
    </motion.span>
  );
}
