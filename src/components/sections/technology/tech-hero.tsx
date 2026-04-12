"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import {
  Cpu, Crosshair, Gauge, ShieldCheck, Eye, Brain,
  Hand, Workflow, Scan, Cog, Zap,
} from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Cpu, top: "10%", left: "10%", size: 44, delay: "0s" },
  { Icon: Crosshair, top: "20%", left: "82%", size: 40, delay: "1s" },
  { Icon: Gauge, top: "30%", left: "25%", size: 36, delay: "2s" },
  { Icon: ShieldCheck, top: "15%", left: "60%", size: 42, delay: "3s" },
  { Icon: Eye, top: "8%", left: "40%", size: 34, delay: "0.5s" },
  { Icon: Brain, top: "35%", left: "88%", size: 38, delay: "1.5s" },
  { Icon: Hand, top: "25%", left: "5%", size: 32, delay: "2.5s" },
  { Icon: Workflow, top: "12%", left: "72%", size: 30, delay: "4s" },
  { Icon: Scan, top: "38%", left: "50%", size: 36, delay: "3.5s" },
  { Icon: Cog, top: "6%", left: "55%", size: 28, delay: "4.5s" },
  { Icon: Zap, top: "32%", left: "15%", size: 30, delay: "5s" },
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
        opacity: 0, y: 12, duration: 0.6, ease: "power2.out",
      })
        .from(
          headlineRef.current?.querySelectorAll(".headline-line") || [],
          { opacity: 0, y: 30, duration: 0.7, ease: "power2.out", stagger: 0.1 },
          "-=0.3"
        )
        .from(subRef.current, {
          opacity: 0, y: 16, duration: 0.6, ease: "power2.out",
        }, "-=0.3")
        .from(visualRef.current, {
          opacity: 0, x: -30, duration: 0.8, ease: "power2.out",
        }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-light-bg px-6"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(94,175,197,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_50%,transparent_40%,rgba(241,245,249,1))]" />
      </div>

      {/* ── Floating tech icons ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50%]">
        {FLOATING_ICONS.map(({ Icon, top, left, size, delay }, i) => (
          <Icon
            key={i}
            className="absolute text-titanium-light animate-float"
            style={{ top, left, width: size, height: size, opacity: 0.15, animationDelay: delay }}
            strokeWidth={1}
          />
        ))}
      </div>

      {/* ── Content — image left, text right ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
        {/* Left — image */}
        <div ref={visualRef} className="hidden md:block w-full max-w-[440px] shrink-0">
          <ImagePlaceholder
            src="/images/hero-systems.png"
            alt="Apical Dental robotic precision system"
            className="h-[320px] w-full"
            overlay="light"
            priority
          />
        </div>

        {/* Right — text */}
        <div className="flex-1 text-center md:text-left">
          <p
            ref={kickerRef}
            className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted"
          >
            Our Technology
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-2px]"
          >
            <span className="headline-line block text-light-text">
              The Future of
            </span>
            <span className="headline-line block bg-linear-to-r from-light-text via-titanium to-titanium-light bg-clip-text text-transparent">
              Robotic Dentistry
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-[580px] font-body text-[17px] leading-[1.7] text-light-muted"
          >
            Precision engineered. Clinically proven. Tesla&apos;s Optimus humanoid robot,
            purpose-built for dental laboratory excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
