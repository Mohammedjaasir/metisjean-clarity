import {
  CORE_INFO,
  INPUT_NODES,
  OUTPUT_NODES,
} from "@/components/sections/intelligent-system/data";
import type { ActivePanel } from "@/components/sections/intelligent-system/SystemInfoPanel";

interface MobileFlowProps {
  onSelect: (panel: ActivePanel) => void;
}

/**
 * Vertical intelligence flow for narrow viewports: inputs top-to-bottom,
 * the core, then outputs top-to-bottom — same story, same click targets,
 * no attempt to compress the desktop horizontal ecosystem into place.
 */
export function MobileFlow({ onSelect }: MobileFlowProps) {
  return (
    <div className="flex flex-col items-center gap-3 md:hidden">
      {INPUT_NODES.map((node, i) => (
        <MobileRow
          key={node.key}
          label={node.label}
          onClick={() =>
            onSelect({ category: node.label, title: node.label, description: node.description })
          }
          showConnector={i > 0}
        />
      ))}

      <span aria-hidden="true" className="my-2 h-6 w-px bg-brand/40" />

      <button
        type="button"
        onClick={() =>
          onSelect({
            category: CORE_INFO.label,
            title: CORE_INFO.title,
            description: CORE_INFO.description,
          })
        }
        aria-label={`View: ${CORE_INFO.label} ${CORE_INFO.title}`}
        className="flex size-[140px] flex-col items-center justify-center rounded-full text-center text-white"
        style={{ background: "#0b90f4" }}
      >
        <span className="text-[15px] font-medium tracking-[-0.01em]">{CORE_INFO.label}</span>
        <span className="label-xs mt-1 text-white/75">{CORE_INFO.title}</span>
      </button>

      <span aria-hidden="true" className="my-2 h-6 w-px bg-brand/40" />

      {OUTPUT_NODES.map((node, i) => (
        <MobileRow
          key={node.key}
          label={node.label}
          onClick={() =>
            onSelect({ category: node.label, title: node.label, description: node.description })
          }
          showConnector={i > 0}
        />
      ))}
    </div>
  );
}

function MobileRow({
  label,
  onClick,
  showConnector,
}: {
  label: string;
  onClick: () => void;
  showConnector: boolean;
}) {
  return (
    <>
      {showConnector ? <span aria-hidden="true" className="h-4 w-px bg-border" /> : null}
      <button
        type="button"
        onClick={onClick}
        aria-label={`View: ${label}`}
        className="flex flex-col items-center gap-2"
      >
        <span className="size-2 rounded-full bg-brand" />
        <span className="label-xs text-ink">{label}</span>
      </button>
    </>
  );
}
