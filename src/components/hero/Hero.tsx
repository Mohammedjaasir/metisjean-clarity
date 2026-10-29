import { Navbar } from "../Navbar";

export function Hero() {
  return (
    <div id="top" className="px-3 pt-3 pb-6 md:px-[3vw] md:pt-[2vh]">
      <div className="mx-auto flex w-full max-w-[1450px] flex-col rounded-[24px] border border-hairline bg-panel md:min-h-[80vh] md:rounded-[38px]">
        <Navbar />

        <div className="grid flex-1 grid-cols-1 items-center gap-10 px-6 py-14 md:grid-cols-[minmax(0,1fr)] md:px-12 md:py-20 lg:px-20">
          <div className="mx-auto w-full max-w-[860px] text-center">
            <h1 className="text-[38px] font-light leading-[1.14] tracking-[-0.025em] text-ink sm:text-[48px] md:text-[64px] lg:text-[72px]">
              Bring order to <span className="font-medium">complexity.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-[620px] text-[17px] leading-[1.7] text-muted-foreground md:text-[20px]">
              We empower CEOs and their organisations to make intelligence-led decisions and act on
              them instantly — delivering measurable impact at scale.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              <a
                href="#contact"
                className="group inline-flex items-baseline gap-3 border-b border-brand pb-1 text-[16px] font-medium tracking-[0.02em] text-brand uppercase transition-colors duration-300 hover:border-ink hover:text-ink"
              >
                Start a conversation
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
              <a
                href="#approach"
                className="inline-flex items-baseline gap-2 text-[16px] tracking-[0.02em] text-muted-foreground uppercase transition-colors duration-300 hover:text-brand"
              >
                Explore our approach
                <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
