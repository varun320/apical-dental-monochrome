"use client";

import { TextRevealByLine } from "@/components/animations/text-reveal";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { ParallaxSection } from "@/components/animations/parallax-section";
import { NumberTicker } from "@/components/ui/number-ticker";
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
    <section className="relative bg-linear-to-b from-void via-deep-void to-void px-6 py-28 lg:py-36 overflow-hidden">
      {/* ── Background ── */}
      <ParallaxSection speed={0.5} className="absolute inset-0">
        <DotPattern
          width={28}
          height={28}
          cr={0.6}
          className="text-titanium-dark/20 mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
        />
      </ParallaxSection>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Headline ── */}
        <div className="text-center">
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
            Our Mission
          </p>
          <TextRevealByLine
            className="font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.1] tracking-[-1.5px] text-white-pure"
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
                className="rounded-lg border border-titanium-dark bg-deep-void/50 p-8"
              >
                <Icon className="mb-5 h-6 w-6 text-titanium" strokeWidth={1.5} />
                <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
                  {value.description}
                </p>
                <div className="mt-5 border-t border-titanium-dark pt-5">
                  <div className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                    {value.metric.prefix}
                    <NumberTicker
                      value={value.metric.value}
                      delay={0.3}
                      decimalPlaces={value.metric.decimals}
                    />
                    {value.metric.suffix}
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
