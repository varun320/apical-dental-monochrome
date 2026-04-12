"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FadeIn } from "@/components/animations/fade-in";
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
    description: "Pioneering robotic-assisted dental procedures, pushing the boundaries of what laboratory automation could achieve.",
    stat: { value: 800, suffix: "+", label: "Adaptations" },
    icon: Lightbulb,
    image: "/images/timeline-2000.png",
  },
  {
    year: 2015,
    title: "Scaling Impact",
    description: "Expanding across dental service organizations nationwide, proving that precision at scale was not just possible — it was inevitable.",
    stat: { value: 500, suffix: "+", label: "DSO Offices" },
    icon: Building2,
    image: "/images/timeline-2015.png",
  },
  {
    year: 2024,
    title: "The Future",
    description: "Leading the next generation of precision dentistry with Tesla's Optimus integration — zero regulatory barriers, infinite potential.",
    stat: { value: 0, suffix: "", label: "Regulatory Barriers" },
    icon: Rocket,
    image: "/images/timeline-2024.png",
  },
] as const;

export function AboutTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const track = trackRef.current;
    if (!line || !track) return;

    gsap.set(line, { scaleX: 0, transformOrigin: "left" });

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top 70%",
      end: "bottom 50%",
      onUpdate: (self) => {
        gsap.set(line, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative bg-white px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <FadeIn>
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
            The Evolution
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-light-text">
            Four decades of relentless progress.
          </h2>
        </FadeIn>

        <div ref={trackRef} className="relative mt-20">
          {/* Progress line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-light-border">
            <div ref={lineRef} className="h-full w-full bg-cyan" />
          </div>

          {/* Milestone cards */}
          <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isLast = i === milestones.length - 1;
              return (
                <FadeIn key={milestone.year} delay={i * 0.12} direction="up" distance={30}>
                  <div className="relative overflow-hidden rounded-lg border border-light-border bg-light-card p-6 shadow-sm h-full transition-all hover:shadow-lg hover:-translate-y-1.5 hover:border-cyan-muted/30">
                    {/* Dot on the line */}
                    <div className="absolute -top-[17px] left-6">
                      <div className="h-2.5 w-2.5 rounded-full border border-light-border bg-white" />
                    </div>

                    <ImagePlaceholder
                      src={milestone.image}
                      alt={milestone.title}
                      className="mb-4 h-[80px] w-full rounded-md border-0"
                      overlay="light"
                    />

                    <Icon className="mb-4 h-5 w-5 text-light-muted" strokeWidth={1.5} />

                    <p className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-light-text">
                      {milestone.year}
                    </p>
                    <h3 className="mt-2 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] text-light-text">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 font-body text-[14px] leading-[1.75] text-light-muted">
                      {milestone.description}
                    </p>

                    <div className="mt-4 border-t border-light-border pt-4">
                      <div className="font-display text-[22px] font-bold leading-none tracking-[-1px] text-mint">
                        <NumberTicker value={milestone.stat.value} delay={0.5} />
                        {milestone.stat.suffix}
                      </div>
                      <p className="mt-1 font-display text-[9px] font-semibold uppercase tracking-[2px] text-light-muted">
                        {milestone.stat.label}
                      </p>
                    </div>

                    {isLast && (
                      <BorderBeam
                        size={80}
                        duration={8}
                        colorFrom="#5EAFC5"
                        colorTo="#3D7A8F"
                        borderWidth={1}
                      />
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
