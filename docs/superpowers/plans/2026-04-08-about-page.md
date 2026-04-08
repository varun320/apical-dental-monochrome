# About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the About page as a cinematic 5-act vertical scroll narrative with rich GSAP animations, reusing the existing monochromatic design system.

**Architecture:** Next.js App Router page at `/about` composed of 5 section components in `src/components/sections/about/`. Two new animation components (`ScrollRevealText`, `ParallaxSection`) support the cinematic scroll-driven effects. All sections are client components using GSAP ScrollTrigger with scrub/pin for cinematic pacing.

**Tech Stack:** Next.js 16, React 19, GSAP 3.14 (ScrollTrigger pin/scrub), Motion 12, Tailwind CSS 4, Lucide icons, existing UI components (AnimatedGridPattern, DotPattern, BorderBeam, NumberTicker, SectionHeader, FadeIn, StaggerFadeIn, TextReveal).

---

### Task 1: ScrollRevealText Animation Component

**Files:**
- Create: `src/components/animations/scroll-reveal-text.tsx`

- [ ] **Step 1: Create the ScrollRevealText component**

This component pins a container and reveals child text elements line-by-line as the user scrolls, with opacity and y-shift transitions tied to scroll progress.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollRevealTextProps {
  children: React.ReactNode;
  className?: string;
  /** How many viewport heights of scroll distance to map the reveal across */
  scrubLength?: number;
}

export function ScrollRevealText({
  children,
  className = "",
  scrubLength = 1.5,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll(".sr-line");
    if (lines.length === 0) return;

    gsap.set(lines, { opacity: 0.15, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        end: `+=${window.innerHeight * scrubLength}`,
        scrub: 0.8,
      },
    });

    lines.forEach((line, i) => {
      tl.to(
        line,
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        i * 0.3
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [scrubLength]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify component renders without errors**

Run: `cd d:/projects/prodigy-ai/projects/apical-dental-2-experimental && npx next build 2>&1 | head -30`

Expected: Build succeeds (the component isn't used yet, but should compile without type errors).

- [ ] **Step 3: Commit**

```bash
git add src/components/animations/scroll-reveal-text.tsx
git commit -m "feat: add ScrollRevealText animation component for scrub-linked text reveal"
```

---

### Task 2: ParallaxSection Animation Component

**Files:**
- Create: `src/components/animations/parallax-section.tsx`

- [ ] **Step 1: Create the ParallaxSection component**

A wrapper that applies a parallax y-offset to its children based on scroll position.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Parallax speed multiplier (0.5 = half scroll speed) */
  speed?: number;
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const offset = 100 * (1 - speed);

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        gsap.set(inner, { y: self.progress * offset - offset / 2 });
      },
    });

    return () => trigger.kill();
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/animations/parallax-section.tsx
git commit -m "feat: add ParallaxSection animation component for scroll parallax"
```

---

### Task 3: About Hero Section (Act 1)

**Files:**
- Create: `src/components/sections/about/about-hero.tsx`

- [ ] **Step 1: Create the AboutHero component**

Full-viewport hero with GSAP timeline entrance and scroll-driven parallax exit.

```tsx
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
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              y: self.progress * -80,
              opacity: 1 - self.progress * 1.5,
            });
          }
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/about/about-hero.tsx
git commit -m "feat: add About page hero section with entrance and parallax exit animations"
```

---

### Task 4: About Origin Section (Act 2)

**Files:**
- Create: `src/components/sections/about/about-origin.tsx`

- [ ] **Step 1: Create the AboutOrigin component**

Scroll-scrubbed text reveal with founder story, pull quote, and decorative background.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScrollRevealText } from "@/components/animations/scroll-reveal-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Bot, ShieldCheck } from "lucide-react";

export function AboutOrigin() {
  const quoteRef = useRef<HTMLBlockquoteElement>(null);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, x: -60 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative bg-linear-to-b from-deep-void via-void to-void px-6 py-28 lg:py-36 overflow-hidden">
      {/* ── Background ── */}
      <DotPattern
        width={28}
        height={28}
        cr={0.6}
        glow
        className="text-titanium-dark/30 mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
      />

      {/* ── Floating icons ── */}
      <div className="pointer-events-none absolute inset-0">
        <Bot
          className="absolute top-[15%] right-[12%] text-titanium-light animate-float"
          style={{ width: 48, height: 48, opacity: 0.06, animationDelay: "1s" }}
          strokeWidth={1}
        />
        <ShieldCheck
          className="absolute bottom-[20%] left-[10%] text-titanium-light animate-float"
          style={{ width: 40, height: 40, opacity: 0.06, animationDelay: "3s" }}
          strokeWidth={1}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[720px]">
        {/* ── Section label ── */}
        <p className="mb-12 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
          The Beginning
        </p>

        {/* ── Scroll-revealed narrative ── */}
        <ScrollRevealText className="space-y-8" scrubLength={2}>
          <p className="sr-line font-body text-[18px] leading-[1.8] text-titanium-light">
            It started with a simple belief: that dental care deserves the same precision as aerospace engineering. Over four decades ago, a team of prosthodontists and engineers set out to bridge the gap between human skill and mechanical perfection.
          </p>
          <p className="sr-line font-body text-[18px] leading-[1.8] text-titanium-light">
            What began in a single laboratory — hand-crafting crowns, bridges, and implants with obsessive attention to detail — evolved into something far more ambitious. The realization that robotic systems could amplify, not replace, the artistry of dental professionals changed everything.
          </p>
          <p className="sr-line font-body text-[18px] leading-[1.8] text-titanium-light">
            Hundreds of adaptations later, the vision crystallized: integrate Tesla&apos;s Optimus humanoid robot into dental laboratory workflows, delivering surgical-grade accuracy at a scale previously unimaginable.
          </p>
        </ScrollRevealText>

        {/* ── Pull quote ── */}
        <blockquote
          ref={quoteRef}
          className="mt-16 border-l-2 border-titanium pl-8"
        >
          <p className="font-display text-[clamp(20px,3vw,26px)] font-semibold leading-[1.4] tracking-[-0.5px] text-white-pure">
            &ldquo;Precision isn&apos;t a feature — it&apos;s the foundation everything else is built on.&rdquo;
          </p>
          <cite className="mt-4 block font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium not-italic">
            — Founding Philosophy
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/about/about-origin.tsx
git commit -m "feat: add About origin section with scroll-scrubbed text reveal and pull quote"
```

