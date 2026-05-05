import { PageHero } from '@/components/common/PageHero'
import { QuoteProcessSection } from '@/features/quote/sections/QuoteProcessSection'

export function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Cotizaciones"
        title="Un punto de entrada claro para solicitudes comerciales y nuevos proyectos."
        description="Cuando definamos el flujo final, aquí podremos integrar formulario, criterios de alcance, FAQs y automatización de contacto."
      />
      <QuoteProcessSection />
    </>
  )
}
