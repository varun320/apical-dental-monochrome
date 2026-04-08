import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TechHero } from "@/components/sections/technology/tech-hero";
import { TechSystemBreakdown } from "@/components/sections/technology/tech-system-breakdown";
import { TechHowItWorks } from "@/components/sections/technology/tech-how-it-works";
import { TechComparison } from "@/components/sections/technology/tech-comparison";
import { TechTrust } from "@/components/sections/technology/tech-trust";

export const metadata = {
  title: "Technology — Apical Dental",
  description:
    "The future of robotic dentistry. Precision engineered, clinically proven — Tesla's Optimus integration for dental laboratory excellence.",
};

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <main>
        <TechHero />
        <TechSystemBreakdown />
        <TechHowItWorks />
        <TechComparison />
        <TechTrust />
      </main>
      <Footer />
    </>
  );
}
