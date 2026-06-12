import type { ReactNode } from 'react'
import { company } from '../data/company'
import { useLang } from '../i18n'
import { FadeIn } from '../components/FadeIn'

function ContactCard({ icon, iconClass, title, value, desc, action, delay }: {
  icon: ReactNode
  iconClass: string
  title: string
  value: string
  desc: ReactNode
  action: ReactNode
  delay: number
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-center transition-colors hover:border-gold/40">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconClass}`}>{icon}</div>
        <h2 className="mt-2 text-lg font-bold text-white">{title}</h2>
        <p className="break-all font-bold text-gold">{value}</p>
        <p className="mb-4 text-sm leading-6 text-slate-400">{desc}</p>
        <div className="mt-auto">{action}</div>
      </div>
    </FadeIn>
  )
}

export function Contact() {
  const { lang, t } = useLang()

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-navy/60 to-transparent py-14 text-center">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <FadeIn>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{t('contactTitle')}</h1>
          <p className="mx-auto mt-3 max-w-2xl px-4 text-slate-400">{t('contactSub')}</p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <ContactCard
            delay={0}
            iconClass="bg-[#25d366]/15 text-[#25d366]"
            icon={
              <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
                <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.2c1.5.8 3.1 1.2 4.7 1.2 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm5.4 14.5c-.3-.2-1.7-.9-2-1s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1a7.9 7.9 0 0 1-2.3-1.5 8.8 8.8 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6 2.4 1 2.9.8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4z" />
              </svg>
            }
            title={t('whatsappCard')}
            value={company.whatsapp}
            desc={t('whatsappDesc')}
            action={
              <a
                href={company.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-xl bg-[#25d366] px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#25d366]/25 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                {t('chatNow')}
              </a>
            }
          />

          <ContactCard
            delay={0.1}
            iconClass="bg-sky-400/15 text-sky-300"
            icon={
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            }
            title={t('emailCard')}
            value={company.email}
            desc={t('emailDesc')}
            action={
              <a
                href={`mailto:${company.email}`}
                className="inline-block rounded-xl border border-white/20 bg-white/5 px-7 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
              >
                {t('sendEmail')}
              </a>
            }
          />

          <ContactCard
            delay={0.2}
            iconClass="bg-gold/15 text-gold"
            icon={
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            }
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
                <a href={company.facebook} target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-300 underline decoration-gold/60 underline-offset-4 hover:text-gold">
                  Facebook
                </a>
                <a href={company.instagram} target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-300 underline decoration-gold/60 underline-offset-4 hover:text-gold">
                  Instagram
                </a>
              </div>
            }
          />
        </div>

        <FadeIn delay={0.15} className="mt-14 text-center">
          <div
            aria-label="QR code placeholder"
            className="mx-auto flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.07)_0_10px,transparent_10px_20px),repeating-linear-gradient(90deg,rgba(255,255,255,.07)_0_10px,transparent_10px_20px)] text-2xl font-black text-gold"
          >
            QR
          </div>
          <p className="mt-3 text-sm text-slate-500">{t('qrTip')}</p>
        </FadeIn>
      </section>
    </>
  )
}
