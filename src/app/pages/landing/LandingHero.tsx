import { useEffect, useId, useState, useSyncExternalStore } from "react"
import { motion } from "framer-motion"
import { HandHeart, ListChecks, ShieldCheck, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import translatorPhoto from "@/assets/hero/traductora.webp"
import reviewPhoto from "@/assets/hero/revision.webp"
import proofreadingPhoto from "@/assets/hero/correccion.webp"
import type { Locale } from "../legal/legalContent"
import "./LandingHero.css"

const heroValues = [
  { key: "focus", icon: Target },
  { key: "process", icon: ListChecks },
  { key: "care", icon: HandHeart },
  { key: "delivery", icon: ShieldCheck },
] as const

type HeroContent = {
  before: string
  rotating: readonly string[]
  after: string
  description: string
  primaryCta: string
  secondaryCta: string
  stats: Record<(typeof heroValues)[number]["key"], { label: string; value: string }>
}

const photos = [
  {
    src: translatorPhoto,
    es: { name: "Traducción en computadora", alt: "Una traductora consulta un documento frente a su computadora" },
    en: { name: "Translating at a computer", alt: "A translator refers to a document at her computer" },
  },
  {
    src: reviewPhoto,
    es: { name: "Revisión entre colegas", alt: "Dos colegas comparan documentos impresos" },
    en: { name: "Reviewing together", alt: "Two colleagues compare printed documents" },
  },
  {
    src: proofreadingPhoto,
    es: { name: "Corrección de un documento", alt: "Una mano marca correcciones en un documento junto a un portátil" },
    en: { name: "Proofreading a document", alt: "A hand marks corrections on a document beside a laptop" },
  },
]

const carouselLabels = {
  es: { name: "Escenas de traducción", role: "carrusel", choose: "Elegir foto", pause: "Pausar", resume: "Reanudar" },
  en: { name: "Translation scenes", role: "carousel", choose: "Choose photo", pause: "Pause", resume: "Resume" },
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribeToReducedMotion(onChange: () => void) {
  const preference = window.matchMedia(reducedMotionQuery)
  preference.addEventListener("change", onChange)
  return () => preference.removeEventListener("change", onChange)
}

function prefersReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches
}

function HeroHeading({ copy, reducedMotion }: { copy: HeroContent; reducedMotion: boolean }) {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return

    const interval = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % copy.rotating.length)
    }, 2200)

    return () => window.clearInterval(interval)
  }, [copy.rotating.length, reducedMotion])

  const activeWord = reducedMotion ? 0 : wordIndex

  return (
    <h1 id="landing-hero-title" className="grid text-[clamp(2.3rem,6.9vw,3.3rem)] leading-[1.05] font-semibold tracking-[-0.045em] lg:text-[clamp(2.6rem,4.25vw,4.1rem)]">
      {copy.rotating.map((word, index) => (
        <motion.span
          key={word}
          initial={false}
          animate={{ opacity: index === activeWord ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}
          aria-hidden={index !== activeWord}
          className="[grid-area:1/1]"
        >
          {copy.before} <span className="text-[#ff7a7c]">{word}</span>{copy.after}
        </motion.span>
      ))}
    </h1>
  )
}

