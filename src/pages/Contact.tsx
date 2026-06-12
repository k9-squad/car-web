import { company } from '../data/company'
import { useLang } from '../i18n'

export function Contact() {
  const { lang, t } = useLang()

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{t('contactTitle')}</h1>
          <p>{t('contactSub')}</p>
        </div>
      </section>

      <section className="container contact-section">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon contact-icon-wa">
              <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
                <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.2c1.5.8 3.1 1.2 4.7 1.2 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm5.4 14.5c-.3-.2-1.7-.9-2-1s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1a7.9 7.9 0 0 1-2.3-1.5 8.8 8.8 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6 2.4 1 2.9.8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4z" />
              </svg>
            </div>
            <h2>{t('whatsappCard')}</h2>
            <p className="contact-value">{company.whatsapp}</p>
            <p className="contact-desc">{t('whatsappDesc')}</p>
            <a className="btn btn-whatsapp" href={company.whatsappLink} target="_blank" rel="noreferrer">
              {t('chatNow')}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon contact-icon-mail">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>
            <h2>{t('emailCard')}</h2>
            <p className="contact-value">{company.email}</p>
            <p className="contact-desc">{t('emailDesc')}</p>
            <a className="btn btn-outline" href={`mailto:${company.email}`}>
              {t('sendEmail')}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon contact-icon-info">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <h2>{t('companyCard')}</h2>
            <p className="contact-value">{company.name}</p>
            <p className="contact-desc">
              {t('address')}: {company.address[lang]}
              <br />
              {t('workingHours')}: {company.workingHours[lang]}
            </p>
            <div className="social-links">
              <a href={company.facebook} target="_blank" rel="noreferrer">Facebook</a>
              <a href={company.instagram} target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </div>

        <div className="qr-block">
          <div className="qr-placeholder" aria-label="QR code placeholder">
            <span>QR</span>
          </div>
          <p>{t('qrTip')}</p>
        </div>
      </section>
    </>
  )
}
