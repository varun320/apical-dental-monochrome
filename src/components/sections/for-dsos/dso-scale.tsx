"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { BorderBeam } from "@/components/ui/border-beam";
import { Network, Layers, ShieldCheck, Zap, HeartHandshake, Settings } from "lucide-react";

const benefits = [
  {
    icon: Network,
    title: "Multi-Location Rollout",
    description: "Deploy across 10 or 500 offices with the same standardized workflow. One system, consistent results everywhere.",
  },
  {
    icon: Layers,
    title: "Centralized Quality Control",
    description: "Real-time monitoring and reporting across all locations. Every prosthetic tracked, every metric visible.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Regulatory Friction",
    description: "Dental laboratory automation requires no additional licensing or regulatory clearance. Deploy immediately.",
  },
  {
    icon: Zap,
    title: "Rapid Integration",
    description: "Works with existing CAD/CAM systems, digital impression workflows, and practice management software.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated DSO Support",
    description: "White-glove onboarding, training, and ongoing support tailored to multi-location operations.",
  },
  {
    icon: Settings,
    title: "Customizable Workflows",
    description: "Configure robotic procedures to match your specific protocols, materials, and quality standards.",
  },
] as const;

export function DSOScale() {
  return (
    <section className="relative bg-linear-to-b from-void via-deep-void to-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <FadeIn>
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
            Built for Scale
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-16 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
            Enterprise-grade from day one.
          </h2>
        </FadeIn>

        <StaggerFadeIn className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`relative overflow-hidden rounded-lg border bg-deep-void p-6 ${
                  benefit.title === "Zero Regulatory Friction" ? "border-titanium" : "border-titanium-dark"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-md border bg-void ${
                  benefit.title === "Zero Regulatory Friction" ? "border-titanium" : "border-titanium-dark"
                }`}>
                  <Icon className={`h-5 w-5 ${benefit.title === "Zero Regulatory Friction" ? "text-white-pure" : "text-titanium-light"}`} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-display text-[16px] font-semibold leading-[1.2] tracking-[-0.3px] text-white-pure">
                  {benefit.title}
                </h3>
                <p className="mt-2 font-body text-[13px] leading-[1.7] text-titanium-light">
                  {benefit.description}
                </p>

                {benefit.title === "Zero Regulatory Friction" && (
                  <BorderBeam
                    size={80}
                    duration={8}
                    colorFrom="#9A9AB0"
                    colorTo="#3A3A4E"
                    borderWidth={1}
                  />
                )}
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
