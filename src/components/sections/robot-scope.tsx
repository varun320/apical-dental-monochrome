"use client";

import { StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Crown, BrainCircuit, Sparkles, Package, MessageSquare, Wrench } from "lucide-react";

const capabilities = [
  {
    icon: Crown,
    title: "Prosthetic Fabrication",
    description:
      "Surgical-grade dental prosthetics manufactured with superhuman precision. Every crown, bridge, and implant — perfect on delivery.",
    featured: true,
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Diagnostics",
    description:
      "X-ray analysis with executive summaries for the doctor. Contraindication flagging. Instant, comprehensive, actionable.",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Sterilization",
    description:
      "Automated instrument sterilization protocols. Consistent, documented, and compliant — every single time.",
    featured: false,
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Supply ordering with real-time market-price research. Automated procurement that saves money and eliminates stockouts.",
    featured: false,
  },
  {
    icon: MessageSquare,
    title: "Patient Communication",
    description:
      "Real-time language translation. Appointment coordination. Insurance documentation — handled seamlessly.",
    featured: false,
  },
  {
    icon: Wrench,
    title: "Facility Maintenance",
    description:
      "Equipment monitoring, maintenance scheduling, and facility operations. The robot manages the physical environment.",
    featured: false,
  },
];

export function RobotScope() {
  return (
    <section className="relative bg-linear-to-b from-void via-deep-void to-deep-void px-6 py-28 lg:py-36 overflow-hidden">
      {/* Subtle dot pattern background */}
      <DotPattern
        width={28}
        height={28}
        cr={0.6}
        className={cn(
          
          "mask-[radial-gradient(500px_circle_at_0%_50%,white,transparent)]"
        )}
      />
      <div className="relative z-10 mx-auto max-w-275">
        <SectionHeader
          label="Full Scope"
          title="One robot. Every role."
          description="Optimus doesn't just handle lab work. It assumes full practice automation — from fabrication to facility maintenance. In-office placement, staff training, location-specific customization, and ongoing service subscription included."
        />

        <StaggerFadeIn
          className="mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={`rounded-lg border border-titanium-dark bg-void p-7 transition-colors hover:border-titanium/40 ${
                  cap.featured ? "sm:col-span-2" : ""
                }`}
              >
                <Icon
                  className={`mb-4 text-titanium ${cap.featured ? "h-8 w-8" : "h-6 w-6"}`}
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-[18px] font-semibold leading-[1.4] text-white-pure">
                  {cap.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
