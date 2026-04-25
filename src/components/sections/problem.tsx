"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const facts = [
  "8,000 specialists · 200M patients",
  "40% of complex cases refer out",
  "Half-day surgical blocks wasted",
];

export function Problem() {
  return (
    <section className="section-bone border-t border-rule">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-[42fr_58fr] md:gap-20 md:px-10 md:py-36">
        <FadeIn>
          <p className="eyebrow text-graphite">01 — The problem</p>
          <h2 className="mt-5 font-[family-name:var(--font-fraunces)] font-normal leading-[1.1] tracking-[-1.2px] text-graphite text-[clamp(1.9rem,3.4vw,2.85rem)]">
            Implant dentistry is still bottlenecked by a handful of surgeons.
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-7">
          <FadeIn delay={0.15}>
            <p className="font-[family-name:var(--font-inter)] text-[1.0625rem] leading-[1.65] text-graphite">
              General practices refer out every complex implant case. DSOs lose 30–40% of specialty revenue
              to outside networks. Patients wait weeks for a chair that a robot-guided system could fill in
              ninety minutes.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="font-[family-name:var(--font-inter)] text-[1.0625rem] leading-[1.65] text-graphite">
              <span className="font-medium">Apical closes that gap.</span> A supervised robotic platform,
              shared across your network, lets every practice deliver specialist-grade surgery without
              hiring one.
            </p>
          </FadeIn>

          <StaggerFadeIn
            className="mt-3 flex flex-col gap-4 border-t border-rule pt-7 sm:flex-row sm:flex-wrap sm:gap-6"
            stagger={0.08}
            delay={0.3}
          >
            {facts.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.3px] text-graphite"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta shrink-0" aria-hidden />
                {f}
              </div>
            ))}
          </StaggerFadeIn>
        </div>
      </div>
    </section>
  );
}
