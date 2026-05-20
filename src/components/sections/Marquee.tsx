const ITEMS = [
  'Designed by HELO',
  '✦',
  'Developed by HELO',
  '✦',
  'Visual Systems',
  '✦',
  'App Interfaces',
  '✦',
  'Digital Experiences',
  '✦',
  'Graphic Design',
  '✦',
  'Frontend Development',
  '✦',
]

export default function Marquee() {
  // Duplicate for seamless loop
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <section
      aria-hidden
      className="py-16 border-t border-white/[0.06] overflow-hidden select-none"
    >
      <div className="flex">
        {/* First pass */}
        <div className="flex shrink-0 items-center gap-10 pr-10 animate-marquee">
          {repeated.map((item, i) => (
            <span
              key={i}
              className={`whitespace-nowrap font-bold tracking-tighter ${
                item === '✦'
                  ? 'text-[#f2d832] text-2xl'
                  : 'text-white/15 text-[clamp(24px,3.5vw,44px)]'
              }`}
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {item}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless join */}
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-10 pr-10 animate-marquee"
        >
          {repeated.map((item, i) => (
            <span
              key={i}
              className={`whitespace-nowrap font-bold tracking-tighter ${
                item === '✦'
                  ? 'text-[#f2d832] text-2xl'
                  : 'text-white/15 text-[clamp(24px,3.5vw,44px)]'
              }`}
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
