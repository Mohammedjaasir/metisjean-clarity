type Props = {
  count?: number;
  className?: string;
  tone?: "solid" | "outline" | "white";
  origin?: "left" | "right";
};

/**
 * MetisJean key visual: parallel diagonal strips at a fixed angle.
 * Rules: Dodger Blue only, sharp corners, no gradients, no shadows,
 * no rounding of the angle, no added elements. Static — no entrance motion.
 */
export function StripeDecoration({
  count = 5,
  className = "",
  tone = "solid",
  origin = "left",
}: Props) {
  const bars = Array.from({ length: count });

  return (
    <div aria-hidden="true" className={`pointer-events-none flex gap-3 ${className}`}>
      {bars.map((_, i) => {
        const step = origin === "left" ? i : count - 1 - i;
        return (
          <span
            key={i}
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
