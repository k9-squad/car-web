import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-fg',
        /* secondary 用于图片之上，固定浅色玻璃效果，不随主题变化 */
        secondary: 'bg-white/20 text-white backdrop-blur',
        outline: 'border border-accent/40 bg-accent/10 text-accent',
        muted: 'border border-border bg-surface text-muted',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
