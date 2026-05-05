import { PageHero } from '@/components/common/PageHero'
import { ServicesGridSection } from '@/features/services/sections/ServicesGridSection'

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Una base lista para detallar soluciones, alcances y entregables."
        description="Esta ruta puede evolucionar a una página comercial más completa con paquetes, procesos, casos de uso y CTAs específicos."
      />
      <ServicesGridSection />
    </>
  )
}
