"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FadeIn } from "@/components/animations/fade-in";
import { Search, Rocket, LineChart, Headphones } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description: "We audit your current lab workflows, volume, and pain points across locations to build a tailored integration plan.",
  },
  {
    icon: Rocket,
    step: "02",
    title: "Pilot Launch",
    description: "Deploy at 1-3 locations with full support. Measure baseline improvements in remake rate, turnaround, and quality.",
  },
  {
    icon: LineChart,
    step: "03",
    title: "Scale & Optimize",
    description: "Roll out across your network with proven playbooks. Real-time dashboards track performance at every location.",
  },
  {
    icon: Headphones,
    step: "04",
    title: "Ongoing Partnership",
    description: "Continuous optimization, software updates, and dedicated account management. We grow with you.",
  },
] as const;

export function DSOPartnership() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!timeline || !line) return;

    const stepEls = stepsRef.current.filter(Boolean) as HTMLDivElement[];
    const dotEls = dotsRef.current.filter(Boolean) as HTMLDivElement[];

    // Line grows with scroll
    gsap.fromTo(line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    // Steps stagger in once
    gsap.set(stepEls, { opacity: 0, x: -20 });
    gsap.set(dotEls, { scale: 0, backgroundColor: "#08080E" });

    ScrollTrigger.create({
      trigger: timeline,
      start: "top 75%",
      once: true,
      onEnter: () => {
        stepEls.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1, x: 0, duration: 0.6, delay: i * 0.2, ease: "power3.out",
          });
        });
        dotEls.forEach((dot, i) => {
          gsap.to(dot, {
            scale: 1,
            backgroundColor: "#F5F5F8",
            duration: 0.4,
            delay: i * 0.2 + 0.1,
            ease: "back.out(2)",
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === timeline) t.kill();
      });
    };
  }, []);

  return (
    <section className="relative bg-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[800px]">
        <FadeIn>
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
            The Partnership
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-16 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
            From pilot to full deployment.
          </h2>
        </FadeIn>

        {/* ── Vertical timeline ── */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line track — centered at left 5px (center of 10px dot) */}
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-titanium-dark">
            <div ref={lineRef} className="h-full w-full origin-top bg-white-pure" />
          </div>

          <div className="space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  ref={(el) => { stepsRef.current[i] = el; }}
                  className="relative pl-10"
                >
                  {/* Dot on line — centered on the line at left 0 */}
                  <div
                    ref={(el) => { dotsRef.current[i] = el; }}
                    className="absolute left-0 top-3 h-[10px] w-[10px] rounded-full border border-titanium-dark"
                  />

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-titanium-dark bg-deep-void">
                      <Icon className="h-5 w-5 text-titanium-light" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                        Step {step.step}
                      </p>
                      <h3 className="font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                        {step.title}
                      </h3>
                      <p className="mt-2 font-body text-[14px] leading-[1.75] text-titanium-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
