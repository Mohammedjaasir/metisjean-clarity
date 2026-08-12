import { Reveal } from "../Reveal";
import { StripeDecoration } from "../brand/StripeDecoration";

export function BrandIntroduction() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:px-12 md:py-44 lg:px-20">
      <StripeDecoration
        count={4}
        className="absolute -left-6 top-16 h-24 md:h-40"
        origin="left"
      />
      <div className="mx-auto grid w-full max-w-[1450px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
        <Reveal>
          <p className="label-xs">Brand Introduction</p>
          <h2 className="mt-6 max-w-[520px] text-[34px] font-light leading-[1.12] tracking-[-0.025em] text-ink md:text-[52px]">
            MetisJean brings order to <span className="font-medium">complexity.</span>
          </h2>
        </Reveal>

        <div className="max-w-[540px] space-y-8 text-[17px] leading-[1.7] text-muted-foreground md:text-[20px]">
          <Reveal delay={0.08}>
            <p>
              We empower CEOs and their organisations to make intelligence-led decisions and
              act on them instantly — delivering measurable impact at scale.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              Our vision is to become the global standard for intelligent automation, ending
              the era of guesswork and enabling businesses to pivot in minutes, not months.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p>
              Built on clarity, purpose, and precision, we tackle the hardest problems with
              intelligence that serves strategy and execution that delivers results.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="text-ink">
              MetisJean is the calm authority that turns complexity into clarity — and vision
              into action.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
