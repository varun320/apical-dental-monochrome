"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";

const metrics = [
  {
    label: "Placement Accuracy",
    traditional: { value: 85, label: "Traditional" },
    robotic: { value: 99, label: "Robotic" },
    unit: "%",
  },
  {
    label: "Procedure Consistency",
    traditional: { value: 72, label: "Traditional" },
    robotic: { value: 98, label: "Robotic" },
    unit: "%",
  },
  {
    label: "Production Time",
    traditional: { value: 100, label: "Traditional (baseline)" },
    robotic: { value: 40, label: "Robotic" },
    unit: "%",
    invertBetter: true,
  },
  {
    label: "Remake Rate",
    traditional: { value: 8, label: "Traditional" },
    robotic: { value: 0.5, label: "Robotic" },
    unit: "%",
    invertBetter: true,
    decimals: 1,
  },
] as const;

export function TechComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bars = barsRef.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(bars, { width: "0%" });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 65%",
      once: true,
      onEnter: () => {
        bars.forEach((bar, i) => {
          const targetWidth = bar.dataset.width || "0";
          gsap.to(bar, {
            width: `${targetWidth}%`,
            duration: 1.2,
            delay: i * 0.15,
            ease: "power3.out",
          });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  let barIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative bg-linear-to-b from-void via-deep-void to-void px-6 py-28 lg:py-36 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[900px]">
        {/* ── Section header ── */}
        <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
          The Difference
        </p>
        <h2 className="mb-16 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
          Precision you can measure.
        </h2>

        {/* ── Comparison metrics ── */}
        <StaggerFadeIn className="space-y-10" stagger={0.12}>
          {metrics.map((metric) => {
            const traditionalBarIdx = barIndex++;
            const roboticBarIdx = barIndex++;
            return (
              <div key={metric.label}>
                <p className="mb-4 font-display text-[14px] font-semibold tracking-[-0.3px] text-white-pure">
                  {metric.label}
                </p>

                {/* Traditional bar */}
                <div className="mb-3">
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                      {metric.traditional.label}
                    </span>
                    <span className="font-display text-[16px] font-bold tracking-[-0.5px] text-titanium">
                      <NumberTicker
                        value={metric.traditional.value}
                        delay={0.3}
                        decimalPlaces={metric.label === "Remake Rate" ? 0 : 0}
                      />
                      {metric.unit}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-titanium-dark/30">
                    <div
                      ref={(el) => { barsRef.current[traditionalBarIdx] = el; }}
                      data-width={metric.traditional.value}
                      className="h-full rounded-full bg-titanium-dark"
                    />
                  </div>
                </div>

                {/* Robotic bar */}
                <div>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium-light">
                      {metric.robotic.label}
                    </span>
                    <span className="font-display text-[16px] font-bold tracking-[-0.5px] text-white-pure">
                      <NumberTicker
                        value={metric.robotic.value}
                        delay={0.5}
                        decimalPlaces={metric.label === "Remake Rate" ? 1 : 0}
                      />
                      {metric.unit}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-titanium-dark/30">
                    <div
                      ref={(el) => { barsRef.current[roboticBarIdx] = el; }}
                      data-width={metric.robotic.value}
                      className="h-full rounded-full bg-white-pure shadow-[0_0_12px_rgba(245,245,248,0.3)]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
