import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import workshop from "@/assets/team-workshop.jpg.asset.json";

const ITEMS = [
  {
    category: "Decision intelligence",
    title: "What CEOs actually need from their data",
    body: "Evidence beats instinct when the stakes are measured in quarters, not quarters of a point.",
  },
  {
    category: "Automation",
    title: "Pivot in minutes, not months",
    body: "Why the speed of change, not the size of the system, decides the outcome.",
  },
  {
    category: "Transparency",
    title: "Technology should never be a black box",
    body: "Designing for accountability so results can be seen, questioned, and proven.",
  },
  {
    category: "Execution",
    title: "Strategy only counts when it's delivered",
    body: "Precision, compliance, and reliability as the final measure of good thinking.",
  },
];

export function Insights() {
  return (
    <section id="insights" className="px-6 py-24 md:px-12 md:py-40 lg:px-20">
      <div className="mx-auto w-full max-w-[1450px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-end md:gap-24">
          <Reveal>
            <p className="label-xs">Insights</p>
            <h2 className="mt-6 text-[32px] font-light leading-[1.14] tracking-[-0.025em] text-ink md:text-[52px]">
              Create <span className="font-medium">understanding.</span>
            </h2>
            <p className="mt-8 max-w-[460px] text-[17px] leading-[1.7] text-muted-foreground md:text-[20px]">
              We don't chase noise. We speak with conviction, not volume — grounded in logic,
              data, and lived expertise.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="aspect-[16/10] overflow-hidden md:-mr-[8vw]">
              <img
                src={workshop.url}
                alt="Colleagues in a bright meeting room working through a problem together"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <ul className="mt-20 border-t border-hairline md:mt-28">
          {ITEMS.map((item, i) => (
            <Reveal as="li" key={item.title} delay={0.05 * i}>
              <a
                href="#contact"
                className="group grid grid-cols-1 gap-3 border-b border-hairline py-8 transition-colors duration-500 md:grid-cols-[200px_minmax(0,1fr)_44px] md:items-baseline md:gap-10 md:py-10"
              >
                <span className="label-xs group-hover:text-brand">{item.category}</span>
                <div>
                  <h3 className="text-[20px] font-light tracking-[-0.02em] text-ink md:text-[28px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[620px] text-[16px] leading-[1.7] text-muted-foreground md:text-[18px]">
                    {item.body}
                  </p>
                </div>
                <ArrowUpRight className="size-5 text-faint transition-all duration-500 group-hover:-translate-y-1 group-hover:text-brand md:justify-self-end" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
