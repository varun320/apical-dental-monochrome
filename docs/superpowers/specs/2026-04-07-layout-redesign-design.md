# Apical Dental — Layout Redesign with Bento Grids & Iconography

**Date:** 2026-04-07
**Status:** Approved
**Scope:** Improve layouts, spacing, and iconography across all sections. No color palette changes.

---

## Goals

1. Add breathing room to hero (too close to navbar)
2. Introduce dental + robotics iconography as thematic accents
3. Apply bento grid layouts to sections using 2-3 shared templates
4. Pare back heavy visual effects (Particles, GeometricShapes, DotPattern, Ripple) for a cleaner look
5. Sleek and clean — not over-engineered

---

## Design System Changes

### Effects: Remove
- **Particles** (hero) — canvas particle system
- **GeometricShapes** (hero) — 8 floating SVG shapes with GSAP
- **AnimatedGridPattern** (hero) — SVG animated grid
- **DotPattern** (RobotScope) — SVG dot grid background
- **Ripple** (CTA) — concentric expanding circles

### Effects: Keep
- **BorderBeam** — selective use on emphasis cards
- **NumberTicker** — stat animations throughout
- **GSAP FadeIn/StaggerFadeIn** — scroll-triggered reveals
- **Lenis** — smooth scrolling
- **ScrollTrigger** — used for StagedPath horizontal line animation

### Iconography System
Small inline SVG icons via Lucide React (20-24px, titanium color). Blend of dental and robotic themes:

| Icon | Category | Used In |
|------|----------|---------|
| `Crown` | Dental | RobotScope (Prosthetic Fabrication) |
| `HeartPulse` | Dental | General accent |
| `ShieldCheck` | Dental/Trust | Hero floating icons, DSOCase (Regulatory) |
| `Syringe` | Dental | Available as accent |
| `GraduationCap` | Education | Problem (Training), Authority (Training stat) |
| `Target` | Quality | Problem (Quality Standard) |
| `School` | Education | Problem (New Schools) |
| `Cpu` | Tech | Hero floating icons, Authority (IMU card) |
| `Bot` | Robotics | Hero floating icons, DSOCase (RaaS), StagedPath (Phase 04) |
| `BrainCircuit` | AI | RobotScope (AI Diagnostics) |
| `Cog` | Mechanical | Authority (Adaptations stat) |
| `Clock` | Time | Hero stats (Years), Authority (Years stat) |
| `Building2` | Scale | Hero stats (Offices), Authority (Offices stat), DSOCase (Distribution) |
| `Wrench` | Maintenance | Hero stats (Adaptations), RobotScope (Maintenance) |
| `Sparkles` | Clean | RobotScope (Sterilization) |
| `Package` | Inventory | RobotScope (Inventory) |
| `MessageSquare` | Comms | RobotScope (Patient Comms), CTA floating icons |
| `Flask` | Lab | StagedPath (Phase 01) |
| `Stethoscope` | Medical | StagedPath (Phase 02) |
| `Scissors` | Surgical | StagedPath (Phase 03) |
| `TrendingUp` | Growth | DSOCase header watermark |
| `Rocket` | Scale | DSOCase projection card |
| `DollarSign` | Revenue | DSOCase projection card |
| `Mail` | Contact | CTA floating icons |
| `Send` | Contact | CTA floating icons |
| `Play` | Video | Authority (video card, already exists) |
| `UserRound` | Person | Authority (bio card watermark) |
| `AlertTriangle` | Warning | Problem (header card watermark) |

**Watermark icons:** Used at ~120px size, 5% opacity, positioned in card corners as subtle background accents.

**Floating icons:** Used at 40-60px, 8-10% opacity, with slow CSS float animation (gentle translateY oscillation, 6-8s duration, infinite).

### Bento Grid Templates

**Template 1 — Feature Bento:**
Large card (span 2 cols, full height) + smaller supporting cards. Used when a section has one primary content piece with supporting details.

**Template 2 — Grid Bento:**
Multi-column grid with cards of varying col/row spans. Used for lists of items with varying emphasis.

**Spacing:**
- Section vertical padding: increase to ~120px (from ~80px)
- Bento card gap: 16px consistent
- Card padding: 24-32px internal

---

## Section-by-Section Design

### 1. Hero

**Layout:**
- Full viewport height, content shifted to center-lower (~60% down the viewport)
- Upper 40% is breathing room with floating icon composition
- Remove: Particles, GeometricShapes, AnimatedGridPattern background layers
- Keep: Single subtle radial gradient background (void center, slightly lighter edges)
- Max-width ~800px for text content (unchanged)

**Floating icon composition (upper area):**
- 3-4 icons: `Crown`, `Bot`, `Cpu`, `ShieldCheck`
- Size: 40-60px each
- Opacity: 8-10%
- Arranged in a loose scattered pattern in the upper viewport area
- Slow CSS float animation (translateY +-10px, 6-8s, infinite, ease-in-out)
- Each icon has a different animation delay for organic feel

**Stats bar conversion:**
- Convert from plain text columns to 4 small bento-style cards in a row
- Each card: thin titanium-dark border, rounded corners, 16-20px padding
- Content per card: stat number (NumberTicker), label text, small Lucide icon (16px)
- Icons: `Clock` (years), `Wrench` (adaptations), `Building2` (offices), `ShieldCheck` (regulatory)

**Content unchanged:** Kicker, headline, subtitle, CTAs remain as-is.

**Animations:** Keep GSAP staggered entry timeline for content. Floating icons use CSS only.

---

### 2. Problem

