"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
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
  return (
    <section className="relative bg-white px-6 py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* 50/50 split — text left, cards right */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-start">
          {/* Left — sticky header */}
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
                The Path
              </p>
              <h2 className="mt-4 font-display text-[clamp(28px,4vw,36px)] font-bold leading-[1.1] tracking-[-1px] text-light-text">
                Staged entry.<br />Zero resistance.
              </h2>
              <p className="mt-6 font-body text-[16px] leading-[1.7] text-light-muted">
                The dental laboratory is the zero-resistance entry point. No regulatory barriers exist. From there, Optimus expands into every aspect of practice operation.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan" />
                <p className="font-display text-[11px] font-semibold uppercase tracking-[2px] text-cyan-muted">
                  Phase 01 is live today
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right — phase cards in 2x2 grid */}
          <StaggerFadeIn className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isLast = stage.phase === "Phase 04";
              return (
                <div
                  key={stage.phase}
                  className={`relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                    isLast
                      ? "bg-void border-titanium-dark hover:border-cyan-muted hover:shadow-[0_0_40px_rgba(94,175,197,0.35)]"
                      : stage.active
                        ? "bg-light-card border-cyan-muted shadow-sm hover:border-titanium-light/50"
                        : "bg-light-card border-light-border shadow-sm hover:border-titanium-light/50"
                  }`}
                >
                  <Icon
                    className={`mb-3 h-5 w-5 ${isLast ? "text-titanium-light" : stage.active ? "text-light-muted" : "text-light-muted"}`}
                    strokeWidth={1.5}
                  />
                  <p className={`font-display text-[10px] font-semibold uppercase tracking-[2px] ${isLast ? "text-titanium" : "text-light-muted"}`}>
                    {stage.phase}
                  </p>
                  <h3 className={`mt-1 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] ${isLast ? "text-white-pure" : "text-light-text"}`}>
                    {stage.title}
                  </h3>
                  <span className={`mt-1 inline-block font-display text-[10px] font-semibold uppercase tracking-[2px] ${
                    isLast ? "text-white-pure" : stage.active ? "text-light-muted" : "text-light-muted"
                  }`}>
                    {stage.status}
                  </span>
                  <p className={`mt-2 font-body text-[13px] leading-[1.75] ${isLast ? "text-titanium-light" : "text-light-muted"}`}>
                    {stage.description}
                  </p>

                  {stage.active && (
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
