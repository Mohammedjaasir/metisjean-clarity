import { useEffect, useRef } from "react";

import a1 from "@/assets/gallery/mj-1.jpg.asset.json";
import a2 from "@/assets/gallery/mj-2.jpg.asset.json";
import a3 from "@/assets/gallery/mj-3.jpg.asset.json";
import a4 from "@/assets/gallery/mj-4.jpg.asset.json";
import a5 from "@/assets/gallery/mj-5.jpg.asset.json";
import a6 from "@/assets/gallery/mj-6.jpg.asset.json";
import a7 from "@/assets/gallery/mj-7.jpg.asset.json";

const IMAGES = [
  { src: a1.url, alt: "A diverse team collaborating around a table in a modern office" },
  { src: a2.url, alt: "An executive reviewing data on a tablet by a window" },
  { src: a3.url, alt: "Abstract blue line visualisation of connected data" },
  { src: a4.url, alt: "Two colleagues mapping a system on a glass whiteboard" },
  { src: a5.url, alt: "Hands writing notes beside a laptop in natural light" },
  { src: a6.url, alt: "Daylight falling through a modern glass office corridor" },
  { src: a7.url, alt: "A person walking through a bright minimal lobby" },
];

/** Duration of one full traversal of the arc, in ms. */
const CYCLE = 34000;

/**
 * Continuous curved image wall. Cards travel along a wide arc, rotating and
 * scaling as they pass the centre — choreographed, seamless, GPU-only.
 */
export function ArcGallery() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const start = performance.now();
    const n = IMAGES.length;

    const layout = (now: number) => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const elapsed = reduced ? CYCLE * 0.5 : now - start;
      const t = (elapsed % CYCLE) / CYCLE;

      // Arc geometry: cards sit lower and tilt more the further they are from centre.
      const spread = 1.32; // portion of the arc visible across the viewport
      const depth = Math.min(h * 0.42, 250);
      const maxTilt = 26;

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let p = (t + i / n) % 1; // 0 → 1 travel from left to right
        p = (p * 1.3) - 0.15; // overscan so cards enter/leave clipped

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

      if (!reduced) raf = requestAnimationFrame(layout);
    };

    raf = requestAnimationFrame(layout);
    const onResize = () => layout(performance.now());
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
          className="absolute top-[6%] left-0 h-[62%] w-[38vw] max-w-[290px] min-w-[150px] overflow-hidden rounded-[18px] bg-white/5 will-change-transform sm:h-[72%] md:rounded-[22px]"
          style={{ transform: "translate3d(-9999px,0,0)" }}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading={i < 3 ? "eager" : "lazy"}
            width={768}
            height={1024}
            className="h-full w-full object-cover"
          />
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
    </div>
  );
}
