"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const metrics = [
  {
    label: "Placement accuracy",
    description: "Consistent sub-millimetre precision on every procedure",
    traditional: "85%",
    robotic: "99.2%",
    highlight: true,
  },
  {
    label: "Procedure consistency",
    description: "Repeatable results across hundreds of procedures",
    traditional: "72%",
    robotic: "98%",
  },
  {
    label: "Production time",
    description: "60% faster turnaround than traditional methods",
    traditional: "100%",
    robotic: "40%",
  },
  {
    label: "Remake rate",
    description: "Near-zero remakes eliminate waste and delays",
    traditional: "8%",
    robotic: "0.5%",
  },
];

export function TechComparison() {
  return (
    <section className="section-bone border-t border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <FadeIn>
          <p className="eyebrow text-graphite">03 — The difference</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 max-w-[820px] font-[family-name:var(--font-fraunces)] font-normal leading-[1.08] tracking-[-1.2px] text-graphite text-[clamp(1.9rem,3.6vw,3rem)]">
            Precision you can <span className="italic">measure.</span>
          </h2>
        </FadeIn>

        <div className="mt-14">
          <FadeIn delay={0.15}>
            <div className="hidden border-b border-graphite pb-3 md:grid md:grid-cols-[1fr_140px_140px] md:gap-6">
              <p className="eyebrow text-ink-soft">Metric</p>
              <p className="text-center eyebrow text-ink-soft">Traditional</p>
              <p className="text-center eyebrow text-terracotta-deep">Robotic</p>
            </div>
          </FadeIn>

          <StaggerFadeIn className="divide-y divide-rule" stagger={0.07}>
            {metrics.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-1 items-center gap-3 py-7 md:grid-cols-[1fr_140px_140px] md:gap-6"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-fraunces)] text-[1.25rem] font-normal tracking-[-0.5px] text-graphite">
                    {m.label}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-inter)] text-[13px] leading-[1.55] text-ink-muted">
                    {m.description}
                  </p>
                </div>
                <div className="flex items-center justify-between md:justify-center">
                  <span className="eyebrow text-ink-soft md:hidden">Traditional</span>
                  <span className="font-[family-name:var(--font-fraunces)] text-[1.75rem] font-light tracking-[-1px] text-ink-muted">
                    {m.traditional}
                  </span>
                </div>
                <div className="flex items-center justify-between md:justify-center">
                  <span className="eyebrow text-terracotta-deep md:hidden">Robotic</span>
                  <span
                    className={`font-[family-name:var(--font-fraunces)] text-[2rem] font-normal tracking-[-1px] ${
                      m.highlight ? "text-terracotta-deep" : "text-graphite"
                    }`}
                  >
                    {m.robotic}
                  </span>
                </div>
              </div>
            ))}
          </StaggerFadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-14 border-t border-graphite pt-10">
            <p className="font-[family-name:var(--font-fraunces)] text-[clamp(1.4rem,2.6vw,2rem)] font-normal leading-[1.3] tracking-[-0.5px] text-graphite max-w-[820px]">
              Up to <span className="italic text-terracotta-deep">16× fewer</span> remakes.{" "}
              <span className="italic text-terracotta-deep">60% faster</span> production.
              The numbers speak for themselves.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
