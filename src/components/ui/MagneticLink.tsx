'use client'

// MagneticLink — cursor-magnetic hover interaction
// Full implementation: track mouse offset and apply CSS transforms
// Placeholder: renders as a standard link with clean hover state
import { cn } from '@/lib/utils'
import Link from 'next/link'

type MagneticLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

export default function MagneticLink({
  href,
  children,
  className,
  external,
}: MagneticLinkProps) {
  return (
    <Link
      href={href}
      className={cn('transition-colors duration-200', className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Link>
  )
}
