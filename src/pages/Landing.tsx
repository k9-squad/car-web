import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { newCars, usedCars } from '../data/cars'
import { company } from '../data/company'
import { useLang, type TKey } from '../i18n'
import { CarCard } from '../components/CarCard'
import { FadeIn } from '../components/FadeIn'

const Hero3D = lazy(() => import('../components/Hero3D'))

const stats: { value: string; key: TKey }[] = [
  { value: '120+', key: 'statCars' },
  { value: '30+', key: 'statCountries' },
  { value: '10', key: 'statYears' },
  { value: '2600+', key: 'statClients' },
]

const features: { icon: string; title: TKey; desc: TKey }[] = [
  { icon: 'M2 12h3l2.5-6h9L19 12h3M5 12v7m14-7v7M2 19h20', title: 'feat1Title', desc: 'feat1Desc' },
  { icon: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4zM8.5 12l2.5 2.5 4.5-4.5', title: 'feat2Title', desc: 'feat2Desc' },
  { icon: 'M15 10l5-3v10l-5-3M3 6h12v12H3z', title: 'feat3Title', desc: 'feat3Desc' },
  { icon: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z', title: 'feat4Title', desc: 'feat4Desc' },
]

export function Landing() {
  const { t } = useLang()
  const featured = [newCars[0], newCars[5], usedCars[4]].filter(Boolean)

  return (
    <>
      {/* ===== Hero：3D 展车 ===== */}
      <section className="relative overflow-hidden">
        {/* 背景光晕 */}
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:pb-16 lg:pt-20">
          <div className="relative z-10 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold tracking-wide text-gold"
            >
              {t('landingBadge')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {t('landingTitle1')}
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text text-transparent">
                {t('landingTitle2')}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 lg:mx-0"
            >
              {t('landingSub')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <Link
                to="/new"
                className="rounded-xl bg-gold px-7 py-3.5 text-sm font-extrabold text-navy shadow-lg shadow-gold/25 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                {t('ctaBrowseNew')}
              </Link>
              <Link
                to="/used"
                className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
              >
                {t('ctaBrowseUsed')}
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
              >
                {t('ctaContactUs')}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative h-[320px] sm:h-[400px] lg:h-[480px]"
          >
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Loading 3D…
                </div>
              }
            >
              <Hero3D />
            </Suspense>
          </motion.div>
        </div>

        {/* 数据条 */}
        <div className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <FadeIn key={s.key} delay={i * 0.08} className="text-center">
                <p className="text-3xl font-black text-gold">{s.value}</p>
                <p className="mt-1 text-sm text-slate-400">{t(s.key)}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 品牌亮点 ===== */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('whyTitle')}</h2>
          <p className="mt-3 text-slate-400">{t('whySub')}</p>
        </FadeIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-gold/50 hover:bg-white/[0.07]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{t(f.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{t(f.desc)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== 精选车型 ===== */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <FadeIn className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('featuredTitle')}</h2>
              <p className="mt-3 text-slate-400">{t('featuredSub')}</p>
            </div>
            <Link to="/new" className="text-sm font-bold text-gold hover:underline">
              {t('viewAllCars')} →
            </Link>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((car, i) => (
              <FadeIn key={car.id} delay={i * 0.1}>
                <CarCard car={car} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 底部 CTA ===== */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10" />
        <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('landingCtaTitle')}</h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-400">{t('landingCtaSub')}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={company.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-[#25d366] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#25d366]/30 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${company.email}`}
                className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
              >
                {company.email}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
