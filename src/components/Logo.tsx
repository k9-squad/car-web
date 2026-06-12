import { company } from '../data/company'

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#0f2a43" />
        <path
          d="M10 30c2-6 5-10 14-10s12 4 14 10"
          fill="none"
          stroke="#f5b942"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="17" cy="32" r="3.2" fill="#f5b942" />
        <circle cx="31" cy="32" r="3.2" fill="#f5b942" />
      </svg>
      <span className="logo-text">
        {company.name.split(' ')[0]} <em>{company.name.split(' ')[1]}</em>
      </span>
    </span>
  )
}
