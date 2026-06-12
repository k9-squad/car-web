import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Globe2, ShieldCheck, Video, Zap } from 'lucide-react'
import { newCars, usedCars } from '../data/cars'
import { company } from '../data/company'
import { useLang, type TKey } from '../i18n'
import { CarCard } from '../components/CarCard'
import { FadeIn } from '../components/FadeIn'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

const WireGlobe = lazy(() => import('../components/WireGlobe'))

const stats: { value: string; key: TKey }[] = [
  { value: '120+', key: 'statCars' },
  { value: '30+', key: 'statCountries' },
  { value: '10', key: 'statYears' },
  { value: '2600+', key: 'statClients' },
]

const features: { icon: typeof Globe2; title: TKey; desc: TKey }[] = [
  { icon: Globe2, title: 'feat1Title', desc: 'feat1Desc' },
  { icon: ShieldCheck, title: 'feat2Title', desc: 'feat2Desc' },
  { icon: Video, title: 'feat3Title', desc: 'feat3Desc' },
  { icon: Zap, title: 'feat4Title', desc: 'feat4Desc' },
]

export function Landing() {
  const { t } = useLang()
  const featured = [newCars[0], newCars[5], usedCars[4]].filter(Boolean)

  return (
    <>
      {/* ===== Hero：点线地球仪背景 ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Suspense fallback={null}>
            <WireGlobe />
          </Suspense>
          {/* 渐变遮罩保证文字可读性 */}
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/30 via-canvas/10 to-canvas" />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas/70 via-transparent to-canvas/40" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-24 pt-24 text-center sm:px-6 lg:pb-36 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="px-4 py-1.5 text-xs">
              {t('landingBadge')}
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t('landingTitle1')}
            <span className="mx-3 inline-block h-2 w-2 rounded-full bg-accent align-middle sm:mx-4" />
            <span className="text-accent">{t('landingTitle2')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-7 text-zinc-400"
          >
            {t('landingSub')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <Button asChild size="lg">
              <Link to="/new">
                {t('ctaBrowseNew')} <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/used">{t('ctaBrowseUsed')}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">{t('ctaContactUs')}</Link>
            </Button>
          </motion.div>
        </div>

        {/* 数据条 */}
        <div className="relative z-10 border-y border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <FadeIn key={s.key} delay={i * 0.08} className="text-center">
                <p className="text-3xl font-bold text-zinc-100">{s.value}</p>
                <p className="mt-1 text-sm text-zinc-500">{t(s.key)}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 品牌亮点 ===== */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('whyTitle')}</h2>
          <p className="mt-3 text-zinc-500">{t('whySub')}</p>
        </FadeIn>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1} className="h-full">
              <Card className="group h-full p-6 transition-colors hover:border-accent/40 hover:bg-white/[0.05]">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform group-hover:scale-105">
                  <f.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{t(f.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{t(f.desc)}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== 精选车型 ===== */}
      <section className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <FadeIn className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('featuredTitle')}</h2>
              <p className="mt-3 text-zinc-500">{t('featuredSub')}</p>
            </div>
            <Button asChild variant="link" className="px-0">
              <Link to="/new">
                {t('viewAllCars')} <ArrowRight />
              </Link>
            </Button>
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/[0.06] via-transparent to-accent/[0.06]" />
        <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('landingCtaTitle')}</h2>
            <p className="mx-auto mt-3 max-w-lg text-zinc-500">{t('landingCtaSub')}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="whatsapp">
                <a href={company.whatsappLink} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
