import { HomeHeroSection } from '@/features/home/sections/HomeHeroSection'
import { HomeIndustrialGridSection } from '@/features/home/sections/HomeIndustrialGridSection'
import { HomeSocialImpactSection } from '@/features/home/sections/HomeSocialImpactSection'
import { HomeMiningTransformationSection } from '@/features/home/sections/HomeMiningTransformationSection'
import { HomeWhyChooseSection } from '@/features/home/sections/HomeWhyChooseSection'

export function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <HomeIndustrialGridSection />
      <HomeSocialImpactSection />
      <HomeMiningTransformationSection />
      <HomeWhyChooseSection />
    </>
  )
}
