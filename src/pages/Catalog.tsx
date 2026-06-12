import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Car } from '../data/cars'
import { useLang } from '../i18n'
import { CarCard } from '../components/CarCard'
import { FadeIn } from '../components/FadeIn'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

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
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent py-14 text-center">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-3 max-w-2xl px-4 text-zinc-500">{subtitle}</p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:pb-16">
        {/*
          筛选栏：小屏用两列网格（搜索框整行、两个下拉各占一列），
          桌面端单行 flex，避免突兀换行。
        */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3">
            <div className="relative col-span-2 sm:flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="pl-10"
              />
            </div>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger className="sm:w-44" aria-label={t('allBrands')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allBrands')}</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={energy} onValueChange={setEnergy}>
              <SelectTrigger className="sm:w-36" aria-label={t('allEnergy')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allEnergy')}</SelectItem>
                <SelectItem value="EV">{t('ev')}</SelectItem>
                <SelectItem value="Hybrid">{t('hybrid')}</SelectItem>
                <SelectItem value="Gasoline">{t('gasoline')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="mt-2.5 text-right text-xs text-zinc-600 sm:mt-2">
            {filtered.length} {t('results')}
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-zinc-500">{t('noResults')}</p>
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
