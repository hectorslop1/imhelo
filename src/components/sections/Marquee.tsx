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

// Quadruple for long seamless loop without gap
const track = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <section
      aria-hidden
      className="border-t border-white/[0.06] overflow-hidden select-none py-12"
    >
      <div className="flex animate-marquee">
        {track.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap shrink-0 font-extrabold tracking-[-0.04em]"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: item === '✦' ? '#f2d832' : 'rgba(255,255,255,0.08)',
              marginRight: item === '✦' ? '2.5rem' : '2rem',
              marginLeft: item === '✦' ? '2.5rem' : '0',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
