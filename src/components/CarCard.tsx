import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Car } from '../data/cars'
import { useLang } from '../i18n'
import { CarImage } from './CarImage'

export function hueFor(id: string) {
  let h = 0
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360
  return h
}

export function CarBadge({ category }: { category: Car['category'] }) {
  const { t } = useLang()
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold tracking-wider ${
        category === 'used' ? 'bg-white/15 text-white backdrop-blur' : 'bg-gold text-navy'
      }`}
    >
      {category === 'used' ? t('usedBadge') : t('newBadge')}
    </span>
  )
}

export function CarCard({ car }: { car: Car }) {
  const { lang, t } = useLang()
  const energyLabel = car.energy === 'EV' ? t('ev') : car.energy === 'Hybrid' ? t('hybrid') : t('gasoline')

  const tags = [
    String(car.year),
    energyLabel,
    car.bodyType,
    ...(car.mileageKm != null ? [`${(car.mileageKm / 1000).toFixed(0)}k km`] : []),
  ]

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group h-full"
    >
      <Link
        to={`/car/${car.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg shadow-black/30 transition-colors duration-300 hover:border-gold/50 hover:bg-white/[0.07]"
      >
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-105">
            <CarImage label={`${car.brand} ${car.model}`} hue={hueFor(car.id)} />
          </div>
          <span className="absolute left-3 top-3">
            <CarBadge category={car.category} />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <h3 className="text-base font-bold text-white">
            {car.brand} {car.model}
          </h3>
          <p className="min-h-10 text-sm leading-5 text-slate-400">{car.highlight[lang]}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-2">
            <strong className="text-xl font-extrabold text-gold">${car.price.toLocaleString()}</strong>
            <span className="text-sm font-bold text-slate-400 transition-colors group-hover:text-gold">
              {t('viewDetail')} →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
