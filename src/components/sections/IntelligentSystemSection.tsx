import { AnimatePresence, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { BackgroundGrid } from "@/components/sections/intelligent-system/BackgroundGrid";
import { SystemCanvas } from "@/components/sections/intelligent-system/SystemCanvas";
import { MobileFlow } from "@/components/sections/intelligent-system/MobileFlow";
import { SectionProgress } from "@/components/sections/intelligent-system/SectionProgress";
import {
  SystemInfoPanel,
  type ActivePanel,
} from "@/components/sections/intelligent-system/SystemInfoPanel";
import {
  CORE_INFO,
  INPUT_NODES,
  OUTPUT_NODES,
  type EcosystemNode,
  type SystemStage,
} from "@/components/sections/intelligent-system/data";

/**
 * MetisJean intelligence ecosystem — the section's signature interactive
 * visualization. A tall (`h-[350vh]`) scroll-driven build-up: as the user
 * scrolls, the core appears, rings assemble, then input and output
 * ecosystems reveal from either side, then the connections between them
 * activate — the system "boots up" over the course of the scroll, then
 * runs continuously (breathing core, rotating rings, flowing particles)
 * once fully revealed. Hovering or clicking any node highlights its stage
 * across the whole diagram and opens a contextual info panel.
 */
export function IntelligentSystemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [activeStage, setActiveStage] = useState<SystemStage>(null);
  const [panel, setPanel] = useState<ActivePanel | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Route the scroll-linked opacity/transform MotionValues through one
  // identity transform first so Framer Motion's WAAPI "accelerate" fast path
  // (which hands non-normalized, non-1-terminated input ranges to the native
  // animation engine as literal keyframe offsets, mis-clamping past the end
  // of a range) never engages — every downstream useTransform then runs
  // Framer Motion's own JS interpolation, which clamps correctly.
  const progress = useTransform(rawProgress, (v) => v);

  return (
    <section id="intelligence-system" className="relative bg-white">
      <BackgroundGrid />

      <div ref={containerRef} className="relative mx-auto max-w-[1600px] px-[5vw] py-20 md:py-24">
        <div className="relative z-10 max-w-[640px] text-left">
          <p className="label-xs text-brand">Intelligent Transformation</p>
          <h2 className="mt-5 text-[32px] font-light leading-[1.1] tracking-[-0.025em] text-ink md:text-[48px]">
            From intelligence to <span className="font-medium text-brand">action.</span>
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
            MetisJean connects complex information, intelligent systems and automation to create
            measurable business impact.
          </p>
        </div>

        {reduced ? (
          <div className="relative mt-16 min-h-[70vh]">
            <StaticEcosystem onSelect={setPanel} />
            {panel ? <SystemInfoPanel panel={panel} onClose={() => setPanel(null)} /> : null}
          </div>
        ) : (
          <div className="relative mt-10 h-[350vh] md:mt-16">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
              <SystemCanvas
                progress={progress}
                activeStage={activeStage}
                onEnter={setActiveStage}
                onLeave={() => setActiveStage(null)}
                onSelect={setPanel}
                reduced={reduced}
              />
              <MobileFlow onSelect={setPanel} />
              <SectionProgress progress={progress} />

              <AnimatePresence>
                {panel ? <SystemInfoPanel panel={panel} onClose={() => setPanel(null)} /> : null}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="relative z-10 mx-auto mt-16 max-w-[760px] text-center md:mt-24">
          <p className="text-[22px] font-light leading-[1.3] tracking-[-0.02em] text-ink md:text-[30px]">
            Complexity becomes clarity when intelligence is connected to{" "}
            <span className="font-medium text-brand">action.</span>
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
            MetisJean brings the systems, intelligence and execution together.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Fully-revealed, non-animated ecosystem for prefers-reduced-motion. */
function StaticEcosystem({ onSelect }: { onSelect: (panel: ActivePanel) => void }) {
  const allNodes: EcosystemNode[] = [...INPUT_NODES, ...OUTPUT_NODES];

  return (
    <div className="mx-auto flex max-w-[900px] flex-col items-center gap-10">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {allNodes.map((node) => (
          <button
            key={node.key}
            type="button"
            onClick={() =>
              onSelect({
                category: node.label,
                title: node.label,
                description: node.description,
              })
            }
            aria-label={`View: ${node.label}`}
            className="flex items-center gap-2 text-left"
          >
            <span className="size-2 shrink-0 rounded-full bg-brand" />
            <span className="text-[13px] font-medium text-ink">{node.label}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          onSelect({
            category: CORE_INFO.label,
            title: CORE_INFO.title,
            description: CORE_INFO.description,
          })
        }
        aria-label={`View: ${CORE_INFO.label} ${CORE_INFO.title}`}
        className="flex size-[160px] flex-col items-center justify-center rounded-full text-center text-white"
        style={{ background: "#0b90f4" }}
      >
        <span className="text-[16px] font-medium tracking-[-0.01em]">{CORE_INFO.label}</span>
        <span className="label-xs mt-1 text-white/75">{CORE_INFO.title}</span>
      </button>
    </div>
  );
}
