import { Seo } from '@/components/common/Seo'
import { AboutClosingSection } from '@/features/about/sections/AboutClosingSection'
import { AboutHeroSection } from '@/features/about/sections/AboutHeroSection'
import { AboutMethodSection } from '@/features/about/sections/AboutMethodSection'
import { AboutNarrativeSection } from '@/features/about/sections/AboutNarrativeSection'
import { AboutSectorsSection } from '@/features/about/sections/AboutSectorsSection'
import { routeSeo } from '@/shared/config/seo'

export function AboutPage() {
  return (
    <>
      <Seo config={routeSeo['/somos']} />
      <AboutHeroSection />
      <AboutNarrativeSection />
      <AboutSectorsSection />
      <AboutMethodSection />
      <AboutClosingSection />
    </>
  )
}
