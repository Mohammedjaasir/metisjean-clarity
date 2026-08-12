import { Wordmark } from "./brand/Wordmark";
import { StripeDecoration } from "./brand/StripeDecoration";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-onyx px-6 py-16 text-white md:px-12 md:py-24 lg:px-20">
      <StripeDecoration
        count={4}
        tone="outline"
        className="absolute -right-6 top-0 h-24 md:h-40"
        origin="right"
      />
      <div className="relative mx-auto w-full max-w-[1450px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-center">
          <Wordmark tone="white" className="text-[22px]" />
          <p className="text-[14px] text-white/60 md:text-center">
            Guiding You Through Technology Transformation
          </p>
          <nav aria-label="Footer" className="md:justify-self-end">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] uppercase tracking-[0.16em] text-white/60 transition-colors duration-300 hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-16 border-t border-white/10 pt-8 text-[12px] text-white/40">
          © {new Date().getFullYear()} MetisJean
        </p>
      </div>
    </footer>
  );
}
