import { useEffect, useRef, useState } from "react";
import { type MotionValue, motion, useScroll, useTransform } from "motion/react";

import { JOURNEY_WORDS, type JourneyWord } from "@/components/hero/typographicJourneyData";

/**
 * Scroll timeline (fraction of the section's total scroll distance):
 *  0.00–0.20  intro sentence: "FROM COMPLEXITY TO CLARITY."
 *  0.20–0.40  COMPLEXITY scatters into individual letters
 *  0.40–0.55  letters drift back toward centre (reorganizing)
 *  0.55–0.65  CLARITY assembled, held
 *  0.65–0.75  INTELLIGENCE
 *  0.75–0.85  AUTOMATION
 *  0.85–0.93  EXECUTION
 *  0.93–1.00  TRANSFORMATION, then the MetisJean closing message
 */
const PHASE_RANGES: Array<[number, number]> = [
  [0.2, 0.4], // COMPLEXITY scatter/hold (word 0)
  [0.4, 0.65], // CLARITY assembles (word 1)
  [0.65, 0.75], // INTELLIGENCE (word 2)
  [0.75, 0.85], // AUTOMATION (word 3)
  [0.85, 0.93], // EXECUTION (word 4)
  [0.93, 1.0], // TRANSFORMATION (word 5)
];

interface LetterProps {
  char: string;
  offset: { x: number; y: number; rotate: number };
  progress: MotionValue<number>;
  scatterStart: number;
  scatterPeak: number;
  assembleEnd: number;
  colorClass: string;
  reduced: boolean;
}

/**
 * One character of a breaking/reassembling word. `progress` is the section's
 * 0–1 scrollYProgress; each letter maps that single MotionValue through its
 * own deterministic x/y/rotate/opacity/blur curve — no per-frame React state,
 * everything stays on Framer Motion's transform pipeline.
 */
