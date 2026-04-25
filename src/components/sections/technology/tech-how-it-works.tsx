"use client";

import Image from "next/image";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const steps = [
  {
    step: "01",
    title: "Scan & plan",
    description:
      "Intra-oral scan plus a cone-beam CT feed our planning AI. Surgical trajectory ready in under five minutes.",
    image: "/images/step-plan.png",
  },
  {
    step: "02",
    title: "Robot-guided execution",
    description:
      "Tesla’s Optimus follows the computed path with surgical-grade accuracy. Real-time force feedback adapts to micro-variations.",
    image: "/images/step-execute.png",
  },
  {
    step: "03",
    title: "Verify & deliver",
    description:
      "Post-procedure verification scans the finished work against the original plan. Deviations measured in microns, every piece traceable.",
    image: "/images/step-verify.png",
  },
];

export function TechHowItWorks() {
  return (
    <section className="section-bone border-t border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <FadeIn>
          <p className="eyebrow text-graphite">02 — How it works</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 max-w-[820px] font-[family-name:var(--font-fraunces)] font-normal leading-[1.08] tracking-[-1.2px] text-graphite text-[clamp(1.9rem,3.6vw,3rem)]">
            From scan to restoration in <span className="italic">ninety minutes.</span>
          </h2>
        </FadeIn>

        <StaggerFadeIn className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3" stagger={0.12}>
          {steps.map((step) => (
            <article key={step.step} className="flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  style={{ filter: "saturate(0.85) contrast(1.05)" }}
                />
              </div>
              <div className="border-t border-rule-strong mt-7 pt-6">
                <p className="eyebrow text-ink-soft">Step {step.step}</p>
                <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-[1.65rem] font-normal leading-[1.2] tracking-[-0.5px] text-graphite">
                  {step.title}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-inter)] text-[15px] leading-[1.65] text-ink-muted">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
