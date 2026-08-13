/**
 * Near-invisible depth layer behind the ecosystem: a faint grid, oversized
 * rings, coordinate dots, an oversized background word, and a soft blue glow
 * behind the core. Everything here sits at 0.03–0.08 opacity — it should
 * read as texture, never as competing content.
 */
export function BackgroundGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Blue atmospheric glow behind the core */}
      <div
        className="absolute top-1/2 left-1/2 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: "#0b90f4" }}
      />

      {/* Oversized background word */}
      <p
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans font-medium text-ink opacity-[0.03] select-none"
        style={{ fontSize: "18vw" }}
      >
        INTELLIGENCE
      </p>

      {/* Faint grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
        <defs>
          <pattern id="isys-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#000000" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#isys-grid)" />
      </svg>

      {/* Oversized decorative rings */}
      <div className="absolute -top-[20%] -left-[10%] h-[60vw] w-[60vw] rounded-full border border-ink opacity-[0.04]" />
      <div className="absolute -right-[15%] -bottom-[25%] h-[45vw] w-[45vw] rounded-full border border-ink opacity-[0.04]" />

      {/* Coordinate dots */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 10 }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={`${(col + 0.5) * 10}%`}
              cy={`${(row + 0.5) * 16.6}%`}
              r={1.2}
              fill="#000000"
            />
          )),
        )}
      </svg>
    </div>
  );
}
