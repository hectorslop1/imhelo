import SectionLabel from '@/components/ui/SectionLabel'

const PILLARS = [
  {
    number: '01',
    title: 'Development',
    description:
      'Websites, app interfaces, interactive frontend experiences, and digital products built with care.',
    tags: ['Next.js', 'React', 'TypeScript', 'Motion', 'GSAP'],
  },
  {
    number: '02',
    title: 'Graphic Design',
    description:
      'Brand systems, campaign visuals, social graphics, logos, and visual assets with strong creative direction.',
    tags: ['Figma', 'Illustrator', 'Branding', 'Typography', 'Art Direction'],
  },
]

export default function Services() {
  return (
    <section className="py-16 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>What I Do</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06]">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-[#0d0d0d] p-12 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="text-xs font-mono text-[#888880] pt-1">
                  {pillar.number}
                </span>
                <h3
                  className="font-bold text-2xl text-white group-hover:text-[#f2d832] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {pillar.title}
                </h3>
              </div>
              <p className="text-sm text-[#888880] leading-relaxed mb-8 max-w-xs">
                {pillar.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-white/[0.08] text-[#888880]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
