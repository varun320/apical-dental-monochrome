"use client";

import Image from "next/image";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
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
    <section className="relative bg-light-bg px-6 py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* 50/50 split — image left, content right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-stretch">
          {/* Left — dark image card */}
          <FadeIn direction="left" distance={30}>
            <div className="relative overflow-hidden rounded-2xl border border-titanium-dark bg-deep-void h-full min-h-[400px]">
              <Image
                src="/images/problem-bg.png"
                alt=""
                fill
                className="object-cover object-center grayscale-30 brightness-70 opacity-60"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,7,13,0.95)_0%,rgba(6,7,13,0.4)_100%)]" />
              <div className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-10">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium-light">
                  The Crisis
                </p>
                <h2 className="mt-4 font-display text-[clamp(28px,4vw,36px)] font-bold leading-[1.1] tracking-[-1px] text-white-pure">
                  The future of dental surgery starts in the lab.
                </h2>
                <p className="mt-5 max-w-[420px] font-body text-[15px] leading-[1.7] text-titanium-light">
                  Dental lab technicians are retiring with no replacements. The industry
                  faces a workforce crisis with no scalable solution — until now.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right — stat cards stacked */}
          <StaggerFadeIn className="flex flex-col gap-4" stagger={0.1}>
            {problems.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="relative overflow-hidden rounded-xl border border-light-border bg-light-card p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-titanium-light/50 flex-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-light-border bg-light-bg">
                      <Icon className="h-5 w-5 text-light-muted" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
                        {p.label}
                      </p>
                      <div className={`mt-1 font-display text-[36px] font-bold leading-none tracking-[-1.5px] ${p.display ? "text-mint" : "text-light-text"}`}>
                        {p.display ?? (
                          <>
                            <NumberTicker value={p.value} delay={0.5 + i * 0.2} />
                            {p.suffix}
                          </>
                        )}
                      </div>
                      <p className="mt-2 font-body text-[14px] leading-[1.75] text-light-muted">
                        {p.description}
                      </p>
                    </div>
                  </div>
                  {i === 0 && (
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
