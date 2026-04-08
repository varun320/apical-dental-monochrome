"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Sparkles, Heart, Target } from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Sparkles, top: "20%", left: "18%", size: 44, delay: "0s" },
  { Icon: Heart, top: "28%", left: "75%", size: 48, delay: "2s" },
  { Icon: Target, top: "18%", left: "55%", size: 40, delay: "4s" },
] as const;

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance timeline ──
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(kickerRef.current, {
        opacity: 0, y: 20, duration: 0.7, ease: "power3.out",
      })
        .from(
          headlineRef.current?.querySelectorAll(".headline-line") || [],
          { opacity: 0, y: 60, duration: 0.9, ease: "power3.out", stagger: 0.15 },
          "-=0.3"
        )
        .from(subRef.current, {
          opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        }, "-=0.4")
        .from(scrollIndicatorRef.current, {
          opacity: 0, duration: 0.6, ease: "power3.out",
        }, "-=0.2");

      // ── Parallax exit on scroll ──
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-void via-void to-deep-void px-6"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(154,154,176,0.08),transparent)]" />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={5}
          repeatDelay={2}
          className={cn(
            "absolute inset-0 h-full w-full",
            "mask-[radial-gradient(500px_circle_at_50%_60%,white,transparent)]"
          )}
        />
      </div>

      {/* ── Floating icons ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%]">
        {FLOATING_ICONS.map(({ Icon, top, left, size, delay }, i) => (
          <Icon
            key={i}
            className="absolute text-titanium-light animate-float"
            style={{ top, left, width: size, height: size, opacity: 0.08, animationDelay: delay }}
            strokeWidth={1}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div ref={contentRef} className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center text-center">
        <p
          ref={kickerRef}
          className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium"
        >
          Our Story
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-2px]"
        >
          <span className="headline-line block text-white-pure">
            Where Precision
          </span>
          <span className="headline-line block bg-linear-to-r from-white-pure via-titanium-light to-titanium bg-clip-text text-transparent">
            Began
          </span>
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-[580px] font-body text-[17px] leading-[1.7] text-titanium-light"
        >
          Four decades of redefining what&apos;s possible in dentistry.
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollIndicatorRef} className="absolute bottom-12 flex flex-col items-center gap-2">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[3px] text-titanium">
          Scroll
        </span>
        <div className="h-8 w-px bg-titanium-dark animate-float" />
      </div>
    </section>
  );
}
