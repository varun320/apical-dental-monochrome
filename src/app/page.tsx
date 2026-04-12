import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { RobotScope } from "@/components/sections/robot-scope";
import { StagedPath } from "@/components/sections/staged-path";
import { Authority } from "@/components/sections/authority";
import { DSOCase } from "@/components/sections/dso-case";
import { SocialProof } from "@/components/sections/social-proof";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <RobotScope />
        <StagedPath />
        <Authority />
        <DSOCase />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
