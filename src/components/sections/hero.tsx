"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { NumberTicker } from "@/components/ui/number-ticker";
import { VideoModal } from "@/components/ui/video-modal";
import { ToothScanSVG } from "@/components/ui/tooth-scan-svg";
import { FloatingIcons } from "@/components/animations/floating-icons";
import { ToothIcon } from "@/components/ui/dental-icons";
import { siteConfig } from "@/config/site";
import {
  Clock, Wrench, Building2, ShieldCheck,
  Crown, Bot, Cpu, Crosshair, Gauge, FlaskRound,
  Stethoscope, HeartPulse, Scan, Sparkles,
} from "lucide-react";

const STAT_ICONS = [Clock, Wrench, Building2, ShieldCheck] as const;

const FLOATING_ICONS = [
  { Icon: Crown, top: "12%", left: "8%", size: 44, delay: "0s" },
  { Icon: Bot, top: "18%", left: "85%", size: 52, delay: "1s" },
  { Icon: Cpu, top: "28%", left: "22%", size: 36, delay: "2s" },
  { Icon: Crosshair, top: "14%", left: "65%", size: 40, delay: "3s" },
  { Icon: Gauge, top: "35%", left: "90%", size: 34, delay: "0.5s" },
  { Icon: FlaskRound, top: "8%", left: "45%", size: 38, delay: "2.5s" },
  { Icon: Stethoscope, top: "32%", left: "5%", size: 42, delay: "4s" },
  { Icon: HeartPulse, top: "22%", left: "50%", size: 30, delay: "1.5s" },
  { Icon: Scan, top: "10%", left: "75%", size: 36, delay: "3.5s" },
  { Icon: Sparkles, top: "38%", left: "38%", size: 32, delay: "4.5s" },
  { Icon: ShieldCheck, top: "25%", left: "15%", size: 28, delay: "5s" },
  { Icon: Building2, top: "6%", left: "30%", size: 30, delay: "2s" },
] as const;

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
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
        .from(ctaRef.current, {
          opacity: 0, y: 12, duration: 0.5, ease: "power2.out",
        }, "-=0.3")
        .from(statsRef.current, {
          opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
        }, "-=0.2");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="section-dark relative flex min-h-screen flex-col items-center overflow-hidden bg-void px-6"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Hero robot image — subtle background */}
        <div className="absolute inset-x-0 bottom-0 h-[70%]">
          <Image
            src="/images/hero-robot.png"
            alt=""
            fill
            className="object-cover grayscale-[40%] brightness-[0.3]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,7,13,1)_0%,transparent_30%,transparent_70%,rgba(6,7,13,0.9)_100%)]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(94,175,197,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* ── Floating icons ── */}
      <FloatingIcons icons={FLOATING_ICONS} />

      {/* ── Spacer ── */}
      <div className="min-h-[20vh]" />

      {/* ── Mobile hero visual ── */}
      <div className="relative z-10 mb-8 md:hidden">
        <ToothIcon size={100} className="drop-shadow-cyan animate-float" />
      </div>

      {/* ── Content — scan left, text right ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
        {/* Left — scanning animation */}
        <div className="hidden md:flex items-center justify-center shrink-0">
          <ToothScanSVG />
        </div>

        {/* Right — text */}
        <div className="flex-1 text-center md:text-left">
          <p
            ref={kickerRef}
            className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium-light"
          >
            {siteConfig.tagline}
          </p>

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

          <p
            ref={subRef}
            className="mt-8 max-w-[580px] font-body text-[17px] leading-[1.7] text-titanium-light"
          >
            {siteConfig.description}
          </p>

          <div ref={ctaRef} className="mt-10 flex gap-4 justify-center md:justify-start">
            <Link
              href="/technology"
              className="relative overflow-hidden rounded-md bg-white-pure px-7 py-3.5 text-[12px] font-bold tracking-[0.5px] text-void transition-all hover:shadow-[0_0_30px_rgba(94,175,197,0.5)] hover:bg-cyan"
            >
              Explore the Technology &rarr;
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="rounded-md border border-titanium-dark bg-deep-void px-7 py-3.5 text-[12px] font-medium tracking-[0.5px] text-titanium-light transition-all hover:border-titanium hover:text-white-pure"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
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
                className="rounded-lg border border-titanium-dark bg-deep-void/50 px-5 py-4 text-center backdrop-blur-sm transition-all hover:border-titanium hover:-translate-y-1"
              >
                <StatIcon className="mx-auto mb-2 h-4 w-4 text-titanium-light" strokeWidth={1.5} />
                <div className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                  <NumberTicker value={stat.value} delay={0.8} />
                  {stat.suffix}
                </div>
                <p className="mt-1.5 font-display text-[9px] font-semibold uppercase tracking-[2px] text-titanium-light">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video modal */}
      <VideoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
