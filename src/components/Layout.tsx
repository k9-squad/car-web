import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { company } from '../data/company'
import { useLang } from '../i18n'
import { Logo } from './Logo'

export function Layout() {
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: t('newCars'), end: true },
    { to: '/used', label: t('usedCars') },
    { to: '/contact', label: t('contact') },
  ]

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="logo-link" onClick={() => setMenuOpen(false)}>
            <Logo />
          </NavLink>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="lang-switch"
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              aria-label="Switch language"
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Logo size={30} />
            <p>{company.slogan[lang]}</p>
          </div>
          <div className="footer-contact">
            <p>WhatsApp: {company.whatsapp}</p>
            <p>Email: {company.email}</p>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} {company.name}. {t('footerRights')}
          </p>
        </div>
      </footer>

      <a
        className="whatsapp-fab"
        href={company.whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden="true">
          <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.2c1.5.8 3.1 1.2 4.7 1.2 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.8c-1.5 0-3-.4-4.3-1.2l-.3-.2-4.3 1.3 1.3-4.1-.2-.3a9.7 9.7 0 0 1-1.8-5.4c0-5.4 4.5-9.8 9.6-9.8s9.6 4.4 9.6 9.8-4.3 9.9-9.6 9.9zm5.4-7.3c-.3-.2-1.7-.9-2-1s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1a7.9 7.9 0 0 1-2.3-1.5 8.8 8.8 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4z" />
        </svg>
      </a>
    </div>
  )
}
