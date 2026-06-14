'use client'

// ─── SideBadge ────────────────────────────────────────────────────────────────
//
// A persistent vertical label pinned to the right edge across the whole site —
// the azizkhaldi.com "Honors / name" right-rail. Uses mix-blend-mode:difference
// so the white mark inverts against whatever is behind it, staying legible on
// both the light surfaces and the dark bands without any scroll detection.
//
// pointer-events:none so it never blocks clicks. Desktop only.

export default function SideBadge() {
  return (
    <div
      aria-hidden
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col items-center gap-4 pointer-events-none select-none"
      style={{ mixBlendMode: 'difference' }}
    >
      <span className="w-[5px] h-[5px] rounded-full" style={{ background: '#ffffff' }} />
      <span
        className="text-[10px] font-mono tracking-[0.3em] uppercase"
        style={{ color: '#ffffff', writingMode: 'vertical-rl' }}
      >
        Hector Lopez — Portfolio &rsquo;26
      </span>
      <span className="w-[5px] h-[5px] rounded-full" style={{ background: '#ffffff' }} />
    </div>
  )
}
