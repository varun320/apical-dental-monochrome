import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutOrigin } from "@/components/sections/about/about-origin";
import { AboutTimeline } from "@/components/sections/about/about-timeline";
import { AboutMission } from "@/components/sections/about/about-mission";
import { AboutImpact } from "@/components/sections/about/about-impact";

export const metadata = {
  title: "About — Apical Dental",
  description:
    "Four decades of redefining dental precision. From a single laboratory to 500+ DSO offices — the Apical Dental story.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutOrigin />
        <AboutTimeline />
        <AboutMission />
        <AboutImpact />
      </main>
      <Footer />
    </>
  );
}