function HeroCarousel({ locale, reducedMotion }: { locale: Locale; reducedMotion: boolean }) {
  const frameId = useId()
  const labels = carouselLabels[locale]
  const [photoIndex, setPhotoIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const playing = !reducedMotion && !paused && !hovered

  useEffect(() => {
    if (!playing) return

    const timer = window.setTimeout(() => {
      setPhotoIndex((index) => (index + 1) % photos.length)
    }, 7000)

    return () => window.clearTimeout(timer)
  }, [photoIndex, playing])

  return (
    <section
      aria-label={labels.name}
      aria-roledescription={labels.role}
      className="relative min-w-0 lg:col-start-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(event) => {
        if (event.target.matches(":focus-visible")) setPaused(true)
      }}
    >
      <div className="absolute right-3 bottom-3 z-10 flex items-center rounded-full bg-[#071b2d]/90 px-1.5 lg:right-5 lg:bottom-4">
        {!reducedMotion && (
          <button
            type="button"
            className="min-h-8 rounded-full px-2.5 text-xs font-medium text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7a7c] pointer-coarse:min-h-11"
            aria-controls={frameId}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? labels.resume : labels.pause}
          </button>
        )}
        <div role="group" aria-label={labels.choose} className="flex">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              aria-label={photo[locale].name}
              aria-controls={frameId}
              aria-current={index === photoIndex ? "true" : undefined}
              className="grid size-8 place-items-center rounded-full before:size-1.5 before:rounded-full before:bg-[#a4b4c1] hover:before:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7a7c] aria-[current=true]:before:w-4 aria-[current=true]:before:bg-[#ff7a7c] pointer-coarse:size-11"
              onClick={() => {
                setPhotoIndex(index)
                setPaused(true)
              }}
            />
          ))}
        </div>
      </div>
      <div id={frameId} className="relative isolate aspect-[4/3] overflow-hidden rounded-b-[20px] lg:h-[clamp(37rem,76svh,49rem)] lg:aspect-auto lg:rounded-none">
        {photos.map((photo, index) => (
          <motion.img
            key={photo.src}
            src={photo.src}
            width={1200}
            height={900}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding={index === 0 ? undefined : "async"}
            alt={photo[locale].alt}
            aria-hidden={index !== photoIndex}
            initial={false}
            animate={{ opacity: index === photoIndex ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
            className="absolute inset-0 size-full object-cover lg:object-[70%_center]"
          />
        ))}
        <div aria-hidden="true" className="landing-hero-fade pointer-events-none absolute inset-0" />
      </div>
      <span className="sr-only" aria-live={playing ? "off" : "polite"}>{photos[photoIndex][locale].name}</span>
    </section>
  )
}

export function LandingHero({ copy, locale, primaryButtonClassName }: {
  copy: HeroContent
  locale: Locale
  primaryButtonClassName: string
}) {
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, prefersReducedMotion, () => false)

  return (
    <section
      aria-labelledby="landing-hero-title"
      className="landing-hero mx-auto grid w-full max-w-[720px] items-center px-5 pt-8 pb-9 lg:max-w-[120rem] lg:px-0 lg:pt-0"
    >
      <div className="relative z-10 min-w-0 lg:col-start-2 lg:py-8 lg:pr-5">
        <HeroHeading key={locale} copy={copy} reducedMotion={reducedMotion} />
        <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-[#bfccd7] xl:text-lg">{copy.description}</p>
        <div className="mt-6 flex flex-col flex-wrap gap-2 min-[471px]:flex-row min-[471px]:gap-5">
          <Button asChild size="lg" className={primaryButtonClassName}>
            <a href="#contact">{copy.primaryCta}</a>
          </Button>
          <a href="https://portal.translationally.net" className="inline-flex min-h-11 items-center self-center rounded-sm text-sm font-medium text-[#bfccd7] underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7a7c]">
            {copy.secondaryCta}
          </a>
        </div>
      </div>
      <HeroCarousel locale={locale} reducedMotion={reducedMotion} />
      <dl className="mt-5 grid grid-cols-2 gap-y-5 border-t border-white/15 pt-5 lg:col-start-2 lg:col-end-4 lg:mr-[var(--hero-gutter)] lg:grid-cols-4">
        {heroValues.map(({ key, icon: Icon }) => (
          <div key={key} className="relative pr-11 even:border-l even:border-white/15 even:pl-3 min-[375px]:even:pl-5 sm:pr-14 lg:pr-24 lg:not-first:border-l lg:not-first:border-white/15 lg:not-first:pl-6">
            <dt className="text-sm text-[#bfccd7]">
              {copy.stats[key].label}
              <Icon aria-hidden="true" className="absolute top-1/2 right-2 size-7 -translate-y-1/2 text-[#ff7a7c] sm:right-4 sm:size-8 lg:right-12 lg:size-9" strokeWidth={1.75} />
            </dt>
            <dd className="mt-1 text-base font-semibold lg:text-lg">{copy.stats[key].value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
