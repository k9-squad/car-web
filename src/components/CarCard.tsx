import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Car } from '../data/cars'
import { useLang } from '../i18n'
import { CarImage } from './CarImage'
import { Badge } from './ui/badge'

export function hueFor(id: string) {
  let h = 0
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360
  return h
}

export function CarBadge({ category }: { category: Car['category'] }) {
  const { t } = useLang()
  return (
    <Badge variant={category === 'used' ? 'secondary' : 'default'}>
      {category === 'used' ? t('usedBadge') : t('newBadge')}
    </Badge>
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
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        to={`/car/${car.id}`}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-lg shadow-black/20 transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.05]"
      >
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-[1.04]">
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
          <p className="min-h-10 text-sm leading-5 text-zinc-400">{car.highlight[lang]}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="muted" className="rounded-md font-medium tracking-normal">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-2">
            <strong className="text-xl font-bold text-zinc-100">${car.price.toLocaleString()}</strong>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-500 transition-colors group-hover:text-accent">
              {t('viewDetail')} <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
