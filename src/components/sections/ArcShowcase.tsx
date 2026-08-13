import { motion } from "motion/react";
import { ArcGallery } from "@/components/hero/ArcGallery";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial image wall — photography travelling along a wide arc inside a
 * black canvas, masked by a curve at the base.
 */
export function ArcShowcase() {
  return (
    <section id="work" className="px-3 py-14 md:px-[3vw] md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto w-full max-w-[1450px] overflow-hidden rounded-[24px] bg-black px-6 pt-10 md:rounded-[38px] md:px-12 md:pt-16 lg:px-20"
      >
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
          In practice
        </p>
        <h2 className="mt-5 max-w-[20ch] text-[30px] font-light leading-[1.1] tracking-[-0.025em] text-white md:text-[46px] lg:text-[55px]">
          MetisJean brings order to{" "}
          <span className="font-medium text-brand">complexity.</span>
        </h2>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/55 md:text-[18px]">
          Intelligence that turns complexity into clarity — and clarity into
          execution.
        </p>

        <div className="relative -mx-6 mt-10 h-[42vh] min-h-[300px] md:-mx-12 md:mt-14 md:h-[54vh] md:min-h-[420px] lg:-mx-20">
          <ArcGallery />
        </div>
      </motion.div>
    </section>
  );
}
