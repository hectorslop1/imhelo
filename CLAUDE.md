# HELO Portfolio Project

This is the new portfolio for Hector Lopez / HELO.

## Current Status

This is now a valid Next.js project located at:

/Users/hectoreduardosanchezlopez/Documents/Proyectos/imhelo

The project is running locally with:

npm run dev

## Context

The old website imhelo.com expired. It was built with WordPress / Elementor and had a dark visual style, white text, HELO logo, yellow accent, personal photo, social links, and a one-page structure.

Old sections:
- Home
- About
- Resume
- Services
- Skills
- Projects
- Contact

Old positioning:
- Visual Designer
- Developer
- UX/UI
- Branding
- Visual Design
- Multiplatform app development
- Graphic Design
- WordPress / Elementor

The new website should be a major professional evolution, not a copy of the old site.

## Goal

Build a premium interactive portfolio inspired by the structure, rhythm, motion quality, and dark high-end feeling of azizkhaldi.com, but with original branding, layout, content, colors, and components.

Do not copy Aziz Khaldi's exact layout, text, assets, logo, or implementation. Use it only as inspiration for quality, pacing, motion, and premium portfolio feel.

The final site should feel:
- premium
- modern
- smooth
- intentional
- memorable
- minimal but not boring
- animated but not excessive
- focused on Development and Graphic Design

## Brand

Name: HELO  
Person: Hector Lopez  
Focus: Development + Graphic Design  
Location: San Diego, CA  
Email: hello@imhelo.com

## Core Positioning

HELO is a premium portfolio for Hector Lopez, focused on two main disciplines:

1. Development  
2. Graphic Design

The site should communicate that Hector can both design polished visual systems and build refined digital interfaces.

## Visual Direction

- premium dark interface
- near-black background
- warm white primary text
- muted gray secondary text
- HELO yellow accent
- large editorial typography
- minimal navigation
- strong spacing
- subtle borders
- soft glows
- refined hover states
- smooth scrolling
- cinematic section reveals
- project cards with motion
- marquee typography
- polished contact footer
- responsive and performant

Avoid:
- generic SaaS template look
- childish visuals
- excessive colors
- overused gradients
- cluttered layouts
- animations that slow down the UX
- copying Aziz Khaldi too literally

## Stack

Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- motion
- GSAP + @gsap/react when needed
- Lenis smooth scrolling
- lucide-react
- Vercel-ready architecture

## Architecture Target

Use this structure when possible:

src/
  app/
    page.tsx
    layout.tsx
    globals.css
    work/
      page.tsx
    about/
      page.tsx
    contact/
      page.tsx

  components/
    layout/
      Header.tsx
      Footer.tsx

    sections/
      Hero.tsx
      Intro.tsx
      Services.tsx
      SelectedWork.tsx
      DeviceShowcase.tsx
      Experience.tsx
      Marquee.tsx
      ContactFooter.tsx

    ui/
      Button.tsx
      SectionLabel.tsx
      ProjectCard.tsx
      RevealText.tsx
      SmoothScroll.tsx
      MagneticLink.tsx

  data/
    projects.ts
    experience.ts
    skills.ts

  lib/
    utils.ts

## Main Homepage Sections

1. Header / minimal navigation
2. Hero
3. Intro / About HELO
4. Development + Graphic Design pillars
5. Selected Work
6. Interactive Device Showcase Simulator
7. Experience / Skills
8. Marquee
9. Contact Footer

## Signature Interaction

Create a sticky scroll-driven Device Showcase Simulator with an iPhone and Apple Watch frame.

Behavior:
- section height around 350vh to 450vh
- sticky viewport
- iPhone starts as the main object
- Apple Watch enters later
- screen content changes across scroll progress
- devices move subtly with depth
- project metadata changes per scene
- final section zooms into the phone screen
- no heavy 3D
- use transforms and opacity for performance
- include mobile fallback
- include reduced-motion fallback

Important:
Do not build this first. First build a strong homepage base with a polished placeholder for DeviceShowcase.

## Content Direction

### Hero

HELO  
Design & Development  
crafted into digital experiences.

Subtext:

I'm Hector Lopez, a designer and developer creating polished interfaces, visual systems, and digital experiences with purpose.

CTA:
- View Work
- Say HELO

### Intro

I blend visual design and frontend development to create work that feels sharp, useful, and memorable.

### Pillars

01 Development  
Websites, app interfaces, interactive frontend experiences, and digital products built with care.

02 Graphic Design  
Brand systems, campaign visuals, social graphics, logos, and visual assets with strong creative direction.

### Marquee

Designed by HELO ✦ Developed by HELO ✦ Visual Systems ✦ App Interfaces ✦ Digital Experiences ✦ Graphic Design ✦ Frontend Development ✦

### Footer

Say HELO  
Let's build something polished, useful, and memorable.

hello@imhelo.com  
San Diego, CA  
2026 Edition

## Initial Projects

Use these placeholder projects until final assets are ready.

### 1. gigFAST NASCAR

Category:
Graphic Design / Branding

Description:
A racing-focused visual identity and graphics system created for a NASCAR truck sponsorship.

Suggested role:
Visual Design, Branding, Graphic System

### 2. Mobile App Showcase

Category:
Development / UI

Description:
A collection of app interfaces presented through an interactive device showcase.

Suggested role:
Frontend Development, UI Implementation, Motion

### 3. Interactive Elements

Category:
Frontend / Creative Coding

Description:
Interactive web experiments built with modern frontend tools and motion-driven UI.

Suggested role:
Frontend Development, Interaction Design

### 4. Graphic Design Collection

Category:
Visual Design

Description:
A curated collection of visual assets, campaign graphics, logos, and brand pieces.

Suggested role:
Graphic Design, Art Direction, Visual Systems

## Build Priorities

Build in this order:

1. Clean architecture
2. Global visual system
3. Header
4. Hero
5. Intro
6. Development + Graphic Design pillars
7. Selected Work
8. Marquee
9. Experience / Skills
10. Contact Footer
11. Device Showcase placeholder
12. Advanced Device Showcase
13. Work detail pages
14. Polish
15. Performance and accessibility

## Motion Guidelines

Use animation intentionally.

Good:
- text reveal
- subtle section entrance
- smooth hover states
- marquee
- sticky scroll showcase
- subtle parallax
- soft cursor-reactive glow if performant

Avoid:
- too many simultaneous animations
- heavy blur everywhere
- scroll hijacking across the entire site
- effects that hurt readability
- animations that feel like a template

## Coding Guidelines

- Keep components reusable.
- Keep content in data files where useful.
- Prefer clean, maintainable TypeScript.
- Use semantic HTML.
- Use accessible buttons and links.
- Respect reduced motion.
- Keep mobile experience strong.
- Use Next.js image optimization when real images are added.
- Keep the app building successfully.
- After meaningful changes, run npm run build and fix errors.

## Important Workflow

When asked to make changes:
1. Inspect the current structure first.
2. Explain the intended changes briefly.
3. Edit only what is needed.
4. Keep the project running.
5. Run build or lint when appropriate.
6. Do not delete assets or configuration files without asking.