"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FadeIn } from "@/components/animations/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { Crosshair, RotateCcw, Clock, Sparkles } from "lucide-react";

const metrics = [
  {
    icon: Crosshair,
    label: "Placement Accuracy",
    traditional: 85,
    robotic: 99.2,
    unit: "%",
    roboticDecimals: 1,
    description: "Consistent sub-millimeter precision on every procedure",
  },
  {
    icon: RotateCcw,
    label: "Procedure Consistency",
    traditional: 72,
    robotic: 98,
    unit: "%",
    roboticDecimals: 0,
    description: "Repeatable results across hundreds of procedures",
  },
  {
    icon: Clock,
    label: "Production Time",
    traditional: 100,
    robotic: 40,
    unit: "%",
    roboticDecimals: 0,
    suffix: " of baseline",
    description: "60% faster turnaround than traditional methods",
  },
  {
    icon: Sparkles,
    label: "Remake Rate",
    traditional: 8,
    robotic: 0.5,
    unit: "%",
    roboticDecimals: 1,
    description: "Near-zero remakes eliminate waste and delays",
  },
] as const;

export function TechComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(cards, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-light-bg px-6 py-32 lg:py-40 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Section header ── */}
        <FadeIn>
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
            The Difference
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-6 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-light-text">
            Precision you can measure.
          </h2>
        </FadeIn>

        {/* ── Column headers ── */}
        <FadeIn delay={0.15}>
          <div className="mb-6 hidden items-center lg:grid lg:grid-cols-[1fr_140px_140px] gap-4">
            <div />
            <p className="text-center font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
              Traditional
            </p>
            <p className="text-center font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
              Robotic
            </p>
          </div>
        </FadeIn>

        {/* ── Metric rows ── */}
        <div className="space-y-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="grid items-center gap-4 rounded-lg border border-light-border bg-light-card shadow-sm p-5 lg:grid-cols-[1fr_140px_140px]"
              >
                {/* Label + description */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-light-border bg-light-bg">
                    <Icon className="h-5 w-5 text-titanium-light" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-[16px] font-semibold tracking-[-0.3px] text-light-text">
                      {metric.label}
                    </h3>
                    <p className="mt-0.5 font-body text-[12px] leading-[1.5] text-light-muted">
                      {metric.description}
                    </p>
                  </div>
                </div>

                {/* Traditional value */}
                <div className="flex items-center gap-3 lg:justify-center">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium lg:hidden">
                    Traditional
                  </span>
                  <span className="font-display text-[24px] font-bold tracking-[-1px] text-light-muted">
                    <NumberTicker value={metric.traditional} delay={0.3 + i * 0.1} />
                    <span className="text-[14px]">{metric.unit}</span>
                  </span>
                </div>

                {/* Robotic value — highlighted */}
                <div className="relative flex items-center gap-3 lg:justify-center">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium-light lg:hidden">
                    Robotic
                  </span>
                  <div className="relative overflow-hidden rounded-md border border-light-border bg-light-bg px-4 py-2">
                    <span className="font-display text-[24px] font-bold tracking-[-1px] text-light-text">
                      <NumberTicker
                        value={metric.robotic}
                        delay={0.5 + i * 0.1}
                        decimalPlaces={metric.roboticDecimals}
                      />
                      <span className="text-[14px]">{metric.unit}</span>
                    </span>
                    {i === 0 && (
                      <BorderBeam
                        size={60}
                        duration={6}
                        colorFrom="#5EAFC5"
                        colorTo="#3D7A8F"
                        borderWidth={1}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom highlight card ── */}
        <FadeIn delay={0.4}>
          <div className="relative mt-6 overflow-hidden rounded-lg border border-light-border bg-light-card p-6 text-center shadow-sm">
            <p className="font-display text-[clamp(16px,2.5vw,20px)] font-semibold tracking-[-0.5px] text-light-text">
              Up to <span className="text-[clamp(24px,3.5vw,32px)] font-bold text-light-text">16x</span> fewer remakes.{" "}
              <span className="text-[clamp(24px,3.5vw,32px)] font-bold text-light-text">60%</span> faster production.
            </p>
            <p className="mt-2 font-body text-[13px] text-light-muted">
              The numbers speak for themselves.
            </p>
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
