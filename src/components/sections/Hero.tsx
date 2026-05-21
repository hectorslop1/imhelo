'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background: [
          'radial-gradient(ellipse 90% 55% at 50% 110%, rgba(242,216,50,0.06) 0%, transparent 65%)',
          'radial-gradient(ellipse 55% 45% at 8% 35%, rgba(255,255,255,0.025) 0%, transparent 55%)',
          'radial-gradient(ellipse 40% 40% at 92% 10%, rgba(255,255,255,0.015) 0%, transparent 50%)',
          '#080808',
        ].join(', '),
      }}
    >
      {/* ── Subtle grid overlay for depth ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
          opacity: 0.012,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-16 min-h-screen flex flex-col pt-24">

        {/* ── Status bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="flex items-center justify-between pt-8"
        >
          <span className="text-[11px] font-mono text-[#3a3a34] tracking-widest uppercase">
            Portfolio — 2026
          </span>
          <span className="flex items-center gap-2 text-[11px] font-mono text-[#3a3a34]">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#f2d832] inline-block"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            Available for projects
          </span>
        </motion.div>

        {/* ── Main content — fills remaining height ── */}
        <div className="flex-1 flex flex-col justify-center pb-8">

          {/* HELO — clip reveal from below */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '108%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.15, ease: EASE, delay: 0.05 }}
              className="font-extrabold text-white select-none"
              style={{
                fontSize: 'clamp(116px, 19vw, 280px)',
                lineHeight: 0.83,
                letterSpacing: '-0.06em',
                fontFamily: 'var(--font-syne)',
              }}
            >
              HELO
            </motion.h1>
          </div>

          {/* Divider — draws in from left */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="h-px bg-white/[0.08] my-8 lg:my-10"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Subtitle + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.58 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 lg:gap-16"
          >
            {/* Left — tagline */}
            <div className="space-y-1.5">
              <p
                className="font-semibold text-white/90 leading-[1.1]"
                style={{
                  fontSize: 'clamp(20px, 2.6vw, 36px)',
                  fontFamily: 'var(--font-syne)',
                  letterSpacing: '-0.03em',
                }}
              >
                Design &amp; Development
              </p>
              <p
                className="text-[#7a7a72] font-medium"
                style={{ fontSize: 'clamp(16px, 1.7vw, 22px)', letterSpacing: '-0.01em' }}
              >
                crafted into digital experiences.
              </p>
            </div>

            {/* Right — CTAs */}
            <div className="flex items-center gap-5 shrink-0">
              {/* Secondary — text link with animated arrow */}
              <Link
                href="/work"
                className="group flex items-center gap-1.5 text-[13px] font-medium text-[#7a7a72] hover:text-white transition-colors duration-300"
              >
                View Work
                <ArrowUpRight
                  size={13}
                  strokeWidth={2}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>

              {/* Primary — sharp rectangle, white slide fill */}
              <Link
                href="mailto:hello@imhelo.com"
                className="group relative overflow-hidden inline-flex items-center text-[13px] font-bold text-[#080808] bg-[#f2d832] px-6 py-3"
                style={{ borderRadius: '2px' }}
              >
                <span className="relative z-10 tracking-[-0.01em]">Say HELO</span>
                <span
                  aria-hidden
                  className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator + bottom strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="border-t border-white/[0.06] py-6 flex items-center justify-between gap-4"
        >
          {/* Left meta */}
          <span className="text-[11px] font-mono text-[#3a3a34] tracking-widest uppercase hidden sm:block">
            San Diego, CA
          </span>

          {/* Center — scroll indicator */}
          <div className="flex flex-col items-center gap-2 mx-auto sm:mx-0">
            <div
              className="w-px h-9 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-4 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(242,216,50,0.7), transparent)',
                }}
                animate={{ y: ['-100%', '350%'] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 0.9,
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-[#3a3a34] tracking-[0.3em] uppercase">
              Scroll
            </span>
          </div>

          {/* Right meta */}
          <span className="text-[11px] font-mono text-[#3a3a34] tracking-widest uppercase text-right hidden sm:block">
            hello@imhelo.com
          </span>
        </motion.div>

      </div>
    </section>
  )
}
