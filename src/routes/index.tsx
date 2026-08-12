import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/Hero";
import { BrandIntroduction } from "@/components/sections/BrandIntroduction";
import { MissionVision } from "@/components/sections/MissionVision";
import { Values } from "@/components/sections/Values";
import { Philosophy } from "@/components/sections/Philosophy";
import { Capabilities } from "@/components/sections/Capabilities";
import { Insights } from "@/components/sections/Insights";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const title = "MetisJean — Guiding You Through Technology Transformation";
const description =
  "MetisJean brings order to complexity: intelligence-led decisions, intelligent automation, and measurable impact at scale.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <main>
        <BrandIntroduction />
        <MissionVision />
        <Values />
        <Philosophy />
        <Capabilities />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
