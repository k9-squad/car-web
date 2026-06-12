import { company } from '../data/company'

export function Logo({ size = 34 }: { size?: number }) {
  const [first, second] = company.name.split(' ')
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#1a2330" />
        <path
          d="M10 30c2-6 5-10 14-10s12 4 14 10"
          fill="none"
          stroke="#8fb0ce"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="17" cy="32" r="3.2" fill="#8fb0ce" />
        <circle cx="31" cy="32" r="3.2" fill="#8fb0ce" />
      </svg>
      <span className="whitespace-nowrap text-lg font-bold tracking-wide text-white">
        {first} <em className="not-italic font-light text-accent">{second}</em>
      </span>
    </span>
  )
}
