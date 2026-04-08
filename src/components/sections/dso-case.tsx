"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { BorderBeam } from "@/components/ui/border-beam";
import { Bot, Building2, ShieldCheck, Rocket } from "lucide-react";

const benefits = [
  {
    title: "Robot-as-a-Service",
    value: "$3,667",
    unit: "/mo per robot",
    description:
      "Predictable monthly cost. Includes placement, staff training, location-specific customization, and ongoing service subscription.",
    icon: Bot,
  },
  {
    title: "Built-In Distribution",
    value: "500+",
    unit: "DSO offices",
    description:
      "Dr. Lewis operates inside a 500+ office DSO network. The infrastructure for scale already exists.",
    icon: Building2,
  },
  {
    title: "Zero Regulatory Friction",
    value: "0",
    unit: "barriers",
    description:
      "The dental lab side is completely unregulated. The robot enters through lab work first — zero resistance from licensing boards.",
    icon: ShieldCheck,
  },
];

export function DSOCase() {
  return (
    <section className="relative bg-linear-to-b from-deep-void via-void to-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="For DSOs"
          title="The business case writes itself."
          description="Replace the cost of hiring, training, and retaining lab technicians with a single subscription. AI-backed diagnostics reduce insurance costs. Robotic precision eliminates rework."
        />

        {/* ── Benefit Cards (3-column) ── */}
        <StaggerFadeIn className="mt-16 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-lg border border-titanium-dark bg-deep-void p-8 transition-colors hover:border-titanium/40"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-titanium" strokeWidth={1.5} />
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                    {b.title}
                  </p>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-[36px] font-bold leading-none tracking-[-1px] text-white-pure">
                    {b.value}
                  </span>
                  <span className="font-display text-[11px] font-semibold uppercase tracking-[1px] text-titanium">
                    {b.unit}
                  </span>
                </div>
                <p className="mt-4 font-body text-[14px] leading-[1.75] text-titanium-light">
                  {b.description}
                </p>
              </div>
            );
          })}
        </StaggerFadeIn>

        {/* ── Scale Projection (full-width card with BorderBeam) ── */}
        <FadeIn delay={0.4}>
          <div className="relative mt-4 overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <Rocket className="mt-1 h-6 w-6 shrink-0 text-titanium" strokeWidth={1.5} />
                <div>
                  <h3 className="font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                    Scale projection
                  </h3>
                  <p className="mt-2 font-body text-[14px] leading-[1.75] text-titanium-light">
                    250 robots deployed at $3,667/month each. $11M+ projected
                    annual revenue. White-glove onboarding and continuous support
                    at every location.
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-display text-[44px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                  $11M+
                </div>
                <p className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                  Annual Revenue Target
                </p>
              </div>
            </div>
            <BorderBeam
              size={100}
              duration={10}
              colorFrom="#9A9AB0"
              colorTo="#3A3A4E"
              borderWidth={1}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
