import { useMemo, useState } from 'react'
import type { Car } from '../data/cars'
import { useLang } from '../i18n'
import { CarCard } from '../components/CarCard'
import { FadeIn } from '../components/FadeIn'

interface CatalogProps {
  cars: Car[]
  title: string
  subtitle: string
}

const inputClass =
  'rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/30 [&>option]:bg-ink-soft'

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
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-navy/60 to-transparent py-14 text-center">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <FadeIn>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-3 max-w-2xl px-4 text-slate-400">{subtitle}</p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:pb-16">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={`min-w-40 flex-1 ${inputClass}`}
          />
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClass}>
            <option value="all">{t('allBrands')}</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select value={energy} onChange={(e) => setEnergy(e.target.value)} className={inputClass}>
            <option value="all">{t('allEnergy')}</option>
            <option value="EV">{t('ev')}</option>
            <option value="Hybrid">{t('hybrid')}</option>
            <option value="Gasoline">{t('gasoline')}</option>
          </select>
          <span className="ml-auto whitespace-nowrap text-sm text-slate-500">
            {filtered.length} {t('results')}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-slate-500">{t('noResults')}</p>
        ) : (
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car, i) => (
              <FadeIn key={car.id} delay={Math.min(i, 5) * 0.06}>
                <CarCard car={car} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
