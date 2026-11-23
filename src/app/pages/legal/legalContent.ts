export type Locale = 'es' | 'en'

export type LegalDocumentId = 'privacidad' | 'terminos' | 'cookies'

type LegalSection = {
  title: string
  text: string
  links?: { label: string; href: string }[]
}

type LegalDocument = { title: string; sections: LegalSection[] }

export const legalIds: LegalDocumentId[] = ['privacidad', 'terminos', 'cookies']

export function legalHref(id: LegalDocumentId, locale: Locale) {
  return `/?legal=${id}&lang=${locale}`
}

export const legalEmail = 'info@translationally.net'
const legalAddress = 'Calle Verde #1A, Bello Campo, Santo Domingo Este, República Dominicana'

const emailjs = { label: 'EmailJS', href: 'https://www.emailjs.com/legal/privacy-policy/' }
const whatsapp = { label: 'WhatsApp', href: 'https://www.whatsapp.com/legal/privacy-policy' }
const imgur = { label: 'Imgur', href: 'https://imgur.com/privacy' }
const vercel = { label: 'Vercel', href: 'https://vercel.com/legal/privacy-notice' }
const dataLaw = { label: 'Ley núm. 172-13', href: 'https://www.sb.gob.do/regulacion/leyes/ley-no-172-13-proteccion-de-los-datos/' }
const consumerOffice = { label: 'Pro Consumidor', href: 'https://proconsumidor.gob.do/preguntas-frecuentes-de-los-ciudadanos/' }

