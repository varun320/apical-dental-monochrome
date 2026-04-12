"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ParallaxSection } from "@/components/animations/parallax-section";
import { ScrollRevealText } from "@/components/animations/scroll-reveal-text";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function AboutOrigin() {
  return (
    <section className="relative bg-light-bg px-6 py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <FadeIn>
          <p className="mb-12 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
            The Beginning
          </p>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 items-start">
          {/* Left — narrative */}
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <p className="font-body text-[17px] leading-[1.8] text-light-muted">
                It started with a simple belief: that dental care deserves the same precision as aerospace engineering. Over four decades ago, a team of prosthodontists and engineers set out to bridge the gap between human skill and mechanical perfection.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-body text-[17px] leading-[1.8] text-light-muted">
                What began in a single laboratory — hand-crafting crowns, bridges, and implants with obsessive attention to detail — evolved into something far more ambitious.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="font-body text-[17px] leading-[1.8] text-light-muted">
                Hundreds of adaptations later, the vision crystallized: integrate Tesla&apos;s Optimus humanoid robot into dental laboratory workflows, delivering surgical-grade accuracy at a scale previously unimaginable.
              </p>
            </FadeIn>

            {/* Inline stat highlight */}
            <FadeIn delay={0.35}>
              <div className="flex items-center gap-6 rounded-lg border border-light-border bg-light-card p-5 shadow-sm">
                <div className="font-display text-[36px] font-bold leading-none tracking-[-1.5px] text-light-text">
                  800+
                </div>
                <div>
                  <p className="font-display text-[13px] font-semibold tracking-[-0.3px] text-light-text">Engineered adaptations</p>
                  <p className="font-body text-[12px] text-light-muted">for robotic hands — patent filings in progress</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — image with parallax */}
          <FadeIn delay={0.2} direction="right" distance={30}>
            <ParallaxSection speed={0.6} className="rounded-lg">
              <ImagePlaceholder
                src="/images/origin-lab.png"
                alt="Precision dental laboratory craftsmanship"
                className="h-[400px] w-full"
                overlay="light"
              />
            </ParallaxSection>
          </FadeIn>
        </div>

        {/* Blockquote with scroll reveal */}
        <div className="mt-20">
          <ScrollRevealText className="border-l-2 border-cyan-muted pl-8">
            <p className="sr-line font-display text-[clamp(20px,3vw,26px)] font-semibold leading-[1.4] tracking-[-0.5px] text-light-text">
              &ldquo;Precision isn&apos;t a feature —
            </p>
            <p className="sr-line font-display text-[clamp(20px,3vw,26px)] font-semibold leading-[1.4] tracking-[-0.5px] text-light-text">
              it&apos;s the foundation everything else is built on.&rdquo;
            </p>
            <cite className="sr-line mt-4 block font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted not-italic">
              — Founding Philosophy
            </cite>
          </ScrollRevealText>
        </div>
      </div>
    </section>
  );
}
