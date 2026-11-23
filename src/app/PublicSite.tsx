import { useSearchParams } from 'react-router-dom'
import TranslationallyLandingPage from './pages/landing/LandingPage'
import { LegalPage } from './pages/legal/LegalPage'
import { legalIds } from './pages/legal/legalContent'

export function PublicSite() {
  const [params] = useSearchParams()
  const locale = params.get('lang') === 'en' ? 'en' : 'es'
  const legalPage = legalIds.find((id) => id === params.get('legal'))

  return legalPage
    ? <LegalPage id={legalPage} locale={locale} />
    : <TranslationallyLandingPage key={locale} initialLocale={locale} />
}
