"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Cpu, Crosshair, Gauge, ShieldCheck } from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Cpu, top: "16%", left: "15%", size: 50, delay: "0s" },
  { Icon: Crosshair, top: "22%", left: "78%", size: 44, delay: "1.5s" },
  { Icon: Gauge, top: "30%", left: "30%", size: 38, delay: "3s" },
  { Icon: ShieldCheck, top: "20%", left: "62%", size: 46, delay: "4.5s" },
] as const;

export function TechHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

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
        .from(visualRef.current, {
          opacity: 0, scale: 1.05, duration: 1.2, ease: "power2.out",
        }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-void via-void to-deep-void px-6"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(154,154,176,0.1),transparent)]" />
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.12}
          duration={4}
          repeatDelay={1.5}
          className={cn(
            "absolute inset-0 h-full w-full",
            "mask-[radial-gradient(600px_circle_at_50%_50%,white,transparent)]"
          )}
        />
      </div>

      {/* ── Floating tech icons ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%]">
        {FLOATING_ICONS.map(({ Icon, top, left, size, delay }, i) => (
          <Icon
            key={i}
            className="absolute text-titanium-light animate-float"
            style={{ top, left, width: size, height: size, opacity: 0.07, animationDelay: delay }}
            strokeWidth={1}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center text-center">
        <p
          ref={kickerRef}
          className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium"
        >
          Our Technology
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-2px]"
        >
          <span className="headline-line block text-white-pure">
            The Future of
          </span>
          <span className="headline-line block bg-linear-to-r from-white-pure via-titanium-light to-titanium bg-clip-text text-transparent">
            Robotic Dentistry
          </span>
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-[580px] font-body text-[17px] leading-[1.7] text-titanium-light"
        >
          Precision engineered. Clinically proven. Tesla&apos;s Optimus humanoid robot,
          purpose-built for dental laboratory excellence.
        </p>
      </div>

      {/* ── Central system visual placeholder ── */}
      <div
        ref={visualRef}
        className="relative z-10 mt-16 flex h-[200px] w-full max-w-[600px] items-center justify-center rounded-lg border border-titanium-dark bg-deep-void/30"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-4">
            <Cpu className="h-10 w-10 text-titanium" strokeWidth={1} />
            <Crosshair className="h-10 w-10 text-titanium-light" strokeWidth={1} />
            <Gauge className="h-10 w-10 text-titanium" strokeWidth={1} />
          </div>
          <p className="font-display text-[10px] font-semibold uppercase tracking-[3px] text-titanium">
            Robotic Precision System
          </p>
        </div>
        {/* Grid overlay for tech feel */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(58,58,78,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(58,58,78,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>
    </section>
  );
}
