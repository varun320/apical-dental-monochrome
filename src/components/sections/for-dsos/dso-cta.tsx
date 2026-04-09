"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { TextReveal } from "@/components/animations/text-reveal";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { Building2, Wrench, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Building2, value: 500, suffix: "+", label: "DSO Offices" },
  { icon: Wrench, value: 800, suffix: "+", label: "Adaptations" },
  { icon: ShieldCheck, value: 0, suffix: "", label: "Regulatory Barriers" },
] as const;

export function DSOCTA() {
  return (
    <section className="relative bg-linear-to-b from-void via-deep-void to-deep-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[900px]">
        {/* Stats */}
        <StaggerFadeIn className="grid grid-cols-1 gap-6 sm:grid-cols-3" stagger={0.15}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="mx-auto mb-3 h-5 w-5 text-titanium" strokeWidth={1.5} />
                <div className="font-display text-[clamp(36px,5vw,48px)] font-bold leading-none tracking-[-2px] text-white-pure">
                  <NumberTicker value={stat.value} delay={0.3} />
                  {stat.suffix}
                </div>
                <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </StaggerFadeIn>

        {/* CTA Card */}
        <FadeIn delay={0.3}>
          <div className="relative mt-20 overflow-hidden rounded-lg border border-titanium-dark bg-deep-void/50 p-12 text-center">
            <TextReveal className="font-display text-[clamp(22px,3.5vw,30px)] font-bold leading-[1.2] tracking-[-0.5px] text-white-pure">
              Ready to transform your DSO operations?
            </TextReveal>

            <FadeIn delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-md bg-white-pure px-8 py-4 font-display text-[14px] font-bold tracking-[0.5px] text-void transition-opacity hover:opacity-80"
                >
                  Schedule a Consultation &rarr;
                </Link>
                <Link
                  href="/technology"
                  className="rounded-md border border-titanium-dark bg-deep-void px-8 py-4 font-display text-[12px] font-medium tracking-[0.5px] text-titanium-light transition-all hover:border-titanium hover:text-white-pure"
                >
                  Explore Technology
                </Link>
              </div>
            </FadeIn>

            <BorderBeam
              size={100}
              duration={10}
              colorFrom="#9A9AB0"
              colorTo="#3A3A4E"
              borderWidth={1}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
