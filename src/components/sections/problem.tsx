"use client";

import Image from "next/image";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { GraduationCap, Target, School } from "lucide-react";

const problems = [
  {
    value: 5,
    suffix: "yr",
    label: "Training Curve",
    description:
      "It takes 5 years to train a dental lab technician. Most leave for better pay before completing training.",
    icon: GraduationCap,
  },
  {
    value: 3,
    display: "3/10",
    label: "Quality Standard",
    description:
      "Only 3 out of 10 dental procedures meet the doctor's own quality standard. The precision gap is real.",
    icon: Target,
  },
  {
    value: 0,
    suffix: "",
    label: "New Schools",
    description:
      "No new schools teach the craft. The pipeline of skilled dental lab technicians has dried up entirely.",
    icon: School,
  },
];

export function Problem() {
  return (
    <section className="relative bg-light-bg px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <StaggerFadeIn
          className="grid gap-4 md:grid-cols-3"
          stagger={0.12}
        >
          {/* ── Header Card (spans 2 cols, full height) ── */}
          <div className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void md:col-span-2 md:row-span-3">
            <Image
              src="/images/problem-bg.png"
              alt=""
              fill
              className="object-cover object-center grayscale-30 brightness-70 opacity-70"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.85)_40%,rgba(17,24,39,0.4)_100%)]" />
            <div className="relative z-10 flex h-full flex-col justify-center p-8">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium-light">
                The Crisis
              </p>
              <h2 className="mt-4 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
                The future of dental surgery<br />starts in the lab.
              </h2>
              <p className="mt-6 max-w-[500px] font-body text-[15px] leading-[1.7] text-titanium-light">
                Dental lab technicians are retiring with no replacements. The industry
                faces a workforce crisis with no scalable solution — until now. Robotics
                is the only path forward.
              </p>
            </div>
          </div>

          {/* ── Problem Cards ── */}
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="relative overflow-hidden rounded-lg border border-light-border bg-light-card p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1.5 hover:border-cyan-muted/30"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-light-muted" strokeWidth={1.5} />
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
                    {p.label}
                  </p>
                </div>
                <div className="mt-3 font-display text-[32px] font-bold leading-none tracking-[-1px] text-mint">
                  {p.display ?? (
                    <>
                      <NumberTicker value={p.value} delay={0.5 + i * 0.2} />
                      {p.suffix}
                    </>
                  )}
                </div>
                <p className="mt-3 font-body text-[14px] leading-[1.75] text-light-muted">
                  {p.description}
                </p>
                {i === 0 && (
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
        </StaggerFadeIn>
      </div>
    </section>
  );
}
