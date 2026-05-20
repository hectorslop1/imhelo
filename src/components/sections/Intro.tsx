import SectionLabel from '@/components/ui/SectionLabel'

export default function Intro() {
  return (
    <section className="py-32 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>About HELO</SectionLabel>
        <h2
          className="font-bold leading-[1.05] tracking-tighter max-w-4xl"
          style={{
            fontSize: 'clamp(28px, 4.5vw, 60px)',
            fontFamily: 'var(--font-syne)',
          }}
        >
          I blend visual design and frontend development to create work that
          feels{' '}
          <span className="text-[#888880]">sharp, useful, and memorable.</span>
        </h2>
      </div>
    </section>
  )
}
