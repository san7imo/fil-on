import { PageHero } from '@/components/common/PageHero'
import { AboutStorySection } from '@/features/about/sections/AboutStorySection'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Somos"
        title="Un espacio preparado para contar la esencia, el método y la propuesta de Fil-on Tech."
        description="La estructura ya separa esta página del home para que la narrativa institucional tenga más profundidad y mejores bloques de contenido."
      />
      <AboutStorySection />
    </>
  )
}
