"use client";

import { StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
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
    <section className="relative bg-white px-6 py-32 lg:py-40 overflow-hidden">
      {/* Subtle dot pattern background */}
      <DotPattern
        width={28}
        height={28}
        cr={0.6}
        className={cn(
          "[&_circle]:fill-titanium-light/20",
          "mask-[radial-gradient(500px_circle_at_0%_50%,white,transparent)]"
        )}
      />
      <div className="relative z-10 mx-auto max-w-275">
        <SectionHeader
          label="Full Scope"
          title="One robot. Every role."
          description="Optimus doesn't just handle lab work. It assumes full practice automation — from fabrication to facility maintenance. In-office placement, staff training, location-specific customization, and ongoing service subscription included."
          light
        />

        <StaggerFadeIn
          className="mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            const isDark = cap.title === "Facility Maintenance";
            return (
              <div
                key={cap.title}
                className={`relative overflow-hidden rounded-lg border p-7 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                  isDark
                    ? "bg-void border-titanium-dark hover:border-cyan-muted hover:shadow-[0_0_40px_rgba(94,175,197,0.35)]"
                    : cap.featured
                      ? "sm:col-span-2 bg-light-card border-cyan-muted/30 hover:border-titanium-light/50"
                      : "bg-light-card border-light-border hover:border-titanium-light/50"
                }`}
              >
                <Icon
                  className={`mb-4 ${
                    isDark ? "h-6 w-6 text-titanium-light"
                    : cap.featured ? "h-8 w-8 text-light-text" : "h-6 w-6 text-light-muted"
                  }`}
                  strokeWidth={1.5}
                />
                <h3 className={`font-display text-[18px] font-semibold leading-[1.4] ${isDark ? "text-white-pure" : "text-light-text"}`}>
                  {cap.title}
                </h3>
                <p className={`mt-3 font-body text-[14px] leading-[1.75] ${isDark ? "text-titanium-light" : "text-light-muted"}`}>
                  {cap.description}
                </p>
                {cap.title === "Prosthetic Fabrication" && (
                  <BorderBeam size={80} duration={8} colorFrom="#5EAFC5" colorTo="#3D7A8F" borderWidth={1} />
                )}
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
