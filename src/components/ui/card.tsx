import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-border bg-surface text-body shadow-lg shadow-black/10 dark:shadow-black/20',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

export { Card }
