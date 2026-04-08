"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { BorderBeam } from "@/components/ui/border-beam";
import { FlaskRound, Stethoscope, Scissors, Bot } from "lucide-react";

const stages = [
  {
    phase: "Phase 01",
    title: "Dental Laboratory",
    status: "Active — Zero Barriers",
    description:
      "The dental lab is completely unregulated. No licensing boards. No regulatory friction. Optimus enters here — perfect from day one.",
    active: true,
    icon: FlaskRound,
  },
  {
    phase: "Phase 02",
    title: "Office Support",
    status: "Near-term",
    description:
      "Sterilization, inventory management, supply ordering with market-price research, patient communication, and facility maintenance.",
    active: false,
    icon: Stethoscope,
  },
  {
    phase: "Phase 03",
    title: "Surgical Assistance",
    status: "Mid-term",
    description:
      "AI-powered diagnostics, X-ray analysis with executive summaries, contraindication flagging, and real-time surgical support.",
    active: false,
    icon: Scissors,
  },
  {
    phase: "Phase 04",
    title: "Autonomous Operation",
    status: "Long-term Vision",
    description:
      "Full autonomous dental practice operation. From diagnosis to treatment to post-op. The ultimate convergence of human expertise and robotic precision.",
    active: false,
    icon: Bot,
  },
];

export function StagedPath() {
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    const container = timelineRef.current;
    if (!el || !container) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left" });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      end: "bottom 50%",
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress });
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
          {/* ── Horizontal connecting line ── */}
          <div className="absolute top-5 left-0 right-0 hidden h-px bg-titanium-dark lg:block">
            <div ref={lineRef} className="h-full w-full bg-white-pure" />
          </div>

          {/* ── Phase Cards ── */}
          <StaggerFadeIn
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.1}
          >
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.phase}
                  className={`relative overflow-hidden rounded-lg border bg-deep-void p-6 ${
                    stage.active
                      ? "border-titanium lg:row-span-2"
                      : "border-titanium-dark"
                  }`}
                >
                  {/* Dot on the line */}
                  <div className="absolute -top-1.25 left-6 hidden lg:block">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        stage.active
                          ? "bg-white-pure"
                          : "border border-titanium-dark bg-void"
                      }`}
                    />
                  </div>

                  <div className="pt-4 lg:pt-6">
                    <Icon
                      className={`mb-4 ${stage.active ? "h-6 w-6 text-white-pure" : "h-5 w-5 text-titanium"}`}
                      strokeWidth={1.5}
                    />
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
                      {stage.phase}
                    </p>
                    <h3 className="mt-1 font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                      {stage.title}
                    </h3>
                    <span
                      className={`mt-1 inline-block font-display text-[10px] font-semibold uppercase tracking-[2px] ${
                        stage.active ? "text-white-pure" : "text-titanium"
                      }`}
                    >
                      {stage.status}
                    </span>
                    <p className="mt-2 font-body text-[14px] leading-[1.75] text-titanium-light">
                      {stage.description}
                    </p>
                  </div>

                  {stage.active && (
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
      </div>
    </section>
  );
}
