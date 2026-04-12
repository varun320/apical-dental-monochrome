"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function AboutOrigin() {
  return (
    <section className="relative bg-light-bg px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[720px]">
        <FadeIn>
          <p className="mb-12 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
            The Beginning
          </p>
        </FadeIn>

        <div className="space-y-8">
          <FadeIn delay={0.1}>
            <p className="font-body text-[18px] leading-[1.8] text-light-muted">
              It started with a simple belief: that dental care deserves the same precision as aerospace engineering. Over four decades ago, a team of prosthodontists and engineers set out to bridge the gap between human skill and mechanical perfection.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-[18px] leading-[1.8] text-light-muted">
              What began in a single laboratory — hand-crafting crowns, bridges, and implants with obsessive attention to detail — evolved into something far more ambitious. The realization that robotic systems could amplify, not replace, the artistry of dental professionals changed everything.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-body text-[18px] leading-[1.8] text-light-muted">
              Hundreds of adaptations later, the vision crystallized: integrate Tesla&apos;s Optimus humanoid robot into dental laboratory workflows, delivering surgical-grade accuracy at a scale previously unimaginable.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.35}>
          <div className="mt-12">
            <ImagePlaceholder
              src="/images/origin-lab.png"
              alt="Precision dental laboratory craftsmanship"
              className="h-[280px] w-full"
              overlay="gradient"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="left" distance={20}>
          <blockquote className="mt-16 border-l-2 border-cyan-muted pl-8">
            <p className="font-display text-[clamp(20px,3vw,26px)] font-semibold leading-[1.4] tracking-[-0.5px] text-light-text">
              &ldquo;Precision isn&apos;t a feature — it&apos;s the foundation everything else is built on.&rdquo;
            </p>
            <cite className="mt-4 block font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted not-italic">
              — Founding Philosophy
            </cite>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}
