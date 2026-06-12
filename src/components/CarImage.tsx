import { company } from '../data/company'

interface CarImageProps {
  label: string
  sub?: string
  /** Tint hue per image so placeholders look distinct */
  hue?: number
  className?: string
  onClick?: () => void
}

/**
 * 图片占位组件：用渐变 SVG 模拟车辆照片，并在右上角叠加
 * 公司 LOGO 文字水印（真实环境中由后台上传时自动合成）。
 */
export function CarImage({ label, sub, hue = 210, className = '', onClick }: CarImageProps) {
  return (
    <div
      className={`car-image ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 35%, 88%) 0%, hsl(${hue}, 30%, 72%) 100%)`,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <svg className="car-image-icon" viewBox="0 0 64 40" aria-hidden="true">
        <path
          d="M6 28c3-9 8-15 26-15s23 6 26 15"
          fill="none"
          stroke="rgba(15,42,67,.35)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="31" r="4.5" fill="rgba(15,42,67,.35)" />
        <circle cx="44" cy="31" r="4.5" fill="rgba(15,42,67,.35)" />
      </svg>
      <div className="car-image-label">
        <strong>{label}</strong>
        {sub && <span>{sub}</span>}
      </div>
      <span className="watermark">{company.name}</span>
    </div>
  )
}
