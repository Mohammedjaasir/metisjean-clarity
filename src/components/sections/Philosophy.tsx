import { Reveal } from "../Reveal";
import { StripeDecoration } from "../brand/StripeDecoration";

export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-onyx px-6 py-32 text-white md:px-12 md:py-52 lg:px-20">
      <StripeDecoration count={5} className="absolute -left-8 top-0 h-40 md:h-72" origin="left" />
      <StripeDecoration
        count={5}
        className="absolute -right-8 bottom-0 h-40 md:h-72"
        origin="right"
      />

      <div className="relative mx-auto w-full max-w-[1450px]">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.18em] text-brand">Calm authority</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 max-w-[1000px] text-[38px] font-light leading-[1.08] tracking-[-0.03em] md:text-[76px]">
            Complexity into clarity.
            <br />
            <span className="font-medium">Vision into execution.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-12 max-w-[520px] text-[17px] leading-[1.7] text-white/60 md:text-[20px]">
            MetisJean speaks with intelligent clarity and strategic composure. We don't chase
            noise. We create understanding.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
