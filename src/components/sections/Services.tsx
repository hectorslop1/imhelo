import { ArrowUpRight } from 'lucide-react'
import ClipReveal from '@/components/ui/ClipReveal'

const PILLARS = [
  {
    index: '01',
    title: 'Development',
    description:
      'Websites, app interfaces, interactive frontend experiences, and digital products built with care and precision.',
    tools: 'Next.js · React · TypeScript · GSAP · Motion',
  },
  {
    index: '02',
    title: 'Graphic Design',
    description:
      'Brand systems, campaign visuals, social graphics, logos, and visual assets with strong creative direction.',
    tools: 'Figma · Illustrator · Branding · Typography',
  },
]

export default function Services() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-12">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">02</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">What I Do</span>
        </div>

        {/* Pillar rows */}
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.index}
            className={`group grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr_40px] gap-6 lg:gap-12 items-start py-12 border-t border-white/[0.06] hover:bg-white/[0.015] transition-colors duration-500 -mx-6 lg:-mx-16 px-6 lg:px-16 ${
              i === PILLARS.length - 1 ? 'border-b border-white/[0.06]' : ''
            }`}
          >
            {/* Number */}
            <span
              className="text-[11px] font-mono text-[#4a4a44] pt-1 tracking-widest hidden lg:block"
            >
              {pillar.index}
            </span>

            {/* Title — wipe-up reveal */}
            <ClipReveal delay={0.05 + i * 0.08}>
              <h3
                className="font-extrabold tracking-[-0.04em] text-white group-hover:text-[#f2d832] transition-colors duration-300"
                style={{
                  fontSize: 'clamp(32px, 3.5vw, 52px)',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                {pillar.title}
              </h3>
            </ClipReveal>

            {/* Description + tools */}
            <div className="space-y-4">
              <p className="text-[14px] text-[#7a7a72] leading-relaxed max-w-xs">
                {pillar.description}
              </p>
              <p className="text-[11px] font-mono text-[#4a4a44] tracking-wide">
                {pillar.tools}
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-start justify-end pt-2">
              <div className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:bg-[#f2d832] group-hover:border-[#f2d832] transition-all duration-300">
                <ArrowUpRight size={13} className="text-[#7a7a72] group-hover:text-[#080808] transition-colors duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
