import { Seo } from '@/components/common/Seo'
import { ContactClosingSection } from '@/features/contact/sections/ContactClosingSection'
import { ContactChannelsSection } from '@/features/contact/sections/ContactChannelsSection'
import { ContactFormSection } from '@/features/contact/sections/ContactFormSection'
import { ContactHeroSection } from '@/features/contact/sections/ContactHeroSection'
import { routeSeo } from '@/shared/config/seo'

export function ContactPage() {
  return (
    <>
      <Seo config={routeSeo['/contacto']} />
      <ContactHeroSection />
      <ContactChannelsSection />
      <ContactFormSection />
      <ContactClosingSection />
    </>
  )
}
