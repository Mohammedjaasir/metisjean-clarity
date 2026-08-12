import { Reveal } from "../Reveal";

export function MissionVision() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto grid w-full max-w-[1450px] grid-cols-1 gap-16 border-t border-hairline pt-16 md:grid-cols-2 md:gap-24 md:pt-24">
        <Reveal>
          <p className="label-xs">Mission</p>
          <span className="mt-6 block h-[3px] w-16 bg-brand" />
          <p className="mt-8 max-w-[520px] text-[26px] font-light leading-[1.25] tracking-[-0.02em] text-ink md:text-[36px]">
            To empower CEOs and their organisations to make{" "}
            <span className="font-medium">intelligence-led decisions</span> and act on them
            instantly — delivering measurable impact at scale.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="label-xs">Vision</p>
          <span className="mt-6 block h-[3px] w-16 bg-brand" />
          <p className="mt-8 max-w-[520px] text-[26px] font-light leading-[1.25] tracking-[-0.02em] text-ink md:text-[36px]">
            To become the global standard for{" "}
            <span className="font-medium">intelligent automation</span> — ending the era of
            guesswork and enabling businesses to pivot in minutes, not months.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
