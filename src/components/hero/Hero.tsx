import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { Wordmark } from "@/components/brand/Wordmark";
import { ArcGallery } from "./ArcGallery";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <div id="top" className="p-3 md:p-5">
      <section className="relative flex min-h-[94vh] flex-col overflow-hidden rounded-[26px] bg-black px-6 pt-6 pb-0 md:rounded-[34px] md:px-10 md:pt-8">
        {/* Header */}
        <header className="relative z-30">
          <nav
            aria-label="Primary"
            className="flex items-center justify-between gap-8"
          >
            <a href="#top" aria-label="MetisJean, home">
              <Wordmark tone="white" className="text-[20px] md:text-[22px]" />
            </a>

            <ul className="hidden items-center gap-10 md:flex lg:gap-14">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] uppercase tracking-[0.16em] text-white/65 transition-colors duration-300 hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="hidden items-center gap-2 text-[13px] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:text-brand md:inline-flex"
            >
              Let's talk <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="hero-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center text-white md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </nav>

          {open ? (
            <ul
              id="hero-menu"
              className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 md:hidden"
            >
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-[22px] font-light text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {/* Headline */}
        <div className="relative z-20 pt-10 md:pt-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-[11px] uppercase tracking-[0.28em] text-white/45"
          >
            01 — <span className="text-brand">Intelligent automation</span>
          </motion.p>

          <h1 className="mt-5 max-w-[15ch] text-[36px] font-medium leading-[1.06] tracking-[-0.03em] text-white sm:text-[52px] md:max-w-[18ch] md:text-[64px] lg:text-[74px]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="block"
            >
              MetisJean brings order to
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
              className="block text-brand"
            >
              complexity.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-white/55 md:text-[18px]"
          >
            Intelligence that turns complexity into clarity — and clarity into
            execution.
          </motion.p>
        </div>

        {/* Curved animated image wall */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
          className="relative z-10 -mx-6 mt-8 h-[42vh] flex-1 md:-mx-10 md:mt-10 md:h-auto md:min-h-[46vh]"
        >
          <ArcGallery />
        </motion.div>

        {/* Scroll cue */}
        <div className="relative z-30 flex items-center justify-between pb-6 md:pb-8">
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/50 transition-colors duration-300 hover:text-white"
          >
            Scroll to explore
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown className="size-3.5" aria-hidden="true" />
            </motion.span>
          </a>
          <span className="hidden text-[11px] uppercase tracking-[0.24em] text-white/35 md:inline">
            Guiding you through technology transformation
          </span>
        </div>
      </section>
    </div>
  );
}
