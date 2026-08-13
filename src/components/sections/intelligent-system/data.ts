export type SystemStage = "data" | "intelligence" | "automation" | "impact" | null;

export interface EcosystemNode {
  key: string;
  index: string;
  label: string;
  description: string;
  side: "input" | "output";
  /** Vertical position within its column, 0 (top) to 1 (bottom). */
  position: number;
  stage: Exclude<SystemStage, null>;
}

export interface RingDefinition {
  key: "intelligence" | "analysis" | "automation" | "execution";
  label: string;
  /** Radius as a fraction of the core-to-edge distance (0–1). */
  radius: number;
  dashed: boolean;
  /** Rotation duration in seconds; direction alternates per ring. */
  rotateSeconds: number;
  direction: 1 | -1;
}

export const RINGS: RingDefinition[] = [
  {
    key: "intelligence",
    label: "Intelligence",
    radius: 1,
    dashed: false,
    rotateSeconds: 90,
    direction: 1,
  },
  {
    key: "analysis",
    label: "Analysis",
    radius: 0.8,
    dashed: true,
    rotateSeconds: 70,
    direction: -1,
  },
  {
    key: "automation",
    label: "Automation",
    radius: 0.6,
    dashed: false,
    rotateSeconds: 50,
    direction: 1,
  },
  {
    key: "execution",
    label: "Execution",
    radius: 0.4,
    dashed: true,
    rotateSeconds: 34,
    direction: -1,
  },
];

export const INPUT_NODES: EcosystemNode[] = [
  {
    key: "data",
    index: "01",
    label: "Data",
    description: "Connect structured and unstructured information from across the organisation.",
    side: "input",
    position: 0.02,
    stage: "data",
  },
  {
    key: "documents",
    index: "02",
    label: "Documents",
    description: "Contracts, reports and records read and understood at scale.",
    side: "input",
    position: 0.2,
    stage: "data",
  },
  {
    key: "systems",
    index: "03",
    label: "Systems",
    description: "Existing business systems connected without disruption.",
    side: "input",
    position: 0.38,
    stage: "data",
  },
  {
    key: "processes",
    index: "04",
    label: "Business Processes",
    description: "Operational workflows mapped into the intelligence engine.",
    side: "input",
    position: 0.56,
    stage: "data",
  },
  {
    key: "signals",
    index: "05",
    label: "Customer Signals",
    description: "Behavioural and market signals fed directly into analysis.",
    side: "input",
    position: 0.74,
    stage: "data",
  },
  {
    key: "operational",
    index: "06",
    label: "Operational Data",
    description: "Live operational metrics, continuously ingested and curated.",
    side: "input",
    position: 0.92,
    stage: "data",
  },
];

export const OUTPUT_NODES: EcosystemNode[] = [
  {
    key: "intelligence-out",
    index: "01",
    label: "Intelligence",
    description: "Transform complex information into actionable intelligence.",
    side: "output",
    position: 0.02,
    stage: "intelligence",
  },
  {
    key: "decisions",
    index: "02",
    label: "Decisions",
    description: "Intelligence-led decisions your organisation can act on instantly.",
    side: "output",
    position: 0.2,
    stage: "intelligence",
  },
  {
    key: "automation-out",
    index: "03",
    label: "Automation",
    description: "Turn decisions into intelligent, scalable workflows.",
    side: "output",
    position: 0.38,
    stage: "automation",
  },
  {
    key: "execution-out",
    index: "04",
    label: "Execution",
    description: "Strategy only matters when it moves — execution that delivers.",
    side: "output",
    position: 0.56,
    stage: "automation",
  },
  {
    key: "impact",
    index: "05",
    label: "Business Impact",
    description: "Measure transformation through meaningful business outcomes.",
    side: "output",
    position: 0.74,
    stage: "impact",
  },
  {
    key: "outcomes",
    index: "06",
    label: "Measurable Outcomes",
    description: "Results that can be proven — what's working, and why.",
    side: "output",
    position: 0.92,
    stage: "impact",
  },
];

export const CORE_INFO = {
  key: "core",
  label: "MetisJean",
  title: "Intelligence Engine",
  description:
    "The engine that connects data, systems and people into one system of decisions — turning complexity into clarity, and clarity into action.",
};
