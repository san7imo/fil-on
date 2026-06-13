import { CONTACT_PROFILES } from '@/features/contact-cards/data/contactProfiles'
import { siteConfig } from '@/shared/config/site'

export const siteUrl = `https://${siteConfig.website}`

export interface SeoConfig {
  title: string
  description: string
  path: string
  keywords?: string[]
  noindex?: boolean
  type?: 'website' | 'profile'
}

const defaultKeywords = [
  'Fil-On Tech',
  'fintech agrominera',
  'soluciones financieras',
  'capital de trabajo',
  'tecnología operativa',
  'cumplimiento digital',
  'minería',
  'agroindustria',
  'economía real',
  'Colombia',
]

export const defaultSeo: SeoConfig = {
  title: 'Fil-On Tech | Fintech agrominera para la economía real',
  description:
    'Fil-On Tech conecta capital, tecnología, control operativo y cumplimiento para minería, agroindustria e industrias estratégicas en Colombia.',
  path: '/',
  keywords: defaultKeywords,
}

export const routeSeo: Record<string, SeoConfig> = {
  '/': defaultSeo,
  '/somos': {
    title: 'Somos Fil-On Tech | Territorio, operación y confianza',
    description:
      'Conoce a Fil-On Tech: infraestructura financiera, tecnológica y regulatoria para acompañar operaciones de la economía real con presencia territorial.',
    path: '/somos',
    keywords: [...defaultKeywords, 'quiénes somos', 'operación territorial'],
  },
  '/servicios': {
    title: 'Servicios Fil-On Tech | Capital, tecnología y cumplimiento',
    description:
      'Soluciones de capital, pagos, dispersión, herramientas digitales, control operativo y cumplimiento inteligente para sectores estratégicos.',
    path: '/servicios',
    keywords: [
      ...defaultKeywords,
      'factoring',
      'leasing',
      'confirming',
      'pasarela de pagos',
      'compliance',
    ],
  },
  '/cotizaciones': {
    title: 'Cotizaciones Fil-On Tech | Referencias para metales y agro',
    description:
      'Consulta referencias de mercado para metales y productos agronómicos que apoyan decisiones de compra, financiación, inventario y operación.',
    path: '/cotizaciones',
    keywords: [...defaultKeywords, 'cotizaciones', 'metales', 'agronómicos'],
  },
  '/contacto': {
    title: 'Contacto Fil-On Tech | Hablemos de operación y capital',
    description:
      'Comunícate con Fil-On Tech para conversar sobre liquidez, pagos, tecnología, cumplimiento y ejecución en territorio.',
    path: '/contacto',
    keywords: [...defaultKeywords, 'contacto Fil-On Tech', 'Medellín'],
  },
}

export const legalSeo: Record<string, SeoConfig> = {
  '/privacidad': {
    title: 'Política de privacidad | Fil-On Tech',
    description:
      'Información general sobre el tratamiento de datos personales en los canales digitales de Fil-On Tech.',
    path: '/privacidad',
    noindex: true,
  },
  '/terminos': {
    title: 'Términos de uso | Fil-On Tech',
    description:
      'Condiciones generales de uso del sitio web y canales digitales de Fil-On Tech.',
    path: '/terminos',
    noindex: true,
  },
  '/cookies': {
    title: 'Política de cookies | Fil-On Tech',
    description:
      'Información general sobre el uso de cookies y tecnologías similares en el sitio de Fil-On Tech.',
    path: '/cookies',
    noindex: true,
  },
}

export function buildProfileSeo(path: string): SeoConfig | undefined {
  const profile = CONTACT_PROFILES.find((item) => `/${item.slug}` === path)

  if (!profile) return undefined

  return {
    title: `${profile.name} | ${profile.role} en Fil-On Tech`,
    description: `Tarjeta digital de ${profile.name}, ${profile.role} en ${profile.company}. Contacto directo por teléfono, WhatsApp o correo.`,
    path: `/${profile.slug}`,
    type: 'profile',
    noindex: true,
  }
}

export function getSeoByPath(pathname: string): SeoConfig {
  return (
    routeSeo[pathname] ??
    legalSeo[pathname] ??
    buildProfileSeo(pathname) ?? {
      title: 'Página no encontrada | Fil-On Tech',
      description:
        'La página solicitada no está disponible. Vuelve al sitio principal de Fil-On Tech.',
      path: pathname,
      noindex: true,
    }
  )
}

export function buildCanonicalUrl(path: string) {
  return `${siteUrl}${path === '/' ? '' : path}`
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Medellín',
      addressRegion: 'Antioquia',
      addressCountry: 'CO',
    },
    description: defaultSeo.description,
  }
}
