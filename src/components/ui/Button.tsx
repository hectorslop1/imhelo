import { cn } from '@/lib/utils'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: ButtonVariant
  className?: string
  external?: boolean
  onClick?: () => void
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[#f2d832] text-[#0d0d0d] hover:bg-white',
  outline:
    'border border-white/20 text-white hover:border-white/60',
  ghost:
    'text-[#888880] hover:text-white',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  external,
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full transition-colors duration-200'
  const cls = cn(base, variants[variant], className)

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    )
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
