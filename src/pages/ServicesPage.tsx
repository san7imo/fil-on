import { Seo } from '@/components/common/Seo'
import { ServicesArchitectureSection } from '@/features/services/sections/ServicesArchitectureSection'
import { ServicesClosingSection } from '@/features/services/sections/ServicesClosingSection'
import { ServicesDetailSection } from '@/features/services/sections/ServicesDetailSection'
import { ServicesHeroSection } from '@/features/services/sections/ServicesHeroSection'
import { ServicesOperationSection } from '@/features/services/sections/ServicesOperationSection'
import { routeSeo } from '@/shared/config/seo'

export function ServicesPage() {
  return (
    <>
      <Seo config={routeSeo['/servicios']} />
      <ServicesHeroSection />
      <ServicesArchitectureSection />
      <ServicesDetailSection />
      <ServicesOperationSection />
      <ServicesClosingSection />
    </>
  )
}
