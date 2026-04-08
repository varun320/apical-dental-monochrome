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

    gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // Reveal all cards sequentially but keep them all visible
    cards.forEach((card, i) => {
      tl.to(card, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out",
      }, i * 0.6);
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-linear-to-b from-deep-void via-void to-void px-6 py-28 "
    >
      {/* ── Grid overlay for tech aesthetic ── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(58,58,78,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(58,58,78,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Section header ── */}
        <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
          System Architecture
        </p>
        <h2 className="mb-12 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
          Every component, purpose-built.
        </h2>

        {/* ── Featured cards: 2 full-width ── */}
        <div className="grid gap-2">
          {components.slice(0, 2).map((component, i) => {
            const Icon = component.icon;
            return (
              <div
                key={component.name}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-titanium-dark bg-void">
                    <Icon className="h-5 w-5 text-titanium-light" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-[9px] font-semibold uppercase tracking-[2px] text-titanium">
                      Component {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                      {component.name}
                    </h3>
                    <p className="mt-2 font-body text-[13px] leading-[1.7] text-titanium-light">
                      {component.description}
                    </p>
                    <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                      {component.spec}
                    </p>
                  </div>
                </div>

                <BorderBeam
                  size={80}
                  duration={8}
                  colorFrom="#9A9AB0"
                  colorTo="#3A3A4E"
                  borderWidth={1}
                />
              </div>
            );
          })}
        </div>

        {/* ── Remaining cards: 3 in a row ── */}
        <div className="mt-2 grid gap-4 lg:grid-cols-3">
          {components.slice(2).map((component, i) => {
            const Icon = component.icon;
            const idx = i + 2;
            return (
              <div
                key={component.name}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-titanium-dark bg-void">
                    <Icon className="h-5 w-5 text-titanium-light" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-[9px] font-semibold uppercase tracking-[2px] text-titanium">
                      Component {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                      {component.name}
                    </h3>
                    <p className="mt-2 font-body text-[13px] leading-[1.7] text-titanium-light">
                      {component.description}
                    </p>
                    <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
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
