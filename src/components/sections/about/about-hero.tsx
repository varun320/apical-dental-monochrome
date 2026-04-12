"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Sparkles, Heart, Target, Users, Award, BookOpen,
  Lightbulb, Globe, Clock, GraduationCap, Star,
} from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Sparkles, top: "10%", left: "10%", size: 40, delay: "0s" },
  { Icon: Heart, top: "22%", left: "80%", size: 44, delay: "1s" },
  { Icon: Target, top: "15%", left: "50%", size: 36, delay: "2s" },
  { Icon: Users, top: "30%", left: "20%", size: 38, delay: "0.5s" },
  { Icon: Award, top: "8%", left: "70%", size: 34, delay: "3s" },
  { Icon: BookOpen, top: "35%", left: "85%", size: 32, delay: "1.5s" },
  { Icon: Lightbulb, top: "12%", left: "35%", size: 42, delay: "2.5s" },
  { Icon: Globe, top: "28%", left: "5%", size: 30, delay: "4s" },
  { Icon: Clock, top: "6%", left: "60%", size: 28, delay: "3.5s" },
  { Icon: GraduationCap, top: "38%", left: "45%", size: 36, delay: "4.5s" },
  { Icon: Star, top: "18%", left: "92%", size: 30, delay: "5s" },
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
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(kickerRef.current, {
        opacity: 0, y: 12, duration: 0.6, ease: "power2.out",
      })
        .from(
          headlineRef.current?.querySelectorAll(".headline-line") || [],
          { opacity: 0, y: 30, duration: 0.7, ease: "power2.out", stagger: 0.1 },
          "-=0.3"
        )
        .from(subRef.current, {
          opacity: 0, y: 16, duration: 0.6, ease: "power2.out",
        }, "-=0.3")
        .from(scrollIndicatorRef.current, {
          opacity: 0, duration: 0.5, ease: "power2.out",
        }, "-=0.2");

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
      className="section-dark relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void px-6"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(94,175,197,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* ── Floating icons ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50%]">
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
          className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium-light"
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
          className="mt-8 max-w-[620px] font-body text-[17px] leading-[1.7] text-titanium-light"
        >
          Four decades of redefining what&apos;s possible in dentistry. From a single lab
          to a 500+ office network — one doctor&apos;s obsession with precision became the
          foundation for robotic dental care.
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollIndicatorRef} className="absolute bottom-12 flex flex-col items-center gap-2">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[3px] text-titanium-light">
          Scroll
        </span>
        <div className="h-8 w-px bg-titanium-dark animate-float" />
      </div>
    </section>
  );
}
