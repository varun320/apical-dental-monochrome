"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { NumberTicker } from "@/components/ui/number-ticker";
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

/* Data points that appear after laser scan passes over them */
const SCAN_DATA_POINTS = [
  { cx: 100, cy: 40, label: "Enamel", value: "0.02mm" },
  { cx: 130, cy: 75, label: "Crown", value: "±0.01mm" },
  { cx: 70, cy: 110, label: "Dentin", value: "1.2mm" },
  { cx: 130, cy: 170, label: "Root", value: "12.4mm" },
  { cx: 85, cy: 220, label: "Apex", value: "0.5mm" },
];

function ToothScanSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const laserRef = useRef<SVGLineElement>(null);
  const glowRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const dataPoints = svg.querySelectorAll(".scan-point");
    const dataLabels = svg.querySelectorAll(".scan-label");
    const laser = laserRef.current;
    const glow = glowRef.current;

    function buildScan() {
      const tl = gsap.timeline({
        delay: 1.2,
        onComplete: () => {
          // Reset and loop after 3s pause
          gsap.delayedCall(3, () => {
            // Fade out data points and labels
            gsap.to(dataPoints, { scale: 0, duration: 0.4, stagger: 0.05, ease: "power2.in" });
            gsap.to(dataLabels, { opacity: 0, x: -8, duration: 0.3, stagger: 0.05 });
            // Reset laser
            gsap.set([laser, glow], { opacity: 1, attr: { y1: 20, y2: 20 } });
            // Restart after reset
            gsap.delayedCall(0.8, () => buildScan());
          });
        },
      });

      // Scan down
      tl.to([laser, glow], {
        attr: { y1: 245, y2: 245 },
        duration: 2.2,
        ease: "power1.inOut",
      });

      // Data points pop in as laser passes
      SCAN_DATA_POINTS.forEach((pt, i) => {
        const triggerTime = (pt.cy / 245) * 2.2;
        tl.to(dataPoints[i], { scale: 1, duration: 0.25, ease: "back.out(2)" }, triggerTime);
        tl.to(dataLabels[i], { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }, triggerTime + 0.08);
      });

      // Fade laser after scan completes
      tl.to([laser, glow], { opacity: 0, duration: 0.4 }, 2.4);

      return tl;
    }

    // Initial state
    gsap.set(dataPoints, { scale: 0, transformOrigin: "center" });
    gsap.set(dataLabels, { opacity: 0, x: -8 });
    gsap.set([laser, glow], { attr: { y1: 20, y2: 20 } });

    const tl = buildScan();

    return () => {
      tl.kill();
      gsap.killTweensOf([dataPoints, dataLabels, laser, glow]);
    };
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 200 260" className="h-[280px] w-auto md:h-[320px]" fill="none">
      {/* Molar crown with cusps */}
      <path d="M60 95 C60 55, 65 30, 80 20 C87 15, 93 18, 100 22 C107 18, 113 15, 120 20 C135 30, 140 55, 140 95" stroke="rgba(15,23,42,0.3)" strokeWidth={1.4} fill="rgba(94,175,197,0.05)" />
      <path d="M60 95 C60 105, 65 112, 72 115 L128 115 C135 112, 140 105, 140 95" stroke="rgba(15,23,42,0.3)" strokeWidth={1.4} fill="rgba(94,175,197,0.03)" />
      <path d="M80 20 C85 28, 95 28, 100 22" stroke="rgba(15,23,42,0.12)" strokeWidth={0.8} fill="none" />
      <path d="M100 22 C105 28, 115 28, 120 20" stroke="rgba(15,23,42,0.12)" strokeWidth={0.8} fill="none" />
      <path d="M68 65 C80 58, 90 62, 100 58 C110 62, 120 58, 132 65" stroke="rgba(15,23,42,0.1)" strokeWidth={0.6} strokeDasharray="3 2" fill="none" />
      {/* Roots */}
      <path d="M72 115 C70 140, 68 170, 72 200 C74 215, 78 230, 82 240" stroke="rgba(15,23,42,0.25)" strokeWidth={1.2} fill="none" />
      <path d="M128 115 C130 140, 132 170, 128 200 C126 215, 122 230, 118 240" stroke="rgba(15,23,42,0.25)" strokeWidth={1.2} fill="none" />
      <path d="M72 115 C70 140, 68 170, 72 200 C74 215, 78 230, 82 240 L100 235 L118 240 C122 230, 126 215, 128 200 C132 170, 130 140, 128 115 Z" fill="rgba(94,175,197,0.03)" stroke="none" />
      {/* Pulp + canals */}
      <path d="M88 75 C88 85, 85 95, 85 105 L115 105 C115 95, 112 85, 112 75 C108 68, 92 68, 88 75 Z" stroke="rgba(15,23,42,0.1)" strokeWidth={0.6} fill="rgba(94,175,197,0.06)" />
      <path d="M90 105 C88 140, 80 190, 82 240" stroke="rgba(15,23,42,0.08)" strokeWidth={0.5} fill="none" />
      <path d="M110 105 C112 140, 120 190, 118 240" stroke="rgba(15,23,42,0.08)" strokeWidth={0.5} fill="none" />
      {/* Laser */}
      <line ref={glowRef} x1="30" y1="20" x2="170" y2="20" stroke="rgba(94,175,197,0.15)" strokeWidth={8} />
      <line ref={laserRef} x1="30" y1="20" x2="170" y2="20" stroke="var(--cyan)" strokeWidth={1.5} />
      {/* Data points */}
      {SCAN_DATA_POINTS.map((pt, i) => (
        <g key={i}>
          <circle className="scan-point" cx={pt.cx} cy={pt.cy} r={3} fill="var(--cyan)" />
          <g className="scan-label">
            <line x1={pt.cx + 5} y1={pt.cy} x2={pt.cx + 20} y2={pt.cy} stroke="rgba(94,175,197,0.4)" strokeWidth={0.5} />
            <text x={pt.cx + 24} y={pt.cy - 4} fill="rgba(100,116,139,0.8)" fontSize="7" fontFamily="var(--font-space-grotesk)">{pt.label}</text>
            <text x={pt.cx + 24} y={pt.cy + 5} fill="var(--cyan)" fontSize="8" fontFamily="var(--font-space-grotesk)" fontWeight="bold">{pt.value}</text>
          </g>
        </g>
      ))}
    </svg>
  );
}

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
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-light-bg px-6"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(94,175,197,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_50%,transparent_40%,rgba(241,245,249,1))]" />
      </div>

      {/* ── Floating icons ── */}
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

      {/* ── Spacer ── */}
      <div className="min-h-[20vh]" />

      {/* ── Content — scan left, text right ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
        {/* Left — scanning animation */}


        {/* Right — text */}
        <div className="flex-1 text-center md:text-left">
          <p
            ref={kickerRef}
            className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted"
          >
            {siteConfig.tagline}
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-2px]"
          >
            <span className="headline-line block text-light-text">
              Human Expertise.
            </span>
            <span className="headline-line block bg-linear-to-r from-light-text via-titanium to-titanium-light bg-clip-text text-transparent">
              Robotic Precision.
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-[580px] font-body text-[17px] leading-[1.7] text-light-muted"
          >
            {siteConfig.description}
          </p>

          <div ref={ctaRef} className="mt-10 flex gap-4 justify-center md:justify-start">
            <Link
              href="/technology"
              className="relative overflow-hidden rounded-md bg-light-text px-7 py-3.5 text-[12px] font-bold tracking-[0.5px] text-white transition-opacity hover:opacity-80"
            >
              Explore the Technology &rarr;
            </Link>
            <button className="rounded-md border border-light-border bg-light-card px-7 py-3.5 text-[12px] font-medium tracking-[0.5px] text-light-muted transition-all hover:border-titanium hover:text-light-text shadow-sm">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center flex-shrink-0">
          <ToothScanSVG />
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
                className="rounded-lg border border-light-border bg-light-card px-5 py-4 text-center shadow-sm"
              >
                <StatIcon className="mx-auto mb-2 h-4 w-4 text-light-muted" strokeWidth={1.5} />
                <div className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-mint">
                  <NumberTicker value={stat.value} delay={0.8} />
                  {stat.suffix}
                </div>
                <p className="mt-1.5 font-display text-[9px] font-semibold uppercase tracking-[2px] text-light-muted">
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
