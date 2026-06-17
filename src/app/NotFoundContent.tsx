'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Mascot from '@/components/ui/Mascot'
import { useI18n } from '@/lib/i18n'

// ─── Custom 404 (client) ──────────────────────────────────────────────────────
// A designed dead-end, not a system message: warm-dark to match the site's dark
// sections, a giant "404" with the brand character perched on it (same language as
// the footer wordmark), personality copy, and two clear ways back. Split into a
// client component so it can use i18n while not-found.tsx keeps its metadata export.
export default function NotFoundContent() {
  const { t } = useI18n()

  return (
    <main
      style={{ background: '#1a1815', minHeight: '100dvh' }}
      className="relative flex flex-col overflow-hidden"
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 30%, rgba(242,216,50,0.06) 0%, transparent 70%)' }}
      />

      {/* Top-left home logo — always a clear way out */}
      <div className="relative z-10 px-6 lg:px-12 py-6">
        <Link href="/" aria-label="HELO — Home" className="inline-flex group">
          <Image
            src="/assetshelo/imhelologo/WhiteLogo.png"
            alt="HELO"
            width={363}
            height={100}
            className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Link>
      </div>

      {/* Center block */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-16">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(242,216,50,0.6)' }}>
          {t('404.label')}
        </p>

        {/* Giant 404 + mascot perched on top */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-[86px] sm:-top-[104px] z-10 pointer-events-none">
            <Mascot pose="idle" size={120} interactive className="drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)]" />
          </div>
          <h1
            className="font-bold leading-[0.8] tracking-[-0.04em] select-none"
            style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(120px, 26vw, 320px)', color: 'var(--on-dark)' }}
          >
            404
          </h1>
        </div>

        <h2
          className="mt-8 font-bold tracking-[-0.03em]"
          style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(24px, 3.4vw, 40px)', color: 'var(--on-dark)' }}
        >
          {t('404.title')}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed max-w-md" style={{ color: 'rgba(236,233,226,0.55)' }}>
          {t('404.sub')}
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-[#f2d832] text-[#16150f] pl-7 pr-5 py-3 text-[14px] font-semibold transition-transform duration-300 hover:scale-[1.03]"
          >
            {t('404.back')}
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#16150f] text-[#f2d832] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[14px] text-[rgba(236,233,226,0.7)] hover:text-[#f2d832] transition-colors duration-300"
          >
            {t('404.browse')}
            <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </main>
  )
}
