"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Crown, Bot, Cpu, ShieldCheck, Clock, Wrench, Building2 } from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Crown, top: "18%", left: "20%", size: 48, delay: "0s" },
  { Icon: Bot, top: "25%", left: "72%", size: 56, delay: "1.5s" },
  { Icon: Cpu, top: "35%", left: "35%", size: 40, delay: "3s" },
  { Icon: ShieldCheck, top: "22%", left: "58%", size: 44, delay: "4.5s" },
] as const;

const STAT_ICONS = [Clock, Wrench, Building2, ShieldCheck] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(kickerRef.current, {
        opacity: 0, y: 20, duration: 0.7, ease: "power3.out",
      })
        .from(
          headlineRef.current?.querySelectorAll(".headline-line") || [],
          { opacity: 0, y: 60, duration: 0.9, ease: "power3.out", stagger: 0.15 },
          "-=0.3"
        )
        .from(subRef.current, {
          opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        }, "-=0.4")
        .from(ctaRef.current, {
          opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        }, "-=0.3")
        .from(statsRef.current, {
          opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        }, "-=0.2");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-linear-to-b from-void via-void to-deep-void px-6"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(154,154,176,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,26,42,0.3)_0%,transparent_50%)]" />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={5}
          repeatDelay={2}
          className={cn(
            "absolute inset-0 h-full w-full",
            "mask-[radial-gradient(500px_circle_at_50%_60%,white,transparent)]"
          )}
        />
      </div>

      {/* ── Floating dental/tech icons (upper area) ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%]">
        {FLOATING_ICONS.map(({ Icon, top, left, size, delay }, i) => (
          <Icon
            key={i}
            className="absolute text-titanium-light animate-float"
            style={{
              top,
              left,
              width: size,
              height: size,
              opacity: 0.08,
              animationDelay: delay,
            }}
            strokeWidth={1}
          />
        ))}
      </div>

      {/* ── Spacer to push content to lower 60% ── */}
      <div className="flex-1 min-h-[25vh]" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center text-center">
        {/* Kicker */}
        <p
          ref={kickerRef}
          className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium"
        >
          {siteConfig.tagline}
        </p>

        {/* Headline with gradient */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-2px]"
        >
          <span className="headline-line block text-white-pure">
            Human Expertise.
          </span>
          <span className="headline-line block bg-linear-to-r from-white-pure via-titanium-light to-titanium bg-clip-text text-transparent">
            Robotic Precision.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="mt-8 max-w-[580px] font-body text-[17px] leading-[1.7] text-titanium-light"
        >
          {siteConfig.description}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex gap-4">
          <Link
            href="/technology"
            className="relative overflow-hidden rounded-md bg-white-pure px-7 py-3.5 text-[12px] font-bold tracking-[0.5px] text-void transition-opacity hover:opacity-80"
          >
            Explore the Technology &rarr;
          </Link>
          <button className="rounded-md bg-deep-void border border-titanium-dark px-7 py-3.5 text-[12px] font-medium tracking-[0.5px] text-titanium-light transition-all hover:border-titanium hover:text-white-pure">
            Watch Demo
          </button>
        </div>
      </div>

      {/* ── Stats Bar — Bento Cards ── */}
      <div
        ref={statsRef}
        className="relative z-10 mt-auto w-full max-w-[900px] pb-12 pt-16"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {siteConfig.stats.map((stat, i) => {
            const StatIcon = STAT_ICONS[i];
            return (
              <div
                key={stat.label}
                className="rounded-lg border border-titanium-dark bg-deep-void/50 px-5 py-4 text-center"
              >
                <StatIcon className="mx-auto mb-2 h-4 w-4 text-titanium" strokeWidth={1.5} />
                <div className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                  <NumberTicker value={stat.value} delay={0.8} />
                  {stat.suffix}
                </div>
                <p className="mt-1.5 font-display text-[9px] font-semibold uppercase tracking-[2px] text-titanium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
