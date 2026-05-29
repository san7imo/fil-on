import { ServicesArchitectureSection } from '@/features/services/sections/ServicesArchitectureSection'
import { ServicesClosingSection } from '@/features/services/sections/ServicesClosingSection'
import { ServicesDetailSection } from '@/features/services/sections/ServicesDetailSection'
import { ServicesHeroSection } from '@/features/services/sections/ServicesHeroSection'
import { ServicesOperationSection } from '@/features/services/sections/ServicesOperationSection'

export function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesArchitectureSection />
      <ServicesDetailSection />
      <ServicesOperationSection />
      <ServicesClosingSection />
    </>
  )
}
