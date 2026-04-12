"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { TrendingDown, Clock, BadgeDollarSign, BarChart3 } from "lucide-react";

const roiMetrics = [
  {
    icon: TrendingDown,
    value: 93,
    suffix: "%",
    label: "Fewer Remakes",
    description: "From 8% to 0.5% remake rate — eliminating waste and patient callbacks.",
  },
  {
    icon: Clock,
    value: 60,
    suffix: "%",
    label: "Faster Turnaround",
    description: "Robotic precision cuts production time dramatically.",
  },
  {
    icon: BadgeDollarSign,
    value: 3.2,
    suffix: "x",
    label: "ROI in Year One",
    description: "Labor savings, reduced remakes, and faster throughput compound into rapid ROI.",
    decimals: 1,
  },
  {
    icon: BarChart3,
    value: 500,
    suffix: "+",
    label: "Offices Supported",
    description: "Proven at scale across hundreds of DSO locations nationwide.",
  },
] as const;

export function DSOBusinessCase() {
  return (
    <section className="relative bg-light-bg px-6 py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* 50/50 — text left, metrics right */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left — header */}
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
                The Business Case
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,36px)] font-bold leading-[1.1] tracking-[-1px] text-light-text">
                Numbers that make the decision easy.
              </h2>
              <p className="mt-6 font-body text-[16px] leading-[1.7] text-light-muted">
                Every metric that matters to DSO operations improves with robotic automation.
                Here&apos;s what our partners see in the first year.
              </p>
            </div>
          </FadeIn>

          {/* Right — 2x2 metric cards */}
          <StaggerFadeIn className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
            {roiMetrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="relative overflow-hidden rounded-xl border border-light-border bg-light-card shadow-sm p-6 transition-all hover:shadow-lg hover:-translate-y-1.5 hover:border-titanium-light/50"
                >
                  <Icon className="mb-3 h-5 w-5 text-light-muted" strokeWidth={1.5} />
                  <div className="font-display text-[clamp(32px,4vw,42px)] font-bold leading-none tracking-[-2px] text-light-text">
                    <NumberTicker
                      value={metric.value}
                      delay={0.3 + i * 0.1}
                      decimalPlaces={metric.label === "ROI in Year One" ? 1 : 0}
                    />
                    {metric.suffix}
                  </div>
                  <p className="mt-1.5 font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
                    {metric.label}
                  </p>
                  <p className="mt-2 font-body text-[13px] leading-[1.7] text-light-muted">
                    {metric.description}
                  </p>
                  {i === 2 && (
                    <BorderBeam size={80} duration={8} colorFrom="#5EAFC5" colorTo="#3D7A8F" borderWidth={1} />
                  )}
                </div>
              );
            })}
          </StaggerFadeIn>
        </div>
      </div>
    </section>
  );
}
