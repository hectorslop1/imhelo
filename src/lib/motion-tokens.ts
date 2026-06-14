// ─── HELO Motion Tokens ───────────────────────────────────────────────────────
//
// Single source of truth for all animation constants.
// Import these everywhere instead of writing raw numbers.
//
// Inspired by the cinematic rhythm of azizkhaldi.com, adapted for HELO.

// ─── Durations (seconds) ──────────────────────────────────────────────────────

export const duration = {
  /** Button press, tooltip, small micro-interaction */
  instant: 0.16,
  /** Snappy UI response — dropdowns, small reveals */
  fast: 0.28,
  /** Standard section reveals, transitions */
  medium: 0.55,
  /** Cinematic heading reveals, page entrance */
  slow: 0.85,
  /** Hero wordmark, very deliberate entrances */
  cinematic: 1.1,
} as const

// ─── Easing Curves ────────────────────────────────────────────────────────────
//
// All as [x1, y1, x2, y2] for Framer Motion / CSS cubic-bezier.

export const ease = {
  /** Strong ease-out — primary reveal curve. Everything entering viewport. */
  out: [0.16, 1, 0.3, 1] as const,
  /** iOS drawer weight — Lenis-style smooth deceleration */
  drawer: [0.32, 0.72, 0, 1] as const,
  /** Sharp exit — decisive, no linger */
  outSharp: [0.76, 0, 0.24, 1] as const,
  /** On-screen movement — accelerate then decelerate */
  inOut: [0.83, 0, 0.17, 1] as const,
  /** Hover/color transitions — standard natural curve */
  standard: [0.25, 0.1, 0.25, 1] as const,
} as const

// ─── Stagger Delays (seconds per item) ───────────────────────────────────────

export const stagger = {
  /** Nav links, pill tags — very tight */
  xs: 0.03,
  /** List items, project rows — comfortable read cadence */
  sm: 0.055,
  /** Feature cards, section items — spaced reveals */
  md: 0.08,
  /** Dramatic cascade — hero elements, large grids */
  lg: 0.12,
} as const

// ─── Viewport Intersection Config ────────────────────────────────────────────

export const viewport = {
  /** Default: fires once when element enters with 60px lead */
  once: { once: true, margin: '-60px' } as const,
  /** Tight: waits until 100px in — good for heavy blocks */
  tight: { once: true, margin: '-100px' } as const,
  /** Early: fires at edge — for large full-width sections */
  early: { once: true, margin: '0px' } as const,
  /** Repeat: re-fires every time element enters (use sparingly) */
  repeat: { once: false, margin: '-60px' } as const,
} as const

// ─── Common Variant Sets ──────────────────────────────────────────────────────
//
// Pre-built Framer Motion variants for common patterns.
// Pass to `variants` prop; use `initial="hidden" whileInView="visible"`.

/** Clip-path wipe-up reveal (the premium text reveal) */
export const clipRevealVariants = {
  hidden: { clipPath: 'polygon(0% 106%, 100% 106%, 100% 106%, 0% 106%)' },
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 106%, 0% 106%)',
    transition: { duration: duration.slow, ease: ease.out },
  },
} as const

/** Opacity + Y lift (secondary, for less prominent elements) */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: ease.out },
  },
} as const

/** Scale reveal for images and media blocks */
export const imageRevealVariants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 0.96 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: duration.slow, ease: ease.drawer },
  },
} as const

/** Stagger container — wraps a list of items */
export const staggerContainer = (delayChildren = 0, staggerChildren = stagger.sm) => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
})

// ─── Reduced Motion Helper ────────────────────────────────────────────────────
//
// Returns empty initial/animate when prefers-reduced-motion is active.
// Usage: const props = resolveMotion(reduced, { initial: ..., animate: ... })

export function resolveMotion<T extends object>(reduced: boolean | null, motionProps: T): T | object {
  if (reduced) return {}
  return motionProps
}

// ─── Spring Configs ───────────────────────────────────────────────────────────

export const spring = {
  /** Magnetic link / button hover — responsive and springy */
  magnetic: { stiffness: 220, damping: 16, mass: 0.4 } as const,
  /** Cursor follow — smooth tracking with slight lag */
  cursor: { stiffness: 180, damping: 20, mass: 0.5 } as const,
  /** UI feedback — buttons, toggles */
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as const,
} as const
