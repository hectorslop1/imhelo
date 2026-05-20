import { cn } from '@/lib/utils'

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'text-xs font-medium tracking-[0.2em] text-[#f2d832] uppercase mb-6',
        className
      )}
    >
      {children}
    </p>
  )
}
