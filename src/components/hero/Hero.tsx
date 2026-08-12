import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ParticleField } from "./ParticleField";
import { Navbar } from "../Navbar";

const SLIDES = [
  { lead: "Bring order to", plain: "", emphasis: "complexity.", topic: "Complexity" },
  {
    lead: "Make",
    emphasis: "intelligence-led decisions",
    plain: "and act on them instantly.",
    topic: "Intelligence",
  },
  {
    lead: "The global standard for",
    emphasis: "intelligent automation.",
    plain: "",
    topic: "Automation",
  },
  {
    lead: "Guiding you through",
    emphasis: "technology transformation.",
    plain: "",
    topic: "Transformation",
  },
] as const;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500);
    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[index]!;

  return (
    <div id="top" className="px-3 pt-3 pb-6 md:px-[3vw] md:pt-[2vh]">
      <div className="mx-auto w-full max-w-[1450px] rounded-[24px] border border-hairline flex flex-col bg-panel md:min-h-[88vh] md:rounded-[38px]">
        <Navbar />

        <div className="grid flex-1 grid-cols-1 items-stretch gap-8 px-6 pt-4 pb-10 md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] md:gap-4 md:px-12 md:pb-14 lg:px-20">
          <div className="order-2 flex h-full flex-col justify-center gap-16 md:order-1 md:justify-between md:gap-8 md:pt-[12vh] md:pb-[4vh]">
            <div>
            <h1 className="max-w-[560px] text-[38px] font-light leading-[1.14] tracking-[-0.025em] text-ink sm:text-[48px] md:text-[58px] lg:text-[66px]">

              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {slide.lead}{" "}
                  <span className="font-medium">{slide.emphasis}</span>
                  {slide.plain ? <> {slide.plain}</> : null}
                </motion.span>
              </AnimatePresence>
            </h1>

            <div
              className="mt-10 flex items-center gap-3"
              role="tablist"
              aria-label="Hero messages"
            >
              {SLIDES.map((s, i) => (
                <button
                  key={s.topic}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.topic}
                  onClick={() => setIndex(i)}
                  className="flex size-6 items-center justify-center"
                >
                  <span
                    className={`block size-[8px] rounded-full border transition-all duration-500 ${
                      i === index
                        ? "border-ink bg-ink"
                        : "border-faint bg-transparent hover:border-brand"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-2 gap-8 md:pt-10 md:max-w-[520px]">
              <div>
                <p className="label-xs">Thoughts</p>
                <a
                  href="#insights"
                  className="mt-2 inline-block text-[15px] text-ink transition-colors duration-300 hover:text-brand"
                >
                  Explore our perspective
                </a>
              </div>
              <div>
                <p className="label-xs">Insights</p>
                <a
                  href="#insights"
                  className="mt-2 inline-block text-[15px] text-ink transition-colors duration-300 hover:text-brand"
                >
                  Intelligence that drives action
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 h-[300px] w-full sm:h-[420px] md:order-2 md:h-auto md:min-h-[460px]">
            <ParticleField variant={index} />
          </div>
        </div>
      </div>
    </div>
  );
}
