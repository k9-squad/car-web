import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCar } from '../data/cars'
import { company } from '../data/company'
import { useLang } from '../i18n'
import { CarImage } from '../components/CarImage'

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
      <div className="container detail-page">
        <p className="no-results">{t('notFound')}</p>
        <Link to="/" className="btn btn-outline">← {t('backToList')}</Link>
      </div>
    )
  }

  const count = tab === 'exterior' ? car.exteriorImages : car.interiorImages
  const photoLabel = tab === 'exterior' ? t('photoExterior') : t('photoInterior')
  const baseHue = tab === 'exterior' ? 210 : 30
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
    <div className="container detail-page">
      <Link to={car.category === 'used' ? '/used' : '/'} className="back-link">
        ← {t('backToList')}
      </Link>

      <div className="detail-grid">
        <div className="detail-gallery">
          <CarImage
            label={`${car.brand} ${car.model}`}
            sub={`${photoLabel} ${activeIndex + 1}/${count}`}
            hue={(baseHue + activeIndex * 25) % 360}
            className="gallery-main"
          />
          <div className="gallery-tabs">
            {(['exterior', 'interior'] as Tab[]).map((tb) => (
              <button
                key={tb}
                className={tab === tb ? 'active' : ''}
                onClick={() => { setTab(tb); setActiveIndex(0) }}
              >
                {tb === 'exterior' ? t('exterior') : t('interior')}
              </button>
            ))}
          </div>
          <div className="gallery-thumbs">
            {Array.from({ length: count }, (_, i) => (
              <CarImage
                key={`${tab}-${i}`}
                label={`${i + 1}`}
                hue={(baseHue + i * 25) % 360}
                className={`thumb ${i === activeIndex ? 'thumb-active' : ''}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <p className="watermark-note">{t('watermarkNote')}</p>
        </div>

        <div className="detail-info">
          <h1>
            {car.brand} {car.model}
            <span className={`badge ${car.category === 'used' ? 'badge-used' : 'badge-new'}`}>
              {car.category === 'used' ? t('usedBadge') : t('newBadge')}
            </span>
          </h1>
          <p className="detail-highlight">{car.highlight[lang]}</p>
          <p className="detail-price">${car.price.toLocaleString()} <small>USD · FOB</small></p>

          <div className="cta-row">
            <a
              className="btn btn-whatsapp"
              href={`${company.whatsappLink}?text=${inquiryText}`}
              target="_blank"
              rel="noreferrer"
            >
              {t('inquireWhatsApp')}
            </a>
            <a
              className="btn btn-outline"
              href={`mailto:${company.email}?subject=${encodeURIComponent(`Inquiry: ${car.year} ${car.brand} ${car.model}`)}&body=${inquiryText}`}
            >
              {t('inquireEmail')}
            </a>
          </div>

          <h2>{t('specs')}</h2>
          <table className="spec-table">
            <tbody>
              {specs.map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {car.hasVideo && (
        <section className="video-section">
          <h2>{t('video')}</h2>
          <div className="video-player" onClick={() => setVideoPlaying(!videoPlaying)}>
            {videoPlaying ? (
              <div className="video-playing">
                <span className="playing-dot" /> {car.brand} {car.model} — demo video playing…
              </div>
            ) : (
              <>
                <span className="play-button" aria-hidden="true">▶</span>
                <span>{t('videoPlaceholder')}</span>
              </>
            )}
            <span className="watermark">{company.name}</span>
          </div>
        </section>
      )}
    </div>
  )
}
