import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Site-wide social card (og:image + twitter:image). Branded dark card with the
// HELO wordmark in its display face. Inherited by every route under /app.
export const runtime = 'nodejs'
export const alt = 'HELO — Hector Lopez · Design & Development'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#1a1815'
const ACCENT = '#f2d832'
const ON_DARK = '#ece9e2'

export default async function OpengraphImage() {
  const display = await readFile(
    join(process.cwd(), 'public/fonts/singapore_sling/singaporesling.ttf'),
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: INK,
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(242,216,50,0.18), rgba(242,216,50,0))',
            display: 'flex',
          }}
        />

        {/* top row — eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 4, background: ACCENT, display: 'flex' }} />
          <div
            style={{
              fontFamily: 'Singapore Sling',
              fontSize: 30,
              letterSpacing: 8,
              color: ON_DARK,
              display: 'flex',
            }}
          >
            PORTFOLIO
          </div>
        </div>

        {/* wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Singapore Sling',
              fontSize: 300,
              lineHeight: 1,
              color: ACCENT,
              display: 'flex',
            }}
          >
            HELO
          </div>
        </div>

        {/* bottom row — name + disciplines */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div
            style={{
              fontFamily: 'Singapore Sling',
              fontSize: 46,
              color: ON_DARK,
              display: 'flex',
            }}
          >
            Hector Lopez
          </div>
          <div
            style={{
              fontFamily: 'Singapore Sling',
              fontSize: 30,
              letterSpacing: 6,
              color: 'rgba(236,233,226,0.6)',
              display: 'flex',
            }}
          >
            DESIGN &amp; DEVELOPMENT
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Singapore Sling', data: display, style: 'normal', weight: 400 }],
    },
  )
}
