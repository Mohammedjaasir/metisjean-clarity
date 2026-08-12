type Props = {
  className?: string;
  tone?: "brand" | "white";
};

/**
 * MetisJean wordmark. Never distorted, re-kerned or shadowed —
 * rendered as plain type in the brand face at approved colours only.
 */
export function Wordmark({ className = "", tone = "brand" }: Props) {
  return (
    <span
      className={`inline-block font-medium tracking-[-0.02em] leading-none ${
        tone === "brand" ? "text-brand" : "text-white"
      } ${className}`}
    >
      MetisJean
    </span>
  );
}

export function Monogram({ className = "", tone = "brand" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center font-medium leading-none tracking-[-0.04em] ${
        tone === "brand" ? "text-brand" : "text-white"
      } ${className}`}
    >
      M
    </span>
  );
}
