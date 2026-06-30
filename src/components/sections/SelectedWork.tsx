'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import SplitReveal from '@/components/ui/SplitReveal'
import VelocitySkew from '@/components/ui/VelocitySkew'
import { getProjects, type Project } from '@/data/projects'
import { useI18n } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as const
const NAV_EASE = 'cubic-bezier(0.16,1,0.3,1)'

// ─── Card title — per-character slide on hover (azizkhaldi.com works kinetic) ──
function CardTitle({ title, hovered }: { title: string; hovered: boolean }) {
  const chars = [...title]
  return (
    <span
      aria-label={title}
      className="relative inline-flex overflow-hidden font-extrabold"
      style={{
        fontFamily:    'var(--font-cabinet)',
        fontSize:      'clamp(24px, 2.8vw, 44px)',
        letterSpacing: '-0.02em',
        color:         'var(--accent)',
        lineHeight:    1.05,
        whiteSpace:    'nowrap',
      }}
    >
      {/* front layer — slides up and out */}
      <span aria-hidden className="flex">
        {chars.map((c, i) => (
          <span
            key={i}
            style={{
              display:    'inline-block',
              whiteSpace: 'pre',
              transform:  hovered ? 'translateY(-110%)' : 'translateY(0)',
              transition: `transform 440ms ${NAV_EASE} ${i * 18}ms`,
            }}
          >
            {c}
          </span>
        ))}
      </span>
      {/* back layer — slides up into place */}
      <span aria-hidden className="absolute inset-0 flex">
        {chars.map((c, i) => (
          <span
            key={i}
            style={{
              display:    'inline-block',
              whiteSpace: 'pre',
              transform:  hovered ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 440ms ${NAV_EASE} ${i * 18}ms`,
            }}
          >
            {c}
          </span>
        ))}
      </span>
    </span>
  )
}

// ─── Project card — 2-col grid item ─────────────────────────────────────────────
function ProjectCard({ project, index, reduced }: { project: Project; index: number; reduced: boolean }) {
  const { t } = useI18n()
  const [hovered, setHovered] = useState(false)
  const [idx, setIdx] = useState(0)
  const gallery = project.gallery?.length ? project.gallery : project.cover ? [project.cover] : []

  // Carousel: cross-fade through the gallery while hovered; reset on leave.
  useEffect(() => {
    if (reduced || !hovered || gallery.length < 2) return
    const id = setInterval(() => setIdx((i) => (i + 1) % gallery.length), 850)
    return () => clearInterval(id)
  }, [hovered, reduced, gallery.length])
  useEffect(() => { if (!hovered) setIdx(0) }, [hovered])

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 2) * 0.08 }}
    >
      <Link
        href={`/work/${project.id}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card — near-black mockup field; the project image reveals on hover (Aziz) */}
        <div className="relative overflow-hidden rounded-2xl transition-transform duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-1.5" style={{ aspectRatio: '16 / 11', background: '#100f0c' }}>
          {gallery.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 92vw, 42vw"
              className="object-cover transition-[opacity,transform] duration-700 ease-out"
              style={{ opacity: hovered && i === idx ? 0.72 : 0, transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
            />
          ))}
          {/* constant gradient veil — keeps the accent title legible over the revealed image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,9,7,0.62) 0%, rgba(10,9,7,0.20) 55%, rgba(10,9,7,0.36) 100%)' }}
          />
          {/* centred title */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            {reduced ? (
              <span
                className="font-extrabold text-center"
                style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(24px, 2.8vw, 44px)', letterSpacing: '-0.02em', color: 'var(--accent)' }}
              >
                {project.title}
              </span>
            ) : (
              <CardTitle title={project.title} hovered={hovered} />
            )}
          </div>
          {/* VIEW cue — bottom-right, fades in on hover */}
          <span
            className="absolute bottom-4 right-5 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-300"
            style={{
              color:     'var(--on-dark)',
              opacity:   hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            }}
          >
            {t('home.work.view')} →
          </span>
        </div>

        {/* Meta row — category + year below the card (Aziz layout) */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-[12px] tracking-wide" style={{ color: 'var(--ink-2)' }}>
            {project.category.split(' · ')[0]}
          </span>
          <span className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--ink-3)' }}>
            {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function SelectedWork() {
  const reduced = useReducedMotion() ?? false
  const { t, lang } = useI18n()
  const projects = getProjects(lang)

  return (
    <section data-section-theme="light" className="border-t border-[var(--line)]" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-12">
          <motion.span
            className="text-[12px] font-mono text-[#686868] tracking-widest shrink-0"
            initial={reduced ? {} : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            03
          </motion.span>
          <motion.span
            className="flex-1 h-px origin-left"
            style={{ background: 'var(--line)' }}
            initial={reduced ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          />
          <motion.span
            className="text-[12px] font-mono text-[#686868] tracking-widest uppercase shrink-0"
            initial={reduced ? {} : { opacity: 0, x: 6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          >
            {t('home.work.label')}
          </motion.span>
        </div>

        <div className="flex items-baseline justify-between mb-12">
          <SplitReveal
            key={lang}
            text={t('home.work.title')}
            as="h2"
            by="char"
            className="font-extrabold tracking-[-0.05em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontFamily: 'var(--font-cabinet)', lineHeight: 1, color: 'var(--ink)' }}
            stagger={0.03}
            duration={0.62}
          />
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-[12px] font-mono text-[#686868] hover:text-[var(--ink)] transition-colors duration-300 tracking-widest uppercase"
          >
            {t('home.work.all')}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
          </Link>
        </div>

        {/* Project cards — 2-column grid (slightly narrower → cards a touch smaller) */}
        <VelocitySkew>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pb-24 max-w-[1180px] mx-auto">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} reduced={reduced} />
            ))}
          </div>
        </VelocitySkew>

      </div>
    </section>
  )
}
