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
    <section className="relative bg-white px-6 py-28 lg:py-36 overflow-hidden">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <FadeIn>
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
            Built for Scale
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-16 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-light-text">
            Enterprise-grade from day one.
          </h2>
        </FadeIn>

        <StaggerFadeIn className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const isDark = benefit.title === "Zero Regulatory Friction";
            return (
              <div
                key={benefit.title}
                className={`relative overflow-hidden rounded-lg border p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                  isDark
                    ? "bg-void border-titanium-dark hover:border-titanium"
                    : "bg-light-card border-light-border hover:border-cyan-muted/30"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                  isDark ? "border-titanium-dark bg-deep-void" : "border-light-border bg-light-bg"
                }`}>
                  <Icon className={`h-5 w-5 ${isDark ? "text-cyan" : "text-light-muted"}`} strokeWidth={1.5} />
                </div>
                <h3 className={`mt-4 font-display text-[16px] font-semibold leading-[1.2] tracking-[-0.3px] ${isDark ? "text-white-pure" : "text-light-text"}`}>
                  {benefit.title}
                </h3>
                <p className={`mt-2 font-body text-[13px] leading-[1.7] ${isDark ? "text-titanium-light" : "text-light-muted"}`}>
                  {benefit.description}
                </p>

                {isDark && (
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
