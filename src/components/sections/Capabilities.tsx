import { Cpu, Gauge, LineChart, Route, ShieldCheck, Workflow } from "lucide-react";
import { Reveal } from "../Reveal";
import { StripeDecoration } from "../brand/StripeDecoration";
import collab from "@/assets/collab-table.jpg";

const CAPABILITIES = [
  {
    icon: Workflow,
    title: "Intelligent automation",
    body: "Automation designed around the decisions that move the business, not the tasks that surround them.",
  },
  {
    icon: LineChart,
    title: "Intelligence-led decision making",
    body: "Evidence in place of guesswork, so leadership can see what is working, what isn't, and why.",
  },
  {
    icon: Cpu,
    title: "Technology transformation",
    body: "Guiding organisations through change with structure, sequence, and a clear line of sight.",
  },
  {
    icon: Route,
    title: "Strategic clarity",
    body: "Turning complexity into a position that can be explained, defended, and acted on.",
  },
  {
    icon: Gauge,
    title: "Execution",
    body: "Precision, compliance, and reliability — from the first line of code to the final outcome.",
  },
  {
    icon: ShieldCheck,
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
              <img
                src={collab}
                alt="A team collaborating around a table with laptops and notebooks"
                loading="lazy"
                className="size-full object-cover"
              />
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
              <div className="grid grid-cols-1 gap-4 border-b border-hairline py-8 md:grid-cols-[72px_minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-10 md:py-10">
                <span className="flex size-[52px] items-center justify-center rounded-full border-2 border-brand bg-brand-soft text-brand md:size-[64px]">
                  <c.icon className="size-5 md:size-6" strokeWidth={1.75} />
                </span>
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
