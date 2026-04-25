"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";

const dsoPartners = [
  "Heartland",
  "Aspen",
  "Pacific Dental",
  "Great Expressions",
  "DentaQuest",
];

const testimonials = [
  {
    quote:
      "The precision improvement was immediate. Our remake rate dropped from 8% to under 1% within the first quarter.",
    name: "Dr. Sarah Chen",
    title: "Director of Operations",
    org: "Pacific Dental Group",
  },
  {
    quote:
      "We deployed across 12 locations in 6 months. The standardized quality across offices is something we could never achieve with manual processes.",
    name: "Michael Torres",
    title: "VP of Clinical Operations",
    org: "Bright Smile DSO",
  },
  {
    quote:
      "The ROI was clear within year one. Reduced labor costs, faster turnaround, and zero regulatory friction made the decision easy.",
    name: "Dr. James Park",
    title: "Chief Dental Officer",
    org: "National Dental Partners",
  },
];

export function SocialProof() {
  return (
    <section className="section-bone">
      {/* Trust strip */}
      <div className="border-t border-b border-rule">
        <div className="mx-auto max-w-[1320px] px-6 py-12 md:px-10 md:py-14 text-center">
          <p className="eyebrow text-ink-soft">
            Trusted by the DSOs that set the standard
          </p>
          <p className="mt-6 font-[family-name:var(--font-fraunces)] text-[clamp(1.1rem,1.6vw,1.4rem)] font-normal tracking-[-0.5px] leading-[1.4] text-ink-muted">
            {dsoPartners.join("  ·  ")}
          </p>
        </div>
      </div>

      {/* Testimonial pull-quotes */}
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
        <FadeIn>
          <p className="eyebrow text-graphite">From the chair</p>
          <h2 className="mt-4 max-w-[820px] font-[family-name:var(--font-fraunces)] font-normal leading-[1.08] tracking-[-1.2px] text-graphite text-[clamp(1.85rem,3.6vw,3rem)]">
            Five hundred offices in. The numbers are no longer a pitch.
          </h2>
        </FadeIn>

        <StaggerFadeIn className="mt-14 grid gap-px bg-rule md:grid-cols-3" stagger={0.1}>
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-bone p-8 md:p-10 flex flex-col gap-6 min-h-[260px]"
            >
              <blockquote className="flex-1 font-[family-name:var(--font-fraunces)] text-[1.15rem] leading-[1.5] tracking-[-0.3px] text-graphite">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="border-t border-rule pt-5">
                <div className="flex items-baseline gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden />
                  <p className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.3px] text-graphite">
                    {t.name}
                  </p>
                </div>
                <p className="mt-1 pl-3.5 font-[family-name:var(--font-inter)] text-[12px] text-ink-muted">
                  {t.title}, {t.org}
                </p>
              </figcaption>
            </figure>
          ))}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
