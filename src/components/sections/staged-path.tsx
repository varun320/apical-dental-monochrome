"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FadeIn } from "@/components/animations/fade-in";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const line = lineRef.current;
    const track = trackRef.current;
    const dots = dotsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!line || !track) return;

    gsap.set(line, { scaleX: 0, transformOrigin: "left" });

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top 70%",
      end: "bottom 50%",
      onUpdate: (self) => {
        gsap.set(line, { scaleX: self.progress });
        // Fill dots as line reaches each one (at 0%, 33%, 66%, 100%)
        dots.forEach((dot, i) => {
          const threshold = i / (dots.length - 1);
          if (self.progress >= threshold) {
            gsap.to(dot, { backgroundColor: "#5EAFC5", borderColor: "#5EAFC5", boxShadow: "0 0 6px rgba(94,175,197,0.4)", duration: 0.3 });
          } else {
            gsap.to(dot, { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", boxShadow: "none", duration: 0.3 });
          }
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative bg-light-bg px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="The Path"
          title="Staged entry. Zero resistance."
          description="The dental laboratory is the zero-resistance entry point. No regulatory barriers exist. From there, Optimus expands into every aspect of practice operation."
          light
        />

        <div ref={trackRef} className="relative mt-16">
          {/* ── Progress line ── */}
          <div className="absolute top-0 left-0 right-0 z-10 hidden lg:block">
            <div className="h-px w-full bg-light-border" />
            <div className="absolute top-0 left-0 h-px w-full origin-left" ref={lineRef}>
              <div className="h-px w-full bg-linear-to-r from-cyan via-cyan-muted to-cyan" />
            </div>
          </div>

          {/* ── Phase Cards ── */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-8">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isLast = stage.phase === "Phase 04";
              return (
                <FadeIn key={stage.phase} delay={i * 0.1} direction="up" distance={25} className="h-full">
                  <div className="relative h-full">
                    <div className="absolute -top-[37px] left-6 hidden lg:block">
                      <div
                        ref={(el) => { dotsRef.current[i] = el; }}
                        className="h-2.5 w-2.5 rounded-full border border-light-border bg-white"
                      />
                    </div>

                    <div className={`h-full overflow-hidden rounded-lg border p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                      isLast
                        ? "bg-void border-titanium-dark hover:border-titanium"
                        : stage.active
                          ? "bg-light-card border-cyan-muted hover:border-cyan-muted/30"
                          : "bg-light-card border-light-border hover:border-cyan-muted/30"
                    }`}>
                      <Icon
                        className={`mb-4 h-5 w-5 ${isLast ? "text-titanium-light" : stage.active ? "text-cyan-muted" : "text-light-muted"}`}
                        strokeWidth={1.5}
                      />
                      <p className={`font-display text-[11px] font-semibold uppercase tracking-[3px] ${isLast ? "text-titanium" : "text-light-muted"}`}>
                        {stage.phase}
                      </p>
                      <h3 className={`mt-1 font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] ${isLast ? "text-white-pure" : "text-light-text"}`}>
                        {stage.title}
                      </h3>
                      <span className={`mt-1 inline-block font-display text-[10px] font-semibold uppercase tracking-[2px] ${
                        isLast ? "text-cyan" : stage.active ? "text-cyan-muted" : "text-light-muted"
                      }`}>
                        {stage.status}
                      </span>
                      <p className={`mt-2 font-body text-[14px] leading-[1.75] ${isLast ? "text-titanium-light" : "text-light-muted"}`}>
                        {stage.description}
                      </p>

                      {stage.active && (
                        <BorderBeam size={80} duration={8} colorFrom="#5EAFC5" colorTo="#3D7A8F" borderWidth={1} />
                      )}
                    </div>
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
