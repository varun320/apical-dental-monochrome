"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import Link from "next/link";
import { TrendingDown, Clock, BadgeDollarSign } from "lucide-react";

const highlights = [
  { icon: TrendingDown, value: 93, suffix: "%", label: "Fewer Remakes" },
  { icon: Clock, value: 60, suffix: "%", label: "Faster Turnaround" },
  { icon: BadgeDollarSign, value: 3.2, suffix: "x", label: "Year One ROI", decimals: 1 },
] as const;

export function DSOHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".dso-kicker", { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" })
        .from(".dso-headline", { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" }, "-=0.3")
        .from(".dso-sub", { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .from(".dso-cta-row", { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .from(".dso-stat-card", {
          opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.08,
        }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-dark relative overflow-hidden bg-void px-6 py-32 lg:py-40"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/hero-network.png" alt="" fill className="object-cover grayscale-50 brightness-[0.2] opacity-40" sizes="100vw" />
        <div className="absolute inset-0 bg-void/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_-10%,rgba(94,175,197,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* ── Left: Text ── */}
          <div ref={leftRef}>
            <p className="dso-kicker mb-6 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium-light">
              For DSO Partners
            </p>
            <h1 className="dso-headline font-display text-[clamp(32px,5vw,50px)] font-bold leading-[1.05] tracking-[-2px] text-white-pure">
              Scale Precision<br />
              <span className="bg-linear-to-r from-white-pure via-titanium-light to-titanium bg-clip-text text-transparent">
                Across Every Office
              </span>
            </h1>
            <p className="dso-sub mt-6 max-w-[480px] font-body text-[16px] leading-[1.7] text-titanium-light">
              Robotic-assisted dental lab automation built for multi-location operations.
              Reduce remakes, accelerate turnaround, and standardize quality at scale.
            </p>
            <div className="dso-cta-row mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-white-pure px-7 py-3.5 text-[12px] font-bold tracking-[0.5px] text-void transition-all hover:shadow-[0_0_30px_rgba(94,175,197,0.5)] hover:bg-cyan"
              >
                Request a Demo &rarr;
              </Link>
              <Link
                href="/technology"
                className="rounded-md border border-titanium-dark bg-deep-void px-7 py-3.5 text-[12px] font-medium tracking-[0.5px] text-titanium-light transition-all hover:border-titanium hover:text-white-pure"
              >
                See the Technology
              </Link>
            </div>
          </div>

          {/* ── Right: Stat cards ── */}
          <div ref={rightRef} className="flex flex-col gap-4">
            {highlights.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="dso-stat-card relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-6 flex items-center gap-5 transition-all hover:border-titanium hover:-translate-y-1.5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-titanium-dark bg-void">
                    <Icon className="h-6 w-6 text-titanium-light" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-display text-[32px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                      <NumberTicker
                        value={stat.value}
                        delay={0.6 + i * 0.15}
                        decimalPlaces={stat.label === "Year One ROI" ? 1 : 0}
                      />
                      {stat.suffix}
                    </div>
                    <p className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium-light">
                      {stat.label}
                    </p>
                  </div>

                  {i === 2 && (
                    <BorderBeam
                      size={80}
                      duration={8}
                      colorFrom="#5EAFC5"
                      colorTo="#3D7A8F"
                      borderWidth={1}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
