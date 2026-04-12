"use client";

import Link from "next/link";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { TextReveal } from "@/components/animations/text-reveal";
import { BorderBeam } from "@/components/ui/border-beam";
import Image from "next/image";
import { ShieldCheck, FileCheck, Award, Lock, HeartPulse, Scale } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "FDA Pathway", description: "Designed within the FDA regulatory framework for dental devices" },
  { icon: FileCheck, title: "Clinical Validation", description: "Backed by extensive clinical testing and peer-reviewed research" },
  { icon: Award, title: "ISO Certified", description: "Manufacturing processes certified to ISO 13485 medical device standards" },
  { icon: Lock, title: "Data Security", description: "HIPAA-compliant data handling with end-to-end encryption" },
  { icon: HeartPulse, title: "Patient Safety", description: "Triple-redundant safety systems with real-time force monitoring" },
  { icon: Scale, title: "Zero Barriers", description: "Dental laboratory entry requires no additional regulatory clearance" },
] as const;

export function TechTrust() {
  return (
    <section className="relative bg-light-bg px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Section header ── */}
        <FadeIn>
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-muted">
            Trust & Safety
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-16 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-light-text">
            Built on trust. Backed by science.
          </h2>
        </FadeIn>

        {/* ── Badge grid ── */}
        <StaggerFadeIn
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {badges.map((badge) => {
            const Icon = badge.icon;
            const isHighlight = badge.title === "Zero Barriers";
            return (
              <div
                key={badge.title}
                className={`relative overflow-hidden rounded-lg border p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                  isHighlight
                    ? "bg-void border-titanium-dark hover:border-titanium"
                    : "bg-light-card border-light-border hover:border-cyan-muted/30"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                  isHighlight ? "border-titanium-dark bg-deep-void" : "border-light-border bg-light-bg"
                }`}>
                  <Icon className={`h-5 w-5 ${isHighlight ? "text-cyan" : "text-light-muted"}`} strokeWidth={1.5} />
                </div>
                <h3 className={`mt-4 font-display text-[16px] font-semibold leading-[1.2] tracking-[-0.3px] ${isHighlight ? "text-white-pure" : "text-light-text"}`}>
                  {badge.title}
                </h3>
                <p className={`mt-2 font-body text-[13px] leading-[1.7] ${isHighlight ? "text-titanium-light" : "text-light-muted"}`}>
                  {badge.description}
                </p>
                {isHighlight && (
                  <BorderBeam size={80} duration={8} colorFrom="#5EAFC5" colorTo="#3D7A8F" borderWidth={1} />
                )}
              </div>
            );
          })}
        </StaggerFadeIn>

        {/* ── CTA Card ── */}
        <FadeIn delay={0.3}>
          <div className="section-dark relative mt-20 overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-12 text-center">
            <Image
              src="/images/cta-texture.png"
              alt=""
              fill
              className="object-cover opacity-40"
              sizes="700px"
            />
            <TextReveal className="relative z-10 font-display text-[clamp(22px,3.5vw,30px)] font-bold leading-[1.2] tracking-[-0.5px] text-white-pure">
              See the technology in action.
            </TextReveal>

            <FadeIn delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-md bg-white-pure px-8 py-4 font-display text-[14px] font-bold tracking-[0.5px] text-void transition-opacity hover:opacity-80"
                >
                  Request a Demo &rarr;
                </Link>
                <Link
                  href="/for-dsos"
                  className="rounded-md border border-titanium-dark bg-deep-void px-8 py-4 font-display text-[12px] font-medium tracking-[0.5px] text-titanium-light transition-all hover:border-titanium hover:text-white-pure"
                >
                  DSO Solutions
                </Link>
              </div>
            </FadeIn>

            <BorderBeam
              size={100}
              duration={10}
              colorFrom="#5EAFC5"
              colorTo="#3D7A8F"
              borderWidth={1}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
