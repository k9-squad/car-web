import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LangProvider, useLang } from './i18n'
import { Layout } from './components/Layout'
import { Landing } from './pages/Landing'
import { Catalog } from './pages/Catalog'
import { CarDetail } from './pages/CarDetail'
import { Contact } from './pages/Contact'
import { newCars, usedCars } from './data/cars'

function NewCarsPage() {
  const { t } = useLang()
  return <Catalog cars={newCars} title={t('heroNewTitle')} subtitle={t('heroNewSub')} />
}

function UsedCarsPage() {
  const { t } = useLang()
  return <Catalog cars={usedCars} title={t('heroUsedTitle')} subtitle={t('heroUsedSub')} />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/new" element={<NewCarsPage />} />
            <Route path="/used" element={<UsedCarsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="*" element={<Landing />} />
          </Route>
        </Routes>
      </HashRouter>
    </LangProvider>
  )
}
