import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-white/10 bg-white/[0.03] text-zinc-200 shadow-lg shadow-black/20',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

export { Card }
