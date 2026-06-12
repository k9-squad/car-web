import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { company } from '../data/company'
import { useLang } from '../i18n'
import { Logo } from './Logo'
import { Button } from './ui/button'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
  }`

export function Layout() {
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: t('home'), end: true },
    { to: '/new', label: t('newCars') },
    { to: '/used', label: t('usedCars') },
    { to: '/contact', label: t('contact') },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <Logo />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              aria-label="Switch language"
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="!size-5" /> : <Menu className="!size-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 py-9 text-center sm:px-6">
          <Logo size={28} />
          <p className="text-sm text-zinc-400">{company.slogan[lang]}</p>
          <div className="text-sm text-zinc-500">
            <p>WhatsApp: {company.whatsapp}</p>
            <p>Email: {company.email}</p>
          </div>
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} {company.name}. {t('footerRights')}
          </p>
        </div>
      </footer>

      <motion.a
        href={company.whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-4 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#1f9e54] shadow-lg shadow-black/40"
      >
        <svg viewBox="0 0 32 32" width="26" height="26" fill="#fff" aria-hidden="true">
          <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.2c1.5.8 3.1 1.2 4.7 1.2 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm5.4 14.5c-.3-.2-1.7-.9-2-1s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1a7.9 7.9 0 0 1-2.3-1.5 8.8 8.8 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6 2.4 1 2.9.8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4z" />
        </svg>
      </motion.a>
    </div>
  )
}
