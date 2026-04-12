"use client";

import Link from "next/link";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { TextReveal } from "@/components/animations/text-reveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import Image from "next/image";
import { Clock, Wrench, Building2 } from "lucide-react";

const stats = [
  { icon: Clock, value: 40, suffix: "+", label: "Years Expertise" },
  { icon: Wrench, value: 800, suffix: "+", label: "Adaptations" },
  { icon: Building2, value: 500, suffix: "+", label: "DSO Offices" },
] as const;

export function AboutImpact() {
  return (
    <section className="relative bg-light-bg px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[900px]">
        {/* ── Stats row ── */}
        <StaggerFadeIn
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          stagger={0.15}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="mx-auto mb-3 h-5 w-5 text-light-muted" strokeWidth={1.5} />
                <div className="font-display text-[clamp(36px,5vw,52px)] font-bold leading-none tracking-[-2px] text-mint">
                  <NumberTicker value={stat.value} delay={0.3} />
                  {stat.suffix}
                </div>
                <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </StaggerFadeIn>

        {/* ── CTA Card ── */}
        <FadeIn delay={0.3}>
          <div className="section-dark relative mt-20 overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-12 text-center">
            <Image
              src="/images/cta-texture.png"
              alt=""
              fill
              className="object-cover opacity-40"
              sizes="700px"
            />
            <TextReveal className="font-display text-[clamp(22px,3.5vw,30px)] font-bold leading-[1.2] tracking-[-0.5px] text-white-pure">
              Ready to bring robotic precision to your practice?
            </TextReveal>

            <FadeIn delay={0.5}>
              <Link
                href="/contact"
                className="mt-8 inline-block rounded-md bg-white-pure px-8 py-4 font-display text-[14px] font-bold tracking-[0.5px] text-void transition-opacity hover:opacity-80"
              >
                Partner With Us &rarr;
              </Link>
            </FadeIn>

            <BorderBeam
              size={100}
              duration={10}
              colorFrom="#5EAFC5"
              colorTo="#3D7A8F"
              borderWidth={1}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
