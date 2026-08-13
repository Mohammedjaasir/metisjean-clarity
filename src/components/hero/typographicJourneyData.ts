export interface LetterOffset {
  x: number;
  y: number;
  rotate: number;
}

export interface JourneyWord {
  /** Progress-indicator label, e.g. "01 COMPLEXITY". */
  label: string;
  word: string;
  /** Tailwind text color class applied to the assembled word. */
  colorClass: "text-white" | "text-brand";
  support: string;
  /** Deterministic scatter target per letter — index-matched to `word`. */
  offsets: LetterOffset[];
}

/** Hand-placed scatter composition — asymmetric, not randomised. */
const COMPLEXITY_OFFSETS: LetterOffset[] = [
  { x: -220, y: -80, rotate: -12 }, // C
  { x: -90, y: 120, rotate: 8 }, // O
  { x: 30, y: -140, rotate: -6 }, // M
  { x: 150, y: 90, rotate: 10 }, // P
  { x: -180, y: 180, rotate: -8 }, // L
  { x: 190, y: -120, rotate: 12 }, // E
  { x: -50, y: -200, rotate: -15 }, // X
  { x: 230, y: 50, rotate: 6 }, // I
  { x: -230, y: -30, rotate: -10 }, // T
  { x: 90, y: 190, rotate: 8 }, // Y
];

const INTELLIGENCE_OFFSETS: LetterOffset[] = [
  { x: -240, y: -60, rotate: -10 }, // I
  { x: -170, y: 140, rotate: 9 }, // N
  { x: -110, y: -160, rotate: -7 }, // T
  { x: -40, y: 110, rotate: 11 }, // E
  { x: 20, y: -130, rotate: -13 }, // L
  { x: 90, y: 170, rotate: 7 }, // L
  { x: 150, y: -90, rotate: -9 }, // I
  { x: -20, y: 200, rotate: 10 }, // G
  { x: 210, y: 60, rotate: -6 }, // E
  { x: -150, y: -190, rotate: 12 }, // N
  { x: 240, y: -20, rotate: -11 }, // C
  { x: 60, y: 150, rotate: 8 }, // E
];

const AUTOMATION_OFFSETS: LetterOffset[] = [
  { x: -220, y: 90, rotate: 9 }, // A
  { x: -150, y: -130, rotate: -11 }, // U
  { x: -80, y: 160, rotate: 7 }, // T
  { x: -10, y: -170, rotate: -8 }, // O
  { x: 60, y: 120, rotate: 12 }, // M
  { x: 130, y: -100, rotate: -6 }, // A
  { x: 200, y: 80, rotate: 10 }, // T
  { x: -190, y: -40, rotate: -13 }, // I
  { x: 20, y: 200, rotate: 6 }, // O
  { x: 230, y: -60, rotate: -9 }, // N
];

const EXECUTION_OFFSETS: LetterOffset[] = [
  { x: -230, y: -50, rotate: -10 }, // E
  { x: -160, y: 150, rotate: 8 }, // X
  { x: -90, y: -140, rotate: -12 }, // E
  { x: -20, y: 130, rotate: 9 }, // C
  { x: 50, y: -160, rotate: -7 }, // U
  { x: 120, y: 100, rotate: 11 }, // T
  { x: 190, y: -80, rotate: -9 }, // I
  { x: -190, y: 30, rotate: 13 }, // O
  { x: 30, y: 190, rotate: -6 }, // N
];

const TRANSFORMATION_OFFSETS: LetterOffset[] = [
  { x: -260, y: -70, rotate: -11 }, // T
  { x: -210, y: 120, rotate: 8 }, // R
  { x: -160, y: -150, rotate: -9 }, // A
  { x: -110, y: 100, rotate: 12 }, // N
  { x: -60, y: -120, rotate: -7 }, // S
  { x: -10, y: 160, rotate: 10 }, // F
  { x: 40, y: -100, rotate: -13 }, // O
  { x: 90, y: 140, rotate: 6 }, // R
  { x: 140, y: -130, rotate: -8 }, // M
  { x: 190, y: 90, rotate: 11 }, // A
  { x: 230, y: -60, rotate: -10 }, // T
  { x: -230, y: 40, rotate: 9 }, // I
  { x: 10, y: 200, rotate: -12 }, // O
  { x: 260, y: 30, rotate: 7 }, // N
];

export const JOURNEY_WORDS: JourneyWord[] = [
  {
    label: "01 COMPLEXITY",
    word: "COMPLEXITY",
    colorClass: "text-white",
    support: "",
    offsets: COMPLEXITY_OFFSETS,
  },
  {
    label: "02 CLARITY",
    word: "CLARITY",
    colorClass: "text-brand",
    support: "",
    offsets: [],
  },
  {
    label: "03 INTELLIGENCE",
    word: "INTELLIGENCE",
    colorClass: "text-white",
    support: "Make intelligence-led decisions.",
    offsets: INTELLIGENCE_OFFSETS,
  },
  {
    label: "04 AUTOMATION",
    word: "AUTOMATION",
    colorClass: "text-brand",
    support: "Turn insight into action.",
    offsets: AUTOMATION_OFFSETS,
  },
  {
    label: "05 EXECUTION",
    word: "EXECUTION",
    colorClass: "text-white",
    support: "Strategy only matters when it moves.",
    offsets: EXECUTION_OFFSETS,
  },
  {
    label: "06 TRANSFORMATION",
    word: "TRANSFORMATION",
    colorClass: "text-brand",
    support: "Technology transformation, with purpose.",
    offsets: TRANSFORMATION_OFFSETS,
  },
];
