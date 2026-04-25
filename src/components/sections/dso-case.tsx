"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const benefits = [
  {
    title: "Robot-as-a-Service",
    value: "$3,667",
    unit: "/mo per robot",
    description:
      "Predictable monthly cost. Includes placement, staff training, location-specific customisation, and ongoing service subscription.",
  },
  {
    title: "Built-in distribution",
    value: "500+",
    unit: "DSO offices",
    description:
      "Dr. Lewis operates inside a 500+ office DSO network. The infrastructure for scale already exists.",
  },
  {
    title: "Zero regulatory friction",
    value: "0",
    unit: "barriers",
    description:
      "The dental lab side is completely unregulated. The robot enters through lab work first — zero resistance from licensing boards.",
  },
];

export function DSOCase() {
  return (
    <section className="section-bone border-t border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[42fr_58fr] md:gap-20">
          <FadeIn>
            <p className="eyebrow text-graphite">05 — For DSOs</p>
            <h2 className="mt-5 font-[family-name:var(--font-fraunces)] font-normal leading-[1.1] tracking-[-1.2px] text-graphite text-[clamp(1.9rem,3.4vw,2.85rem)]">
              The business case writes itself.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-[family-name:var(--font-inter)] text-[1.0625rem] leading-[1.65] text-graphite max-w-[560px]">
              Replace the cost of hiring, training, and retaining lab technicians with a single
              subscription. AI-backed diagnostics reduce insurance overhead. Robotic precision
              eliminates rework.
            </p>
          </FadeIn>
        </div>

        <StaggerFadeIn className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-3" stagger={0.1}>
          {benefits.map((b) => (
            <article key={b.title} className="border-t border-rule-strong pt-7">
              <p className="eyebrow text-ink-soft">{b.title}</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-fraunces)] text-[3rem] font-light leading-none tracking-[-2px] text-graphite">
                  {b.value}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] font-medium tracking-[0.5px] text-ink-soft">
                  {b.unit}
                </span>
              </div>
              <p className="mt-5 font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.7] text-ink-muted">
                {b.description}
              </p>
            </article>
          ))}
        </StaggerFadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-16 flex flex-col gap-6 border-t border-graphite pt-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[560px]">
              <p className="eyebrow text-terracotta-deep">Scale projection</p>
              <p className="mt-4 font-[family-name:var(--font-fraunces)] text-[1.5rem] font-normal leading-[1.35] tracking-[-0.5px] text-graphite">
                250 robots deployed at $3,667/month each. White-glove onboarding and continuous
                support at every location.
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="font-[family-name:var(--font-fraunces)] text-[clamp(3rem,6vw,5rem)] font-light leading-none tracking-[-3px] text-graphite">
                $11M+
              </div>
              <p className="mt-2 eyebrow text-ink-soft">Annual revenue target</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
