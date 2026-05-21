'use client'

import { motion, useReducedMotion } from 'motion/react'

// ─── iPhone UI Screen ────────────────────────────────────────────────────────

function IPhoneScreen() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d0d] overflow-hidden select-none">

      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
        <span className="text-[8px] font-semibold text-white/80 tabular-nums">9:41</span>
        <div className="flex items-center gap-1">
          {/* Signal dots */}
          {[1, 0.7, 0.4].map((o, i) => (
            <div key={i} className="w-[3px] rounded-full bg-white" style={{ height: `${6 + i * 2}px`, opacity: o }} />
          ))}
          {/* Battery */}
          <div className="ml-1 flex items-center gap-[2px]">
            <div className="w-5 h-[9px] rounded-[2px] border border-white/40 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 bg-white/70 rounded-[1px]" style={{ width: '72%' }} />
            </div>
            <div className="w-[2px] h-[5px] rounded-r-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 pb-4 flex flex-col gap-3 overflow-hidden">

        {/* Greeting row */}
        <div className="pt-2">
          <p className="text-[8px] text-white/30 font-mono tracking-widest uppercase">Dashboard</p>
          <p className="text-[13px] font-bold text-white tracking-tight mt-0.5" style={{ fontFamily: 'var(--font-syne)' }}>Good evening</p>
        </div>

        {/* Metric card */}
        <div
          className="rounded-[12px] p-3 shrink-0"
          style={{ background: 'linear-gradient(135deg, rgba(242,216,50,0.12) 0%, rgba(242,216,50,0.04) 100%)', border: '1px solid rgba(242,216,50,0.15)' }}
        >
          <p className="text-[7px] font-mono text-[#f2d832]/60 tracking-widest uppercase mb-1">Total Projects</p>
          <p className="text-[22px] font-extrabold text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-syne)' }}>48</p>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-[6px] text-[#f2d832]/70 font-mono">↑ 12% this quarter</span>
          </div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-[3px] mt-2.5 h-6">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[2px]"
                style={{
                  height: `${h}%`,
                  background: i === 9
                    ? 'rgba(242,216,50,0.8)'
                    : `rgba(242,216,50,${0.15 + i * 0.02})`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Two stat cards */}
        <div className="grid grid-cols-2 gap-2 shrink-0">
          {[
            { label: 'Design', value: '24', sub: 'projects' },
            { label: 'Dev', value: '24', sub: 'projects' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-[10px] p-2.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-[6px] font-mono text-white/30 tracking-widest uppercase">{s.label}</p>
              <p className="text-[16px] font-bold text-white leading-tight mt-0.5" style={{ fontFamily: 'var(--font-syne)' }}>{s.value}</p>
              <p className="text-[6px] text-white/25 font-mono">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Recent list */}
        <div className="flex-1 min-h-0">
          <p className="text-[7px] font-mono text-white/20 tracking-widest uppercase mb-1.5">Recent</p>
          <div className="flex flex-col gap-[5px]">
            {[
              { name: 'gigFAST NASCAR', type: 'Branding' },
              { name: 'App Showcase', type: 'Development' },
              { name: 'Interactive UI', type: 'Frontend' },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-[8px] px-2.5 py-2"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-[18px] h-[18px] rounded-[4px] bg-[#f2d832]/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f2d832]/50" />
                  </div>
                  <span className="text-[7.5px] text-white/60 font-medium truncate max-w-[80px]">{item.name}</span>
                </div>
                <span className="text-[6px] font-mono text-white/20 tracking-widest">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2 pt-1 shrink-0">
        <div className="w-16 h-[3px] rounded-full bg-white/20" />
      </div>
    </div>
  )
}

// ─── Apple Watch UI Screen ────────────────────────────────────────────────────

function WatchScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d0d0d] overflow-hidden select-none px-2">

      {/* Time */}
      <p
        className="text-[22px] font-extrabold text-white tracking-tight leading-none mb-0.5"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        9:41
      </p>
      <p className="text-[6px] font-mono text-white/30 tracking-widest uppercase mb-3">Tuesday</p>

      {/* Progress ring */}
      <div className="relative w-12 h-12 mb-2.5">
        <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
          {/* Background ring */}
          <circle
            cx="24" cy="24" r="18"
            fill="none"
            stroke="rgba(242,216,50,0.1)"
            strokeWidth="4"
          />
          {/* Progress arc */}
          <circle
            cx="24" cy="24" r="18"
            fill="none"
            stroke="#f2d832"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="113.1"
            strokeDashoffset="28.3"
            style={{ filter: 'drop-shadow(0 0 4px rgba(242,216,50,0.5))' }}
          />
        </svg>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#f2d832]/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f2d832]/60" />
          </div>
        </div>
      </div>

      {/* Complication */}
      <div className="flex items-center gap-2">
        <div className="w-px h-4 bg-white/10" />
        <div className="text-center">
          <p className="text-[7px] font-mono text-[#f2d832]/50 tracking-widest">75%</p>
          <p className="text-[5.5px] font-mono text-white/20 tracking-widest uppercase">Progress</p>
        </div>
        <div className="w-px h-4 bg-white/10" />
      </div>

    </div>
  )
}