export const legalContent: Record<Locale, Record<LegalDocumentId, LegalDocument>> = {
  es: {
    privacidad: {
      title: 'Política de privacidad',
      sections: [
        { title: 'Responsable y alcance', text: `Translationally, SRL, con domicilio en ${legalAddress}, gestiona los datos personales que recibe mediante el sitio público translationally.net y sus canales de contacto. El portal de traducción se usa para operaciones distintas, como la gestión de cuentas y documentos, y requiere su propio aviso de privacidad.` },
        { title: 'Datos que recibimos y para qué los usamos', text: 'El formulario envía el nombre, el correo electrónico, la empresa u organización que indiques y el mensaje. Si nos escribes por correo o WhatsApp, recibimos los datos de contacto y el contenido que compartas por ese canal. Usamos esta información para responder, evaluar tu solicitud, preparar una cotización cuando corresponda y dar seguimiento a la consulta. Para el primer contacto, describe el servicio que necesitas sin incluir cartas de terceros, documentos de identidad, datos de menores ni información sensible.' },
        { title: 'Proveedores y tratamiento fuera del país', text: 'EmailJS procesa los datos del formulario para entregar la consulta a nuestro correo. Según su política, puede procesar información en Estados Unidos. Si eliges WhatsApp, ese servicio interviene en la comunicación. Al cargar imágenes desde Imgur y desde un dominio de Vercel, tu navegador se conecta a esos proveedores y les comunica datos técnicos de la solicitud, como la dirección IP. Los datos también podrán comunicarse cuando medie una obligación legal aplicable.', links: [emailjs, whatsapp, imgur, vercel] },
        { title: 'Conservación', text: 'Conservamos cada consulta mientras la atendemos y durante el seguimiento. El plazo depende de cómo avance la conversación. Si después de responder no hay más contacto, eliminamos la consulta, salvo que exista una obligación legal o contractual de conservarla. El historial técnico de envíos de EmailJS depende del plan y de la configuración del servicio.' },
        { title: 'Tus derechos y cómo ejercerlos', text: 'Puedes solicitar acceso, rectificación, actualización, cancelación u oposición en los casos previstos por la Ley núm. 172-13 y las demás normas aplicables. Escribe al correo indicado al pie de esta página. Podremos pedir la información necesaria para verificar tu identidad y tramitar la solicitud.', links: [dataLaw] },
      ],
    },
    terminos: {
      title: 'Términos de uso',
      sections: [
        { title: 'Quién opera el sitio', text: 'Translationally, SRL opera el sitio público translationally.net para dar a conocer sus servicios y recibir consultas. El acceso al portal de traducción y el uso de cuentas autorizadas se rigen por las condiciones de ese servicio.' },
        { title: 'Consultas, cotizaciones y contratación', text: 'Puedes solicitar información o una cotización por los canales del sitio. Enviar una consulta no confirma una reserva, un precio ni un plazo. El alcance, precio, fechas y demás condiciones de cada servicio se establecen en la cotización aceptada o en el acuerdo correspondiente, con sujeción a los derechos que reconoce la ley.' },
        { title: 'Uso del sitio y sus contenidos', text: 'Puedes consultar la información pública y compartir enlaces al sitio. Usa el formulario para consultas legítimas. Abstente de suplantar a otras personas, enviar mensajes abusivos o interferir con el sitio. El logotipo, los textos y las imágenes pertenecen a sus respectivos titulares y están sujetos a los derechos que correspondan.' },
        { title: 'Servicios y enlaces externos', text: 'Al abrir WhatsApp o el portal de traducción, accedes a un servicio con sus propias condiciones. La política de privacidad de la landing explica cómo se reciben y gestionan las consultas del sitio público.' },
        { title: 'Consultas y reclamaciones', text: 'Puedes escribirnos al correo indicado al pie de esta página. Estos términos respetan los derechos irrenunciables que reconoce la normativa aplicable. Si corresponde, puedes acudir a Pro Consumidor.', links: [consumerOffice] },
      ],
    },
    cookies: {
      title: 'Cookies y tecnologías similares',
      sections: [
        { title: 'Qué son', text: 'Las cookies permiten que un sitio guarde o recupere información en el navegador. El almacenamiento local y el almacenamiento de sesión son otros mecanismos que pueden cumplir funciones similares.' },
        { title: 'Cómo funciona la landing', text: 'La navegación en la landing pública no guarda cookies en tu navegador. El idioma y los campos del formulario se mantienen en la memoria de la página mientras la usas. Los enlaces legales pueden incluir el idioma en la dirección. La landing no incluye etiquetas de analítica ni de publicidad en su código.' },
        { title: 'Recursos y destinos externos', text: 'La landing solicita imágenes alojadas en Imgur y en un dominio de Vercel. Cuando envías una consulta, el navegador se comunica con EmailJS. Los enlaces a WhatsApp y al portal llevan a otros servicios, que pueden usar sus propias cookies y almacenamiento.', links: [imgur, vercel, emailjs, whatsapp] },
        { title: 'Opciones del navegador', text: 'Puedes consultar, bloquear o eliminar cookies en la configuración de tu navegador. Si el sitio incorpora tecnologías opcionales que requieran consentimiento, la información y los controles de preferencias deberán reflejar cómo funcionan esas tecnologías antes de activarlas.' },
      ],
    },
  },
  en: {
    privacidad: {
      title: 'Privacy policy',
      sections: [
        { title: 'Who is responsible and what this covers', text: `Translationally, SRL, based at ${legalAddress}, handles the personal data it receives through its public website, translationally.net, and its contact channels. The translation portal serves separate purposes, such as managing accounts and documents, and requires its own privacy notice.` },
        { title: 'What we receive and how we use it', text: 'The form sends your name, email address, any company or organization you enter, and your message. If you contact us by email or WhatsApp, we receive the contact details and content you share through that channel. We use this information to respond, assess your request, prepare a quote where appropriate, and follow up. For your first message, describe the service you need without including third-party letters, identity documents, children’s data, or sensitive information.' },
        { title: 'Providers and processing abroad', text: 'EmailJS processes the form data to deliver your inquiry to our inbox. According to its privacy policy, it may process information in the United States. If you choose WhatsApp, that service handles the communication. When loading images from Imgur and a Vercel domain, your browser sends those providers technical request data such as your IP address. Data may also be disclosed when required by applicable law.', links: [emailjs, whatsapp, imgur, vercel] },
        { title: 'Retention', text: 'We keep each inquiry while we respond and follow up. How long we keep it depends on how the conversation progresses. If there is no further contact after we respond, we delete the inquiry unless a legal or contractual obligation requires us to keep it. EmailJS’s technical delivery history depends on the service plan and settings.' },
        { title: 'Your rights and how to exercise them', text: 'You can request access, correction, updating, deletion, or object to processing where provided by Dominican Law No. 172-13 and other applicable rules. Contact us at the email address below. We may ask for information needed to verify your identity and handle your request.', links: [dataLaw] },
      ],
    },
    terminos: {
      title: 'Website terms of use',
      sections: [
        { title: 'Who operates the website', text: 'Translationally, SRL operates the public website translationally.net to describe its services and receive inquiries. Access to the translation portal and use of authorized accounts are governed by the terms of that service.' },
        { title: 'Inquiries, quotes, and agreements', text: 'You can ask for information or a quote through the channels listed on the website. Sending an inquiry does not confirm a booking, price, or deadline. The scope, price, dates, and other conditions for each service are set out in the accepted quote or relevant agreement, subject to your rights under applicable law.' },
        { title: 'Use of the website and its content', text: 'You may browse the public information and share links to the site. Use the form for legitimate inquiries. Do not impersonate others, send abusive messages, or interfere with the site. The logo, text, and images belong to their respective owners and are subject to the applicable rights.' },
        { title: 'External services and links', text: 'Opening WhatsApp or the translation portal takes you to a service with its own terms. The website privacy policy explains how inquiries received through the public website are handled.' },
        { title: 'Questions and complaints', text: 'You can contact us at the email address below. These terms respect rights that cannot be waived under applicable law. Where applicable, you may also contact Pro Consumidor.', links: [consumerOffice] },
      ],
    },
    cookies: {
      title: 'Cookies and similar technologies',
      sections: [
        { title: 'What they are', text: 'Cookies allow a website to store or retrieve information in your browser. Local storage and session storage are other mechanisms that can serve similar purposes.' },
        { title: 'How the public website works', text: 'Browsing the public website does not save cookies in your browser. The page keeps your selected language and form entries in memory while you use it. Legal links may include the language in the address. The website code does not include analytics or advertising tags.' },
        { title: 'External resources and destinations', text: 'The website requests images hosted by Imgur and on a Vercel domain. When you submit an inquiry, the browser communicates with EmailJS. Links to WhatsApp and the portal take you to other services that may use their own cookies and storage.', links: [imgur, vercel, emailjs, whatsapp] },
        { title: 'Browser settings', text: 'You can view, block, and delete cookies in your browser settings. If the site adds optional technologies that require consent, its notices and preference controls must reflect how those technologies work before they are enabled.' },
      ],
    },
  },
}
