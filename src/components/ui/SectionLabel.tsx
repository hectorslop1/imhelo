import { cn } from '@/lib/utils'

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'text-[11px] font-mono tracking-[0.25em] text-[#f2d832]/60 uppercase mb-6',
        className
      )}
    >
      {children}
    </p>
  )
}
