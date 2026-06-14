# Aziz Khaldi — Motion & Experience Audit
**For: HELO / Hector Lopez — imhelo.com**
**Date: 2026-06-02**
**Method: Playwright desktop (1440×900) + mobile (390×844) + JS runtime inspection**

---

## A. Summary — azizkhaldi.com Experience

A premium portfolio with a clear two-act visual rhythm: **light sections** (hero, about portrait, services) alternate with **dark sections** (intro text, experience timeline, footer). This creates cinematic breathing and prevents visual fatigue.

The standout interactive signatures:
- WebGL/Three.js 3D holographic blob in the hero (not a video, not CSS — real-time rendered)
- Clip-path polygon text reveals on every heading and section entrance
- Custom cursor (ring + behavior states) that reacts to links and image hover
- Lenis smooth scroll with ~0.08 lerp (cinematic glide)
- Massive display typography used as architecture, not decoration
- 3D robot mascot (Three.js canvas) in the footer overlaying the giant "AZIZ" wordmark

---

## B. Motion Patterns Detected

### B1. Text Reveals — clip-path polygon (PRIMARY SYSTEM)

**The most important pattern.** Every heading, every paragraph entrance uses clip-path:

```css
/* Hidden state */
clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);

/* Revealed state */
clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
```

The bottom two points collapse to the top edge (hidden), then open upward (reveal). Content stays in document flow (no layout jump). Duration: ~0.85–1.0s. Easing: strong ease-out `cubic-bezier(0.16, 1, 0.3, 1)`.

**Why it feels premium:** The text appears to "emerge" from below a surface, like a blind being raised. Opacity reveals feel cheap by comparison — this has mass and physicality.

### B2. Scroll-Driven Scale Reveals (SECONDARY)

Elements entering the viewport begin at `scale(0.85)` and grow to `scale(1.0)`. Detected via computed transform `matrix(0.85, 0, 0, 0.85, -75.75, -110)` on un-scrolled elements.

- Applied to: section blocks, image containers, card groups
- Duration: ~0.9s  
- Simultaneous with clip-path on some elements

### B3. Lenis Smooth Scroll

HTML element has `class="lenis"`. Confirmed active. Estimated lerp ~0.08 (slightly snappier than our current 0.075, creating a confident rather than lazy scroll feel).

### B4. WebGL Canvas

Canvas element: 450×450px. Context: WebGL2 (context "unknown" in our test = WebGL2 not standard WebGL). The holographic 3D blob in the hero is Three.js rendered in real-time. The robot mascot in the footer is a separate Three.js canvas.

**Do NOT copy this.** It's not a motion primitive — it's a custom Three.js asset. HELO has no equivalent 3D assets and building one from scratch would be speculative.

### B5. Custom Cursor

37 elements with "cursor" in className. The system has:
- Default state: thin ring (outline) + small solid dot
- Link hover: ring grows via scale (~1.5–2×)
- Image hover: ring fills or changes opacity (inferred)
- Click: ring briefly compresses (`scale(0.7)`)

Custom cursor uses `mix-blend-mode: difference` so it inverts against any background color — always visible on both light and dark sections without any JS color detection.

### B6. Kinetic Marquee (overflow type)

Section between hero and portrait: "FULL STACK DEVELOPER UI & UX D..." runs horizontally at viewport-overflow scale (text is ~20vw tall, overflows edges intentionally). Runs at constant linear speed, no pause, infinite loop.

### B7. Light→Dark Section Rhythm

| Section | Background | Effect |
|---------|-----------|--------|
| Hero | Light gray `#f3f3f3` | 3D blob center |
| Intro | Dark `#1a1a1a` | White text + lime CTA |
| About/Portrait | Light gray | Kinetic marquee + B&W photo |
| Services | Light gray | 3-col service cards |
| Works (cards) | Light gray | 2-col project mockup grid |
| Experience | Dark `#1a1a1a` | Timeline, vertical line |
| Footer | Dark `#1a1a1a` | Massive wordmark + 3D mascot |

The rhythm is: 1 dark band every ~3 light sections. Creates visual punctuation.

### B8. Project Cards — Image Parallax

Project cards (2-col grid) have images that shift position on scroll (subtle parallax). The image translates slower than the scroll speed, creating depth.

### B9. Page Transitions

Route changes show a brief dark overlay (inferred — not directly audited). Content enters with opacity fade + slight Y translate.

### B10. Vertical Experience Timeline

