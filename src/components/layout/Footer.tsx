// Minimal site-level footer — used in sub-pages
// The homepage ContactFooter section serves as the main footer there
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#888880]">
        <span style={{ fontFamily: 'var(--font-syne)' }} className="font-bold text-sm text-white">
          HELO
        </span>
        <span>© 2026 Hector Lopez. All rights reserved.</span>
        <Link
          href="mailto:hello@imhelo.com"
          className="hover:text-white transition-colors duration-200"
        >
          hello@imhelo.com
        </Link>
      </div>
    </footer>
  )
}
