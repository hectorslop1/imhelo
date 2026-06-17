import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutContent from '@/components/sections/AboutContent'

export const metadata = {
  title: 'About',
  description:
    'About Hector Lopez (HELO) — a designer and developer in San Diego building digital products with intention and craft.',
}

// ─── About page ───────────────────────────────────────────────────────────────
//
// Server component — preserves metadata export.
// All animated, interactive content lives in <AboutContent> (client component).
//
// Profile photo:   /public/assetshelo/ProfilePicture/IMG_5081.JPG
// Social links:    /src/components/sections/AboutContent.tsx → SOCIAL_LINKS

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ background: 'var(--surface)', minHeight: '100dvh' }}>
        <AboutContent />
      </main>
      <Footer />
    </>
  )
}
