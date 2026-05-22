// Minimal site-level footer — used in sub-pages
// The homepage ContactFooter section serves as the main footer there
//
// Social links are managed in the SOCIAL_LINKS array below.
import Link from 'next/link'

const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/hector-lopez-6243a8305/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ofmynameishelo/' },
  { label: 'Behance',   href: 'https://www.behance.net/hectorlopez85' },
  { label: 'Dribbble',  href: 'https://dribbble.com/hectorslop' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* Main info row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#888880]">
          <span style={{ fontFamily: 'var(--font-syne)' }} className="font-bold text-sm text-white">
            HELO
          </span>
          <span aria-hidden className="hidden sm:block opacity-20 select-none">·</span>
          <span>© 2026 Hector Lopez. All rights reserved.</span>
          <span aria-hidden className="hidden sm:block opacity-20 select-none">·</span>
          <Link
            href="mailto:hello@imhelo.com"
            className="hover:text-white transition-colors duration-200"
          >
            hello@imhelo.com
          </Link>
        </div>

        {/* Social links row */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-5">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[11px] font-mono text-[#4a4a44] hover:text-white transition-colors duration-300 tracking-wide"
            >
              {label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  )
}
