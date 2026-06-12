import type { ReactNode } from 'react'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { company } from '../data/company'
import { useLang } from '../i18n'
import { FadeIn } from '../components/FadeIn'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

function ContactCard({ icon, title, value, desc, action, delay }: {
  icon: ReactNode
  title: string
  value: string
  desc: ReactNode
  action: ReactNode
  delay: number
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <Card className="flex h-full flex-col items-center gap-2 p-7 text-center transition-colors hover:border-accent/40">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
          {icon}
        </div>
        <h2 className="mt-2 text-lg font-bold text-foreground">{title}</h2>
        <p className="break-all font-semibold text-accent">{value}</p>
        <p className="mb-4 text-sm leading-6 text-muted">{desc}</p>
        <div className="mt-auto">{action}</div>
      </Card>
    </FadeIn>
  )
}

export function Contact() {
  const { lang, t } = useLang()

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-2/70 to-transparent py-14 text-center">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('contactTitle')}</h1>
          <p className="mx-auto mt-3 max-w-2xl px-4 text-muted">{t('contactSub')}</p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <ContactCard
            delay={0}
            icon={<MessageCircle className="h-6 w-6" strokeWidth={1.8} />}
            title={t('whatsappCard')}
            value={company.whatsapp}
            desc={t('whatsappDesc')}
            action={
              <Button asChild variant="whatsapp">
                <a href={company.whatsappLink} target="_blank" rel="noreferrer">
                  {t('chatNow')}
                </a>
              </Button>
            }
          />

          <ContactCard
            delay={0.1}
            icon={<Mail className="h-6 w-6" strokeWidth={1.8} />}
            title={t('emailCard')}
            value={company.email}
            desc={t('emailDesc')}
            action={
              <Button asChild variant="secondary">
                <a href={`mailto:${company.email}`}>{t('sendEmail')}</a>
              </Button>
            }
          />

          <ContactCard
            delay={0.2}
            icon={<MapPin className="h-6 w-6" strokeWidth={1.8} />}
            title={t('companyCard')}
            value={company.name}
            desc={
              <>
                {t('address')}: {company.address[lang]}
                <br />
                {t('workingHours')}: {company.workingHours[lang]}
              </>
            }
            action={
              <div className="flex gap-5">
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-body underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
                >
                  Facebook
                </a>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-body underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
                >
                  Instagram
                </a>
              </div>
            }
          />
        </div>

        <FadeIn delay={0.15} className="mt-14 text-center">
          <div
            aria-label="QR code placeholder"
            className="mx-auto flex h-36 w-36 items-center justify-center rounded-xl border-2 border-dashed border-border bg-[repeating-linear-gradient(0deg,var(--surface-2)_0_10px,transparent_10px_20px),repeating-linear-gradient(90deg,var(--surface-2)_0_10px,transparent_10px_20px)] text-2xl font-bold text-accent"
          >
            QR
          </div>
          <p className="mt-3 text-sm text-muted">{t('qrTip')}</p>
        </FadeIn>
      </section>
    </>
  )
}
