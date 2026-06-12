import { HashRouter, Route, Routes } from 'react-router-dom'
import { LangProvider, useLang } from './i18n'
import { Layout } from './components/Layout'
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

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<NewCarsPage />} />
            <Route path="/used" element={<UsedCarsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="*" element={<NewCarsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </LangProvider>
  )
}
