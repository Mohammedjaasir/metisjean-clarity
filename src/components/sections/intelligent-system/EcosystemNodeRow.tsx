import type { EcosystemNode, SystemStage } from "@/components/sections/intelligent-system/data";

export interface EcosystemNodeRowProps {
  node: EcosystemNode;
  isActive: boolean;
  onEnter: (stage: SystemStage) => void;
  onLeave: () => void;
  onSelect: (node: EcosystemNode) => void;
}

/**
 * Shared row rendering for an input or output node: index, small dot, label,
 * hover underline. Hovering enlarges the dot, darkens the label, and reveals
 * a thin blue underline; the caller (SystemCanvas) uses the same hover state
 * to brighten the matching connection line and ring. Output rows mirror the
 * layout (dot after label) via `node.side`.
 */
export function EcosystemNodeRow({
  node,
  isActive,
  onEnter,
  onLeave,
  onSelect,
}: EcosystemNodeRowProps) {
  const isOutput = node.side === "output";
  return (
    <button
      type="button"
      onMouseEnter={() => onEnter(node.stage)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(node.stage)}
      onBlur={onLeave}
      onClick={() => onSelect(node)}
      aria-label={`${isOutput ? "View output" : "View input"}: ${node.label}`}
      className={`group flex items-center gap-3 text-left ${isOutput ? "flex-row-reverse text-right" : ""}`}
    >
      <span
        className={`size-[6px] shrink-0 rounded-full bg-brand transition-transform duration-300 ${isActive ? "scale-[2]" : "group-hover:scale-150"}`}
      />
      <span className="flex flex-col">
        <span className="label-xs text-faint">{node.index}</span>
        <span
          className={`text-[13px] font-medium tracking-[-0.01em] transition-colors duration-300 ${isActive ? "text-brand" : "text-ink group-hover:text-brand"}`}
        >
          {node.label}
        </span>
        <span
          className={`mt-1 h-px bg-brand transition-all duration-300 ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"}`}
        />
      </span>
    </button>
  );
}
