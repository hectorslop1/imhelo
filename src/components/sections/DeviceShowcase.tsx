// DeviceShowcase — Polished placeholder
// Phase 2: sticky scroll-driven showcase with iPhone + Apple Watch frames

export default function DeviceShowcase() {
  return (
    <section className="border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-10">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">04</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">Device Showcase</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center pb-28">
          {/* Left: copy */}
          <div>
            <h2
              className="font-extrabold tracking-[-0.04em] text-white mb-8 leading-[0.95]"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontFamily: 'var(--font-syne)',
              }}
            >
              Work in
              <br />
              <span className="text-[#f2d832]">motion.</span>
            </h2>
            <p className="text-[14px] text-[#7a7a72] leading-relaxed max-w-xs mb-10">
              A scroll-driven interactive showcase displaying app interfaces
              across iPhone and Apple Watch — devices moving, screens changing,
              scenes evolving as you scroll.
            </p>
            <div className="inline-flex items-center gap-3 text-[11px] font-mono text-[#f2d832]/50 border border-[#f2d832]/[0.15] px-4 py-2.5 rounded-full tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2d832]/50 shrink-0" />
              PHASE 2 — COMING SOON
            </div>
          </div>

          {/* Right: device silhouettes */}
          <div className="relative flex items-center justify-center min-h-[520px] lg:min-h-[600px]">

            {/* iPhone frame */}
            <div
              className="relative w-[210px] h-[440px] rounded-[40px] flex flex-col items-center justify-start overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1.5px solid rgba(255,255,255,0.09)',
                boxShadow: '0 0 60px rgba(242,216,50,0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Dynamic island */}
              <div className="mt-5 w-[88px] h-[28px] rounded-full bg-[#080808] border border-white/[0.06] shrink-0" />

              {/* Screen */}
              <div
                className="flex-1 w-[calc(100%-16px)] mx-2 rounded-[28px] mt-2 mb-2 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.015)' }}
              >
                <div className="text-center space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#f2d832]/10 mx-auto flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#f2d832]/40" />
                  </div>
                  <p className="text-[9px] font-mono text-white/20 tracking-widest uppercase">
                    App Interface
                  </p>
                </div>
              </div>

              {/* Home indicator */}
              <div className="mb-3 w-24 h-1 rounded-full bg-white/[0.08]" />
            </div>

            {/* Apple Watch — offset to the right */}
            <div
              className="absolute right-4 lg:right-12 top-1/2 translate-y-6 w-[96px] h-[112px] rounded-[22px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                border: '1.5px solid rgba(255,255,255,0.07)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Digital crown */}
              <div className="absolute -right-[6px] top-1/2 -translate-y-3 w-[5px] h-7 rounded-full bg-white/[0.06]" />
              {/* Side button */}
              <div className="absolute -right-[6px] top-1/2 translate-y-3 w-[5px] h-4 rounded-full bg-white/[0.04]" />
              <div className="text-center">
                <div className="w-5 h-5 rounded-full bg-[#f2d832]/10 mx-auto mb-1.5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#f2d832]/30" />
                </div>
                <p className="text-[7px] font-mono text-white/15 tracking-widest">WATCH</p>
              </div>
            </div>

            {/* Ambient glow behind devices */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(242,216,50,0.04) 0%, transparent 65%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
