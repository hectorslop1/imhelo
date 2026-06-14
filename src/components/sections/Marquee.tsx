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
      className="border-t border-[var(--line)] overflow-hidden select-none py-16"
      style={{ background: 'var(--surface)' }}
    >
      <div className="relative">

        {/* Left fade — text emerges from the light field */}
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #e9e7e1 0%, transparent 100%)' }}
        />

        {/* Right fade — text dissolves back into the light field */}
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #e9e7e1 0%, transparent 100%)' }}
        />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {track.map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap shrink-0 font-extrabold tracking-[-0.02em]"
              style={{
                fontFamily: 'var(--font-cabinet)',
                fontSize: 'clamp(40px, 7vw, 104px)',
                color: 'rgba(22,21,15,0.82)',
              }}
            >
              {item}
              {/* ' ✦ ' — space + diamond + space as one string: no JSX whitespace ambiguity */}
              <span style={{ color: 'var(--accent-deep)' }}>{' ✦ '}</span>
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
