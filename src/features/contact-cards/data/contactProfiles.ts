export interface ContactProfile {
  slug: string
  name: string
  role: string
  company: string
  phone: string
  email: string
}

const normalizePhone = (phone: string) => phone.replace(/\D/g, '')

export const CONTACT_PROFILES: ContactProfile[] = [
  {
    slug: 'gerencia-comercial',
    name: 'Paula Garcés Álvarez',
    role: 'Gerencia comercial',
    company: 'FILONTECH',
    phone: '3218305284',
    email: 'Gerencia.comercial@fil-ontech.com',
  },
  {
    slug: 'CEO',
    name: 'María Beatriz Cadavid',
    role: 'CEO',
    company: 'FILONTECH',
    phone: '3156846566',
    email: 'Gerencia@fil-ontech.com',
  },
  {
    slug: 'operaciones',
    name: 'Nicolás Sastoque',
    role: 'Operaciones',
    company: 'FILONTECH',
    phone: '3143697673',
    email: 'Gerencia@fil-ontech.com',
  },
  {
    slug: 'oficial-de-cumplimiento',
    name: 'Juliana Patiño Rojas',
    role: 'Oficial de cumplimiento',
    company: 'FILONTECH',
    phone: '3008781078',
    email: 'cumplimiento@fil-ontech.com',
  },
]

export function getContactProfileBySlug(slug: string): ContactProfile | undefined {
  return CONTACT_PROFILES.find(
    (profile) => profile.slug.toLowerCase() === decodeURIComponent(slug).toLowerCase(),
  )
}

export function formatPhoneNumber(phone: string): string {
  const digits = normalizePhone(phone)

  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }

  return phone
}

export function buildPhoneHref(phone: string): string {
  return `tel:+57${normalizePhone(phone)}`
}

export function buildWhatsAppHref(profile: ContactProfile): string {
  const message = encodeURIComponent(
    `Hola ${profile.name}, vi tu tarjeta de contacto de Fil-On Tech y quiero comunicarme contigo.`,
  )

  return `https://wa.me/57${normalizePhone(profile.phone)}?text=${message}`
}
