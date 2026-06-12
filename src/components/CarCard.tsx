import { Link } from 'react-router-dom'
import type { Car } from '../data/cars'
import { useLang } from '../i18n'
import { CarImage } from './CarImage'

function hueFor(id: string) {
  let h = 0
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360
  return h
}

export function CarCard({ car }: { car: Car }) {
  const { lang, t } = useLang()
  const energyLabel = car.energy === 'EV' ? t('ev') : car.energy === 'Hybrid' ? t('hybrid') : t('gasoline')

  return (
    <Link to={`/car/${car.id}`} className="car-card">
      <div className="car-card-media">
        <CarImage label={`${car.brand} ${car.model}`} hue={hueFor(car.id)} />
        <span className={`badge ${car.category === 'used' ? 'badge-used' : 'badge-new'}`}>
          {car.category === 'used' ? t('usedBadge') : t('newBadge')}
        </span>
      </div>
      <div className="car-card-body">
        <h3>
          {car.brand} {car.model}
        </h3>
        <p className="car-card-highlight">{car.highlight[lang]}</p>
        <div className="car-card-tags">
          <span>{car.year}</span>
          <span>{energyLabel}</span>
          <span>{car.bodyType}</span>
          {car.mileageKm != null && <span>{(car.mileageKm / 1000).toFixed(0)}k km</span>}
        </div>
        <div className="car-card-footer">
          <strong className="price">${car.price.toLocaleString()}</strong>
          <span className="view-link">{t('viewDetail')} →</span>
        </div>
      </div>
    </Link>
  )
}
