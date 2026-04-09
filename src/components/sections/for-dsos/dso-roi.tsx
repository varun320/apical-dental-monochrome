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
    description: "From 8% to 0.5% remake rate — eliminating waste and patient callbacks across your network.",
  },
  {
    icon: Clock,
    value: 60,
    suffix: "%",
    label: "Faster Turnaround",
    description: "Robotic precision cuts production time dramatically, getting prosthetics to patients faster.",
  },
  {
    icon: BadgeDollarSign,
    value: 3.2,
    suffix: "x",
    label: "ROI in Year One",
    description: "Labor savings, reduced remakes, and faster throughput compound into rapid return on investment.",
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
    <section className="relative bg-linear-to-b from-deep-void via-void to-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <FadeIn>
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
            The Business Case
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-6 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
            Numbers that make the decision easy.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mb-16 max-w-[640px] font-body text-[15px] leading-[1.7] text-titanium-light">
            Every metric that matters to DSO operations improves with robotic automation.
            Here&apos;s what our partners see in the first year.
          </p>
        </FadeIn>

        <StaggerFadeIn className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
          {roiMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-8"
              >
                <Icon className="mb-4 h-6 w-6 text-titanium" strokeWidth={1.5} />
                <div className="font-display text-[clamp(36px,5vw,48px)] font-bold leading-none tracking-[-2px] text-white-pure">
                  <NumberTicker
                    value={metric.value}
                    delay={0.3 + i * 0.1}
                    decimalPlaces={metric.label === "ROI in Year One" ? 1 : 0}
                  />
                  {metric.suffix}
                </div>
                <p className="mt-2 font-display text-[11px] font-semibold uppercase tracking-[2px] text-titanium">
                  {metric.label}
                </p>
                <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
                  {metric.description}
                </p>

                {i === 2 && (
                  <BorderBeam
                    size={80}
                    duration={8}
                    colorFrom="#9A9AB0"
                    colorTo="#3A3A4E"
                    borderWidth={1}
                  />
                )}
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