Left: vertical lime/yellow line with circle node markers.
Right: company name (large bold), role (italic light), description, date.
Dark background. Each experience item has a clip-path reveal on scroll.

---

## C. Hover Interactions Detected

| Element | Hover State |
|---------|------------|
| Nav links | Color change + subtle translate |
| "About Me" CTA | Scale + shadow on pill |
| Project cards | Image scale-up inside overflow-hidden container (`scale(1.05)`) |
| Footer contact pills | Border + color inversion |
| Social links | Opacity transition |
| Custom cursor | Ring scale grows to ~1.5× on all interactive elements |

**No magnetic hover detected** on Aziz's buttons (HELO already has MagneticLink which is equal or superior).

---

## D. Page Transition System

Aziz uses the Next.js pages router. Between route changes:
1. Dark overlay covers the page
2. New content fades + rises from slight Y offset

HELO's `template.tsx` already has an equivalent system (branded HELO wordmark in overlay). This is on-par.

---

## E. Scroll / Reveal System

**Trigger:** IntersectionObserver (standard, not GSAP ScrollTrigger — no GSAP detected in scope). Likely using Framer Motion's `useInView` or `whileInView`.

**Pattern per element:**
1. Wrapper sets `overflow: hidden` to act as mask
2. Child animates clip-path from bottom-collapsed → full-open
3. Optional scale from `0.92` → `1.0` simultaneously

**Stagger:** Section items (service cards) stagger by ~0.06–0.08s each. Headings vs body: heading reveals first, body follows ~0.15s later.

**Viewport threshold:** Most reveals fire when the element is ~60–80px into the viewport (not waiting for full visibility).

---

## F. Visual Rhythm System

**Typography scale:**
- Hero H1: ~`clamp(52px, 6vw, 80px)` — system font (sans-serif)
- Intro statement: ~`clamp(32px, 3.5vw, 52px)` — same family, lighter weight
- Section headings: ~`clamp(28px, 2.8vw, 40px)`
- Body: ~16–18px, `line-height: 1.6`

**Spacing pattern:**
- Sections: `padding-top: min(160px, 10vh)` — very generous
- Between heading and body: `margin-top: 2rem`
- Project card gaps: `2rem`

**How it avoids generic:** 
1. Uses only 2 fonts (system-ui + custom logo font)
2. Consistent motion vocabulary (always clip-path, never opacity-only)
3. The alternating light/dark rhythm creates surprise without chaos
4. The 3D elements (blob, robot) add uniqueness that can't be templated
5. Sidebar "W. / Honors / K" labels add detail and personality

---

## G. HELO vs Aziz — Comparison

| Dimension | Aziz | HELO | Gap |
|-----------|------|------|-----|
| Smooth scroll | Lenis ~0.08 | Lenis 0.075 | Minimal |
| Text reveals | clip-path (premium) | ClipReveal exists but underused | MEDIUM |
| Image reveals | scale + parallax | Static images | HIGH |
| Cursor | ring + 3 states | ring + grow (1 state) | LOW |
| Section rhythm | light/dark alternation | Predominantly dark | MEDIUM |
| Page transition | overlay + content rise | Same pattern | None |
| Magnetic hover | Not detected on Aziz | MagneticLink implemented | HELO ahead |
| Marquee | Kinetic overflow type | Bottom marquee section | Different |
| 3D elements | Two Three.js canvases | None (device showcase CSS) | By choice |
| Typography | System-ui + custom logo | Syne + Singapore Sling + Geist | Equivalent |
| Section heading presence | Very large, sparse | Large, consistent | Slight gap |
| Footer impact | 3D mascot + huge wordmark | Say HELO + mascot + wordmark | Comparable |
| Loading animation | Inferred (not captured) | template.tsx overlay | Comparable |

---

## H. Main Gaps for HELO

### H1. ClipReveal is implemented but NOT USED CONSISTENTLY (Highest Impact)
`ClipReveal` exists in `/src/components/ui/ClipReveal.tsx` but many sections still use `opacity+y` via Framer Motion `whileInView`. Every section heading and block should use ClipReveal for the premium "emerge from surface" feel.

### H2. No Image Scale Reveals (High Impact)
Project card images, portrait images, and media assets enter without any scale/parallax reveal. Should enter at `scale(0.90)` + `opacity(0)` and grow to `scale(1.0)` + `opacity(1)`. This is the most visible motion gap.

