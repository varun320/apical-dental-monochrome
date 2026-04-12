"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BorderBeam } from "@/components/ui/border-beam";
import { Eye, Hand, Brain, Shield, Workflow } from "lucide-react";

const components = [
  {
    icon: Eye,
    name: "Vision System",
    description: "High-resolution 3D scanning and real-time spatial mapping for sub-millimeter positioning accuracy.",
    spec: "±0.05mm scan resolution",
  },
  {
    icon: Brain,
    name: "AI Navigation",
    description: "Machine learning algorithms that adapt to each unique dental anatomy, optimizing tool paths in real time.",
    spec: "Real-time path optimization",
  },
  {
    icon: Hand,
    name: "Precision Actuators",
    description: "Tesla-engineered servo motors delivering surgical-grade movement control across all axes of operation.",
    spec: "6-axis articulation",
  },
  {
    icon: Shield,
    name: "Safety Architecture",
    description: "Redundant sensor arrays and force-feedback systems ensuring patient safety at every stage of operation.",
    spec: "Triple-redundant failsafe",
  },
  {
    icon: Workflow,
    name: "Workflow Integration",
    description: "Seamless connection to existing dental CAD/CAM systems, digital impressions, and practice management software.",
    spec: "Universal compatibility",
  },
] as const;

export function TechSystemBreakdown() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    gsap.set(cards, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-light-bg px-6 py-28 "
    >
      {/* ── Grid overlay for tech aesthetic ── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Section header ── */}
        <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
          System Architecture
        </p>
        <h2 className="mb-12 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-light-text">
          Every component, purpose-built.
        </h2>

        {/* ── Featured cards: 2 full-width ── */}
        <div className="grid gap-5">
          {components.slice(0, 2).map((component, i) => {
            const Icon = component.icon;
            return (
              <div
                key={component.name}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative overflow-hidden rounded-lg border border-light-border bg-light-card shadow-sm p-6 transition-all hover:shadow-lg hover:-translate-y-1.5 hover:border-cyan-muted/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-light-border bg-light-bg">
                    <Icon className="h-5 w-5 text-light-muted" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-[9px] font-semibold uppercase tracking-[2px] text-light-muted">
                      Component {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] text-light-text">
                      {component.name}
                    </h3>
                    <p className="mt-2 font-body text-[13px] leading-[1.7] text-light-muted">
                      {component.description}
                    </p>
                    <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
                      {component.spec}
                    </p>
                  </div>
                </div>

                <BorderBeam
                  size={80}
                  duration={8}
                  colorFrom="#5EAFC5"
                  colorTo="#3D7A8F"
                  borderWidth={1}
                />
              </div>
            );
          })}
        </div>

        {/* ── Remaining cards: 3 in a row — last one dark ── */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {components.slice(2).map((component, i) => {
            const Icon = component.icon;
            const idx = i + 2;
            const isLast = idx === components.length - 1;
            return (
              <div
                key={component.name}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className={`relative overflow-hidden rounded-lg border shadow-sm p-6 transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                  isLast
                    ? "bg-void border-titanium-dark hover:border-titanium"
                    : "bg-light-card border-light-border hover:border-cyan-muted/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${
                    isLast ? "border-titanium-dark bg-deep-void" : "border-light-border bg-light-bg"
                  }`}>
                    <Icon className={`h-5 w-5 ${isLast ? "text-titanium-light" : "text-light-muted"}`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-display text-[9px] font-semibold uppercase tracking-[2px] ${isLast ? "text-titanium" : "text-light-muted"}`}>
                      Component {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h3 className={`mt-1 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] ${isLast ? "text-white-pure" : "text-light-text"}`}>
                      {component.name}
                    </h3>
                    <p className={`mt-2 font-body text-[13px] leading-[1.7] ${isLast ? "text-titanium-light" : "text-light-muted"}`}>
                      {component.description}
                    </p>
                    <p className={`mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] ${isLast ? "text-titanium" : "text-light-muted"}`}>
                      {component.spec}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
