import { motion } from "motion/react";

type Props = {
  count?: number;
  className?: string;
  tone?: "solid" | "outline" | "white";
  origin?: "left" | "right";
  animate?: boolean;
};

/**
 * MetisJean key visual: parallel diagonal strips at a fixed angle.
 * Rules: Dodger Blue only, sharp corners, no gradients, no shadows,
 * no rounding of the angle, no added elements.
 */
export function StripeDecoration({
  count = 5,
  className = "",
  tone = "solid",
  origin = "left",
  animate = true,
}: Props) {
  const bars = Array.from({ length: count });

  return (
    <div aria-hidden="true" className={`pointer-events-none flex gap-3 ${className}`}>
      {bars.map((_, i) => {
        const step = origin === "left" ? i : count - 1 - i;
        return (
          <motion.span
            key={i}
            initial={animate ? { opacity: 0, x: origin === "left" ? -40 : 40 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: step * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="stripe-angle block h-full w-[10px] shrink-0 md:w-[14px]"
            style={{
              height: `${58 + step * 14}%`,
              alignSelf: origin === "left" ? "flex-start" : "flex-end",
              background: tone === "solid" ? "var(--brand)" : "transparent",
              border:
                tone === "solid"
                  ? "none"
                  : `1px solid ${tone === "white" ? "#ffffff" : "var(--brand)"}`,
            }}
          />
        );
      })}
    </div>
  );
}
