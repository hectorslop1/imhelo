// RevealText — animated text reveal on viewport entry
// Full implementation: use GSAP/motion SplitText or line-by-line reveal
// Placeholder: renders children as-is, ready for animation hookup
import type { ElementType } from 'react'
import { cn } from '@/lib/utils'

type RevealTextProps = {
  children: React.ReactNode
  className?: string
  as?: ElementType
}

export default function RevealText({
  children,
  className,
  as: Tag = 'div',
}: RevealTextProps) {
  return <Tag className={cn('overflow-hidden', className)}>{children}</Tag>
}
