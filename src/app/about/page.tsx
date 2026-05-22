import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutContent from '@/components/sections/AboutContent'

export const metadata = { title: 'About — HELO' }

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
      <main style={{ background: '#080808', minHeight: '100dvh' }}>
        <AboutContent />
      </main>
      <Footer />
    </>
  )
}
