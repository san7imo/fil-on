import { AboutClosingSection } from '@/features/about/sections/AboutClosingSection'
import { AboutHeroSection } from '@/features/about/sections/AboutHeroSection'
import { AboutMethodSection } from '@/features/about/sections/AboutMethodSection'
import { AboutNarrativeSection } from '@/features/about/sections/AboutNarrativeSection'
import { AboutSectorsSection } from '@/features/about/sections/AboutSectorsSection'

export function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutNarrativeSection />
      <AboutSectorsSection />
      <AboutMethodSection />
      <AboutClosingSection />
    </>
  )
}
