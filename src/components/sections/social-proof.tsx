"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The precision improvement was immediate. Our remake rate dropped from 8% to under 1% within the first quarter.",
    name: "Dr. Sarah Chen",
    title: "Director of Operations",
    org: "Pacific Dental Group",
  },
  {
    quote: "We deployed across 12 locations in 6 months. The standardized quality across offices is something we could never achieve with manual processes.",
    name: "Michael Torres",
    title: "VP of Clinical Operations",
    org: "Bright Smile DSO",
  },
  {
    quote: "The ROI was clear within year one. Reduced labor costs, faster turnaround, and zero regulatory friction made the decision easy.",
    name: "Dr. James Park",
    title: "Chief Dental Officer",
    org: "National Dental Partners",
    dark: true,
  },
  {
    quote: "Integration with our existing CAD/CAM workflow was seamless. Staff training took less than a week per location.",
    name: "Linda Vasquez",
    title: "Practice Manager",
    org: "Summit Dental Care",
  },
  {
    quote: "This isn't just automation — it's a complete transformation of how dental laboratories operate. The future is here.",
    name: "Dr. Robert Kim",
    title: "Prosthodontist",
    org: "Advanced Dental Studio",
  },
];

export function SocialProof() {
  return (
    <section className="relative bg-light-bg px-6 py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="Trusted Partners"
          title="500+ DSO offices. Real results."
          description="Dental professionals across the country are seeing measurable improvements in precision, speed, and profitability."
          light
        />

        <StaggerFadeIn
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {testimonials.map((t) => {
            const isDark = "dark" in t && t.dark;
            return (
              <div
                key={t.name}
                className={`relative overflow-hidden rounded-lg border p-7 transition-all hover:shadow-lg hover:-translate-y-1.5 ${
                  isDark
                    ? "bg-void border-titanium-dark hover:border-cyan-muted"
                    : "bg-light-card border-light-border shadow-sm hover:border-titanium-light/50"
                }`}
              >
                <Quote
                  className={`mb-4 h-5 w-5 ${isDark ? "text-white-pure" : "text-cyan-muted/40"}`}
                  strokeWidth={1.5}
                />
                <p className={`font-body text-[14px] leading-[1.75] ${isDark ? "text-titanium-light" : "text-light-muted"}`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className={`mt-5 border-t pt-4 ${isDark ? "border-titanium-dark" : "border-light-border"}`}>
                  <p className={`font-display text-[14px] font-semibold tracking-[-0.3px] ${isDark ? "text-white-pure" : "text-light-text"}`}>
                    {t.name}
                  </p>
                  <p className={`mt-0.5 font-body text-[12px] ${isDark ? "text-titanium" : "text-light-muted"}`}>
                    {t.title}, {t.org}
                  </p>
                </div>
              </div>
            );
          })}
        </StaggerFadeIn>

        {/* Partner logos placeholder */}
        <FadeIn delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {["Pacific Dental", "Bright Smile", "National Dental", "Summit Care", "Advanced Studio", "Premier Health"].map((name) => (
              <span
                key={name}
                className="font-display text-[11px] font-semibold uppercase tracking-[2px] text-titanium-light/40"
              >
                {name}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