**Layout — Feature Bento (Template 1):**
- 3-column grid on desktop
- Left card: spans 2 cols, full height. Contains the section header content (label, title, description) integrated inside the card. Deep-void background. Watermark `AlertTriangle` icon at ~120px, 5% opacity, positioned bottom-right of card.
- Right column: 3 smaller problem cards stacked vertically
- Each problem card gets a Lucide icon next to its title:
  - Training Curve → `GraduationCap`
  - Quality Standard → `Target`
  - New Schools → `School`
- NumberTicker stats remain on problem cards
- BorderBeam stays on first problem card

**Mobile:** Single column. Header card on top, then 3 problem cards stacked.

**Background:** Clean bg-void, remove the radial glow.

---

### 3. RobotScope

**Layout — Grid Bento (Template 2):**
- 4-column grid on desktop
- Row 1: Card 1 (Prosthetic Fabrication) spans 2 cols, Card 2 (AI Diagnostics) spans 2 cols — these are the flagship capabilities with larger icons (32px) and more description space
- Row 2: Cards 3-6 each span 1 col (4 across) — supporting capabilities
- Icons per card:
  - Prosthetic Fabrication → `Crown` (32px)
  - AI Diagnostics → `BrainCircuit` (32px)
  - Sterilization → `Sparkles` (24px)
  - Inventory Management → `Package` (24px)
  - Patient Communication → `MessageSquare` (24px)
  - Facility Maintenance → `Wrench` (24px)
- Remove DotPattern background entirely. Clean void background.

**Mobile:** Single column, all cards equal width.

---

### 4. StagedPath

**Layout — Grid Bento (horizontal progression):**
- 4-column grid on desktop, each column is a phase card
- Phase 01 card: taller (spans extra row), subtle BorderBeam effect, brighter border (titanium instead of titanium-dark) to emphasize current/active phase. Icon: `Flask`.
- Phases 02-04: standard height, progressively muted borders and text opacity (slight decrease left-to-right to convey future timeline):
  - Phase 02: Icon `Stethoscope`
  - Phase 03: Icon `Scissors`
  - Phase 04: Icon `Bot`
- Horizontal connecting line at top of cards with small dots at each card position
  - Line: titanium-dark base color
  - Animated fill: white, scaleX 0→1 on scroll (ScrollTrigger, same approach as current vertical, just horizontal)
- Phase status badges remain

**Mobile:** 2x2 grid. Phase 01 spans full width on top row. Phases 02-04 fill remaining cells.

---

### 5. Authority

**Layout — Refinement of existing bento grid:**
- Tighten to proper 4-column grid with 16px gaps (matching other sections)
- Bio card (spans 2 cols, 2 rows): Add subtle `UserRound` watermark icon at 5% opacity, ~120px, bottom-right
- Stat cards: Each gets a small Lucide icon (20px) next to the number:
  - Years → `Clock`
  - Adaptations → `Cog`
  - Offices → `Building2`
  - Training → `GraduationCap`
- Video placeholder: Keep as-is with `Play` icon
- IMU card: Add `Cpu` icon (20px) next to label
- Keep BorderBeam on IMU card

**Mobile:** Single column. Bio card first, stats in 2x2 grid, video card, IMU card.

---

### 6. DSOCase

**Layout — Grid Bento:**
- Section header stays above the grid (not integrated into a card here — keeps it clean)
- Top row: 3 benefit cards as bento tiles in 3-column grid. Each gets an icon (20px):
  - Robot-as-a-Service → `Bot`
  - Built-In Distribution → `Building2`
  - Zero Regulatory Friction → `ShieldCheck`
- Bottom row: 1 large card spanning all 3 cols — the scale projection card with $11M+ stat. Bold full-width closer. Icon `Rocket` (24px). BorderBeam effect on this card.
- Remove scan lines texture. Clean bg-void.

**Mobile:** Single column. Benefit cards stacked, projection card full-width at bottom.

---

### 7. CTA

**Layout — Refinement:**
- Remove Ripple effect entirely. Clean deep-void background.
- Add small floating icon cluster above the form header: `Mail`, `MessageSquare`, `Send`
  - Size: 28-36px each
  - Opacity: 8% 
  - Same CSS float animation as hero icons (different delays)
- Form layout unchanged (2-col fields, textarea, submit button)
- Max-width 700px centered (unchanged)
- Section padding increased to 120px vertical (matching other sections)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/sections/hero.tsx` | Remove Particles/GeometricShapes/AnimatedGridPattern, add floating icons, shift content down, convert stats to bento cards |
| `src/components/sections/problem.tsx` | Convert to Feature Bento layout, integrate header into large card, add icons to problem cards, add watermark |
| `src/components/sections/robot-scope.tsx` | Convert to 4-col Grid Bento with varying spans, replace numeric badges with Lucide icons, remove DotPattern |
| `src/components/sections/staged-path.tsx` | Convert vertical timeline to horizontal 4-col bento cards, add horizontal connecting line, add phase icons |
| `src/components/sections/authority.tsx` | Tighten grid, add icons to stat cards, add watermarks to bio/IMU cards |
| `src/components/sections/dso-case.tsx` | Restructure to bento grid (3 benefit cards top + full-width projection card bottom), add icons, remove scan lines |
| `src/components/sections/cta.tsx` | Remove Ripple, add floating icon cluster, increase padding |

## Files Potentially Removable After Changes
- `src/components/ui/particles.tsx` — no longer used anywhere
- `src/components/ui/geometric-shapes.tsx` — no longer used
- `src/components/ui/ripple.tsx` — no longer used
- `src/components/ui/dot-pattern.tsx` — no longer used
- `src/components/ui/animated-grid-pattern.tsx` — no longer used

(Verify no other imports before deleting.)

---

## Out of Scope
- Color palette changes (keeping existing monochrome void→titanium→white)
- Typography changes (keeping Space Grotesk + Inter)
- Navbar/Footer redesign
- New pages or routing
- Form functionality
- Content/copy changes
