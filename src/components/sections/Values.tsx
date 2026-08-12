import { Reveal } from "../Reveal";

const VALUES = [
  {
    title: "Intelligence with Purpose",
    body: "Every solution must deliver measurable business impact — sharper decisions, faster execution, stronger outcomes. Intelligence is only valuable when it serves strategy.",
  },
  {
    title: "Clarity First",
    body: "Technology should never be a black box. We design for transparency, accountability, and results that can be proven — what's working, what isn't, and why.",
  },
  {
    title: "Love the Problem",
    body: "We start with the hard questions and stay with them until they're solved, going deep into our customers' toughest challenges and elevating the people facing them.",
  },
  {
    title: "Relentless Execution",
    body: "Strategy only counts when it's delivered. We hold ourselves to the highest standards of precision, compliance, and reliability.",
  },
];

export function Values() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-36 lg:px-20">
      <div className="mx-auto w-full max-w-[1450px]">
        <Reveal>
          <h2 className="max-w-[720px] text-[32px] font-light leading-[1.14] tracking-[-0.025em] text-ink md:text-[52px]">
            Built on clarity, purpose, and <span className="font-medium">precision.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-24 gap-y-16 md:mt-28 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={0.06 * i}>
              <article className="max-w-[520px]">
                <p className="label-xs">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[22px] font-medium tracking-[-0.02em] text-ink md:text-[30px]">
                  {v.title}
                </h3>
                <span className="mt-6 block h-px w-24 bg-brand" />
                <p className="mt-6 text-[16px] leading-[1.7] text-muted-foreground md:text-[19px]">
                  {v.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
