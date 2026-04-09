"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ScanSearch, Play, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: ScanSearch,
    step: "01",
    title: "Plan",
    description: "The system captures a high-resolution 3D scan of the patient's dental anatomy, generating a precision digital model. AI algorithms analyze the geometry and plan optimal tool paths down to sub-millimeter tolerances.",
    image: "/images/step-plan.png",
  },
  {
    icon: Play,
    step: "02",
    title: "Execute",
    description: "Tesla's Optimus follows the computed path with surgical-grade accuracy. Real-time force feedback and spatial awareness allow the robot to adapt to micro-variations, ensuring every cut, contour, and surface meets exact specifications.",
    image: "/images/step-execute.png",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Verify",
    description: "Post-procedure quality verification scans the finished work against the original plan. Deviations are measured in microns. Every piece is documented, traceable, and guaranteed to meet the highest standards of dental prosthetics.",
    image: "/images/step-verify.png",
  },
] as const;

export function TechHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressDotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stepEls = stepsRef.current.filter(Boolean) as HTMLDivElement[];
    const dots = progressDotsRef.current.filter(Boolean) as HTMLDivElement[];

    // Initial: only first step visible
    stepEls.forEach((el, i) => {
      if (i === 0) {
        gsap.set(el, { opacity: 1, x: 0 });
      } else {
        gsap.set(el, { opacity: 0, x: 80 });
      }
    });

    dots.forEach((dot, i) => {
      gsap.set(dot, { scale: i === 0 ? 1.4 : 1, backgroundColor: i === 0 ? "#F5F5F8" : "#3A3A4E" });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * 1.5}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    // Step 1 → Step 2
    tl.to(stepEls[0], { opacity: 0, x: -80, duration: 0.6, ease: "power2.inOut" }, 0.3)
      .to(dots[0], { scale: 1, backgroundColor: "#3A3A4E", duration: 0.2 }, 0.3)
      .to(stepEls[1], { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 0.5)
      .to(dots[1], { scale: 1.4, backgroundColor: "#F5F5F8", duration: 0.2 }, 0.5);

    // Step 2 → Step 3
    tl.to(stepEls[1], { opacity: 0, x: -80, duration: 0.6, ease: "power2.inOut" }, 1.2)
      .to(dots[1], { scale: 1, backgroundColor: "#3A3A4E", duration: 0.2 }, 1.2)
      .to(stepEls[2], { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 1.4)
      .to(dots[2], { scale: 1.4, backgroundColor: "#F5F5F8", duration: 0.2 }, 1.4);

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
      className="relative bg-void px-6 py-28 lg:py-36 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[800px]">
        {/* ── Section header ── */}
        <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
          The Process
        </p>
        <h2 className="mb-20 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
          Three steps to perfection.
        </h2>

        {/* ── Progress dots ── */}
        <div className="mb-16 flex items-center justify-center gap-4">
          {steps.map((step, i) => (
            <div key={step.step} className="flex items-center gap-4">
              <div
                ref={(el) => { progressDotsRef.current[i] = el; }}
                className="h-3 w-3 rounded-full"
              />
              {i < steps.length - 1 && (
                <div className="h-px w-12 bg-titanium-dark" />
              )}
            </div>
          ))}
        </div>

        {/* ── Steps (stacked, animated in/out) ── */}
        <div className="relative min-h-[300px]">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="absolute inset-0 flex flex-col items-center text-center"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-titanium-dark">
                  <ImagePlaceholder
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 h-full w-full rounded-full border-0"
                    overlay="dark"
                  />
                  <Icon className="relative z-10 h-7 w-7 text-white-pure" strokeWidth={1.5} />
                </div>
                <p className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
                  Step {step.step}
                </p>
                <h3 className="mt-2 font-display text-[clamp(28px,4vw,36px)] font-bold leading-[1.1] tracking-[-1px] text-white-pure">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[560px] font-body text-[15px] leading-[1.75] text-titanium-light">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
