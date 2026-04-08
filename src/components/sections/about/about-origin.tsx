"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScrollRevealText } from "@/components/animations/scroll-reveal-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Bot, ShieldCheck } from "lucide-react";

export function AboutOrigin() {
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, x: -60 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative bg-linear-to-b from-deep-void via-void to-void px-6 py-28 lg:py-36 overflow-hidden">
      {/* ── Background ── */}
      <DotPattern
        width={28}
        height={28}
        cr={0.6}
        glow
        className="text-titanium-dark/30 mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
      />

      {/* ── Floating icons ── */}
      <div className="pointer-events-none absolute inset-0">
        <Bot
          className="absolute top-[15%] right-[12%] text-titanium-light animate-float"
          style={{ width: 48, height: 48, opacity: 0.06, animationDelay: "1s" }}
          strokeWidth={1}
        />
        <ShieldCheck
          className="absolute bottom-[20%] left-[10%] text-titanium-light animate-float"
          style={{ width: 40, height: 40, opacity: 0.06, animationDelay: "3s" }}
          strokeWidth={1}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[720px]">
        {/* ── Section label ── */}
        <p className="mb-12 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
          The Beginning
        </p>

        {/* ── Scroll-revealed narrative ── */}
        <ScrollRevealText className="space-y-8" scrubLength={2}>
          <p className="sr-line font-body text-[18px] leading-[1.8] text-titanium-light">
            It started with a simple belief: that dental care deserves the same precision as aerospace engineering. Over four decades ago, a team of prosthodontists and engineers set out to bridge the gap between human skill and mechanical perfection.
          </p>
          <p className="sr-line font-body text-[18px] leading-[1.8] text-titanium-light">
            What began in a single laboratory — hand-crafting crowns, bridges, and implants with obsessive attention to detail — evolved into something far more ambitious. The realization that robotic systems could amplify, not replace, the artistry of dental professionals changed everything.
          </p>
          <p className="sr-line font-body text-[18px] leading-[1.8] text-titanium-light">
            Hundreds of adaptations later, the vision crystallized: integrate Tesla&apos;s Optimus humanoid robot into dental laboratory workflows, delivering surgical-grade accuracy at a scale previously unimaginable.
          </p>
        </ScrollRevealText>

        {/* ── Pull quote ── */}
        <blockquote
          ref={quoteRef}
          className="mt-16 border-l-2 border-titanium pl-8"
        >
          <p className="font-display text-[clamp(20px,3vw,26px)] font-semibold leading-[1.4] tracking-[-0.5px] text-white-pure">
            &ldquo;Precision isn&apos;t a feature — it&apos;s the foundation everything else is built on.&rdquo;
          </p>
          <cite className="mt-4 block font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium not-italic">
            — Founding Philosophy
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
