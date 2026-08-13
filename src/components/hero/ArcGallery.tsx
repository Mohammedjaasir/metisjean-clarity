import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ARC_GALLERY_ITEMS } from "@/components/hero/arcGalleryData";
import { ArcGalleryModal } from "@/components/hero/ArcGalleryModal";

const IMAGES = ARC_GALLERY_ITEMS;

/** Duration of one full traversal of the arc, in ms. */
const CYCLE = 34000;

/**
 * Continuous curved image wall. Cards travel along a wide arc, rotating and
 * scaling as they pass the centre — choreographed, seamless, GPU-only.
 *
 * Clicking a card freezes the arc in place (isPaused) and expands that card,
 * via a shared `layoutId`, into a full project-viewer modal. Closing the
 * modal resumes the arc from the same elapsed offset rather than restarting.
 */
export function ArcGallery() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isPaused = activeIndex !== null;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let frozenAt: number | null = null;
    const start = performance.now();
    const n = IMAGES.length;

    const layout = (now: number) => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const clock = isPaused ? (frozenAt ??= now) : now;
      const elapsed = reduced ? CYCLE * 0.5 : clock - start;
      const t = (elapsed % CYCLE) / CYCLE;

      // Arc geometry: cards sit lower and tilt more the further they are from centre.
      const spread = 1.32; // portion of the arc visible across the viewport
      const depth = Math.min(h * 0.42, 250);
      const maxTilt = 26;

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let p = (t + i / n) % 1; // 0 → 1 travel from left to right
        p = p * 1.3 - 0.15; // overscan so cards enter/leave clipped

        const theta = (p - 0.5) * spread * Math.PI;
        const x = p * w;
        const y = depth * (1 - Math.cos(theta * 0.62)) * 1.35;
        const tilt = (p - 0.5) * 2 * maxTilt;
        const centreness = 1 - Math.min(Math.abs(p - 0.5) * 2, 1);
        const scale = 0.82 + centreness * 0.24;
        const opacity = Math.max(0, Math.min(1, 1.25 - Math.abs(p - 0.5) * 1.9));

        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, 0) rotate(${tilt}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(10 + Math.round(centreness * 20));
      }

      if (!reduced && !isPaused) raf = requestAnimationFrame(layout);
    };

    raf = requestAnimationFrame(layout);
    const onResize = () => layout(performance.now());
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [isPaused]);

  const openAt = (i: number) => setActiveIndex(i);
  const close = () => setActiveIndex(null);

  return (
    <div
      ref={wrapRef}
      aria-hidden="false"
      role="img"
      aria-label="A moving wall of MetisJean project and collaboration imagery"
      className="relative h-full w-full overflow-hidden"
    >
      {IMAGES.map((img, i) => (
        <div
          key={img.src}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="absolute top-[6%] left-0 h-[62%] w-[38vw] max-w-[290px] min-w-[150px] will-change-transform"
          style={{ transform: "translate3d(-9999px,0,0)" }}
        >
          <motion.div
            layoutId={`arc-gallery-card-${i}`}
            className="group h-full w-full cursor-pointer overflow-hidden rounded-[18px] bg-white/5 md:rounded-[22px]"
            style={{ visibility: activeIndex === i ? "hidden" : "visible" }}
            whileHover={{ scale: 1.035 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => openAt(i)}
            tabIndex={0}
            role="button"
            aria-label={`View project: ${img.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openAt(i);
              }
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i < 3 ? "eager" : "lazy"}
              width={768}
              height={1024}
              className="h-full w-full object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-110"
            />
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="label-xs mb-4 flex items-center gap-1.5 text-white">
                View project <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </motion.div>
        </div>
      ))}

      {/* Curved dark mask swallowing the bottom of the arc */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[46%] left-1/2 h-[70%] w-[150%] -translate-x-1/2 rounded-[50%] bg-black"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"
      />

      <AnimatePresence>
        {activeIndex !== null ? (
          <ArcGalleryModal
            items={IMAGES}
            activeIndex={activeIndex}
            onClose={close}
            onNavigate={setActiveIndex}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
