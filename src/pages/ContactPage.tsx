import { PageHero } from '@/components/common/PageHero'
import { ContactChannelsSection } from '@/features/contact/sections/ContactChannelsSection'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Canal base para centralizar conversación, soporte comercial y próximos pasos."
        description="La página está preparada para crecer con formulario, agendas, mapa o integraciones externas cuando definamos el alcance de contacto."
      />
      <ContactChannelsSection />
    </>
  )
}