### H3. Section Rhythm — HELO is Predominantly Dark (Medium Impact)
HELO's CLAUDE.md calls for a "light-dominant system" but the hero is pure black. The current globals.css has `--surface: #ebe9e1` but the hero uses pure black (`#080808`). The site reads as dark-dominant. The motion contrast between light and dark sections that makes Aziz feel premium is currently missing.

### H4. Stagger is Inconsistent (Medium Impact)
Some sections have stagger (`delay: i * 0.055`), others don't. The motion-tokens system should standardize stagger values so the rhythm is consistent throughout.

### H5. Cursor has Only 1 Hover State (Low Impact)
HELO's cursor grows uniformly on all interactive elements. Aziz's cursor responds differently to images vs links. Adding a `data-cursor="image"` state (cursor becomes view-finder frame) would elevate the feel.

---

## I. Adaptable Patterns (Legal — Experience System Only)

These are **motion and UX patterns** that are universal design techniques, not proprietary to Aziz:

1. **clip-path polygon reveal** — Standard CSS/animation technique, widely used
2. **Lenis smooth scroll** — Open source library
3. **light/dark section alternation** — Layout/design pattern
4. **Scale-on-reveal** — Standard Intersection Observer pattern
5. **Custom cursor ring + dot** — Common interaction pattern
6. **Staggered list entrances** — Standard animation pattern
7. **Kinetic overflow marquee** — Standard CSS animation
8. **Vertical timeline** — Standard layout pattern

---

## J. What NOT to Copy

- The 3D holographic blob (proprietary Three.js asset/shader)
- The 3D robot mascot (proprietary character design and Three.js implementation)
- The sidebar "AZIZ / W. / Honors / K" vertical navigation labels
- Aziz's specific content, typography choices, colors, brand, or copy
- The specific works section structure (Aziz does card grid, HELO does hover rows — ours is more premium)
- The lime/neon yellow (#CCFF00) — HELO uses a warmer, more sophisticated yellow (#f2d832)

---

## K. Implementation Plan

### Phase 1 — Motion System Foundation (Build these first)
1. `src/lib/motion-tokens.ts` — unified duration/ease/stagger/viewport constants
2. Update `ClipReveal.tsx` — make the direction configurable (top/bottom)
3. Create `ImageReveal.tsx` — scale + clip-path for image/media blocks
4. `/motion-lab` — test environment for all primitives

### Phase 2 — Apply to Homepage Sections
After approval of motion-lab feel:
1. Hero — already good (clip-path font render)
2. Intro — apply ClipReveal to the large statement text
3. Services — ClipReveal headings, ImageReveal for icons/cards
4. SelectedWork — rows already have yellow wipe, add stagger refinement
5. Experience — ClipReveal on company names, improve stagger
6. Footer — ClipReveal on "Say HELO"

### Phase 3 — Polish
1. Cursor: add `data-cursor="image"` state (crosshair/viewfinder)
2. Project pages: ImageReveal on gallery images
3. Fine-tune Lenis lerp per section (can be adjusted dynamically)
4. Reduced motion audit

---

## L. Priority by Impact

| Priority | Item | Effort | Visual Impact |
|----------|------|--------|---------------|
| 1 | Apply ClipReveal consistently to all headings | Low | Very High |
| 2 | ImageReveal on project cards and media | Medium | High |
| 3 | Standardize stagger with motion-tokens | Low | Medium |
| 4 | Section rhythm (light/dark alternation) | High | High |
| 5 | Additional cursor states | Low | Low |
| 6 | Kinetic overflow marquee in intro | Medium | Medium |

---

## M. Technical Risks & Performance

| Risk | Mitigation |
|------|-----------|
| clip-path on many elements causes paint storms | Use `will-change: clip-path` sparingly; remove after animation via `onAnimationComplete` |
| Lenis + Motion scroll listeners on same page | Lenis is RAF-based; Motion's `useScroll` uses passive listeners — no conflict |
| Mobile: cursor and magnetic effects fire | Both are already guarded behind `lg:` breakpoints and `hover: hover` media queries |
| `prefers-reduced-motion` compliance | All primitives already check `useReducedMotion()` — maintain this discipline |
| Build errors from new routes | Run `npm run build` after creating each new file |

---

## N. What to Implement First

**Immediately (this session):**
1. `src/lib/motion-tokens.ts` — the shared constants foundation
2. `/motion-lab` page — safe test environment
3. Upgrade `ClipReveal.tsx` — add `direction` prop
4. New `ImageReveal.tsx` primitive

**After approval:**
5. Apply to hero intro text
6. Apply to selected work section headings
7. Apply to experience section company names
