"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const capabilities = [
  {
    step: "01",
    title: "Prosthetic fabrication",
    description:
      "Surgical-grade dental prosthetics manufactured with superhuman precision. Every crown, bridge, and implant — perfect on delivery.",
  },
  {
    step: "02",
    title: "AI diagnostics",
    description:
      "X-ray analysis with executive summaries for the doctor. Contraindication flagging. Instant, comprehensive, actionable.",
  },
  {
    step: "03",
    title: "Sterilisation",
    description:
      "Automated instrument sterilisation protocols. Consistent, documented, and compliant — every single time.",
  },
  {
    step: "04",
    title: "Inventory & supply",
    description:
      "Supply ordering with real-time market-price research. Automated procurement that saves money and eliminates stockouts.",
  },
  {
    step: "05",
    title: "Patient communication",
    description:
      "Real-time language translation. Appointment coordination. Insurance documentation — handled seamlessly.",
  },
  {
    step: "06",
    title: "Facility maintenance",
    description:
      "Equipment monitoring, maintenance scheduling, and facility operations. The robot manages the physical environment.",
  },
];

export function RobotScope() {
  return (
    <section className="section-bone border-t border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <FadeIn>
          <p className="eyebrow text-graphite">02 — The full scope</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 max-w-[820px] font-[family-name:var(--font-fraunces)] font-normal leading-[1.08] tracking-[-1.2px] text-graphite text-[clamp(1.9rem,3.6vw,3rem)]">
            One robot. Every role on the floor.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-[680px] font-[family-name:var(--font-inter)] text-[1.0625rem] leading-[1.65] text-ink-muted">
            Optimus doesn&apos;t just handle lab work. It assumes full practice automation — from
            fabrication to facility maintenance — with in-office placement, staff training, and
            ongoing service included.
          </p>
        </FadeIn>

        <StaggerFadeIn
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {capabilities.map((cap) => (
            <article key={cap.step} className="border-t border-rule-strong pt-7">
              <p className="eyebrow text-ink-soft">Capability {cap.step}</p>
              <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-[1.5rem] font-normal leading-[1.2] tracking-[-0.5px] text-graphite">
                {cap.title}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-inter)] text-[15px] leading-[1.65] text-ink-muted">
                {cap.description}
              </p>
            </article>
          ))}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
