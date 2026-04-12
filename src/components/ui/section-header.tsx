"use client";

import { FadeIn } from "@/components/animations/fade-in";

interface SectionHeaderProps {
  label: string;
  title: string | React.ReactNode;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  center = false,
  light = false,
}: SectionHeaderProps) {
  const alignment = center ? "text-center" : "";

  return (
    <div className={alignment}>
      <FadeIn>
        <p className={`font-display text-[11px] font-semibold uppercase tracking-[3px] ${light ? "text-light-muted" : "text-titanium"}`}>
          {label}
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className={`mt-4 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] ${light ? "text-light-text" : "text-white-pure"}`}>
          {title}
        </h2>
      </FadeIn>

      {description && (
        <FadeIn delay={0.2}>
          <p
            className={`mt-6 font-body text-[15px] leading-[1.7] ${light ? "text-light-muted" : "text-titanium-light"} ${
              center ? "mx-auto max-w-[580px]" : "max-w-[640px]"
            }`}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