// ─── iPhone Frame ─────────────────────────────────────────────────────────────

function IPhoneFrame({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative shrink-0"
      animate={reduced ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ zIndex: 2 }}
    >
      {/* Outer shell */}
      <div
        className="relative w-[220px] h-[476px] overflow-hidden"
        style={{
          borderRadius: '48px',
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #0f0f0f 100%)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.12)',
            '0 0 0 2px rgba(0,0,0,0.8)',
            '0 40px 80px rgba(0,0,0,0.7)',
            '0 0 60px rgba(242,216,50,0.06)',
            'inset 0 1px 0 rgba(255,255,255,0.12)',
          ].join(', '),
        }}
      >
        {/* Side buttons — left volume */}
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-8 rounded-l-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute -left-[3px] top-[144px] w-[3px] h-8 rounded-l-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        {/* Side buttons — right power */}
        <div className="absolute -right-[3px] top-[116px] w-[3px] h-12 rounded-r-full" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Inner screen bezel */}
        <div
          className="absolute inset-[8px] overflow-hidden"
          style={{ borderRadius: '40px' }}
        >
          {/* Dynamic island */}
          <div
            className="absolute top-[14px] left-1/2 -translate-x-1/2 z-10"
            style={{ width: '100px', height: '30px', borderRadius: '20px', background: '#080808' }}
          />
          {/* Actual screen content */}
          <div className="absolute inset-0">
            <IPhoneScreen />
          </div>
        </div>

        {/* Gloss overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: '48px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)',
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Apple Watch Frame ────────────────────────────────────────────────────────

function WatchFrame({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative shrink-0"
      animate={reduced ? {} : { y: [0, 8, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      style={{ zIndex: 1 }}
    >
      <div className="relative">
        {/* Band top stub */}
        <div
          className="mx-auto mb-[1px]"
          style={{ width: '64px', height: '14px', background: 'linear-gradient(to bottom, #1a1a1a, #141414)', borderRadius: '3px 3px 0 0', border: '1px solid rgba(255,255,255,0.06)', borderBottom: 'none' }}
        />

        {/* Watch body */}
        <div
          className="relative w-[100px] h-[116px] overflow-hidden"
          style={{
            borderRadius: '24px',
            background: 'linear-gradient(145deg, #222222 0%, #161616 50%, #0e0e0e 100%)',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.1)',
              '0 0 0 2px rgba(0,0,0,0.6)',
              '0 20px 50px rgba(0,0,0,0.6)',
              'inset 0 1px 0 rgba(255,255,255,0.1)',
            ].join(', '),
          }}
        >
          {/* Digital crown */}
          <div
            className="absolute -right-[5px] top-1/2"
            style={{ transform: 'translateY(-40%)', width: '5px', height: '28px', borderRadius: '3px', background: 'linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.04))' }}
          />
          {/* Side button */}
          <div
            className="absolute -right-[5px]"
            style={{ top: 'calc(50% + 18px)', width: '5px', height: '18px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)' }}
          />

          {/* Screen */}
          <div
            className="absolute inset-[5px] overflow-hidden"
            style={{ borderRadius: '20px' }}
          >
            <WatchScreen />
          </div>

          {/* Gloss */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ borderRadius: '24px', background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)' }}
          />
        </div>

        {/* Band bottom stub */}
        <div
          className="mx-auto mt-[1px]"
          style={{ width: '64px', height: '14px', background: 'linear-gradient(to top, #1a1a1a, #141414)', borderRadius: '0 0 3px 3px', border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none' }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

export default function DeviceShowcase() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="flex items-center gap-4 py-10">
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest">04</span>
          <span className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] font-mono text-[#4a4a44] tracking-widest uppercase">Device Showcase</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center pb-28">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <h2
              className="font-extrabold tracking-[-0.04em] text-white mb-6 leading-[0.92]"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontFamily: 'var(--font-syne)' }}
            >
              Work in
              <br />
              <span className="text-[#f2d832]">motion.</span>
            </h2>

            <p className="text-[14px] text-[#7a7a72] leading-relaxed max-w-sm mb-10">
              Every project lives in an interface. This showcase puts
              the work inside real device frames — app screens, dashboards,
              and visual systems rendered where they belong.
            </p>

            {/* Metadata table */}
            <div
              className="border border-white/[0.06] rounded-xl overflow-hidden mb-8"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              {[
                { label: 'Project', value: 'Mobile App Showcase' },
                { label: 'Discipline', value: 'Development / UI' },
                { label: 'Scene', value: '01 — Dashboard' },
                { label: 'Platform', value: 'iOS · watchOS' },
              ].map(({ label, value }, i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-5 py-3 ${i < arr.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
                >
                  <span className="text-[10px] font-mono text-[#4a4a44] tracking-widest uppercase">{label}</span>
                  <span className="text-[11px] font-mono text-white/50">{value}</span>
                </div>
              ))}
            </div>

            {/* Scene dots */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-[#4a4a44] tracking-widest uppercase mr-1">Scene</span>
              {['01', '02', '03'].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? '20px' : '6px',
                      height: '6px',
                      background: i === 0 ? '#f2d832' : 'rgba(255,255,255,0.1)',
                    }}
                  />
                  <span
                    className="text-[9px] font-mono tracking-widest"
                    style={{ color: i === 0 ? 'rgba(242,216,50,0.6)' : 'rgba(255,255,255,0.15)' }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: devices ── */}
          <motion.div
            className="relative flex items-center justify-center min-h-[540px]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
          >

            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 60% at 45% 55%, rgba(242,216,50,0.06) 0%, transparent 65%)',
              }}
            />

            {/* Secondary soft glow ring */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                width: '320px',
                height: '320px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -55%)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(242,216,50,0.03) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />

            {/* Floor reflection */}
            <div
              aria-hidden
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width: '260px',
                height: '60px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(242,216,50,0.04) 0%, transparent 70%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Device composition */}
            <div className="relative flex items-end gap-6 justify-center">
              <IPhoneFrame reduced={reduced} />

              {/* Apple Watch — elevated and offset */}
              <div className="mb-16 relative">
                <WatchFrame reduced={reduced} />
              </div>
            </div>

            {/* Scene label */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#f2d832] inline-block"
                animate={reduced ? {} : { opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[9px] font-mono text-[#4a4a44] tracking-widest uppercase">
                Scene 01 — Dashboard
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
