import { ContactClosingSection } from '@/features/contact/sections/ContactClosingSection'
import { ContactChannelsSection } from '@/features/contact/sections/ContactChannelsSection'
import { ContactFormSection } from '@/features/contact/sections/ContactFormSection'
import { ContactHeroSection } from '@/features/contact/sections/ContactHeroSection'

export function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactChannelsSection />
      <ContactFormSection />
      <ContactClosingSection />
    </>
  )
}
