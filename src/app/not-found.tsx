import Link from 'next/link'
import Mascot from '@/components/ui/Mascot'

// ─── Custom 404 page ──────────────────────────────────────────────────────────
//
// Mascot: idle pose via <Mascot />
// To update mascot poses: src/components/ui/Mascot.tsx → MASCOT_POSES

export default function NotFound() {
  return (
    <main
      style={{ background: '#080808', minHeight: '100dvh' }}
      className="flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Brand character */}
      <Mascot pose="idle" size={128} className="mb-10 opacity-90" />

      {/* 404 label */}
      <p
        className="font-mono text-[11px] tracking-[0.28em] uppercase mb-5"
        style={{ color: 'rgba(242,216,50,0.55)' }}
      >
        404
      </p>

      {/* Heading */}
      <h1
        className="font-extrabold tracking-[-0.04em] text-white mb-4 leading-tight"
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize:   'clamp(28px, 4vw, 56px)',
        }}
      >
        Lost in the interface.
      </h1>

      {/* Subtext */}
      <p
        className="text-[14px] mb-12 max-w-xs"
        style={{ color: 'rgba(255,255,255,0.36)' }}
      >
        Let&apos;s get you back home.
      </p>

      {/* Back home link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 text-[12px] font-mono tracking-[0.18em] uppercase text-[#606058] hover:text-white transition-colors duration-300 border border-white/[0.1] hover:border-white/[0.25] px-7 py-3"
      >
        ← Home
      </Link>
    </main>
  )
}
