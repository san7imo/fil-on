import { FaWhatsapp } from 'react-icons/fa'
import { siteConfig } from '@/shared/config/site'

export function FloatingWhatsAppButton() {
  const whatsappHref = `https://wa.me/${siteConfig.phoneHref.replace(/\D/g, '')}`

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      title="WhatsApp"
      className="fixed bottom-5 right-5 z-[80] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.35)] transition duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
    >
      <FaWhatsapp className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
    </a>
  )
}