function Letter({
  char,
  offset,
  progress,
  scatterStart,
  scatterPeak,
  assembleEnd,
  colorClass,
  reduced,
}: LetterProps) {
  const x = useTransform(progress, [scatterStart, scatterPeak, assembleEnd], [0, offset.x, 0]);
  const y = useTransform(progress, [scatterStart, scatterPeak, assembleEnd], [0, offset.y, 0]);
  const rotate = useTransform(
    progress,
    [scatterStart, scatterPeak, assembleEnd],
    [0, offset.rotate, 0],
  );
  const scale = useTransform(progress, [scatterStart, scatterPeak, assembleEnd], [1, 0.82, 1]);
  const opacity = useTransform(
    progress,
    [scatterStart, (scatterStart + scatterPeak) / 2, scatterPeak, assembleEnd],
    [1, 0.9, 0.35, 1],
  );
  const blur = useTransform(progress, [scatterStart, scatterPeak, assembleEnd], [0, 3, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  if (reduced) {
    return <span className={colorClass}>{char}</span>;
  }

  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block ${colorClass}`}
      style={{ x, y, rotate, scale, opacity, filter }}
    >
      {char}
    </motion.span>
  );
}

interface JourneyWordDisplayProps {
  entry: JourneyWord;
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
}

function JourneyWordDisplay({ entry, progress, range, reduced }: JourneyWordDisplayProps) {
  const [start, end] = range;
  const span = end - start;
  const scatterStart = start;
  const scatterPeak = start + span * 0.35;
  const assembleEnd = start + span * 0.75;

  // Breakpoints are built as running maxima of strictly increasing deltas so
  // the sequence stays monotonic even when a word's range is narrow (e.g. the
  // final phase, which has no room after 1.0 to fade out into).
  const fadeInStart = Math.max(0, start - 0.05);
  const holdEnd = Math.min(0.999, Math.max(end - 0.03, start + 0.001));
  const fadeOutEnd = Math.min(1, Math.max(holdEnd + 0.02, end + 0.02));
  const wordOpacity = useTransform(
    progress,
    [fadeInStart, start, holdEnd, fadeOutEnd],
    [0, 1, 1, 0],
  );

  const supportFadeInStart = Math.min(assembleEnd, holdEnd - 0.001);
  const supportFadeInEnd = Math.min(
    holdEnd,
    Math.max(supportFadeInStart + 0.01, assembleEnd + 0.03),
  );
  const supportOpacity = useTransform(
    progress,
    [supportFadeInStart, supportFadeInEnd, holdEnd, fadeOutEnd],
    [0, 1, 1, 0],
  );

  const letters = entry.word.split("");
  const hasOffsets = entry.offsets.length === letters.length;

  return (
    <motion.div
      style={{ opacity: wordOpacity }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
      aria-hidden="true"
    >
      <p
        className={`font-sans font-medium leading-none tracking-[-0.02em] ${entry.colorClass}`}
        style={{ fontSize: "clamp(48px, 13vw, 150px)" }}
      >
        {letters.map((char, i) => (
          <Letter
            key={`${entry.word}-${i}`}
            char={char}
            offset={hasOffsets ? entry.offsets[i]! : { x: 0, y: 0, rotate: 0 }}
            progress={progress}
            scatterStart={scatterStart}
            scatterPeak={scatterPeak}
            assembleEnd={assembleEnd}
            colorClass={entry.colorClass}
            reduced={reduced}
          />
        ))}
      </p>
      {entry.support ? (
        <motion.p
          style={{ opacity: supportOpacity }}
          className="label-xs mt-6 text-white/50 md:mt-8"
        >
          {entry.support}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

function IntroSentence({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.14, 0.19], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.19], [0, -24]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
    >
      <p
        className="font-sans font-medium leading-[1.05] tracking-[-0.02em] text-white"
        style={{ fontSize: "clamp(40px, 8vw, 110px)" }}
      >
        FROM COMPLEXITY
        <br />
        TO <span className="text-brand">CLARITY.</span>
      </p>
    </motion.div>
  );
}

function ClosingMessage({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.965, 0.99, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.965, 1], [24, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black px-6 text-center"
    >
      <p className="label-xs text-brand">MetisJean</p>
      <h2 className="max-w-[18ch] font-sans text-[32px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[52px]">
        Bring order to <span className="font-medium text-brand">complexity.</span>
      </h2>
      <p className="max-w-[52ch] text-[15px] leading-relaxed text-white/55 md:text-[18px]">
        We empower CEOs and their organisations to make intelligence-led decisions and act on them
        instantly — delivering measurable impact at scale.
      </p>
      <a
        href="#contact"
        className="pointer-events-auto group mt-2 inline-flex items-baseline gap-3 border-b border-brand pb-1 text-[15px] font-medium tracking-[0.04em] text-brand uppercase transition-colors duration-300 hover:border-white hover:text-white"
      >
        Start a conversation
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-500 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </a>
    </motion.div>
  );
}

function ScrollIndicator({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.06], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-white/50"
    >
      <span className="label-xs">Scroll to explore</span>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-lg"
      >
        &darr;
      </motion.span>
    </motion.div>
  );
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col items-end gap-4 md:right-10 lg:flex">
      {JOURNEY_WORDS.map((entry, i) => (
        <ProgressDigit
          key={entry.label}
          label={entry.label}
          progress={progress}
          range={PHASE_RANGES[i]!}
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
    ["rgba(255,255,255,0.3)", "#0b90f4", "#0b90f4", "rgba(255,255,255,0.3)"],
  );
  return (
    <motion.span style={{ color }} className="label-xs tracking-[0.18em]">
      {label}
    </motion.span>
  );
}

/**
 * Full-bleed scroll-driven typographic centrepiece. A single sticky viewport
 * cycles through COMPLEXITY → CLARITY → INTELLIGENCE → AUTOMATION →
 * EXECUTION → TRANSFORMATION → the MetisJean closing message, purely as a
 * function of scroll position (see PHASE_RANGES above). No images — the
 * typography itself is the visual.
 */
export function TypographicJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Route scroll-linked opacity/transform MotionValues through one identity
  // transform first so Framer Motion's WAAPI "accelerate" fast path (which
  // hands non-normalized, non-1-terminated input ranges to the native
  // animation engine as literal keyframe offsets, mis-clamping past the end
  // of a range) never engages — every downstream useTransform then runs
  // Framer Motion's own JS interpolation, which clamps correctly.
  const scrollYProgress = useTransform(rawProgress, (v) => v);

  if (reduced) {
    return (
      <section className="bg-black px-6 py-24 text-center md:py-32">
        <p className="label-xs text-brand">Intelligent Transformation</p>
        <p className="mx-auto mt-6 max-w-[20ch] text-[40px] font-medium leading-[1.1] text-white md:text-[64px]">
          From complexity to <span className="text-brand">clarity.</span>
        </p>
        <div className="mx-auto mt-16 flex max-w-[900px] flex-col items-center gap-10">
          {JOURNEY_WORDS.map((entry) => (
            <div key={entry.word}>
              <p
                className={`text-[36px] font-medium tracking-[-0.02em] md:text-[56px] ${entry.colorClass}`}
              >
                {entry.word}
              </p>
              {entry.support ? (
                <p className="label-xs mt-3 text-white/50">{entry.support}</p>
              ) : null}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-20 flex max-w-[640px] flex-col items-center gap-6">
          <p className="label-xs text-brand">MetisJean</p>
          <h2 className="text-[32px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[48px]">
            Bring order to <span className="font-medium text-brand">complexity.</span>
          </h2>
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-white/55 md:text-[18px]">
            We empower CEOs and their organisations to make intelligence-led decisions and act on
            them instantly — delivering measurable impact at scale.
          </p>
          <a
            href="#contact"
            className="group mt-2 inline-flex items-baseline gap-3 border-b border-brand pb-1 text-[15px] font-medium tracking-[0.04em] text-brand uppercase transition-colors duration-300 hover:border-white hover:text-white"
          >
            Start a conversation
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-500 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label="MetisJean: from complexity to clarity, intelligence, automation, execution, and transformation"
      className="relative h-[500vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center md:top-12">
          <p className="label-xs text-brand">Intelligent Transformation</p>
        </div>
        <div className="pointer-events-none absolute top-14 left-1/2 h-px w-10 -translate-x-1/2 bg-brand/60 md:top-20" />

        <IntroSentence progress={scrollYProgress} />

        {JOURNEY_WORDS.map((entry, i) => (
          <JourneyWordDisplay
            key={entry.word}
            entry={entry}
            progress={scrollYProgress}
            range={PHASE_RANGES[i]!}
            reduced={reduced}
          />
        ))}

        <ClosingMessage progress={scrollYProgress} />
        <ScrollIndicator progress={scrollYProgress} />
        <ProgressRail progress={scrollYProgress} />

        {/* Screen-reader-only linear transcript of the scroll narrative. */}
        <p className="sr-only">
          From complexity to clarity. Complexity. Clarity. Intelligence: make intelligence-led
          decisions. Automation: turn insight into action. Execution: strategy only matters when it
          moves. Transformation: technology transformation, with purpose. MetisJean — bring order to
          complexity. We empower CEOs and their organisations to make intelligence-led decisions and
          act on them instantly — delivering measurable impact at scale.
        </p>
      </div>
    </section>
  );
}
