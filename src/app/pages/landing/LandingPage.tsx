import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Languages,
  Mail,
  MessageCircle,
  ShieldCheck,

  Users2,
  FileText,
  Building2,
  BadgeCheck,
  Clock3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Locale = "es" | "en"

const logoUrl =
  "https://translationally-five.vercel.app/assets/logo-DsmuveuX.png"

const whatsappUrl = "https://wa.me/18090000000"
const emailAddress = "Info@translationally.net"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function AccentLine() {
  return (
    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#ef4d4f] via-[#ff7a7c] to-transparent opacity-90" />
  )
}

function FounderImage({
  src,
  alt,
  fallback,
  objectPosition = "object-center",
}: {
  src: string
  alt: string
  fallback: string
  objectPosition?: string
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${objectPosition}`}
      />
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(239,77,79,0.18),rgba(255,255,255,0.04))] text-3xl font-semibold text-white">
      {fallback}
    </div>
  )
}

const founders = [
  {
    name: "Katerine Mota",
    role: {
      es: "Co-fundadora · Gerente de Personal y Producción",
      en: "Co-founder · Chief Operating Officer",
    },
    bio: {
      es: "Katerine Mota, nacida en Bonao, dedicó su vida al servicio del Señor desde temprana edad. Descubrió su pasión por la traducción a los 13 años, lo que la llevó a formarse como Licenciada en Lenguas Modernas y a completar un diplomado en Traducción Jurídica. Ha trabajado como traductora y editora para organizaciones como Hope International y Southern Baptist School Seminary, y actualmente también sirve como speaker de Compassion International. En TranslationAlly lidera la logística, el staff y la producción con enfoque en calidad, estructura y servicio.",
      en: "Katerine Mota, born in Bonao, dedicated her life to serving the Lord from an early age. She discovered her passion for translation at the age of 13, which led her to earn a degree in Modern Languages and complete a diploma in Legal Translation. She has worked as a translator and editor for organizations such as Hope International and Southern Baptist School Seminary, and she currently also serves as a speaker for Compassion International. At TranslationAlly, she leads logistics, staff, and production with a strong focus on quality, structure, and service.",
    },
    image1: "https://i.imgur.com/yQrmbsF.jpeg",
    image2: "https://i.imgur.com/34cq8os.jpeg",
    objectPosition: "object-[center_18%]",
  },
  {
    name: "Lea Peguero",
    role: {
      es: "Co-fundadora · Gerente de Relaciones Externas",
      en: "Co-founder · Chief Partnerships & External Relations Officer",
    },
    bio: {
      es: "Lea Peguero proviene de una familia con fuerte enfoque misional y reside en Santo Domingo. Entregó su vida a Cristo a los seis años y comenzó a servir en el ministerio desde los once. Es licenciada en Publicidad y Comunicación por la Universidad APEC y posee una maestría en Dirección de Marketing por la Universidad Nebrija en Madrid, España. También comparte su experiencia como profesora adjunta en CETYS Universidad en México. Ha servido con organizaciones como YWAM, Compassion International, Food for the Hungry y YouVersion. En TranslationAlly lidera las relaciones externas y el desarrollo de alianzas estratégicas con excelencia, propósito y corazón.",
      en: "Lea Peguero comes from a mission-driven family and lives in Santo Domingo. She gave her life to Christ at the age of six and began serving in ministry at eleven. She holds a bachelor’s degree in Advertising and Communication from APEC University and a master’s degree in Marketing Direction from Nebrija University in Madrid, Spain. She also serves as an adjunct professor at CETYS University in Mexico. Lea has worked with organizations such as YWAM, Compassion International, Food for the Hungry, and YouVersion. At TranslationAlly, she leads external relationships and strategic partnerships with excellence, purpose, and heart.",
    },
    image1: "https://i.imgur.com/6k1f3IX.jpeg",
    image2: "https://i.imgur.com/GYiNvqQ.jpeg",
    objectPosition: "object-[center_18%]",
  },
  {
    name: "Zoila Luciano",
    role: {
      es: "Co-fundadora · Gerente de Finanzas",
      en: "Co-founder · Chief Financial Officer",
    },
    bio: {
      es: "Zoila Luciano es esposa de pastor, madre de tres hijos y una profesional con vasta experiencia en servicio, liderazgo y administración. Posee una licenciatura en Contabilidad, una maestría en Mercadeo y estudios avanzados en teología, culminando una maestría en Estudios Teológicos y Consejería Familiar. Trabajó por varios años en Banreservas, fue administradora de una empresa privada y dirigió por más de 12 años un Centro de Compassion, liderando proyectos de desarrollo social y campamentos para distintas edades. En TranslationAlly lidera el área financiera con una visión de orden, servicio y excelencia.",
      en: "Zoila Luciano is a pastor’s wife, mother of three, and a professional with extensive experience in service, leadership, and administration. She holds a degree in Accounting, a master’s in Marketing, and advanced theological studies, including a master’s in Theological Studies and Family Counseling. She worked for several years at Banreservas, served as administrator of a private company, and directed a Compassion center for more than 12 years, leading social development projects and camps for different age groups. At TranslationAlly, she leads the finance area with a strong vision for order, service, and excellence.",
    },
    image1: "https://i.imgur.com/zpIRGBH.jpeg",
    image2: "https://i.imgur.com/n1gMYT5.jpeg",
    objectPosition: "object-[center_20%]",
  },
] as const

const content = {
  es: {
    nav: {
      about: "Quiénes somos",
      services: "Servicios",
      founders: "Fundadoras",
      contact: "Contacto",
      platform: "Acceder a la plataforma",
      request: "Solicitar servicios",
    },
    hero: {
      badge: "Aliado lingüístico y logístico con una experiencia moderna y confiable",
      before: "Aliado lingüístico y logístico con enfoque",
      rotating: ["claro", "preciso", "confiable", "humano"],
      after: "",
      description:
        "Somos una empresa orientada a ofrecer servicios de alta calidad a una amplia variedad de públicos, con especial enfoque en organizaciones sin fines de lucro. Brindamos soluciones profesionales, puntuales, eficaces y asequibles, diseñadas para responder a las necesidades específicas de cada cliente.",
      primaryCta: "Solicitar servicios",
      secondaryCta: "Acceder a la plataforma de traducción",
      stats: [
        { label: "Enfoque", value: "Rigor" },
        { label: "Proceso", value: "Eficiente" },
        { label: "Atención", value: "Humana" },
        { label: "Entrega", value: "Confiable" },
      ],
      panelTitle: "Aliado en soluciones lingüísticas",
      panelBadge: "Flujo moderno",
      panelItems: [
        {
          icon: BadgeCheck,
          title: "Metodología estructurada",
          text: "Metodología clara y organizada desde la recepción hasta la entrega final.",
        },
        {
          icon: Clock3,
          title: "Cumplimiento de plazos",
          text: "Gestión eficiente orientada al cumplimiento puntual y consistente.",
        },
        {
          icon: Users2,
          title: "Equipo humano",
          text: "Profesionales comprometidos con estándares de excelencia.",
        },
      ],
    },
    about: {
      eyebrow: "Quiénes somos",
      title: "Una empresa orientada a ofrecer servicios de alta calidad",
      description:
        "Nos especializamos particularmente en organizaciones sin fines de lucro, brindando soluciones profesionales y puntuales. Nos comprometemos a ofrecer un servicio eficaz y asequible, diseñado para satisfacer las necesidades específicas de nuestros clientes.",
    },
    story: {
      eyebrow: "Visión y experiencia",
      title: "TranslationAlly es el resultado de años de preparación y esfuerzo",
      description:
        "Hemos trabajado durante mucho tiempo para convertir nuestra visión en una realidad tangible. A lo largo de este proceso, hemos desarrollado un enfoque sólido y efectivo, respaldado por una profunda experiencia en el sector.",
    },
    executive: {
      eyebrow: "Equipo ejecutivo",
      title: "Liderazgo con experiencia en gestión y colaboración con ONGs",
      description:
        "Nuestro comité ejecutivo está compuesto por profesionales altamente experimentados y capacitados. Contamos con un equipo de líderes con vasta experiencia en la gestión de equipos y en la colaboración con organizaciones no gubernamentales (ONGs). Este expertise nos permite ofrecer soluciones que se ajustan a las necesidades del sector sin fines de lucro.",
    },
    providers: {
      eyebrow: "Red de proveedores",
      title: "Una red calificada para servir a públicos diversos y multiculturales",
      description:
        "Nuestro equipo trabaja con un grupo de colaboradores estratégicos que nos permiten ofrecer servicios de calidad en varios idiomas, incluyendo inglés, español, francés y criollo, entre otros. Esto garantiza que podamos brindar atención a un público diverso y multicultural.",
    },
    services: {
      eyebrow: "Servicios",
      title:
        "Soluciones lingüísticas y logísticas pensadas para organizaciones, equipos y proyectos multiculturales",
      description:
        "Disponemos de una red de proveedores altamente calificados y con experiencia comprobada. Esto nos permite ofrecer servicios de calidad en varios idiomas, incluyendo inglés, español, francés y criollo, entre otros.",
      items: [
        {
          icon: Languages,
          title: "Traducción profesional",
          text: "Traducciones precisas, claras y consistentes para distintos tipos de contenido y necesidades institucionales.",
        },
        {
          icon: FileText,
          title: "Gestión documental",
          text: "Procesos organizados para alto volumen, trazabilidad y control de calidad en cada entrega.",
        },
        {
          icon: ShieldCheck,
          title: "Control de calidad",
          text: "Revisión cuidadosa, criterios consistentes y seguimiento interno para asegurar resultados confiables.",
        },
        {
          icon: Building2,
          title: "Soporte para organizaciones",
          text: "Acompañamiento lingüístico para ONGs, instituciones, equipos y operaciones continuas.",
        },
      ],
    },
    founders: {
      eyebrow: "Fundadoras",
      title: "El liderazgo detrás de TranslationAlly",
      description:
        "Conoce a las mujeres que dan dirección, estructura y visión al crecimiento de la empresa.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "FAQ",
      items: [
        {
          question: "¿Qué servicios ofrece TranslationAlly?",
          answer:
            "Ofrecemos traducción escrita general y legal, interpretación presencial, interpretación simultánea y apoyo lingüístico para eventos. También brindamos coordinación logística para grupos misioneros y organizaciones eclesiásticas, servicio de guía turístico y maestro de ceremonia.",
        },
        {
          question: "¿Cuál es la diferencia entre interpretación y traducción?",
          answer:
            "La traducción se refiere a contenido escrito, mientras que la interpretación es comunicación oral en tiempo real, como en reuniones, eventos o visitas guiadas.",
        },
        {
          question: "¿Ofrecen interpretación presencial y simultánea?",
          answer:
            "Sí, ofrecemos interpretación consecutiva y simultánea según las necesidades de tu evento.",
        },
        {
          question: "¿Trabajan con grupos misioneros o iglesias?",
          answer:
            "Sí, nos especializamos en apoyar equipos misioneros y grupos eclesiásticos con traducción, logística, coordinación y orientación cultural.",
        },
        {
          question: "¿Qué tipo de apoyo logístico ofrecen?",
          answer:
            "Apoyamos en planificación, coordinación, itinerarios y asistencia en terreno para asegurar que la experiencia de tu grupo sea fluida.",
        },
        {
          question: "¿Ofrecen servicios de maestro de ceremonia?",
          answer:
            "Sí, ofrecemos servicios profesionales de maestro de ceremonia, asegurando una comunicación clara y un desarrollo fluido del evento.",
        },
        {
          question: "¿Cómo puedo comenzar?",
          answer:
            "Solo contáctanos con tus necesidades y te guiaremos con un plan personalizado y una cotización.",
        },
        {
          question: "¿Cuánto cuestan sus servicios?",
          answer:
            "El precio depende del tipo de servicio, duración y alcance del proyecto. Ofrecemos cotizaciones personalizadas.",
        },
        {
          question: "¿Mi información es confidencial?",
          answer:
            "Sí, manejamos toda la información con estricta confidencialidad y profesionalismo.",
        },
        {
          question: "¿Por qué elegir TranslationAlly?",
          answer:
            "Combinamos experiencia lingüística, entendimiento cultural y un enfoque humano para ofrecer experiencias de comunicación confiables y significativas.",
        },
      ],
    },

    platform: {
      eyebrow: "Plataforma interna",
      title: "¿Eres parte del equipo de traducción?",
      description:
        "Accede directamente a la plataforma interna de TranslationAlly para gestionar trabajo, seguimiento y flujo operativo.",
      cta: "Acceder a la plataforma",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Conversemos sobre tu proyecto",
      description:
        "Cuéntanos qué necesitas y te ayudaremos a encontrar la mejor forma de trabajar juntos.",
      emailTitle: "Correo electrónico",
      whatsappTitle: "WhatsApp",
      whatsappText: "Contáctanos de forma rápida y directa",
      formEyebrow: "Formulario",
      formTitle: "Solicita información",
      name: "Nombre",
      email: "Correo electrónico",
      company: "Empresa u organización",
      message: "Cuéntanos qué servicio necesitas",
      submit: "Enviar solicitud",
      whatsappButton: "Escribir por WhatsApp",
    },
    footer: {
      rights: "© 2026 TranslationAlly. Todos los derechos reservados.",
      platform: "Plataforma",
    },
  },
  en: {
    nav: {
      about: "About us",
      services: "Services",
      founders: "Founders",
      contact: "Contact",
      platform: "Access the platform",
      request: "Request services",
    },
    hero: {
      badge: "A linguistic and logistics ally with a modern and reliable experience",
      before: "A linguistic and logistics ally with a",
      rotating: ["clear", "precise", "reliable", "human"],
      after: " approach",
      description:
        "We are a company committed to providing high-quality services to a wide range of audiences, with a special focus on nonprofit organizations. We provide professional, timely, effective, and affordable solutions designed to meet each client’s specific needs.",
      primaryCta: "Request services",
      secondaryCta: "Access the translation platform",
      stats: [
        { label: "Focus", value: "Rigor" },
        { label: "Process", value: "Efficient" },
        { label: "Care", value: "Human" },
        { label: "Delivery", value: "Reliable" },
      ],
      panelTitle: "Ally in language solutions",
      panelBadge: "Modern workflow",
      panelItems: [
        {
          icon: BadgeCheck,
          title: "Structured methodology",
          text: "A clear and organized methodology from intake to final delivery.",
        },
        {
          icon: Clock3,
          title: "Deadline commitment",
          text: "Efficient management focused on timely and consistent delivery.",
        },
        {
          icon: Users2,
          title: "Human team",
          text: "Professionals committed to standards of excellence.",
        },
      ],
    },
    about: {
      eyebrow: "About us",
      title: "A company committed to delivering high-quality services",
      description:
        "We specialize particularly in nonprofit organizations, providing professional and timely solutions. We are committed to offering effective and affordable service designed to meet the specific needs of our clients.",
    },
    story: {
      eyebrow: "Vision and experience",
      title: "TranslationAlly is the result of years of preparation and effort",
      description:
        "We have worked for a long time to turn our vision into a tangible reality. Throughout this process, we have developed a solid and effective approach, supported by deep experience in the field.",
    },
    executive: {
      eyebrow: "Executive team",
      title: "Leadership with experience in management and collaboration with NGOs",
      description:
        "Our executive committee is composed of highly experienced and qualified professionals. We have a team of leaders with extensive experience in team management and collaboration with non-governmental organizations (NGOs). This expertise allows us to offer solutions that fit the needs of the nonprofit sector.",
    },
    providers: {
      eyebrow: "Provider network",
      title: "A qualified network ready to serve diverse and multicultural audiences",
      description:
        "Our team works with a group of strategic collaborators that allow us to offer quality services in several languages, including English, Spanish, French, and Haitian Creole, among others. This ensures that we can serve a diverse and multicultural audience.",
    },
    services: {
      eyebrow: "Services",
      title:
        "Language and logistics solutions designed for organizations, teams, and multicultural projects",
      description:
        "We have a network of highly qualified providers with proven experience. This allows us to offer quality services in several languages, including English, Spanish, French, and Haitian Creole, among others.",
      items: [
        {
          icon: Languages,
          title: "Professional translation",
          text: "Precise, clear, and consistent translations for different types of content and institutional needs.",
        },
        {
          icon: FileText,
          title: "Document management",
          text: "Organized processes for high-volume work, traceability, and quality control in every delivery.",
        },
        {
          icon: ShieldCheck,
          title: "Quality control",
          text: "Careful review, consistent criteria, and internal follow-up to ensure reliable results.",
        },
        {
          icon: Building2,
          title: "Support for organizations",
          text: "Language support for NGOs, institutions, teams, and ongoing operations.",
        },
      ],
    },
    founders: {
      eyebrow: "Founders",
      title: "The leadership behind TranslationAlly",
      description:
        "Meet the women who provide direction, structure, and vision to the company’s growth.",
    },
    faq: {
      eyebrow: "Frequently Asked Questions",
      title: "FAQ",
      items: [
        {
          question: "What services does TranslationAlly offer?",
          answer:
            "We provide written translation, including general and legal translation, on-site interpretation, simultaneous interpretation, and language support for events. We also offer logistics coordination for mission groups and faith-based organizations, tour guide services, and master of ceremony support.",
        },
        {
          question: "What is the difference between interpretation and translation?",
          answer:
            "Translation refers to written content, while interpretation is spoken communication in real time, such as meetings, events, or guided visits.",
        },
        {
          question: "Do you provide on-site and simultaneous interpretation?",
          answer:
            "Yes, we offer both consecutive and simultaneous interpretation depending on your event’s needs.",
        },
        {
          question: "Do you work with mission groups or churches?",
          answer:
            "Absolutely. We specialize in supporting mission teams and faith-based groups with translation, logistics, coordination, and cultural guidance.",
        },
        {
          question: "What kind of logistics support do you provide?",
          answer:
            "We assist with planning, coordination, scheduling, and on-the-ground support to ensure your group’s experience runs smoothly.",
        },
        {
          question: "Do you offer MC or event hosting services?",
          answer:
            "Yes, we provide professional MC services for events, ensuring clear communication and a smooth flow throughout the program.",
        },
        {
          question: "How do I get started?",
          answer:
            "Simply contact us with your needs, and we’ll guide you through the next steps with a customized plan and quote.",
        },
        {
          question: "How much do your services cost?",
          answer:
            "Pricing depends on the type of service, duration, and project scope. We provide tailored quotes to match your needs.",
        },
        {
          question: "Is my information confidential?",
          answer:
            "Yes, we handle all information with strict confidentiality and professionalism.",
        },
        {
          question: "Why choose TranslationAlly?",
          answer:
            "We combine language expertise, cultural understanding, and a human-centered approach to deliver reliable and meaningful communication experiences.",
        },
      ],
    },
    platform: {
      eyebrow: "Internal platform",
      title: "Are you part of the translation team?",
      description:
        "Access TranslationAlly’s internal platform directly to manage work, follow-up, and operational flow.",
      cta: "Access the platform",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s talk about your project",
      description:
        "Tell us what you need and we will help you find the best way to work together.",
      emailTitle: "Email",
      whatsappTitle: "WhatsApp",
      whatsappText: "Contact us quickly and directly",
      formEyebrow: "Form",
      formTitle: "Request information",
      name: "Name",
      email: "Email",
      company: "Company or organization",
      message: "Tell us what service you need",
      submit: "Send request",
      whatsappButton: "Message us on WhatsApp",
    },
    footer: {
      rights: "© 2026 TranslationAlly. All rights reserved.",
      platform: "Platform",
    },
  },
} as const

export default function TranslationallyLandingPage() {
  const [locale, setLocale] = useState<Locale>("es")
  const [wordIndex, setWordIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [isScrolled] = useState(false)

  const t = content[locale]
  const rotatingWords = useMemo(() => t.hero.rotating, [t.hero.rotating])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2200)

    return () => window.clearInterval(interval)
  }, [rotatingWords])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWordIndex(0)
  }, [locale])

  const localizedFounders = founders.map((founder) => ({
    ...founder,
    roleText: founder.role[locale],
    bioText: founder.bio[locale],
  }))

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#071b2d] text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,77,79,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.05),transparent_20%),linear-gradient(180deg,#071729_0%,#071b2d_48%,#06131f_100%)]" />
        <div className="absolute left-[-8%] top-20 h-72 w-72 rounded-full bg-[#ef4d4f]/10 blur-3xl" />
        <div className="absolute right-[-4%] top-48 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-[6%] top-[24%] h-40 w-40 animate-pulse rounded-full bg-[#ef4d4f]/8 blur-3xl" />
        <div className="absolute right-[9%] top-[14%] h-48 w-48 animate-pulse rounded-full bg-[#ff7a7c]/8 blur-3xl [animation-delay:600ms]" />
        <div className="absolute right-[12%] top-[52%] h-56 w-56 animate-pulse rounded-full bg-[#ef4d4f]/8 blur-3xl [animation-delay:1200ms]" />
        <div className="absolute left-[8%] bottom-[12%] h-44 w-44 animate-pulse rounded-full bg-[#ff7a7c]/7 blur-3xl [animation-delay:1800ms]" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/6 backdrop-blur-2xl transition-all duration-300 ${isScrolled
          ? "bg-[#071b2d]/88 shadow-[0_10px_40px_rgba(0,0,0,0.28)]"
          : "bg-[#071b2d]/70"
          }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="TranslationAlly logo" className="h-11 w-auto" />
          </div>

          <nav className="hidden items-center gap-5 text-[15px] text-white/74 lg:flex">
            <a href="#about" className="transition hover:text-white">
              {t.nav.about}
            </a>
            <a href="#services" className="transition hover:text-white">
              {t.nav.services}
            </a>
            <a href="#founders" className="transition hover:text-white">
              {t.nav.founders}
            </a>
            <a href="#contact" className="transition hover:text-white">
              {t.nav.contact}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocale((prev) => (prev === "es" ? "en" : "es"))}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-2 text-sm text-white transition hover:bg-white/8"
            >
              <Languages className="h-4 w-4" />
              {locale === "es" ? "EN" : "ES"}
            </button>

            <Button
              asChild
              variant="outline"
              className="hidden rounded-full border-white/10 bg-white/4 text-white hover:bg-white/8 md:inline-flex"
            >
              <a href="/login">{t.nav.platform}</a>
            </Button>

            <Button
              asChild
              className="rounded-full border border-[#ef4d4f]/20 bg-[#ef4d4f] text-white shadow-[0_10px_30px_rgba(239,77,79,0.22)] hover:bg-[#e5484b]"
            >
              <a href="#contact">{t.nav.request}</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <section className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-28 xl:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >

            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-[4.2rem]">
              {t.hero.before}{" "}
              <span className="inline-block min-w-[185px] align-baseline text-[#ff7a7c] sm:min-w-[215px] lg:min-w-[260px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.35 }}
                    className="inline-block"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              {t.hero.after}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 lg:text-lg">
              {t.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full border border-[#ef4d4f]/20 bg-[#ef4d4f] px-7 text-white shadow-[0_10px_30px_rgba(239,77,79,0.25)] hover:bg-[#e5484b]"
              >
                <a href="#contact">
                  {t.hero.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/10 bg-white/4 px-7 text-white hover:bg-white/8"
              >
                <a href="/login">{t.hero.secondaryCta}</a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {t.hero.stats.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.5 }}
                  className="relative overflow-hidden rounded-2xl border border-white/6 bg-white/4 p-4 backdrop-blur-md"
                >
                  <AccentLine />
                  <p className="text-xs uppercase tracking-[0.18em] text-white/42">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white lg:text-xl">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#ef4d4f]/18 blur-3xl" />
            <div className="absolute -bottom-6 right-0 h-28 w-28 rounded-full bg-white/7 blur-3xl" />

            <Card className="relative overflow-hidden rounded-[28px] border-white/6 bg-white/[0.045] shadow-2xl backdrop-blur-xl">
              <AccentLine />
              <CardContent className="p-0">
                <div className="border-b border-white/6 bg-[linear-gradient(135deg,rgba(239,77,79,0.14),rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 lg:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-white/42">
                        TranslationAlly
                      </p>
                      <h2 className="mt-2 text-xl font-semibold lg:text-2xl">
                        {t.hero.panelTitle}
                      </h2>
                    </div>
                    <div className="rounded-full border border-white/8 bg-white/8 px-3 py-1 text-xs text-white/72">
                      {t.hero.panelBadge}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-5 lg:p-6">
                  {t.hero.panelItems.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.title}
                        className={`rounded-2xl border border-white/6 p-4 transition hover:border-white/10 hover:bg-white/[0.05] ${idx === 1
                          ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(239,77,79,0.035),rgba(255,255,255,0.01))]"
                          : "bg-black/10"
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/6 bg-white/4">
                            <Icon className="h-5 w-5 text-[#ff7a7c]" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{item.title}</p>
                            <p className="mt-1 text-[15px] leading-7 text-white/62">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="about" className="border-y border-white/5 bg-white/[0.025]">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-14 lg:px-8 lg:py-16">
            <div className="grid gap-8">
              <Card className="relative overflow-hidden rounded-[28px] border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02),rgba(239,77,79,0.03))] shadow-xl backdrop-blur-md">
                <AccentLine />
                <CardContent className="p-8 lg:p-10">
                  <div className="max-w-4xl">
                    <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
                      {t.about.eyebrow}
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                      {t.about.title}
                    </h2>
                    <p className="mt-6 text-[16px] leading-9 text-white/72 lg:max-w-4xl">
                      {t.about.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-8 lg:grid-cols-2">
                <Card className="relative overflow-hidden rounded-[26px] border-white/6 bg-white/[0.04] shadow-xl backdrop-blur-md">
                  <AccentLine />
                  <CardContent className="p-8">
                    <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
                      {t.story.eyebrow}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white lg:text-[2rem]">
                      {t.story.title}
                    </h3>
                    <p className="mt-6 text-[15px] leading-9 text-white/70">
                      {t.story.description}
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden rounded-[26px] border-white/5 bg-white/[0.03] shadow-xl backdrop-blur-md">
                  <CardContent className="p-8">
                    <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
                      {t.executive.eyebrow}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white lg:text-[2rem]">
                      {t.executive.title}
                    </h3>
                    <p className="mt-6 text-[15px] leading-9 text-white/70">
                      {t.executive.description}
                    </p>
                  </CardContent>
                </Card>
              </div>


            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1400px] px-5 py-12 lg:px-8 lg:py-14" id="services">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
              {t.services.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
              {t.services.title}
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-white/70 lg:text-base">
              {t.services.description}
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 2xl:gap-6">
            {t.services.items.map((service, idx) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <Card
                    className={`relative h-full overflow-hidden rounded-[24px] border-white/6 bg-white/[0.045] shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.06] ${idx % 2 === 1
                      ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(239,77,79,0.03),rgba(255,255,255,0.02))]"
                      : ""
                      }`}
                  >
                    <AccentLine />
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/6 bg-white/4">
                        <Icon className="h-5 w-5 text-[#ff7a7c]" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold lg:text-xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-7 text-white/68">
                        {service.text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section id="founders" className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-12 lg:px-8 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-8 max-w-3xl"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
                {t.founders.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
                {t.founders.title}
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-white/70 lg:text-base">
                {t.founders.description}
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {localizedFounders.map((founder, idx) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                >
                  <Card className="group relative h-full overflow-hidden rounded-[26px] border-white/6 bg-white/[0.045] shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/10">
                    <AccentLine />
                    <CardContent className="p-6">
                      <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-[24px] border border-white/6 bg-white/4 shadow-xl">
                        <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                          <FounderImage
                            src={founder.image1}
                            alt={founder.name}
                            fallback={founder.name.charAt(0)}
                            objectPosition={founder.objectPosition}
                          />
                        </div>

                        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <FounderImage
                            src={founder.image2}
                            alt={`${founder.name} alternate`}
                            fallback={founder.name.charAt(0)}
                            objectPosition={founder.objectPosition}
                          />
                        </div>
                      </div>

                      <p className="text-lg font-semibold lg:text-xl">
                        {founder.name}
                      </p>
                      <p className="mt-1 text-sm text-[#ff8a8c]">
                        {founder.roleText}
                      </p>
                      <p className="mt-4 text-[15px] leading-7 text-white/68">
                        {founder.bioText}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1400px] px-5 py-12 lg:px-8 lg:py-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative overflow-hidden rounded-[30px] border-white/6 bg-[linear-gradient(135deg,rgba(239,77,79,0.10),rgba(255,255,255,0.03),rgba(255,255,255,0.015))] shadow-2xl backdrop-blur-xl">
              <AccentLine />
              <CardContent className="grid gap-8 p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
                    {t.platform.eyebrow}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
                    {t.platform.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-8 text-white/72 lg:text-base">
                    {t.platform.description}
                  </p>
                </div>

                <div className="flex items-center lg:justify-end">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full border border-white/10 bg-white text-[#071b2d] hover:bg-white/90"
                  >
                    <a href="/login">
                      {t.platform.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
        <section id="faq" className="mx-auto w-full max-w-[1400px] px-5 py-12 lg:px-8 lg:py-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
              {t.faq.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
              {t.faq.title}
            </h2>
          </motion.div>

          <div className="grid gap-4">
            {t.faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx

              return (
                <Card
                  key={item.question}
                  className="relative overflow-hidden rounded-[24px] border-white/6 bg-white/[0.045] shadow-xl backdrop-blur-md"
                >
                  <AccentLine />
                  <CardContent className="p-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-base font-medium text-white">
                        {item.question}
                      </span>
                      <span
                        className={`text-xl text-[#ff8a8c] transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                          }`}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-[15px] leading-8 text-white/70">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 rounded-[24px] border border-white/6 bg-white/[0.04] p-6 text-center">
            <p className="text-lg font-semibold text-white">
              {locale === "es"
                ? "Más que traducción: conectamos personas, culturas y experiencias."
                : "More than translation—we bridge people, cultures, and experiences."}
            </p>
            <p className="mt-2 text-sm text-white/60">
              {locale === "es"
                ? "Tu aliado confiable en idiomas y logística."
                : "Your trusted allies in language and logistics."}
            </p>
          </div>
        </section>
        <section id="contact" className="border-t border-white/5 bg-white/[0.02]">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-12 lg:px-8 lg:py-14">
            <div className="grid gap-6 lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)] xl:gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
              >
                <Card className="relative h-full overflow-hidden rounded-[26px] border-white/6 bg-white/[0.045] shadow-xl backdrop-blur-md">
                  <AccentLine />
                  <CardContent className="p-8">
                    <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
                      {t.contact.eyebrow}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
                      {t.contact.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-8 text-white/70 lg:text-base">
                      {t.contact.description}
                    </p>

                    <div className="mt-8 space-y-4">
                      <a
                        href={`mailto:${emailAddress}`}
                        className="flex items-center gap-4 rounded-2xl border border-white/6 bg-black/10 p-4 transition hover:border-white/10 hover:bg-white/[0.05]"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/6 bg-white/4">
                          <Mail className="h-5 w-5 text-[#ff7a7c]" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {t.contact.emailTitle}
                          </p>
                          <p className="text-[15px] leading-7 text-white/62">
                            {emailAddress}
                          </p>
                        </div>
                      </a>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 rounded-2xl border border-white/6 bg-black/10 p-4 transition hover:border-white/10 hover:bg-white/[0.05]"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/6 bg-white/4">
                          <MessageCircle className="h-5 w-5 text-[#ff7a7c]" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {t.contact.whatsappTitle}
                          </p>
                          <p className="text-[15px] leading-7 text-white/62">
                            {t.contact.whatsappText}
                          </p>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="relative overflow-hidden rounded-[26px] border-white/6 bg-white/[0.045] shadow-xl backdrop-blur-md">
                  <AccentLine />
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <p className="text-sm uppercase tracking-[0.22em] text-[#ff8a8c]">
                        {t.contact.formEyebrow}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight lg:text-2xl">
                        {t.contact.formTitle}
                      </h3>
                    </div>

                    <form className="grid gap-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          placeholder={t.contact.name}
                          className="h-12 rounded-2xl border-white/8 bg-white/4 text-white placeholder:text-white/35"
                        />
                        <Input
                          type="email"
                          placeholder={t.contact.email}
                          className="h-12 rounded-2xl border-white/8 bg-white/4 text-white placeholder:text-white/35"
                        />
                      </div>

                      <Input
                        placeholder={t.contact.company}
                        className="h-12 rounded-2xl border-white/8 bg-white/4 text-white placeholder:text-white/35"
                      />

                      <Textarea
                        placeholder={t.contact.message}
                        className="min-h-[160px] rounded-2xl border-white/8 bg-white/4 text-white placeholder:text-white/35"
                      />

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                          type="submit"
                          className="rounded-full border border-[#ef4d4f]/20 bg-[#ef4d4f] px-6 text-white shadow-[0_10px_30px_rgba(239,77,79,0.22)] hover:bg-[#e5484b]"
                        >
                          {t.contact.submit}
                        </Button>

                        <Button
                          asChild
                          type="button"
                          variant="outline"
                          className="rounded-full border-white/10 bg-white/4 px-6 text-white hover:bg-white/8"
                        >
                          <a href={whatsappUrl} target="_blank" rel="noreferrer">
                            {t.contact.whatsappButton}
                          </a>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/6 bg-black/10">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-5 py-8 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-5">
            <a href="#about" className="transition hover:text-white">
              {t.nav.about}
            </a>
            <a href="#services" className="transition hover:text-white">
              {t.nav.services}
            </a>
            <a href="#contact" className="transition hover:text-white">
              {t.nav.contact}
            </a>
            <a href="/login" className="transition hover:text-white">
              {t.footer.platform}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}