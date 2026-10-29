import type { ReactNode } from "react";

/**
 * Static wrapper — kept as a drop-in for the layout call sites that used to
 * animate content into view on scroll. Renders its children in their final
 * state immediately; no motion, no scroll-triggered reveal.
 */
export function Reveal({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
