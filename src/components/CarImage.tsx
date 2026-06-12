import { company } from '../data/company'

interface CarImageProps {
  label: string
  sub?: string
  /** Tint hue per image so placeholders look distinct (kept desaturated) */
  hue?: number
  className?: string
  compact?: boolean
  onClick?: () => void
}

/**
 * 图片占位组件：用低饱和渐变模拟车辆照片，并在右上角叠加公司 LOGO
 * 文字水印（真实环境中由后台上传时自动合成）。
 */
export function CarImage({ label, sub, hue = 210, className = '', compact = false, onClick }: CarImageProps) {
  return (
    <div
      className={`relative flex aspect-[16/10] select-none flex-col items-center justify-center gap-1 overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 30% 20%, hsl(${hue}, 16%, 24%) 0%, hsl(${hue}, 14%, 14%) 55%, #0b0e13 100%)`,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <svg className={compact ? 'w-[45%]' : 'w-[34%] max-w-36'} viewBox="0 0 64 40" aria-hidden="true">
        <path
          d="M6 28c3-9 8-15 26-15s23 6 26 15"
          fill="none"
          stroke="rgba(143,176,206,.4)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="31" r="4.5" fill="rgba(143,176,206,.4)" />
        <circle cx="44" cy="31" r="4.5" fill="rgba(143,176,206,.4)" />
      </svg>
      {!compact && (
        <div className="px-2 text-center text-zinc-300/80">
          <strong className="block text-sm font-semibold">{label}</strong>
          {sub && <span className="text-xs text-zinc-500">{sub}</span>}
        </div>
      )}
      {compact && <span className="text-xs font-semibold text-zinc-500">{label}</span>}
      <span
        className={`pointer-events-none absolute right-2 top-2 rounded bg-black/45 font-bold tracking-widest text-white/80 ${compact ? 'px-1 py-px text-[9px]' : 'px-2 py-0.5 text-[11px]'}`}
      >
        {company.name}
      </span>
    </div>
  )
}
