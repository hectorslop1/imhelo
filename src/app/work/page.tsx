'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { projects } from '@/data/projects'

const EASE = [0.16, 1, 0.3, 1] as const

export default function WorkPage() {
  const reduced = useReducedMotion() ?? false
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <>
      <Header />
      <main style={{ background: '#080808', minHeight: '100dvh' }}>

        {/* ── Header strip ── */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-0">
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <p
              className="font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
              style={{ color: 'rgba(242,216,50,0.6)' }}
            >
              Selected Work
            </p>
            <h1
              className="font-extrabold tracking-[-0.05em] text-white"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(48px, 7vw, 100px)',
                lineHeight: 0.92,
              }}
            >
              Projects
            </h1>
          </motion.div>
        </div>

        {/* ── Project list ── */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mt-20">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.07 }}
            >
              <Link
                href={`/work/${project.id}`}
                className="group block border-t border-white/[0.06]"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="flex items-center gap-5 lg:gap-10 py-8 lg:py-10 transition-transform duration-300 ease-out"
                  style={{ transform: hovered === i ? 'translateX(8px)' : 'translateX(0)' }}
                >
                  {/* Index */}
                  <span
                    className="font-mono text-[12px] tracking-widest shrink-0 w-7 transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(242,216,50,0.7)' : 'rgba(255,255,255,0.28)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <h2
                      className="font-extrabold tracking-[-0.04em] leading-tight transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(20px, 2.6vw, 36px)',
                        fontFamily: 'var(--font-syne)',
                        color: hovered === i ? '#ffffff' : 'rgba(255,255,255,0.78)',
                      }}
                    >
                      <span className="relative">
                        {project.title}
                        <span
                          className="absolute left-0 -bottom-0.5 h-px bg-white transition-all duration-400 ease-out"
                          style={{ width: hovered === i ? '100%' : '0%' }}
                        />
                      </span>
                    </h2>
                  </div>

                  {/* Category */}
                  <span
                    className="hidden lg:block font-mono text-[12px] tracking-wide shrink-0 w-60 transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.24)' }}
                  >
                    {project.category}
                  </span>

                  {/* Year */}
                  <span
                    className="hidden md:block font-mono text-[12px] tracking-widest shrink-0 transition-colors duration-300"
                    style={{ color: hovered === i ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.24)' }}
                  >
                    {project.year}
                  </span>

                  {/* Cover thumbnail — always visible on md+, project-index feel */}
                  <div
                    className="hidden md:block shrink-0 relative overflow-hidden rounded-md transition-opacity duration-300"
                    style={{
                      width:   96,
                      height:  60,
                      background: '#0a0a0a',
                      opacity: hovered === i ? 1 : 0.55,
                    }}
                  >
                    {project.cover ? (
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      /* Subtle placeholder for projects without a cover */
                      <div
                        className="w-full h-full"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      />
                    )}
                  </div>

                  {/* Arrow */}
                  <span
                    className="shrink-0 text-[18px] transition-all duration-300"
                    style={{
                      color: hovered === i ? '#f2d832' : 'rgba(255,255,255,0.18)',
                      transform: hovered === i ? 'translate(2px, -2px)' : 'translate(0,0)',
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Closing rule */}
          <div className="border-t border-white/[0.06]" />
        </div>

        {/* ── Bottom spacing ── */}
        <div className="pb-40" />
      </main>
      <Footer />
    </>
  )
}