---

### Task 5: About Timeline Section (Act 3)

**Files:**
- Create: `src/components/sections/about/about-timeline.tsx`

- [ ] **Step 1: Create the AboutTimeline component**

Pinned horizontal timeline that builds as user scrolls vertically. The showpiece section.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { Landmark, Lightbulb, Building2, Rocket } from "lucide-react";

const milestones = [
  {
    year: 1980,
    title: "The Foundation",
    description: "Established with a vision to elevate dental precision beyond what was thought possible.",
    stat: { value: 40, suffix: "+", label: "Years of Expertise" },
    icon: Landmark,
  },
  {
    year: 2000,
    title: "Innovation Begins",
    description: "Pioneering robotic-assisted dental procedures, pushing the boundaries of what laboratory automation could achieve.",
    stat: { value: 800, suffix: "+", label: "Adaptations" },
    icon: Lightbulb,
  },
  {
    year: 2015,
    title: "Scaling Impact",
    description: "Expanding across dental service organizations nationwide, proving that precision at scale was not just possible — it was inevitable.",
    stat: { value: 500, suffix: "+", label: "DSO Offices" },
    icon: Building2,
  },
  {
    year: 2024,
    title: "The Future",
    description: "Leading the next generation of precision dentistry with Tesla's Optimus integration — zero regulatory barriers, infinite potential.",
    stat: { value: 0, suffix: "", label: "Regulatory Barriers" },
    icon: Rocket,
  },
] as const;

