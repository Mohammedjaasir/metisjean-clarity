import { Reveal } from "../Reveal";
import { StripeDecoration } from "../brand/StripeDecoration";
import collab from "@/assets/collab-table.jpg.asset.json";

const CAPABILITIES = [
  {
    title: "Intelligent automation",
    body: "Automation designed around the decisions that move the business, not the tasks that surround them.",
  },
  {
    title: "Intelligence-led decision making",
    body: "Evidence in place of guesswork, so leadership can see what is working, what isn't, and why.",
  },
  {
    title: "Technology transformation",
    body: "Guiding organisations through change with structure, sequence, and a clear line of sight.",
  },
  {
    title: "Strategic clarity",
    body: "Turning complexity into a position that can be explained, defended, and acted on.",
  },
  {
    title: "Execution",
    body: "Precision, compliance, and reliability — from the first line of code to the final outcome.",
  },
  {
    title: "Measurable impact",
    body: "Sharper decisions, faster execution, stronger outcomes — proven, not promised.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="px-6 py-24 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto w-full max-w-[1450px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-24">
          <Reveal>
            <p className="label-xs">Capabilities</p>
            <h2 className="mt-6 max-w-[520px] text-[32px] font-light leading-[1.14] tracking-[-0.025em] text-ink md:text-[52px]">
              Technology transformation, with <span className="font-medium">purpose.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <motionSafeImage />
            </div>
            <StripeDecoration
              count={4}
              className="absolute -bottom-6 -left-6 h-20 md:h-28"
              origin="left"
            />
          </Reveal>
        </div>

        <ul className="mt-20 border-t border-hairline md:mt-32">
          {CAPABILITIES.map((c, i) => (
            <Reveal as="li" key={c.title} delay={0.04 * i}>
              <div className="grid grid-cols-1 gap-4 border-b border-hairline py-8 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-10 md:py-10">
                <span className="label-xs">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[22px] font-light tracking-[-0.02em] text-ink md:text-[30px]">
                  {c.title}
                </h3>
                <p className="text-[16px] leading-[1.7] text-muted-foreground md:text-[19px]">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function motionSafeImage() {
  return (
    <img
      src={collab.url}
      alt="A team collaborating around a table with laptops and notebooks"
      loading="lazy"
      className="size-full object-cover"
    />
  );
}
