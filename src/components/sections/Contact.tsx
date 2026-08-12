import { Reveal } from "../Reveal";
import { StripeDecoration } from "../brand/StripeDecoration";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-28 md:px-12 md:py-44 lg:px-20"
    >
      <StripeDecoration
        count={4}
        className="absolute -right-8 top-12 h-24 md:h-40"
        origin="right"
      />
      <div className="mx-auto w-full max-w-[1450px]">
        <Reveal>
          <h2 className="max-w-[860px] text-[34px] font-light leading-[1.12] tracking-[-0.03em] text-ink md:text-[62px]">
            Ready to turn complexity into <span className="font-medium">clarity?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[520px] text-[17px] leading-[1.7] text-muted-foreground md:text-[20px]">
            Let's explore what intelligent transformation could mean for your organisation.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4">
            <a
              href="mailto:hello@metisjean.com"
              className="group inline-flex items-baseline gap-4 border-b border-brand pb-2 text-[20px] font-medium tracking-[-0.02em] text-brand transition-colors duration-300 hover:text-ink hover:border-ink md:text-[26px]"
            >
              Start a conversation
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <span className="label-xs">Talk to MetisJean</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
