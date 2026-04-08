# About & Technology Pages — Design Spec

**Date:** 2026-04-08
**Scope:** About page (implement), Technology page (plan only)

---

## Design System Constraints

Both pages must follow the existing monochromatic design system:
- Colors: void (#08080E), deep-void (#1A1A2A), titanium-dark (#3A3A4E), titanium (#6A6A80), titanium-light (#9A9AB0), white-pure (#F5F5F8)
- Fonts: Space Grotesk (display), Inter (body)
- Animation stack: GSAP + ScrollTrigger (pinning, scrub), Motion (useInView, springs), Lenis (smooth scroll)
- Reusable components: FadeIn, StaggerFadeIn, TextReveal, TextRevealByLine, NumberTicker, BorderBeam, AnimatedGridPattern, DotPattern, SectionHeader, FormInput
- Layout: Navbar + page sections + Footer (shared via root layout)

---

## About Page (Implement)

### Approach
Vertical scroll narrative — a single continuous scroll where the story unfolds cinematically across 5 acts. Leverages GSAP ScrollTrigger pinning and scrub for cinematic pacing. Content derived from existing site data (40+ years, 800+ adaptations, 500+ DSO offices, founder authority figure).

### Act 1 — Hero

**Layout:** Full viewport height. Centered content. AnimatedGridPattern background with radial gradient mask.

**Content:**
- Kicker: "Our Story"
- Headline (TextReveal, 2 lines): "Where Precision" / "Began"
- Subtitle: "Four decades of redefining what's possible in dentistry."
- Scroll indicator at bottom

**Animations:**
- GSAP timeline on mount: kicker fades in (0.7s) → headline TextReveal staggered (0.9s, 0.15s stagger) → subtitle (0.7s) → scroll indicator (animate-float)
- On scroll-down: hero content fades out with y-shift parallax exit using ScrollTrigger scrub — cinematic "leaving the scene" transition

### Act 2 — The Origin

**Layout:** Max-width container. Text-focused with decorative background elements.

**Content:**
- Section label: "The Beginning"
- Founder narrative: 2-3 paragraphs about the journey from traditional dentistry to robotic precision
- Pull quote: A standout philosophy statement from the founder
- DotPattern background with glow

**Animations:**
- Text paragraphs are scrub-animated: as user scrolls, each line progressively reveals (opacity 0→1, y shift, color transition from titanium → white-pure)
- Pull quote animates in from the left with slow ease
- Floating decorative icons (Bot, Shield) with animate-float at different delays

### Act 3 — The Evolution (Scroll-Driven Timeline)

**Layout:** Pinned section. Horizontal timeline centered vertically. Milestone cards appear along the line.

**Content — 4 milestones:**
1. "The Foundation" (1980s) — "Established with a vision to elevate dental precision" — Stat: 40+ years
2. "Innovation Begins" (2000s) — "Pioneering robotic-assisted dental procedures" — Stat: 800+ adaptations
3. "Scaling Impact" (2010s) — "Expanding across dental service organizations nationwide" — Stat: 500+ offices
4. "The Future" (2020s) — "Leading the next generation of precision dentistry" — Stat: 0 regulatory barriers

**Animations:**
- Section pinned for ~3x viewport height scroll distance via GSAP ScrollTrigger pin + scrub
- Horizontal progress line scales from 0% → 100% width mapped to scroll
- Milestone nodes appear sequentially: fade up with scale bounce
- Active milestone: enlarged card with BorderBeam, year animates via NumberTicker
- Inactive milestones: titanium color, smaller scale
- Transition between milestones smooth via scrub

### Act 4 — The Mission

**Layout:** Centered text block for headline, then 3-column card grid below.

**Content:**
- Headline: "Human Expertise. Amplified."
- Three value cards:
  1. Precision — icon: Crosshair — "Sub-millimeter accuracy in every procedure" — metric: ±0.1mm
  2. Accessibility — icon: Building2 — "Making robotic dentistry available to every practice" — metric: 500+ offices
  3. Innovation — icon: Lightbulb — "Continuous advancement in robotic-assisted care" — metric: 800+ adaptations

**Animations:**
- Headline uses TextRevealByLine with scrub (words reveal as you scroll)
- Value cards: StaggerFadeIn (direction: up, 0.15s stagger)
- NumberTickers on each card fire on intersection
- DotPattern background with parallax at 0.5x scroll speed

### Act 5 — Impact & CTA

**Layout:** Stat row (3-4 columns), closing text, CTA button. Max-width centered.

**Content:**
- Stats: 40+ Years Expertise | 800+ Adaptations | 500+ DSO Offices
- Closing text: "Ready to bring robotic precision to your practice?"
- CTA button: "Partner With Us" → /contact
- BorderBeam wrapping the CTA card

**Animations:**
- Stat NumberTickers with large font, staggered FadeIn
- Closing text: TextReveal
- CTA button: FadeIn with slight scale-up
- BorderBeam on CTA card

### New Components Needed
- **ScrollRevealText** — A scrub-linked text reveal component (paragraphs that reveal line-by-line tied to scroll progress, not just trigger-once). Wraps GSAP ScrollTrigger with scrub: true and pin: true.
- **ParallaxSection** — Wrapper that applies a parallax y-offset to its children based on scroll position. Simple GSAP ScrollTrigger with scrub.

### File Structure
```
src/app/about/page.tsx           — Page composition (Navbar + sections + Footer)
src/components/sections/about/
  about-hero.tsx                 — Act 1
  about-origin.tsx               — Act 2
  about-timeline.tsx             — Act 3
  about-mission.tsx              — Act 4
  about-impact.tsx               — Act 5
src/components/animations/
  scroll-reveal-text.tsx         — New: scrub-linked text reveal
  parallax-section.tsx           — New: parallax wrapper
```

---

## Technology Page (Plan Only — Do Not Implement)

### Approach
Interactive system breakdown — hero with robotic system visual, scroll-driven component exploration, process walkthrough, comparative advantage section, and trust/regulatory closing. Futuristic, data-driven, technically precise aesthetic. Same design system, different personality from About (cold/precise vs warm/narrative).

### Act 1 — Hero

**Layout:** Full viewport. Bold headline centered. Central visual placeholder for robotic system. AnimatedGridPattern with tighter grid.

**Content:**
- Kicker: "Our Technology"
- Headline: "The Future of" / "Robotic Dentistry"
- Subtitle: "Precision engineered. Clinically proven."
- Central system visual (image/SVG placeholder)
- Floating tech icons: CPU, Crosshair, Gauge, Shield

**Animations:**
- GSAP timeline: kicker → headline → subtitle → system visual materializes (scale 1.05→1.0, opacity 0→1)
- Floating icons with staggered animate-float

### Act 2 — System Breakdown (Showpiece)

**Layout:** Pinned section. Central system visual fixed. Component spec cards appear on sides.

**Content:** 4-5 system components, each with name, description, key spec.

**Animations:**
- Pinned GSAP scrub section
- Component highlights pulse/glow as active
- Spec cards fly in from alternating sides with BorderBeam
- Subtle grid lines connecting components

### Act 3 — How It Works

**Layout:** Pinned 3-step sequence: Plan → Execute → Verify.

**Content:** Each step has icon, title, description, visual indicator.

**Animations:**
- Pinned scrub-driven transitions
- Current step scales down/shifts left, next scales up from right
- Progress dots indicator

### Act 4 — Vs Traditional (Comparative Advantage)

**Layout:** Side-by-side comparison grid. Animated metric bars.

**Content:** Precision, procedure time, consistency, patient outcomes — each with traditional vs robotic values.

**Animations:**
- Metric bars animate width 0% → target on scroll trigger (once, not scrubbed — for impact)
- Traditional bars: titanium-dark. Robotic bars: white-pure with glow
- NumberTickers alongside bars
- StaggerFadeIn on the grid

### Act 5 — Trust & Regulatory

**Layout:** Clean badge/card grid. Closing CTA.

**Content:** FDA clearance, clinical validation, safety certifications. CTA to /contact.

**Animations:**
- Badge cards FadeIn with stagger
- CTA with BorderBeam card (same pattern as About Act 5)

### Planned File Structure
```
src/app/technology/page.tsx
src/components/sections/technology/
  tech-hero.tsx
  tech-system-breakdown.tsx
  tech-how-it-works.tsx
  tech-comparison.tsx
  tech-trust.tsx
```

---

## Shared Patterns

- Both pages use Navbar + Footer from existing layout components
- Both reuse existing animation components (FadeIn, StaggerFadeIn, TextReveal, NumberTicker, BorderBeam, AnimatedGridPattern, DotPattern)
- Both follow the same responsive breakpoint strategy (mobile-first, md: and lg: breakpoints)
- Both use the monochromatic void → titanium → white-pure color palette
- CTA sections on both pages link to /contact with consistent styling
