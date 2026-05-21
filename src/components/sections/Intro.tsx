export default function Intro() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-28 lg:py-40">

        {/* Index + label row */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">01</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">About</span>
        </div>

        {/* Statement */}
        <h2
          className="font-extrabold leading-[1.0] tracking-[-0.04em] text-white max-w-5xl"
          style={{
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            fontFamily: 'var(--font-syne)',
          }}
        >
          I blend visual design and frontend
          development to create work that feels{' '}
          <em className="not-italic text-[#7a7a72]">
            sharp, useful,
          </em>{' '}
          <span className="text-[#f2d832]">and memorable.</span>
        </h2>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-[13px] text-[#7a7a72] leading-relaxed max-w-sm">
            Hector Lopez — designer and developer based in San Diego, CA.
            Building digital products with intention and craft.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">
            <span>Development</span>
            <span className="text-[#f2d832]">✦</span>
            <span>Graphic Design</span>
          </div>
        </div>
      </div>
    </section>
  )
}