export function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    // Set initial states
    gsap.set(progress, { scaleX: 0, transformOrigin: "left" });
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

    // Animate progress line
    tl.to(progress, { scaleX: 1, duration: 4, ease: "none" }, 0);

    // Stagger card entrances across the timeline
    cards.forEach((card, i) => {
      const startTime = i * 1;
      tl.to(card, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out",
      }, startTime);

      // Highlight active card (scale up slightly, dim previous)
      if (i > 0) {
        tl.to(cards[i - 1], {
          scale: 0.97, opacity: 0.5, duration: 0.5,
        }, startTime);
      }
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
      className="relative bg-void px-6 py-28 lg:py-36 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Section header ── */}
        <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
          The Evolution
        </p>
        <h2 className="font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
          Four decades of relentless progress.
        </h2>

        {/* ── Timeline track ── */}
        <div ref={trackRef} className="relative mt-20">
          {/* Progress line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-titanium-dark">
            <div ref={progressRef} className="h-full w-full bg-white-pure" />
          </div>

          {/* Milestone cards */}
          <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isLast = i === milestones.length - 1;
              return (
                <div
                  key={milestone.year}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-6"
                >
                  {/* Dot on the line */}
                  <div className="absolute -top-[17px] left-6">
                    <div className="h-2.5 w-2.5 rounded-full border border-titanium-dark bg-void" />
                  </div>

                  <Icon className="mb-4 h-5 w-5 text-titanium" strokeWidth={1.5} />

                  <p className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 font-body text-[14px] leading-[1.75] text-titanium-light">
                    {milestone.description}
                  </p>

                  {/* Stat */}
                  <div className="mt-4 border-t border-titanium-dark pt-4">
                    <div className="font-display text-[22px] font-bold leading-none tracking-[-1px] text-white-pure">
                      <NumberTicker value={milestone.stat.value} delay={0.5} />
                      {milestone.stat.suffix}
                    </div>
                    <p className="mt-1 font-display text-[9px] font-semibold uppercase tracking-[2px] text-titanium">
                      {milestone.stat.label}
                    </p>
                  </div>

                  {isLast && (
                    <BorderBeam
                      size={80}
                      duration={8}
                      colorFrom="#9A9AB0"
                      colorTo="#3A3A4E"
                      borderWidth={1}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/about/about-timeline.tsx
git commit -m "feat: add About timeline section with pinned scroll-driven milestone reveal"
```

---

### Task 6: About Mission Section (Act 4)

**Files:**
- Create: `src/components/sections/about/about-mission.tsx`

- [ ] **Step 1: Create the AboutMission component**

Large typography scroll-reveal headline with three value cards.

```tsx
"use client";

import { TextRevealByLine } from "@/components/animations/text-reveal";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { ParallaxSection } from "@/components/animations/parallax-section";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Crosshair, Building2, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Crosshair,
    title: "Precision",
    description: "Sub-millimeter accuracy in every procedure, powered by robotic systems that never fatigue, never waver.",
    metric: { value: 0.1, prefix: "±", suffix: "mm", decimals: 1 },
  },
  {
    icon: Building2,
    title: "Accessibility",
    description: "Making robotic dentistry available to every practice — from independent offices to nationwide DSO networks.",
    metric: { value: 500, prefix: "", suffix: "+", decimals: 0 },
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuous advancement in robotic-assisted care, with over 800 adaptations and counting.",
    metric: { value: 800, prefix: "", suffix: "+", decimals: 0 },
  },
] as const;

export function AboutMission() {
  return (
    <section className="relative bg-linear-to-b from-void via-deep-void to-void px-6 py-28 lg:py-36 overflow-hidden">
      {/* ── Background ── */}
      <ParallaxSection speed={0.5} className="absolute inset-0">
        <DotPattern
          width={28}
          height={28}
          cr={0.6}
          className="text-titanium-dark/20 mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
        />
      </ParallaxSection>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* ── Headline ── */}
        <div className="text-center">
          <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
            Our Mission
          </p>
          <TextRevealByLine
            className="font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.1] tracking-[-1.5px] text-white-pure"
          >
            {["Human Expertise.", "Amplified."]}
          </TextRevealByLine>
        </div>

        {/* ── Value cards ── */}
        <StaggerFadeIn
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.15}
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-lg border border-titanium-dark bg-deep-void/50 p-8"
              >
                <Icon className="mb-5 h-6 w-6 text-titanium" strokeWidth={1.5} />
                <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
                  {value.description}
                </p>
                <div className="mt-5 border-t border-titanium-dark pt-5">
                  <div className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                    {value.metric.prefix}
                    <NumberTicker
                      value={value.metric.value}
                      delay={0.3}
                      decimalPlaces={value.metric.decimals}
                    />
                    {value.metric.suffix}
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/about/about-mission.tsx
git commit -m "feat: add About mission section with value cards and scroll-reveal headline"
```

---

### Task 7: About Impact & CTA Section (Act 5)

**Files:**
- Create: `src/components/sections/about/about-impact.tsx`

- [ ] **Step 1: Create the AboutImpact component**

Stats row with large NumberTickers, closing statement, and CTA with BorderBeam.

```tsx
"use client";

import Link from "next/link";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { TextReveal } from "@/components/animations/text-reveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { Clock, Wrench, Building2 } from "lucide-react";

const stats = [
  { icon: Clock, value: 40, suffix: "+", label: "Years Expertise" },
  { icon: Wrench, value: 800, suffix: "+", label: "Adaptations" },
  { icon: Building2, value: 500, suffix: "+", label: "DSO Offices" },
] as const;

export function AboutImpact() {
  return (
    <section className="relative bg-linear-to-b from-void via-deep-void to-deep-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[900px]">
        {/* ── Stats row ── */}
        <StaggerFadeIn
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          stagger={0.15}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="mx-auto mb-3 h-5 w-5 text-titanium" strokeWidth={1.5} />
                <div className="font-display text-[clamp(36px,5vw,52px)] font-bold leading-none tracking-[-2px] text-white-pure">
                  <NumberTicker value={stat.value} delay={0.3} />
                  {stat.suffix}
                </div>
                <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </StaggerFadeIn>

        {/* ── CTA Card ── */}
        <FadeIn delay={0.3}>
          <div className="relative mt-20 overflow-hidden rounded-lg border border-titanium-dark bg-deep-void/50 p-12 text-center">
            <TextReveal className="font-display text-[clamp(22px,3.5vw,30px)] font-bold leading-[1.2] tracking-[-0.5px] text-white-pure">
              Ready to bring robotic precision to your practice?
            </TextReveal>

            <FadeIn delay={0.5}>
              <Link
                href="/contact"
                className="mt-8 inline-block rounded-md bg-white-pure px-8 py-4 font-display text-[14px] font-bold tracking-[0.5px] text-void transition-opacity hover:opacity-80"
              >
                Partner With Us &rarr;
              </Link>
            </FadeIn>

            <BorderBeam
              size={100}
              duration={10}
              colorFrom="#9A9AB0"
              colorTo="#3A3A4E"
              borderWidth={1}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/about/about-impact.tsx
git commit -m "feat: add About impact section with stats and CTA"
```

---

### Task 8: About Page Route & Composition

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create the About page**

Compose all 5 acts with Navbar and Footer.

```tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutOrigin } from "@/components/sections/about/about-origin";
import { AboutTimeline } from "@/components/sections/about/about-timeline";
import { AboutMission } from "@/components/sections/about/about-mission";
import { AboutImpact } from "@/components/sections/about/about-impact";

export const metadata = {
  title: "About — Apical Dental",
  description:
    "Four decades of redefining dental precision. From a single laboratory to 500+ DSO offices — the Apical Dental story.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutOrigin />
        <AboutTimeline />
        <AboutMission />
        <AboutImpact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add About page route composing all 5 acts"
```

---

### Task 9: Build & Manual Verification

- [ ] **Step 1: Run the development build**

Run: `cd d:/projects/prodigy-ai/projects/apical-dental-2-experimental && npx next build`

Expected: Build succeeds with no type errors.

- [ ] **Step 2: Fix any build errors**

If build fails, read the error output and fix the specific file(s). Common issues to watch for:
- Missing imports (check all Lucide icon names exist)
- TypeScript errors on refs (ensure `cardsRef` uses correct typing)
- Missing `"use client"` on components using hooks

- [ ] **Step 3: Start dev server and verify**

Run: `cd d:/projects/prodigy-ai/projects/apical-dental-2-experimental && npx next dev`

Navigate to `http://localhost:3000/about` and verify:
- Hero loads with entrance animation
- Scrolling triggers parallax exit on hero
- Origin text reveals progressively on scroll
- Pull quote slides in from left
- Timeline pins and cards appear sequentially
- Mission headline reveals, value cards stagger in
- Impact stats animate, CTA has BorderBeam
- Navbar and Footer render correctly

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: resolve any build issues for About page"
```
