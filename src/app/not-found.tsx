import type { Metadata } from 'next'
import NotFoundContent from './NotFoundContent'

export const metadata: Metadata = { title: 'Page Not Found' }

// Server component (keeps the metadata export); the visual + i18n live in the
// client NotFoundContent so the page can react to the active language.
export default function NotFound() {
  return <NotFoundContent />
}
