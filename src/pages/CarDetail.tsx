import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Mail, Play } from 'lucide-react'
import { getCar } from '../data/cars'
import { company } from '../data/company'
import { useLang } from '../i18n'
import { CarImage } from '../components/CarImage'
import { CarBadge, hueFor } from '../components/CarCard'
import { Button } from '../components/ui/button'

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
        <p className="text-zinc-400">{t('notFound')}</p>
        <Button asChild variant="secondary" className="mt-6">
          <Link to="/new">
            <ArrowLeft /> {t('backToList')}
          </Link>
        </Button>
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
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> {t('backToList')}
      </Link>

      <div className="grid items-start gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
        {/* 图集 */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${activeIndex}`}
              initial={{ opacity: 0.4, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22 }}
            >
              <CarImage
                label={`${car.brand} ${car.model}`}
                sub={`${photoLabel} ${activeIndex + 1}/${count}`}
                hue={(baseHue + activeIndex * 25) % 360}
                className="rounded-xl border border-white/10 shadow-xl shadow-black/30"
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {(['exterior', 'interior'] as Tab[]).map((tb) => (
              <Button
                key={tb}
                variant={tab === tb ? 'default' : 'secondary'}
                onClick={() => { setTab(tb); setActiveIndex(0) }}
              >
                {tb === 'exterior' ? t('exterior') : t('interior')}
              </Button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {Array.from({ length: count }, (_, i) => (
              <div
                key={`${tab}-${i}`}
                className={`overflow-hidden rounded-lg border-2 transition-colors ${
                  i === activeIndex ? 'border-accent' : 'border-transparent hover:border-white/25'
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
          <p className="mt-3 text-xs text-zinc-600">{t('watermarkNote')}</p>
        </div>

        {/* 信息 */}
        <div>
          <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {car.brand} {car.model}
            <CarBadge category={car.category} />
          </h1>
          <p className="mt-2 text-zinc-400">{car.highlight[lang]}</p>
          <p className="mt-4 text-4xl font-bold text-zinc-100">
            ${car.price.toLocaleString()}
            <small className="ml-2 text-sm font-medium text-zinc-500">USD · FOB</small>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="whatsapp" className="flex-1 sm:flex-none">
              <a href={`${company.whatsappLink}?text=${inquiryText}`} target="_blank" rel="noreferrer">
                {t('inquireWhatsApp')}
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="flex-1 sm:flex-none">
              <a
                href={`mailto:${company.email}?subject=${encodeURIComponent(`Inquiry: ${car.year} ${car.brand} ${car.model}`)}&body=${inquiryText}`}
              >
                <Mail /> {t('inquireEmail')}
              </a>
            </Button>
          </div>

          <h2 className="mt-8 text-lg font-bold text-white">{t('specs')}</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-white/[0.07]">
                {specs.map(([k, v]) => (
                  <tr key={k} className="bg-white/[0.02] even:bg-white/[0.045]">
                    <th className="w-2/5 px-4 py-2.5 text-left font-medium text-zinc-500">{k}</th>
                    <td className="px-4 py-2.5 text-zinc-100">{v}</td>
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
            className="relative mt-4 flex aspect-video max-w-4xl cursor-pointer select-none flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-panel to-[#141d29] text-zinc-300 shadow-xl shadow-black/30"
          >
            {videoPlaying ? (
              <div className="flex items-center gap-3 text-sm font-semibold">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-400" />
                {car.brand} {car.model} — demo video playing…
              </div>
            ) : (
              <>
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 shadow-lg shadow-black/40"
                  aria-hidden="true"
                >
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </motion.span>
                <span className="text-sm">{t('videoPlaceholder')}</span>
              </>
            )}
            <span className="pointer-events-none absolute right-3 top-3 rounded bg-black/45 px-2 py-0.5 text-[11px] font-bold tracking-widest text-white/80">
              {company.name}
            </span>
          </div>
        </section>
      )}
    </div>
  )
}
