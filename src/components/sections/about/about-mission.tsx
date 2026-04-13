"use client";

import { TextRevealByLine } from "@/components/animations/text-reveal";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Crosshair, Building2, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Crosshair,
    title: "Precision",
    description: "Sub-millimeter accuracy in every procedure, powered by robotic systems that never fatigue, never waver.",
    metric: { value: 0.1, prefix: "±", suffix: "mm", decimals: 1 },
  },
  {
    icon: Building2,
    title: "Accessibility",
    description: "Making robotic dentistry available to every practice — from independent offices to nationwide DSO networks.",
    metric: { value: 500, prefix: "", suffix: "+", decimals: 0 },
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuous advancement in robotic-assisted care, with over 800 adaptations and counting.",
    metric: { value: 800, prefix: "", suffix: "+", decimals: 0 },
  },
] as const;

export function AboutMission() {
  return (
    <section className="relative bg-light-bg px-6 py-32 lg:py-40 overflow-hidden">

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Headline ── */}
        <div className="text-center">
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
            Our Mission
          </p>
          <TextRevealByLine
            className="font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.1] tracking-[-1.5px] text-light-text"
          >
            {["Human Expertise.", "Amplified."]}
          </TextRevealByLine>
        </div>

        {/* ── Value cards ── */}
        <StaggerFadeIn
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.15}
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="relative overflow-hidden rounded-lg border border-light-border bg-light-card p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1.5 hover:border-titanium-light/50"
              >
                <Icon className={`mb-5 h-6 w-6 ${value.title === "Precision" ? "text-light-muted" : "text-light-muted"}`} strokeWidth={1.5} />
                <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] text-light-text">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-[1.75] text-light-muted">
                  {value.description}
                </p>
                <div className="mt-5 border-t border-light-border pt-5">
                  <div className={`font-display text-[28px] font-bold leading-none tracking-[-1.5px] ${value.title === "Precision" ? "text-mint" : "text-light-text"}`}>
                    {value.metric.prefix}
                    <NumberTicker
                      value={value.metric.value}
                      delay={0.3}
                      decimalPlaces={value.metric.decimals}
                    />
                    {value.metric.suffix}
                  </div>
                </div>
                {value.title === "Precision" && (
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
