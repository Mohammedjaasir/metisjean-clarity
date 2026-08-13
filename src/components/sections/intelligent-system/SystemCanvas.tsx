import { motion, useTransform, type MotionValue } from "motion/react";

import { SystemRing } from "@/components/sections/intelligent-system/SystemRing";
import { SystemCore } from "@/components/sections/intelligent-system/SystemCore";
import { InnerNetwork } from "@/components/sections/intelligent-system/InnerNetwork";
import { ConnectionPath } from "@/components/sections/intelligent-system/ConnectionPath";
import { InputNode } from "@/components/sections/intelligent-system/InputNode";
import { OutputNode } from "@/components/sections/intelligent-system/OutputNode";
import {
  CORE_INFO,
  INPUT_NODES,
  OUTPUT_NODES,
  RINGS,
  type EcosystemNode,
  type SystemStage,
} from "@/components/sections/intelligent-system/data";
import type { ActivePanel } from "@/components/sections/intelligent-system/SystemInfoPanel";

/**
 * Logical coordinate space for the SVG layer. The `<svg>` scales this to
 * whatever pixel size its container renders at (via viewBox), and every
 * HTML overlay (core button, node columns) is positioned with the matching
 * percentages instead of these raw units, so both layers track the same
 * responsive container without a separate scale transform.
 */
const VIEWBOX = 900;
const CENTER = VIEWBOX / 2;
const MAX_RING_RADIUS = 200;
const CORE_SIZE_PCT = 168 / VIEWBOX; // core diameter as a fraction of the canvas
const NODE_COLUMN_INSET = 40;

interface SystemCanvasProps {
  progress: MotionValue<number>;
  activeStage: SystemStage;
  onEnter: (stage: SystemStage) => void;
  onLeave: () => void;
  onSelect: (panel: ActivePanel) => void;
  reduced: boolean;
}

function nodeToPanel(node: EcosystemNode): ActivePanel {
  return { category: node.label, title: node.label, description: node.description };
}

/** Cubic Bezier from a side column's node y-position to the core edge. */
function connectionPath(nodeY: number, side: "input" | "output") {
  const coreHalf = (CORE_SIZE_PCT * VIEWBOX) / 2;
  const nodeX = side === "input" ? NODE_COLUMN_INSET : VIEWBOX - NODE_COLUMN_INSET;
  const coreEdgeX = side === "input" ? CENTER - coreHalf : CENTER + coreHalf;
  const control1X =
    side === "input" ? nodeX + (coreEdgeX - nodeX) * 0.5 : nodeX - (nodeX - coreEdgeX) * 0.5;
  const control2X =
    side === "input"
      ? coreEdgeX - (coreEdgeX - nodeX) * 0.25
      : coreEdgeX + (nodeX - coreEdgeX) * 0.25;
  return `M ${nodeX} ${nodeY} C ${control1X} ${nodeY}, ${control2X} ${CENTER}, ${coreEdgeX} ${CENTER}`;
}

/**
 * The full horizontal ecosystem: input column (left) → curved connections →
 * rotating rings + core + inner node mesh → curved connections → output
 * column (right). All reveal timing is driven by the shared scroll
 * `progress` MotionValue; hover/click state is passed down from
 * IntelligentSystemSection so a single source of truth drives both the SVG
 * highlighting and the side-column label styling.
 */
export function SystemCanvas({
  progress,
  activeStage,
  onEnter,
  onLeave,
  onSelect,
  reduced,
}: SystemCanvasProps) {
  const coreOpacity = useTransform(progress, [0.2, 0.32, 1], [0, 1, 1]);
  const coreScale = useTransform(progress, [0.2, 0.32], [0.6, 1]);
  const ringsOpacity = useTransform(progress, [0.4, 0.55, 1], [0, 1, 1]);
  const innerNetworkOpacity = useTransform(progress, [0.45, 0.58, 1], [0, 1, 1]);
  const inputsOpacity = useTransform(progress, [0.55, 0.7, 1], [0, 1, 1]);
  const inputsX = useTransform(progress, [0.55, 0.7], [-24, 0]);
  const outputsOpacity = useTransform(progress, [0.7, 0.85, 1], [0, 1, 1]);
  const outputsX = useTransform(progress, [0.7, 0.85], [24, 0]);
  const connectionsOpacity = useTransform(progress, [0.85, 0.95, 1], [0, 1, 1]);

  return (
    <div className="relative mx-auto hidden aspect-square h-[85vh] max-h-[900px] w-auto max-w-[min(85vw,900px)] items-center justify-center md:flex">
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {INPUT_NODES.map((node) => (
          <ConnectionPath
            key={node.key}
            d={connectionPath(node.position * VIEWBOX, "input")}
            isActive={activeStage === node.stage}
            revealOpacity={connectionsOpacity}
            particleDelay={node.position * 2}
            reduced={reduced}
          />
        ))}
        {OUTPUT_NODES.map((node) => (
          <ConnectionPath
            key={node.key}
            d={connectionPath(node.position * VIEWBOX, "output")}
            isActive={activeStage === node.stage}
            revealOpacity={connectionsOpacity}
            particleDelay={node.position * 2 + 1}
            reduced={reduced}
          />
        ))}

        {RINGS.map((ring) => (
          <SystemRing
            key={ring.key}
            ring={ring}
            center={CENTER}
            maxRadius={MAX_RING_RADIUS}
            activeStage={activeStage}
            revealOpacity={ringsOpacity}
            reduced={reduced}
          />
        ))}

        <InnerNetwork
          center={CENTER}
          innerRadius={MAX_RING_RADIUS * RINGS[RINGS.length - 1]!.radius * 0.85}
          revealOpacity={innerNetworkOpacity}
          reduced={reduced}
        />
      </svg>

      <SystemCore
        sizePct={CORE_SIZE_PCT}
        opacity={coreOpacity}
        scale={coreScale}
        onSelect={() =>
          onSelect({
            category: CORE_INFO.label,
            title: CORE_INFO.title,
            description: CORE_INFO.description,
          })
        }
        onEnter={() => onEnter(null)}
        reduced={reduced}
      />

      {/* Node columns span the full canvas height; each node's `position`
          (0–1) is expressed as a top percentage, matching the y-value used
          to build its connection path above. */}
      <motion.div
        style={{ opacity: inputsOpacity, x: inputsX }}
        className="absolute inset-y-0 left-0 w-[220px]"
      >
        {INPUT_NODES.map((node) => (
          <div
            key={node.key}
            className="absolute left-0"
            style={{ top: `${node.position * 100}%` }}
          >
            <InputNode
              node={node}
              isActive={activeStage === node.stage}
              onEnter={onEnter}
              onLeave={onLeave}
              onSelect={(n) => onSelect(nodeToPanel(n))}
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: outputsOpacity, x: outputsX }}
        className="absolute inset-y-0 right-0 w-[220px]"
      >
        {OUTPUT_NODES.map((node) => (
          <div
            key={node.key}
            className="absolute right-0"
            style={{ top: `${node.position * 100}%` }}
          >
            <OutputNode
              node={node}
              isActive={activeStage === node.stage}
              onEnter={onEnter}
              onLeave={onLeave}
              onSelect={(n) => onSelect(nodeToPanel(n))}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
