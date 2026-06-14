'use client'

// ─── Page Transition Template ─────────────────────────────────────────────────
//
// Next.js App Router `template.tsx` re-mounts on every route change, so the CSS
// entrance animations below replay on each navigation.
//
// Implemented with pure CSS animations (defined in globals.css) rather than
// Framer Motion: CSS animations are compositor-driven and cannot stall the way a
// JS rAF animation can during the heavy first-paint of a route, so the loader is
// GUARANTEED to clear (it ends at visibility:hidden via animation-fill-mode).
//
// Respects prefers-reduced-motion (handled in globals.css).

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Page content — rises + fades in (CSS, with a small delay) */}
      <div className="page-enter">{children}</div>

      {/* Branded loader — fades up and away, then hides for good */}
      <div className="page-loader" aria-hidden>
        <span className="page-loader__mark">HELO</span>
      </div>
    </>
  )
}
