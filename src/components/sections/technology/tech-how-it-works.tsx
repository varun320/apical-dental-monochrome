"use client";

import Image from "next/image";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
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
    dark: true,
  },
] as const;

export function TechHowItWorks() {
  return (
    <section className="relative bg-white px-6 py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <FadeIn>
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
            The Process
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-16 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-light-text">
            Three steps to perfection.
          </h2>
        </FadeIn>

        <StaggerFadeIn className="grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {steps.map((step) => {
            const Icon = step.icon;
            const isDark = "dark" in step && step.dark;
            return (
              <div
                key={step.step}
                className="group relative overflow-hidden rounded-lg border border-titanium-dark shadow-sm transition-all hover:shadow-lg hover:-translate-y-1.5 min-h-[380px] flex flex-col justify-end"
              >
                {/* Background image */}
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover grayscale-[30%] brightness-[0.35] transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Gradient overlay for readability — stronger at bottom */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,7,13,0.2)_0%,rgba(6,7,13,0.75)_50%,rgba(6,7,13,0.95)_100%)]" />

                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-titanium-dark bg-void/60 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-cyan" strokeWidth={1.5} />
                    </div>
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium-light">
                      Step {step.step}
                    </p>
                  </div>

                  <h3 className="font-display text-[24px] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
