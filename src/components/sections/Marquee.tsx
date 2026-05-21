// Each item renders with ' ✦ ' (space · diamond · space) as a single string literal
// inside a styled span — the spaces are real U+0020 characters baked into the string,
// not JSX whitespace between expressions which can collapse unexpectedly.
const ITEMS = [
  'Designed by HELO',
  'Developed by HELO',
  'Visual Systems',
  'App Interfaces',
  'Digital Experiences',
  'Graphic Design',
  'Frontend Development',
]

// Four copies → translateX(-50%) scrolls exactly two full repetitions; perfectly seamless.
const track = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <section
      aria-hidden
      className="border-t border-white/[0.06] overflow-hidden select-none py-12"
    >
      <div className="relative">

        {/* Left fade — text emerges from the dark */}
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #080808 0%, transparent 100%)' }}
        />

        {/* Right fade — text dissolves back into the dark */}
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #080808 0%, transparent 100%)' }}
        />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {track.map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap shrink-0 font-extrabold tracking-[-0.02em]"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(26px, 3.6vw, 48px)',
                color: 'rgba(255,255,255,0.1)',
              }}
            >
              {item}
              {/* ' ✦ ' — space + diamond + space as one string: no JSX whitespace ambiguity */}
              <span style={{ color: 'rgba(242,216,50,0.6)' }}>{' ✦ '}</span>
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
