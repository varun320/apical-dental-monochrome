"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { BorderBeam } from "@/components/ui/border-beam";
import { Network, Layers, ShieldCheck, Zap, HeartHandshake, Settings } from "lucide-react";

const benefits = [
  { icon: Network, title: "Multi-Location Rollout", description: "Deploy across 10 or 500 offices with the same standardized workflow." },
  { icon: Layers, title: "Centralized Quality", description: "Real-time monitoring and reporting across all locations." },
  { icon: ShieldCheck, title: "Zero Regulatory Friction", description: "No additional licensing or regulatory clearance needed.", dark: true },
  { icon: Zap, title: "Rapid Integration", description: "Works with existing CAD/CAM and practice management systems." },
  { icon: HeartHandshake, title: "DSO Support", description: "White-glove onboarding, training, and ongoing support." },
  { icon: Settings, title: "Custom Workflows", description: "Configure procedures to match your protocols and standards." },
] as const;

export function DSOScale() {
  return (
    <section className="relative bg-white px-6 py-32 lg:py-40 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* 50/50 — text left, grid right */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-start">
          {/* Left — header */}
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
                Built for Scale
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,36px)] font-bold leading-[1.1] tracking-[-1px] text-light-text">
                Enterprise-grade from day one.
              </h2>
              <p className="mt-6 font-body text-[16px] leading-[1.7] text-light-muted">
                Purpose-built infrastructure for multi-location dental operations. One platform, consistent quality at every office.
              </p>
            </div>
          </FadeIn>

          {/* Right — 2x3 card grid */}
          <StaggerFadeIn className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {benefits.map((b) => {
              const Icon = b.icon;
              const isDark = "dark" in b && b.dark;
              return (
                <div
                  key={b.title}
                  className={`relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                    isDark
                      ? "bg-void border-titanium-dark hover:border-cyan-muted hover:shadow-[0_0_40px_rgba(94,175,197,0.35)]"
                      : "bg-light-card border-light-border shadow-sm hover:border-titanium-light/50"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                    isDark ? "border-titanium-dark bg-deep-void" : "border-light-border bg-light-bg"
                  }`}>
                    <Icon className={`h-5 w-5 ${isDark ? "text-white-pure" : "text-light-muted"}`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`mt-3 font-display text-[15px] font-semibold leading-[1.2] tracking-[-0.3px] ${isDark ? "text-white-pure" : "text-light-text"}`}>
                    {b.title}
                  </h3>
                  <p className={`mt-1.5 font-body text-[13px] leading-[1.7] ${isDark ? "text-titanium-light" : "text-light-muted"}`}>
                    {b.description}
                  </p>
                  {isDark && <BorderBeam size={80} duration={8} colorFrom="#5EAFC5" colorTo="#3D7A8F" borderWidth={1} />}
                </div>
              );
            })}
          </StaggerFadeIn>
        </div>
      </div>
    </section>
  );
}
