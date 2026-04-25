"use client";

import Link from "next/link";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const badges = [
  {
    title: "FDA pathway",
    description: "Designed within the FDA regulatory framework for dental devices.",
  },
  {
    title: "Clinical validation",
    description: "Backed by extensive clinical testing and peer-reviewed research.",
  },
  {
    title: "ISO 13485",
    description: "Manufacturing processes certified to ISO 13485 medical-device standards.",
  },
  {
    title: "Data security",
    description: "HIPAA-compliant data handling with end-to-end encryption.",
  },
  {
    title: "Patient safety",
    description: "Triple-redundant safety systems with real-time force monitoring.",
  },
  {
    title: "Zero barriers",
    description: "Dental laboratory entry requires no additional regulatory clearance.",
    highlight: true,
  },
];

export function TechTrust() {
  return (
    <section className="section-graphite border-t border-white/10">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <FadeIn>
          <p className="eyebrow text-bone/55">04 — Trust & safety</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 max-w-[820px] font-[family-name:var(--font-fraunces)] font-light leading-[1.05] tracking-[-1.5px] text-bone text-[clamp(2rem,4vw,3.25rem)]">
            Built on trust. <span className="italic">Backed by science.</span>
          </h2>
        </FadeIn>

        <StaggerFadeIn
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {badges.map((b, i) => (
            <article
              key={b.title}
              className={`border-t pt-7 ${
                b.highlight ? "border-terracotta" : "border-white/25"
              }`}
            >
              <p className="eyebrow text-bone/55">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className={`mt-4 font-[family-name:var(--font-fraunces)] text-[1.5rem] font-normal leading-[1.2] tracking-[-0.5px] ${
                  b.highlight ? "text-terracotta" : "text-bone"
                }`}
              >
                {b.title}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-inter)] text-[15px] leading-[1.65] text-bone/70">
                {b.description}
              </p>
            </article>
          ))}
        </StaggerFadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-20 border-t border-bone/30 pt-12 grid grid-cols-1 gap-8 md:grid-cols-[55fr_45fr] md:items-end">
            <h3 className="font-[family-name:var(--font-fraunces)] font-light leading-[1.05] tracking-[-1.5px] text-bone text-[clamp(2rem,4vw,3rem)]">
              See the technology in action.
            </h3>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-terracotta px-7 py-[18px] font-[family-name:var(--font-inter)] text-[14px] font-medium tracking-[0.5px] text-bone transition-colors hover:bg-bone hover:text-graphite"
              >
                Request a demo
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
              <Link
                href="/for-dsos"
                className="inline-flex items-center gap-2 px-2 py-[18px] font-[family-name:var(--font-inter)] text-[14px] font-medium text-bone border-b border-bone/40 hover:border-bone transition-colors"
              >
                DSO solutions →
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
