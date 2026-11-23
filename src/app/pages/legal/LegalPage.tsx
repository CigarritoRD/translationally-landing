import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { legalContent, legalEmail, legalHref, legalIds } from './legalContent'
import type { LegalDocumentId, Locale } from './legalContent'

const copy = {
  es: {
    home: 'Volver al inicio',
    language: 'English',
    nav: 'Documentos legales',
    contact: 'Contacto legal y de privacidad',
    draft: 'Borrador para aprobación.',
  },
  en: {
    home: 'Back to home',
    language: 'Español',
    nav: 'Legal documents',
    contact: 'Legal and privacy contact',
    draft: 'Draft for approval.',
  },
}

export function LegalPage({ id, locale }: { id: LegalDocumentId; locale: Locale }) {
  const labels = copy[locale]
  const documents = legalContent[locale]
  const page = documents[id]
  const otherLocale = locale === 'es' ? 'en' : 'es'

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${page.title} | TranslationAlly`
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('legal-page-title')?.focus({ preventScroll: true })

    return () => { document.title = previousTitle }
  }, [page.title])

  return (
    <div className="min-h-screen bg-[#071b2d] text-white">
      <header className="border-b border-white/15">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link className="inline-flex min-h-11 items-center font-medium underline underline-offset-4" to={locale === 'en' ? '/?lang=en' : '/'}>
            {labels.home}
          </Link>
          <Link className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-sm" lang={otherLocale} to={legalHref(id, otherLocale)}>
            {labels.language}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="mb-3 text-sm font-medium text-[#ffb2b3]">Translationally, SRL</p>
        <h1 id="legal-page-title" tabIndex={-1} className="text-3xl font-semibold tracking-tight sm:text-5xl">{page.title}</h1>
        <p className="mt-5 rounded-lg border border-[#ffb2b3]/30 bg-[#ffb2b3]/8 px-4 py-3 text-sm leading-6 text-[#ffcecf]">{labels.draft}</p>

        <nav aria-label={labels.nav} className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-b border-white/15 pb-4">
          {legalIds.map((documentId) => (
            <Link key={documentId} aria-current={id === documentId ? 'page' : undefined} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4 aria-[current=page]:font-semibold aria-[current=page]:text-[#ffb2b3]" to={legalHref(documentId, locale)}>
              {documents[documentId].title}
            </Link>
          ))}
        </nav>

        <div className="mt-8 space-y-8">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
              <p className="leading-7 text-white/80">{section.text}</p>
              {section.links && (
                <ul className="mt-2 flex flex-wrap gap-x-5">
                  {section.links.map((link) => (
                    <li key={link.href}><a className="inline-flex min-h-11 items-center text-sm underline underline-offset-4" href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-9 border-t border-white/15 pt-6">
          <h2 className="text-xl font-semibold">{labels.contact}</h2>
          <a className="inline-flex min-h-11 items-center break-all underline underline-offset-4" href={`mailto:${legalEmail}`}>{legalEmail}</a>
        </section>
      </main>
    </div>
  )
}
