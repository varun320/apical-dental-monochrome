import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DSOHero } from "@/components/sections/for-dsos/dso-hero";
import { DSOBusinessCase } from "@/components/sections/for-dsos/dso-roi";
import { DSOScale } from "@/components/sections/for-dsos/dso-scale";
import { DSOPartnership } from "@/components/sections/for-dsos/dso-partnership";
import { DSOCTA } from "@/components/sections/for-dsos/dso-cta";

export const metadata = {
  title: "For DSOs — Apical Dental",
  description:
    "Scale robotic precision across every office. Reduce remakes, accelerate turnaround, and standardize quality for dental service organizations.",
};

export default function ForDSOsPage() {
  return (
    <>
      <Navbar />
      <main>
        <DSOHero />
        <DSOBusinessCase />
        <DSOScale />
        <DSOPartnership />
        <DSOCTA />
      </main>
      <Footer />
    </>
  );
}
