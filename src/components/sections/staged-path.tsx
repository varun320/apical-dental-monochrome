"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/section-header";
import { FlaskRound, Stethoscope, Scissors, Bot } from "lucide-react";

const stages = [
  {
    phase: "Phase 01",
    title: "Dental Laboratory",
    status: "Active — Zero Barriers",
    description:
      "The dental lab is completely unregulated. No licensing boards. No regulatory friction. Optimus enters here — perfect from day one.",
    icon: FlaskRound,
  },
  {
    phase: "Phase 02",
    title: "Office Support",
    status: "Near-term",
    description:
      "Sterilization, inventory management, supply ordering with market-price research, patient communication, and facility maintenance.",
    icon: Stethoscope,
  },
  {
    phase: "Phase 03",
    title: "Surgical Assistance",
    status: "Mid-term",
    description:
      "AI-powered diagnostics, X-ray analysis with executive summaries, contraindication flagging, and real-time surgical support.",
    icon: Scissors,
  },
  {
    phase: "Phase 04",
    title: "Autonomous Operation",
    status: "Long-term Vision",
    description:
      "Full autonomous dental practice operation. From diagnosis to treatment to post-op. The ultimate convergence of human expertise and robotic precision.",
    icon: Bot,
  },
];

export function StagedPath() {
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = lineRef.current;
    const container = timelineRef.current;
    if (!el || !container) return;

    const dots = dotsRef.current.filter(Boolean) as HTMLDivElement[];
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const activated = new Array(dots.length).fill(false);

    gsap.set(el, { scaleX: 0, transformOrigin: "left" });

    // Cards stagger entrance
    gsap.set(cards, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
        });
      },
    });

    // Progress line + dot/card activation
    const dotPositions = [0.02, 0.28, 0.54, 0.78];

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      end: "bottom 50%",
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress });

        dots.forEach((dot, i) => {
          const shouldActivate = self.progress >= dotPositions[i];

          if (shouldActivate && !activated[i]) {
            activated[i] = true;
            // Fill dot
            gsap.to(dot, {
              backgroundColor: "#F5F5F8",
              borderColor: "#F5F5F8",
              boxShadow: "0 0 10px 3px rgba(245,245,248,0.5)",
              scale: 1.5,
              duration: 0.4,
              ease: "back.out(2)",
              overwrite: true,
            });
            // Activate card — scale up + brighter border
            if (cards[i]) {
              gsap.to(cards[i], {
                scale: 1.03,
                borderColor: "#9A9AB0",
                duration: 0.4,
                ease: "power2.out",
                overwrite: true,
              });
            }
          } else if (!shouldActivate && activated[i]) {
            activated[i] = false;
            // Reset dot
            gsap.to(dot, {
              backgroundColor: "#08080E",
              borderColor: "#3A3A4E",
              boxShadow: "0 0 0px 0px rgba(245,245,248,0)",
              scale: 1,
              duration: 0.3,
              overwrite: true,
            });
            // Reset card
            if (cards[i]) {
              gsap.to(cards[i], {
                scale: 1,
                borderColor: "#3A3A4E",
                duration: 0.3,
                overwrite: true,
              });
            }
          }
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative bg-linear-to-b from-deep-void via-void to-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(13,13,28,0.5)_100%)]" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="The Path"
          title="Staged entry. Zero resistance."
          description="The dental laboratory is the zero-resistance entry point. No regulatory barriers exist. From there, Optimus expands into every aspect of practice operation."
        />

        <div ref={timelineRef} className="relative mt-16">
          {/* ── Horizontal connecting line with glow ── */}
          <div className="absolute top-0 left-0 right-0 z-20 hidden lg:block">
            <div className="h-px w-full bg-titanium-dark" />
            <div className="absolute top-0 left-0 h-px w-full origin-left" ref={lineRef}>
              <div className="h-px w-full bg-linear-to-r from-white-pure via-titanium-light to-white-pure" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white-pure shadow-[0_0_8px_2px_rgba(245,245,248,0.5)]" />
            </div>
          </div>

          {/* ── Dots (separate layer above cards) ── */}
          <div className="absolute top-0 left-0 right-0 z-20 hidden lg:grid grid-cols-4 gap-4">
            {stages.map((_, i) => (
              <div key={i} className="relative">
                <div
                  ref={(dotEl) => { dotsRef.current[i] = dotEl; }}
                  className="absolute -top-[5px] left-6 h-2.5 w-2.5 rounded-full border border-titanium-dark bg-void"
                />
              </div>
            ))}
          </div>

          {/* ── Phase Cards ── */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-8">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.phase}
                  ref={(cardEl) => { cardsRef.current[i] = cardEl; }}
                  className="h-full overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-6 origin-center"
                >
                  <Icon
                    className="mb-4 h-5 w-5 text-titanium"
                    strokeWidth={1.5}
                  />
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
                    {stage.phase}
                  </p>
                  <h3 className="mt-1 font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                    {stage.title}
                  </h3>
                  <span className="mt-1 inline-block font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                    {stage.status}
                  </span>
                  <p className="mt-2 font-body text-[14px] leading-[1.75] text-titanium-light">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
