import { useMemo, useState } from 'react'
import type { Car } from '../data/cars'
import { useLang } from '../i18n'
import { CarCard } from '../components/CarCard'

interface CatalogProps {
  cars: Car[]
  title: string
  subtitle: string
}

export function Catalog({ cars, title, subtitle }: CatalogProps) {
  const { t } = useLang()
  const [keyword, setKeyword] = useState('')
  const [brand, setBrand] = useState('all')
  const [energy, setEnergy] = useState('all')

  const brands = useMemo(() => [...new Set(cars.map((c) => c.brand))].sort(), [cars])

  const filtered = cars.filter((c) => {
    const kw = keyword.trim().toLowerCase()
    if (kw && !`${c.brand} ${c.model}`.toLowerCase().includes(kw)) return false
    if (brand !== 'all' && c.brand !== brand) return false
    if (energy !== 'all' && c.energy !== energy) return false
    return true
  })

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      <section className="container catalog-section">
        <div className="filter-bar">
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={t('searchPlaceholder')}
          />
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="all">{t('allBrands')}</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select value={energy} onChange={(e) => setEnergy(e.target.value)}>
            <option value="all">{t('allEnergy')}</option>
            <option value="EV">{t('ev')}</option>
            <option value="Hybrid">{t('hybrid')}</option>
            <option value="Gasoline">{t('gasoline')}</option>
          </select>
          <span className="result-count">
            {filtered.length} {t('results')}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="no-results">{t('noResults')}</p>
        ) : (
          <div className="car-grid">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
