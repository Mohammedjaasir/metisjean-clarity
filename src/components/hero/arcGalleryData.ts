import a1 from "@/assets/gallery/mj-1.jpg";
import a2 from "@/assets/gallery/mj-2.jpg";
import a3 from "@/assets/gallery/mj-3.jpg";
import a4 from "@/assets/gallery/mj-4.jpg";
import a5 from "@/assets/gallery/mj-5.jpg";
import a6 from "@/assets/gallery/mj-6.jpg";
import a7 from "@/assets/gallery/mj-7.jpg";

export interface ArcGalleryItem {
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  year: string;
}

export const ARC_GALLERY_ITEMS: ArcGalleryItem[] = [
  {
    src: a1,
    alt: "A diverse team collaborating around a table in a modern office",
    category: "Intelligent Automation",
    title: "Intelligent Automation",
    description: "Transforming repetitive business processes into intelligent, scalable workflows.",
    year: "2026",
  },
  {
    src: a2,
    alt: "An executive reviewing data on a tablet by a window",
    category: "Technology Transformation",
    title: "Technology Transformation",
    description:
      "Helping organisations navigate complex technology change with clarity and purpose.",
    year: "2026",
  },
  {
    src: a3,
    alt: "Abstract blue line visualisation of connected data",
    category: "Decision Intelligence",
    title: "Decision Intelligence",
    description:
      "Turning complex information into intelligence that enables faster, better decisions.",
    year: "2026",
  },
  {
    src: a4,
    alt: "Two colleagues mapping a system on a glass whiteboard",
    category: "Strategic Execution",
    title: "Strategic Execution",
    description: "Turning strategic direction into measurable action.",
    year: "2026",
  },
  {
    src: a5,
    alt: "Hands writing notes beside a laptop in natural light",
    category: "Business Intelligence",
    title: "Business Intelligence",
    description: "Creating clarity from complex operational and business data.",
    year: "2026",
  },
  {
    src: a6,
    alt: "Daylight falling through a modern glass office corridor",
    category: "Digital Transformation",
    title: "Digital Transformation",
    description: "Connecting people, processes and technology to create measurable impact.",
    year: "2026",
  },
  {
    src: a7,
    alt: "A person walking through a bright minimal lobby",
    category: "Technology Transformation",
    title: "Technology Transformation",
    description:
      "Helping organisations navigate complex technology change with clarity and purpose.",
    year: "2026",
  },
];
