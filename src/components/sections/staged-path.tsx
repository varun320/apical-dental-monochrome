"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const stages = [
  {
    phase: "Phase 01",
    timing: "Active",
    title: "Dental laboratory",
    description:
      "Completely unregulated. No licensing boards. No regulatory friction. Optimus enters here — perfect from day one.",
    active: true,
  },
  {
    phase: "Phase 02",
    timing: "Near-term",
    title: "Office support",
    description:
      "Sterilisation, inventory, supply ordering with market-price research, patient comms, and facility maintenance.",
  },
  {
    phase: "Phase 03",
    timing: "Mid-term",
    title: "Surgical assistance",
    description:
      "AI diagnostics, X-ray analysis with executive summaries, contraindication flagging, and real-time surgical support.",
  },
  {
    phase: "Phase 04",
    timing: "Long-term",
    title: "Autonomous operation",
    description:
      "Full autonomous practice operation — from diagnosis to treatment to post-op. Convergence of human expertise and robotic precision.",
  },
];

export function StagedPath() {
  return (
    <section className="section-bone border-t border-rule">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[42fr_58fr] md:gap-20 md:px-10 md:py-36">
        <FadeIn>
          <p className="eyebrow text-graphite">03 — The path</p>
          <h2 className="mt-5 font-[family-name:var(--font-fraunces)] font-normal leading-[1.1] tracking-[-1.2px] text-graphite text-[clamp(1.9rem,3.4vw,2.85rem)]">
            Staged entry.
            <br />
            <span className="italic text-terracotta-deep">Zero resistance.</span>
          </h2>
          <p className="mt-6 max-w-[460px] font-[family-name:var(--font-inter)] text-[15.5px] leading-[1.65] text-ink-muted">
            The lab is the zero-resistance entry point. From there, Optimus expands into every
            aspect of practice operation.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 border-t border-rule-strong pt-5">
            <span className="h-2 w-2 rounded-full bg-terracotta" aria-hidden />
            <p className="eyebrow text-graphite">Phase 01 is live today</p>
          </div>
        </FadeIn>

        <StaggerFadeIn className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2" stagger={0.1}>
          {stages.map((stage) => (
            <article
              key={stage.phase}
              className={`border-t pt-7 ${
                stage.active ? "border-terracotta" : "border-rule-strong"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <p className="eyebrow text-ink-soft">{stage.phase}</p>
                <p
                  className={`eyebrow ${
                    stage.active ? "text-terracotta-deep" : "text-ink-soft"
                  }`}
                >
                  {stage.timing}
                </p>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-[1.45rem] font-normal leading-[1.2] tracking-[-0.5px] text-graphite">
                {stage.title}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.65] text-ink-muted">
                {stage.description}
              </p>
            </article>
          ))}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
