import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./brand/Wordmark";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "border-b border-hairline bg-panel/80 py-3 backdrop-blur-sm"
          : "border-b border-transparent py-6"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[1450px] items-center justify-between px-6 md:px-12"
      >
        <a href="#top" className="shrink-0" aria-label="MetisJean, home">
          <Wordmark className="text-[19px] md:text-[21px]" />
        </a>

        <ul className="hidden items-center gap-12 md:flex lg:gap-16">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 hover:text-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-11 items-center justify-center text-ink md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="mx-6 mt-4 border-t border-hairline pt-6 pb-4 md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[22px] font-light tracking-[-0.01em] text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
