"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    gsap.set(progress, { scaleX: 0, transformOrigin: "left", force3D: true });
    gsap.set(cards, { opacity: 0, y: 40, force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    // Animate progress line
    tl.to(progress, { scaleX: 1, duration: 4, ease: "none", force3D: true }, 0);

    // Stagger card entrances across the timeline
    cards.forEach((card, i) => {
      const startTime = i * 1;
      tl.to(card, {
        opacity: 1, y: 0, duration: 0.8, ease: "none", force3D: true,
      }, startTime);

      // Dim previous card
      if (i > 0) {
        tl.to(cards[i - 1], {
          opacity: 0.5, duration: 0.5, ease: "none",
        }, startTime);
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-void px-6 py-28 lg:py-36 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Section header ── */}
        <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
          The Evolution
        </p>
        <h2 className="font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
          Four decades of relentless progress.
        </h2>

        {/* ── Timeline track ── */}
        <div className="relative mt-20">
          {/* Progress line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-titanium-dark">
            <div ref={progressRef} className="h-full w-full bg-white-pure" />
          </div>

          {/* Milestone cards */}
          <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isLast = i === milestones.length - 1;
              return (
                <div
                  key={milestone.year}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-6"
                >
                  {/* Dot on the line */}
                  <div className="absolute -top-[17px] left-6">
                    <div className="h-2.5 w-2.5 rounded-full border border-titanium-dark bg-void" />
                  </div>

                  {/* Era image strip */}
                  <ImagePlaceholder
                    src={milestone.image}
                    alt={milestone.title}
                    className="mb-4 h-[80px] w-full rounded-md border-0"
                    overlay="dark"
                  />

                  <Icon className="mb-4 h-5 w-5 text-titanium" strokeWidth={1.5} />

                  <p className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 font-body text-[14px] leading-[1.75] text-titanium-light">
                    {milestone.description}
                  </p>

                  {/* Stat */}
                  <div className="mt-4 border-t border-titanium-dark pt-4">
                    <div className="font-display text-[22px] font-bold leading-none tracking-[-1px] text-white-pure">
                      <NumberTicker value={milestone.stat.value} delay={0.5} />
                      {milestone.stat.suffix}
                    </div>
                    <p className="mt-1 font-display text-[9px] font-semibold uppercase tracking-[2px] text-titanium">
                      {milestone.stat.label}
                    </p>
                  </div>

                  {isLast && (
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
          </div>
        </div>
      </div>
    </section>
  );
}
