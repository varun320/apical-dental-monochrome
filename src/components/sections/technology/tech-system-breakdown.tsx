"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const components = [
  {
    name: "Vision system",
    spec: "±0.05mm scan resolution",
    description:
      "High-resolution 3D scanning and real-time spatial mapping for sub-millimetre positioning accuracy.",
  },
  {
    name: "AI navigation",
    spec: "Real-time path optimisation",
    description:
      "Machine-learning algorithms that adapt to each unique dental anatomy, optimising tool paths in real time.",
  },
  {
    name: "Precision actuators",
    spec: "6-axis articulation",
    description:
      "Tesla-engineered servo motors delivering surgical-grade movement control across all axes of operation.",
  },
  {
    name: "Safety architecture",
    spec: "Triple-redundant fail-safe",
    description:
      "Redundant sensor arrays and force-feedback systems ensuring patient safety at every stage of operation.",
  },
  {
    name: "Workflow integration",
    spec: "Universal compatibility",
    description:
      "Seamless connection to existing dental CAD/CAM systems, digital impressions, and practice-management software.",
  },
];

export function TechSystemBreakdown() {
  return (
    <section className="section-bone border-t border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[42fr_58fr] md:gap-20">
          <FadeIn>
            <p className="eyebrow text-graphite">01 — System architecture</p>
            <h2 className="mt-5 font-[family-name:var(--font-fraunces)] font-normal leading-[1.1] tracking-[-1.2px] text-graphite text-[clamp(1.9rem,3.4vw,2.85rem)]">
              Every component, purpose-built.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-[family-name:var(--font-inter)] text-[1.0625rem] leading-[1.65] text-graphite max-w-[560px]">
              Five subsystems, engineered to converge on one outcome: surgical-grade dental work
              with the consistency of a robot and the judgement of a forty-year specialist.
            </p>
          </FadeIn>
        </div>

        <StaggerFadeIn
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {components.map((c, i) => (
            <article
              key={c.name}
              className="border-t border-rule-strong pt-7 flex flex-col gap-3"
            >
              <p className="eyebrow text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-[family-name:var(--font-fraunces)] text-[1.5rem] font-normal leading-[1.2] tracking-[-0.5px] text-graphite">
                {c.name}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.65] text-ink-muted">
                {c.description}
              </p>
              <p className="mt-2 inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[12px] font-medium tracking-[0.4px] text-terracotta-deep">
                <span className="h-1 w-1 rounded-full bg-terracotta" aria-hidden />
                {c.spec}
              </p>
            </article>
          ))}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
