# Layout Redesign with Bento Grids & Iconography — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all page sections with bento grid layouts, dental+robotics iconography, better spacing, and reduced visual effects — keeping the existing monochrome palette.

**Architecture:** Each section component is rewritten in-place. Heavy background effects (Particles, GeometricShapes, AnimatedGridPattern, DotPattern, Ripple) are removed and replaced with cleaner bento card layouts and Lucide icon accents. Two shared bento patterns (Feature Bento, Grid Bento) provide cohesive rhythm. Unused effect components are deleted after all sections are updated.

**Tech Stack:** Next.js, React, Tailwind CSS 4, GSAP + ScrollTrigger, Lucide React (already installed), existing animation components (FadeIn, StaggerFadeIn, BorderBeam, NumberTicker).

---

## Task 1: Hero Section — Remove Heavy Effects, Add Floating Icons, Push Content Down, Bento Stats

**Files:**
- Modify: `src/components/sections/hero.tsx` (lines 1-143)

- [ ] **Step 1: Replace imports — remove Particles, AnimatedGridPattern, GeometricShapes; add Lucide icons**

Replace lines 1-11 of `hero.tsx` with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { NumberTicker } from "@/components/ui/number-ticker";
import { siteConfig } from "@/config/site";
import { Crown, Bot, Cpu, ShieldCheck, Clock, Wrench, Building2 } from "lucide-react";
```

- [ ] **Step 2: Replace the background layers and content layout**

Replace the entire return statement (lines 47-142) with this new JSX. Key changes:
- Background: single radial gradient instead of Particles/AnimatedGridPattern/GeometricShapes
- Floating icons in upper viewport area with CSS float animation
- Content pushed down with `justify-end pb-24` and generous top padding
- Stats converted to bento-style cards with icons

```tsx
  const statIcons = [Clock, Wrench, Building2, ShieldCheck];

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-void px-6"
    >
      {/* ── Background: single subtle gradient ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(154,154,176,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,26,42,0.3)_0%,transparent_50%)]" />
      </div>

      {/* ── Floating dental/tech icons (upper area) ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%]">
        {[
          { Icon: Crown, top: "18%", left: "20%", size: 48, delay: "0s" },
          { Icon: Bot, top: "25%", left: "72%", size: 56, delay: "1.5s" },
          { Icon: Cpu, top: "35%", left: "35%", size: 40, delay: "3s" },
          { Icon: ShieldCheck, top: "22%", left: "58%", size: 44, delay: "4.5s" },
        ].map(({ Icon, top, left, size, delay }) => (
          <Icon
            key={delay}
            className="absolute text-titanium-light animate-float"
            style={{
              top,
              left,
              width: size,
              height: size,
              opacity: 0.08,
              animationDelay: delay,
            }}
            strokeWidth={1}
          />
        ))}
      </div>

      {/* ── Spacer to push content to lower 60% ── */}
      <div className="flex-1 min-h-[25vh]" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center text-center">
        {/* Kicker */}
        <p
          ref={kickerRef}
          className="mb-8 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium"
        >
          {siteConfig.tagline}
        </p>

        {/* Headline with gradient */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-2px]"
        >
          <span className="headline-line block text-white-pure">
            Human Expertise.
          </span>
          <span className="headline-line block bg-linear-to-r from-white-pure via-titanium-light to-titanium bg-clip-text text-transparent">
            Robotic Precision.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="mt-8 max-w-[580px] font-body text-[17px] leading-[1.7] text-titanium-light"
        >
          {siteConfig.description}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex gap-4">
          <Link
            href="/technology"
            className="relative overflow-hidden rounded-md bg-white-pure px-7 py-3.5 text-[12px] font-bold tracking-[0.5px] text-void transition-opacity hover:opacity-80"
          >
            Explore the Technology &rarr;
          </Link>
          <button className="rounded-md border border-titanium-dark px-7 py-3.5 text-[12px] font-medium tracking-[0.5px] text-titanium-light transition-all hover:border-titanium hover:text-white-pure">
            Watch Demo
          </button>
        </div>
      </div>

      {/* ── Stats Bar — Bento Cards ── */}
      <div
        ref={statsRef}
        className="relative z-10 mt-auto w-full max-w-[900px] pb-12 pt-16"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {siteConfig.stats.map((stat, i) => {
            const StatIcon = statIcons[i];
            return (
              <div
                key={stat.label}
                className="rounded-lg border border-titanium-dark bg-deep-void/50 px-5 py-4 text-center"
              >
                <StatIcon className="mx-auto mb-2 h-4 w-4 text-titanium" strokeWidth={1.5} />
                <div className="font-display text-[28px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                  <NumberTicker value={stat.value} delay={0.8} />
                  {stat.suffix}
                </div>
                <p className="mt-1.5 font-display text-[9px] font-semibold uppercase tracking-[2px] text-titanium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
```

Note: the `statIcons` array must be placed inside the component, before the return, after the `useEffect`.

- [ ] **Step 3: Add the float animation to globals.css**

Add the following CSS at the end of `src/app/globals.css`:

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

- [ ] **Step 4: Remove unused imports from hero.tsx**

Verify that `cn` import (from `@/lib/utils`) is no longer used in hero.tsx. If not used, remove it.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/hero.tsx src/app/globals.css
git commit -m "feat(hero): redesign with floating icons, pushed-down content, bento stat cards"
```

---

## Task 2: Problem Section — Feature Bento Layout with Integrated Header Card

**Files:**
- Modify: `src/components/sections/problem.tsx` (lines 1-79)

- [ ] **Step 1: Add Lucide icon imports**

Replace the imports (lines 1-6) with:

```tsx
"use client";

import { StaggerFadeIn } from "@/components/animations/fade-in";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { GraduationCap, Target, School, AlertTriangle } from "lucide-react";
```

Note: `SectionHeader` is removed — the header content is now integrated into the large bento card.

- [ ] **Step 2: Add icon mapping to problems data**

Replace the problems array (lines 8-30) with:

```tsx
const problems = [
  {
    value: 5,
    suffix: "yr",
    label: "Training Curve",
    description:
      "It takes 5 years to train a dental lab technician. Most leave for better pay before completing training.",
    icon: GraduationCap,
  },
  {
    value: 3,
    display: "3/10",
    label: "Quality Standard",
    description:
      "Only 3 out of 10 dental procedures meet the doctor's own quality standard. The precision gap is real.",
    icon: Target,
  },
  {
    value: 0,
    suffix: "",
    label: "New Schools",
    description:
      "No new schools teach the craft. The pipeline of skilled dental lab technicians has dried up entirely.",
    icon: School,
  },
];
```

- [ ] **Step 3: Replace the component JSX with Feature Bento layout**

Replace the entire `Problem` component function (lines 32-79) with:

```tsx
export function Problem() {
  return (
    <section className="relative border-t border-titanium-dark bg-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <StaggerFadeIn
          className="grid gap-4 md:grid-cols-3"
          stagger={0.12}
        >
          {/* ── Header Card (spans 2 cols, full height) ── */}
          <div className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-8 md:col-span-2 md:row-span-3 flex flex-col justify-center">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
              The Crisis
            </p>
            <h2 className="mt-4 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
              The future of dental surgery<br />starts in the lab.
            </h2>
            <p className="mt-6 max-w-[500px] font-body text-[15px] leading-[1.7] text-titanium-light">
              Dental lab technicians are retiring with no replacements. The industry
              faces a workforce crisis with no scalable solution — until now. Robotics
              is the only path forward.
            </p>
            {/* Watermark icon */}
            <AlertTriangle
              className="absolute bottom-6 right-6 text-titanium"
              style={{ width: 120, height: 120, opacity: 0.04 }}
              strokeWidth={1}
            />
          </div>

          {/* ── Problem Cards (stacked in right column) ── */}
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-6 transition-colors hover:border-titanium/40"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-titanium" strokeWidth={1.5} />
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                    {p.label}
                  </p>
                </div>
                <div className="mt-3 font-display text-[32px] font-bold leading-none tracking-[-1px] text-white-pure">
                  {p.display ?? (
                    <>
                      <NumberTicker value={p.value} delay={0.5 + i * 0.2} />
                      {p.suffix}
                    </>
                  )}
                </div>
                <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
                  {p.description}
                </p>
                {i === 0 && (
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
        </StaggerFadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/problem.tsx
git commit -m "feat(problem): convert to feature bento layout with integrated header card and icons"
```

---

## Task 3: RobotScope Section — Grid Bento with Varying Spans

**Files:**
- Modify: `src/components/sections/robot-scope.tsx` (lines 1-86)

- [ ] **Step 1: Replace imports — remove DotPattern/DataCard/cn, add Lucide icons**

Replace lines 1-7 with:

```tsx
"use client";

import { StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Crown, BrainCircuit, Sparkles, Package, MessageSquare, Wrench } from "lucide-react";
```

- [ ] **Step 2: Replace capabilities data array with icon components**

Replace lines 9-46 with:

```tsx
const capabilities = [
  {
    icon: Crown,
    title: "Prosthetic Fabrication",
    description:
      "Surgical-grade dental prosthetics manufactured with superhuman precision. Every crown, bridge, and implant — perfect on delivery.",
    featured: true,
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Diagnostics",
    description:
      "X-ray analysis with executive summaries for the doctor. Contraindication flagging. Instant, comprehensive, actionable.",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Sterilization",
    description:
      "Automated instrument sterilization protocols. Consistent, documented, and compliant — every single time.",
    featured: false,
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Supply ordering with real-time market-price research. Automated procurement that saves money and eliminates stockouts.",
    featured: false,
  },
  {
    icon: MessageSquare,
    title: "Patient Communication",
    description:
      "Real-time language translation. Appointment coordination. Insurance documentation — handled seamlessly.",
    featured: false,
  },
  {
    icon: Wrench,
    title: "Facility Maintenance",
    description:
      "Equipment monitoring, maintenance scheduling, and facility operations. The robot manages the physical environment.",
    featured: false,
  },
];
```

- [ ] **Step 3: Replace the component JSX with 4-column Grid Bento**

Replace the entire `RobotScope` function (lines 48-86) with:

```tsx
export function RobotScope() {
  return (
    <section className="relative border-t border-titanium-dark bg-deep-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="Full Scope"
          title="One robot. Every role."
          description="Optimus doesn't just handle lab work. It assumes full practice automation — from fabrication to facility maintenance. In-office placement, staff training, location-specific customization, and ongoing service subscription included."
        />

        <StaggerFadeIn
          className="mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={`rounded-lg border border-titanium-dark bg-void p-7 transition-colors hover:border-titanium/40 ${
                  cap.featured ? "sm:col-span-2" : ""
                }`}
              >
                <Icon
                  className={`mb-4 text-titanium ${cap.featured ? "h-8 w-8" : "h-6 w-6"}`}
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-[18px] font-semibold leading-[1.4] text-white-pure">
                  {cap.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/robot-scope.tsx
git commit -m "feat(robot-scope): convert to 4-col grid bento with Lucide icons, remove DotPattern"
```

---

## Task 4: StagedPath Section — Horizontal Bento Cards with Connecting Line

**Files:**
- Modify: `src/components/sections/staged-path.tsx` (lines 1-126)

- [ ] **Step 1: Replace imports — add Lucide icons**

Replace lines 1-6 with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { BorderBeam } from "@/components/ui/border-beam";
import { Flask, Stethoscope, Scissors, Bot } from "lucide-react";
```

- [ ] **Step 2: Update stages data array with icons**

Replace lines 8-41 with:

```tsx
const stages = [
  {
    phase: "Phase 01",
    title: "Dental Laboratory",
    status: "Active — Zero Barriers",
    description:
      "The dental lab is completely unregulated. No licensing boards. No regulatory friction. Optimus enters here — perfect from day one.",
    active: true,
    icon: Flask,
  },
  {
    phase: "Phase 02",
    title: "Office Support",
    status: "Near-term",
    description:
      "Sterilization, inventory management, supply ordering with market-price research, patient communication, and facility maintenance.",
    active: false,
    icon: Stethoscope,
  },
  {
    phase: "Phase 03",
    title: "Surgical Assistance",
    status: "Mid-term",
    description:
      "AI-powered diagnostics, X-ray analysis with executive summaries, contraindication flagging, and real-time surgical support.",
    active: false,
    icon: Scissors,
  },
  {
    phase: "Phase 04",
    title: "Autonomous Operation",
    status: "Long-term Vision",
    description:
      "Full autonomous dental practice operation. From diagnosis to treatment to post-op. The ultimate convergence of human expertise and robotic precision.",
    active: false,
    icon: Bot,
  },
];
```

- [ ] **Step 3: Replace the component with horizontal bento cards and horizontal connecting line**

Replace the entire `StagedPath` function (lines 43-126) with:

```tsx
export function StagedPath() {
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    const container = timelineRef.current;
    if (!el || !container) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left" });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      end: "bottom 50%",
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative border-t border-titanium-dark bg-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(13,13,28,0.5)_100%)]" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="The Path"
          title="Staged entry. Zero resistance."
          description="The dental laboratory is the zero-resistance entry point. No regulatory barriers exist. From there, Optimus expands into every aspect of practice operation."
        />

        <div ref={timelineRef} className="relative mt-16">
          {/* ── Horizontal connecting line ── */}
          <div className="absolute top-5 left-0 right-0 hidden h-px bg-titanium-dark lg:block">
            <div ref={lineRef} className="h-full w-full bg-white-pure" />
          </div>

          {/* ── Phase Cards ── */}
          <StaggerFadeIn
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.1}
          >
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.phase}
                  className={`relative overflow-hidden rounded-lg border bg-deep-void p-6 ${
                    stage.active
                      ? "border-titanium lg:row-span-2"
                      : "border-titanium-dark"
                  }`}
                >
                  {/* Dot on the line */}
                  <div className="absolute -top-[5px] left-6 hidden lg:block">
                    <div
                      className={`h-[10px] w-[10px] rounded-full ${
                        stage.active
                          ? "bg-white-pure"
                          : "border border-titanium-dark bg-void"
                      }`}
                    />
                  </div>

                  <div className="pt-4 lg:pt-6">
                    <Icon
                      className={`mb-4 ${stage.active ? "h-6 w-6 text-white-pure" : "h-5 w-5 text-titanium"}`}
                      strokeWidth={1.5}
                    />
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
                      {stage.phase}
                    </p>
                    <h3 className="mt-1 font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                      {stage.title}
                    </h3>
                    <span
                      className={`mt-1 inline-block font-display text-[10px] font-semibold uppercase tracking-[2px] ${
                        stage.active ? "text-white-pure" : "text-titanium"
                      }`}
                    >
                      {stage.status}
                    </span>
                    <p className="mt-2 font-body text-[14px] leading-[1.75] text-titanium-light">
                      {stage.description}
                    </p>
                  </div>

                  {stage.active && (
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
          </StaggerFadeIn>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/staged-path.tsx
git commit -m "feat(staged-path): convert to horizontal bento cards with connecting line and phase icons"
```

---

## Task 5: Authority Section — Tighten Grid, Add Icons and Watermarks

**Files:**
- Modify: `src/components/sections/authority.tsx` (lines 1-124)

- [ ] **Step 1: Add Lucide icon imports**

Replace lines 1-6 with:

```tsx
"use client";

import { StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { Clock, Cog, Building2, GraduationCap, UserRound, Cpu } from "lucide-react";
```

Note: `FadeIn` import removed (was imported but not directly used — `StaggerFadeIn` handles it).

- [ ] **Step 2: Replace the component JSX with tightened grid and icons**

Replace the entire `Authority` function (lines 8-124) with:

```tsx
const authorityStats = [
  { value: 40, suffix: "+", label: "Years in Prosthodontics", icon: Clock, delay: 0.4 },
  { value: 800, suffix: "+", label: "Engineered Adaptations", icon: Cog, delay: 0.55 },
  { value: 500, suffix: "+", label: "DSO Office Network", icon: Building2, delay: 0.7 },
  { value: 15, suffix: "+", label: "Years Training Surgeons", icon: GraduationCap, delay: 0.85 },
];

export function Authority() {
  return (
    <section className="relative border-t border-titanium-dark bg-deep-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-100 w-100 rounded-full bg-[radial-gradient(circle,rgba(154,154,176,0.05),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="The Authority"
          title={<>Dr. Ted Lewis<br /><span className="text-titanium-light">PhD, DMD</span></>}
        />

        {/* Bento Grid */}
        <StaggerFadeIn
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3"
          stagger={0.08}
        >
          {/* ─ Bio (spans 2 cols, 2 rows) ─ */}
          <div className="relative overflow-hidden rounded-lg border border-titanium-dark bg-void p-7 md:col-span-2 md:row-span-2">
            <p className="font-body text-[16px] leading-[1.8] text-titanium-light">
              Dr. Ted Lewis has spent 40 years mastering the art and science of
              prosthodontics. Now he&apos;s training Tesla&apos;s Optimus robot
              to perform with superhuman precision — starting with the dental
              laboratory.
            </p>
            <p className="mt-4 font-body text-[14px] leading-[1.75] text-titanium-light">
              With 800+ engineered instrument adaptations for robotic hands
              (patent filings in progress via USPTO) and IMU-based training
              methodology that captures human hand movements for robotic
              replication, Dr. Lewis is the only person bridging 40 years of
              clinical mastery with cutting-edge robotics integration.
            </p>
            <p className="mt-4 font-body text-[14px] leading-[1.75] text-titanium-light">
              He trains doctors and surgeons within a 500+ location DSO
              network, and has developed the first-person movement capture
              pipeline that turns decades of human expertise into robotic
              capability.
            </p>
            {/* Watermark */}
            <UserRound
              className="absolute bottom-6 right-6 text-titanium"
              style={{ width: 120, height: 120, opacity: 0.04 }}
              strokeWidth={1}
            />
          </div>

          {/* ─ Stat Cards with Icons ─ */}
          {authorityStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-lg border border-titanium-dark bg-void p-6 flex flex-col justify-center"
              >
                <Icon className="mb-2 h-5 w-5 text-titanium" strokeWidth={1.5} />
                <div className="font-display text-[40px] font-bold leading-none tracking-[-1.5px]">
                  <NumberTicker value={stat.value} delay={stat.delay} />{stat.suffix}
                </div>
                <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                  {stat.label}
                </p>
              </div>
            );
          })}

          {/* ─ Video Placeholder (spans 2 cols) ─ */}
          <div className="flex aspect-video items-center justify-center rounded-lg border border-titanium-dark bg-void md:col-span-2">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-titanium-dark bg-deep-void">
                <svg className="ml-1 h-5 w-5 text-white-pure" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="mt-3 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                Demo Video Coming Soon
              </p>
            </div>
          </div>

          {/* ─ IMU Technology (spans 2 cols) ─ */}
          <div className="relative overflow-hidden rounded-lg border border-titanium-dark bg-void p-7 md:col-span-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-titanium" strokeWidth={1.5} />
              <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-white-pure">
                IMU Technology
              </p>
            </div>
            <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
              Inertial Measurement Unit sensors capture Dr. Lewis&apos;s hand
              movements in real-time — transferred directly to Optimus for
              robotic replication. Camera/sensor fingertip technology. 64 degrees
              of freedom.
            </p>
            <BorderBeam
              size={100}
              duration={10}
              colorFrom="#9A9AB0"
              colorTo="#3A3A4E"
              borderWidth={1}
            />
          </div>
        </StaggerFadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/authority.tsx
git commit -m "feat(authority): add Lucide icons to stat cards, watermark to bio, Cpu icon to IMU"
```

---

## Task 6: DSOCase Section — Bento Grid with Full-Width Projection Card

**Files:**
- Modify: `src/components/sections/dso-case.tsx` (lines 1-100)

- [ ] **Step 1: Add Lucide icon imports and BorderBeam**

Replace lines 1-4 with:

```tsx
"use client";

import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { BorderBeam } from "@/components/ui/border-beam";
import { Bot, Building2, ShieldCheck, Rocket } from "lucide-react";
```

- [ ] **Step 2: Add icons to benefits data**

Replace lines 6-28 with:

```tsx
const benefits = [
  {
    title: "Robot-as-a-Service",
    value: "$3,667",
    unit: "/mo per robot",
    description:
      "Predictable monthly cost. Includes placement, staff training, location-specific customization, and ongoing service subscription.",
    icon: Bot,
  },
  {
    title: "Built-In Distribution",
    value: "500+",
    unit: "DSO offices",
    description:
      "Dr. Lewis operates inside a 500+ office DSO network. The infrastructure for scale already exists.",
    icon: Building2,
  },
  {
    title: "Zero Regulatory Friction",
    value: "0",
    unit: "barriers",
    description:
      "The dental lab side is completely unregulated. The robot enters through lab work first — zero resistance from licensing boards.",
    icon: ShieldCheck,
  },
];
```

- [ ] **Step 3: Replace the component JSX — clean layout with icons, full-width projection card with BorderBeam**

Replace the entire `DSOCase` function (lines 30-100) with:

```tsx
export function DSOCase() {
  return (
    <section className="relative border-t border-titanium-dark bg-void px-6 py-28 lg:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="For DSOs"
          title="The business case writes itself."
          description="Replace the cost of hiring, training, and retaining lab technicians with a single subscription. AI-backed diagnostics reduce insurance costs. Robotic precision eliminates rework."
        />

        {/* ── Benefit Cards (3-column) ── */}
        <StaggerFadeIn className="mt-16 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-lg border border-titanium-dark bg-deep-void p-8 transition-colors hover:border-titanium/40"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-titanium" strokeWidth={1.5} />
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                    {b.title}
                  </p>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-[36px] font-bold leading-[1.0] tracking-[-1px] text-white-pure">
                    {b.value}
                  </span>
                  <span className="font-display text-[11px] font-semibold uppercase tracking-[1px] text-titanium">
                    {b.unit}
                  </span>
                </div>
                <p className="mt-4 font-body text-[14px] leading-[1.75] text-titanium-light">
                  {b.description}
                </p>
              </div>
            );
          })}
        </StaggerFadeIn>

        {/* ── Scale Projection (full-width card with BorderBeam) ── */}
        <FadeIn delay={0.4}>
          <div className="relative mt-4 overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <Rocket className="mt-1 h-6 w-6 shrink-0 text-titanium" strokeWidth={1.5} />
                <div>
                  <h3 className="font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.5px] text-white-pure">
                    Scale projection
                  </h3>
                  <p className="mt-2 font-body text-[14px] leading-[1.75] text-titanium-light">
                    250 robots deployed at $3,667/month each. $11M+ projected
                    annual revenue. White-glove onboarding and continuous support
                    at every location.
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-display text-[44px] font-bold leading-[1.0] tracking-[-1.5px] text-white-pure">
                  $11M+
                </div>
                <p className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                  Annual Revenue Target
                </p>
              </div>
            </div>
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

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/dso-case.tsx
git commit -m "feat(dso-case): add icons to benefit cards, full-width projection card with BorderBeam"
```

---

## Task 7: CTA Section — Remove Ripple, Add Floating Icons

**Files:**
- Modify: `src/components/sections/cta.tsx` (lines 1-86)

- [ ] **Step 1: Replace imports — remove Ripple, add Lucide icons**

Replace lines 1-7 with:

```tsx
"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { FormInput, FormTextarea } from "@/components/ui/form-input";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
```

- [ ] **Step 2: Replace the section JSX — remove Ripple, add floating icons, increase padding**

Replace the return statement (lines 26-86) with:

```tsx
  return (
    <section className="relative border-t border-titanium-dark bg-deep-void px-6 py-28 lg:py-36 overflow-hidden">
      {/* ── Floating contact icons ── */}
      <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-center gap-16">
        {[
          { Icon: Mail, size: 32, delay: "0s" },
          { Icon: MessageSquare, size: 28, delay: "2s" },
          { Icon: Send, size: 30, delay: "4s" },
        ].map(({ Icon, size, delay }) => (
          <Icon
            key={delay}
            className="text-titanium-light animate-float"
            style={{
              width: size,
              height: size,
              opacity: 0.07,
              animationDelay: delay,
            }}
            strokeWidth={1}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[700px]">
        <SectionHeader
          label="Get in Touch"
          title="Partner with us."
          description="Whether you're from Tesla Robotics, a DSO corporation, or an independent practice — we'd like to start a conversation."
          center
        />

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={updateField("name")}
              />
              <FormInput
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={updateField("email")}
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                type="text"
                placeholder="Organization"
                value={formData.organization}
                onChange={updateField("organization")}
              />
              <FormInput
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={updateField("role")}
              />
            </div>
            <FormTextarea
              placeholder="How can we help?"
              rows={4}
              value={formData.message}
              onChange={updateField("message")}
            />
            <button
              type="submit"
              className="mt-2 rounded-md bg-white-pure px-8 py-4 font-display text-[14px] font-bold tracking-[0.5px] text-void transition-opacity hover:opacity-80"
            >
              Send Message
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/cta.tsx
git commit -m "feat(cta): remove Ripple effect, add floating contact icons, increase section padding"
```

---

## Task 8: Cleanup — Remove Unused Effect Components

**Files:**
- Delete: `src/components/ui/particles.tsx`
- Delete: `src/components/ui/animated-grid-pattern.tsx`
- Delete: `src/components/ui/ripple.tsx`
- Delete: `src/components/ui/dot-pattern.tsx`
- Delete: `src/components/animations/geometric-shapes.tsx`

- [ ] **Step 1: Verify no remaining imports of deleted components**

Run these grep commands to confirm no other files import them:

```bash
grep -r "particles" src/ --include="*.tsx" --include="*.ts" -l
grep -r "animated-grid-pattern" src/ --include="*.tsx" --include="*.ts" -l
grep -r "ripple" src/ --include="*.tsx" --include="*.ts" -l
grep -r "dot-pattern" src/ --include="*.tsx" --include="*.ts" -l
grep -r "geometric-shapes" src/ --include="*.tsx" --include="*.ts" -l
```

Expected: No results (or only the files themselves, which we're deleting).

- [ ] **Step 2: Delete the unused files**

```bash
rm src/components/ui/particles.tsx
rm src/components/ui/animated-grid-pattern.tsx
rm src/components/ui/ripple.tsx
rm src/components/ui/dot-pattern.tsx
rm src/components/animations/geometric-shapes.tsx
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no import errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused effect components (Particles, AnimatedGridPattern, Ripple, DotPattern, GeometricShapes)"
```

---

## Task 9: Final Verification and Production Build

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors or warnings related to our changes.

- [ ] **Step 2: Visual spot-check in dev mode**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Hero has breathing room, floating icons visible, stats in bento cards
- Problem uses feature bento (large left card + 3 right cards)
- RobotScope uses 4-col grid with featured cards spanning 2 cols
- StagedPath shows horizontal bento cards with connecting line
- Authority has icons on stat cards and watermark on bio
- DSOCase has icons on benefit cards, full-width projection card with BorderBeam
- CTA has floating contact icons, no ripple effect
- All sections have increased padding (~py-28/py-36)
- Scroll animations still work (FadeIn, StaggerFadeIn, NumberTicker, ScrollTrigger line)

- [ ] **Step 3: Commit any final adjustments**

If any visual tweaks are needed, make them and commit:

```bash
git add -A
git commit -m "fix: post-review visual adjustments"
```
