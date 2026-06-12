import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getCar } from '../data/cars'
import { company } from '../data/company'
import { useLang } from '../i18n'
import { CarImage } from '../components/CarImage'
import { CarBadge, hueFor } from '../components/CarCard'

type Tab = 'exterior' | 'interior'

export function CarDetail() {
  const { id } = useParams()
  const { lang, t } = useLang()
  const [tab, setTab] = useState<Tab>('exterior')
  const [activeIndex, setActiveIndex] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)

  const car = id ? getCar(id) : undefined
  if (!car) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6">
        <p className="text-slate-400">{t('notFound')}</p>
        <Link to="/new" className="mt-6 inline-block rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white hover:border-gold/60 hover:text-gold">
          ← {t('backToList')}
        </Link>
      </div>
    )
  }

  const count = tab === 'exterior' ? car.exteriorImages : car.interiorImages
  const photoLabel = tab === 'exterior' ? t('photoExterior') : t('photoInterior')
  const baseHue = (hueFor(car.id) + (tab === 'exterior' ? 0 : 120)) % 360
  const energyLabel = car.energy === 'EV' ? t('ev') : car.energy === 'Hybrid' ? t('hybrid') : t('gasoline')

  const inquiryText = encodeURIComponent(
    `Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} (ID: ${car.id}). Please send me more details.`,
  )

  const specs: [string, string][] = [
    [t('brand'), car.brand],
    [t('model'), car.model],
    [t('year'), String(car.year)],
    [t('price'), `$${car.price.toLocaleString()} USD`],
    [t('energy'), energyLabel],
    [t('bodyType'), car.bodyType],
    [t('seats'), String(car.seats)],
    [t('transmission'), car.transmission],
    [t('rangeOrFuel'), car.range ?? '-'],
    [t('power'), car.power],
    [t('drivetrain'), car.drivetrain],
    [t('color'), car.color],
  ]
  if (car.mileageKm != null) specs.push([t('mileage'), `${car.mileageKm.toLocaleString()} km`])
  if (car.condition) specs.push([t('condition'), car.condition])

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Link
        to={car.category === 'used' ? '/used' : '/new'}
        className="mb-6 inline-block text-sm font-semibold text-slate-400 transition-colors hover:text-gold"
      >
        ← {t('backToList')}
      </Link>

      <div className="grid items-start gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
        {/* 图集 */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${activeIndex}`}
              initial={{ opacity: 0.4, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <CarImage
                label={`${car.brand} ${car.model}`}
                sub={`${photoLabel} ${activeIndex + 1}/${count}`}
                hue={(baseHue + activeIndex * 25) % 360}
                className="rounded-2xl border border-white/10 shadow-xl shadow-black/40"
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex gap-2">
            {(['exterior', 'interior'] as Tab[]).map((tb) => (
              <button
                key={tb}
                onClick={() => { setTab(tb); setActiveIndex(0) }}
                className={`flex-1 rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                  tab === tb
                    ? 'border-gold bg-gold text-navy'
                    : 'border-white/15 bg-white/[0.04] text-slate-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {tb === 'exterior' ? t('exterior') : t('interior')}
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {Array.from({ length: count }, (_, i) => (
              <div
                key={`${tab}-${i}`}
                className={`overflow-hidden rounded-xl border-2 transition-colors ${
                  i === activeIndex ? 'border-gold' : 'border-transparent hover:border-white/30'
                }`}
              >
                <CarImage
                  label={`${i + 1}`}
                  hue={(baseHue + i * 25) % 360}
                  compact
                  onClick={() => setActiveIndex(i)}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-600">{t('watermarkNote')}</p>
        </div>

        {/* 信息 */}
        <div>
          <h1 className="flex flex-wrap items-center gap-3 text-2xl font-extrabold text-white sm:text-3xl">
            {car.brand} {car.model}
            <CarBadge category={car.category} />
          </h1>
          <p className="mt-2 text-slate-400">{car.highlight[lang]}</p>
          <p className="mt-4 text-4xl font-black text-gold">
            ${car.price.toLocaleString()}
            <small className="ml-2 text-sm font-semibold text-slate-500">USD · FOB</small>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`${company.whatsappLink}?text=${inquiryText}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl bg-[#25d366] px-6 py-3.5 text-center text-sm font-extrabold text-white shadow-lg shadow-[#25d366]/25 transition hover:-translate-y-0.5 hover:brightness-110 sm:flex-none"
            >
              {t('inquireWhatsApp')}
            </a>
            <a
              href={`mailto:${company.email}?subject=${encodeURIComponent(`Inquiry: ${car.year} ${car.brand} ${car.model}`)}&body=${inquiryText}`}
              className="flex-1 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-center text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold sm:flex-none"
            >
              {t('inquireEmail')}
            </a>
          </div>

          <h2 className="mt-8 text-lg font-bold text-white">{t('specs')}</h2>
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-white/10">
                {specs.map(([k, v]) => (
                  <tr key={k} className="bg-white/[0.03] even:bg-white/[0.06]">
                    <th className="w-2/5 px-4 py-2.5 text-left font-semibold text-slate-400">{k}</th>
                    <td className="px-4 py-2.5 text-white">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 视频 */}
      {car.hasVideo && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-white">{t('video')}</h2>
          <div
            onClick={() => setVideoPlaying(!videoPlaying)}
            className="relative mt-4 flex aspect-video max-w-4xl cursor-pointer select-none flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-soft to-navy/50 text-slate-300 shadow-xl shadow-black/40"
          >
            {videoPlaying ? (
              <div className="flex items-center gap-3 text-sm font-semibold">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                {car.brand} {car.model} — demo video playing…
              </div>
            ) : (
              <>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gold pl-1 text-2xl text-navy shadow-lg shadow-gold/30"
                  aria-hidden="true"
                >
                  ▶
                </motion.span>
                <span className="text-sm">{t('videoPlaceholder')}</span>
              </>
            )}
            <span className="pointer-events-none absolute right-3 top-3 rounded bg-black/45 px-2 py-0.5 text-[11px] font-extrabold tracking-widest text-white/85">
              {company.name}
            </span>
          </div>
        </section>
      )}
    </div>
  )
}
