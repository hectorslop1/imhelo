import SectionLabel from '@/components/ui/SectionLabel'

// ─────────────────────────────────────────────────────────────
// DeviceShowcase — PLACEHOLDER
// Advanced implementation: sticky scroll-driven showcase with
// iPhone + Apple Watch SVG frames, scroll-progress scene changes,
// and final zoom transition. Scheduled for Phase 2.
// ─────────────────────────────────────────────────────────────

export default function DeviceShowcase() {
  return (
    <section className="py-32 px-6 lg:px-12 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <SectionLabel>Device Showcase</SectionLabel>
            <h2
              className="font-bold tracking-tighter text-white mb-6"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontFamily: 'var(--font-syne)',
              }}
            >
              Work in
              <br />
              motion.
            </h2>
            <p className="text-sm text-[#888880] max-w-sm leading-relaxed mb-8">
              A scroll-driven interactive showcase displaying app interfaces
              across iPhone and Apple Watch frames. Watch the devices come alive
              as you scroll through each scene.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#f2d832]/60 border border-[#f2d832]/20 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2d832]/40" />
              Interactive showcase — coming in Phase 2
            </div>
          </div>

          {/* Right: device silhouettes */}
          <div className="relative flex items-center justify-center min-h-[520px]">
            {/* iPhone frame */}
            <div className="relative w-[220px] h-[460px] rounded-[44px] border-2 border-white/[0.1] bg-white/[0.02] flex flex-col items-center justify-center shadow-[0_0_80px_rgba(242,216,50,0.04)]">
              {/* Dynamic island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black border border-white/[0.08]" />
              {/* Screen area */}
              <div className="w-[calc(100%-24px)] h-[calc(100%-80px)] rounded-[36px] bg-white/[0.02] flex items-center justify-center mt-6 border border-white/[0.04]">
                <p className="text-[10px] text-[#888880]/30 font-mono text-center leading-relaxed">
                  App interface
                  <br />
                  scene 01
                </p>
              </div>
              {/* Home indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/[0.1]" />
            </div>

            {/* Apple Watch frame */}
            <div className="absolute right-8 top-1/2 translate-y-8 w-[100px] h-[116px] rounded-[24px] border border-white/[0.08] bg-white/[0.015] flex items-center justify-center">
              {/* Crown */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full bg-white/[0.06]" />
              <p className="text-[8px] text-[#888880]/25 font-mono text-center leading-relaxed">
                Watch
                <br />
                scene 01
              </p>
            </div>

            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[#f2d832]/[0.015] blur-3xl rounded-full pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
