import { Reveal } from "../Reveal";

const STAGES = [
  {
    title: "Understand",
    body: "Understand the problem and the business context.",
  },
  {
    title: "Intelligence",
    body: "Turn information into actionable intelligence.",
  },
  {
    title: "Design",
    body: "Create the right technology and automation strategy.",
  },
  {
    title: "Execute",
    body: "Translate strategy into measurable action.",
  },
  {
    title: "Impact",
    body: "Measure outcomes and continuously improve.",
  },
];

export function Process() {
  return (
    <section id="approach" className="px-6 py-24 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto w-full max-w-[1450px]">
        <Reveal>
          <p className="label-xs">Approach</p>
          <h2 className="mt-6 max-w-[720px] text-[32px] font-light leading-[1.14] tracking-[-0.025em] text-ink md:text-[52px]">
            From complexity to <span className="font-medium">action.</span>
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-12 border-t border-hairline pt-12 md:mt-24 md:grid-cols-5 md:gap-8 md:pt-16">
          {STAGES.map((stage, i) => (
            <li key={stage.title} className="relative">
              <p className="label-xs text-brand">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-[20px] font-medium tracking-[-0.02em] text-ink md:text-[22px]">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-[240px] text-[15px] leading-[1.65] text-muted-foreground">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
