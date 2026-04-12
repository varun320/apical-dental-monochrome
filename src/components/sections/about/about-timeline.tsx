"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Landmark, Lightbulb, Building2, Rocket } from "lucide-react";

const milestones = [
  {
    year: 1980,
    title: "The Foundation",
    description: "Established with a vision to elevate dental precision beyond what was thought possible.",
    stat: { value: 40, suffix: "+", label: "Years of Expertise" },
    icon: Landmark,
    image: "/images/timeline-1980.png",
  },
  {
    year: 2000,
    title: "Innovation Begins",
    description: "Pioneering robotic-assisted dental procedures, pushing the boundaries of laboratory automation.",
    stat: { value: 800, suffix: "+", label: "Adaptations" },
    icon: Lightbulb,
    image: "/images/timeline-2000.png",
  },
  {
    year: 2015,
    title: "Scaling Impact",
    description: "Expanding across dental service organizations nationwide — precision at scale.",
    stat: { value: 500, suffix: "+", label: "DSO Offices" },
    icon: Building2,
    image: "/images/timeline-2015.png",
  },
  {
    year: 2024,
    title: "The Future",
    description: "Leading the next generation with Tesla's Optimus integration — zero barriers, infinite potential.",
    stat: { value: 0, suffix: "", label: "Regulatory Barriers" },
    icon: Rocket,
    image: "/images/timeline-2024.png",
  },
] as const;

export function AboutTimeline() {
  return (
    <section className="relative bg-white px-6 py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* 50/50 — header left, timeline right */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-start">
          {/* Left — header */}
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
                The Evolution
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,36px)] font-bold leading-[1.1] tracking-[-1px] text-light-text">
                Four decades of relentless progress.
              </h2>
              <p className="mt-6 font-body text-[16px] leading-[1.7] text-light-muted">
                From a single laboratory to a nationwide robotic dental network — every year brought us closer to the future.
              </p>
            </div>
          </FadeIn>

          {/* Right — milestone cards stacked */}
          <StaggerFadeIn className="flex flex-col gap-5" stagger={0.12}>
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isLast = i === milestones.length - 1;
              return (
                <div
                  key={milestone.year}
                  className={`relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                    isLast
                      ? "bg-void border-titanium-dark hover:border-cyan-muted hover:shadow-[0_0_40px_rgba(94,175,197,0.35)]"
                      : "bg-light-card border-light-border shadow-sm hover:border-titanium-light/50"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    {/* Image thumbnail */}
                    <div className="hidden sm:block w-[80px] h-[80px] shrink-0 rounded-lg overflow-hidden">
                      <ImagePlaceholder
                        src={milestone.image}
                        alt={milestone.title}
                        className="h-full w-full rounded-lg border-0"
                        overlay={isLast ? "dark" : "light"}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 ${isLast ? "text-white-pure" : "text-light-muted"}`} strokeWidth={1.5} />
                        <p className={`font-display text-[24px] font-bold leading-none tracking-[-1px] ${isLast ? "text-white-pure" : "text-light-text"}`}>
                          {milestone.year}
                        </p>
                      </div>
                      <h3 className={`mt-2 font-display text-[17px] font-semibold leading-[1.2] tracking-[-0.3px] ${isLast ? "text-white-pure" : "text-light-text"}`}>
                        {milestone.title}
                      </h3>
                      <p className={`mt-1.5 font-body text-[13px] leading-[1.7] ${isLast ? "text-titanium-light" : "text-light-muted"}`}>
                        {milestone.description}
                      </p>
                    </div>

                    {/* Stat */}
                    <div className="hidden sm:block text-right shrink-0">
                      <div className={`font-display text-[22px] font-bold leading-none tracking-[-1px] ${isLast ? "text-white-pure" : "text-light-text"}`}>
                        <NumberTicker value={milestone.stat.value} delay={0.5} />
                        {milestone.stat.suffix}
                      </div>
                      <p className={`mt-1 font-display text-[9px] font-semibold uppercase tracking-[2px] ${isLast ? "text-titanium" : "text-light-muted"}`}>
                        {milestone.stat.label}
                      </p>
                    </div>
                  </div>

                  {isLast && (
                    <BorderBeam size={80} duration={8} colorFrom="#5EAFC5" colorTo="#3D7A8F" borderWidth={1} />
                  )}
                </div>
              );
            })}
          </StaggerFadeIn>
        </div>
      </div>
    </section>
  );
}
