import { SectionHeading } from '@/components/ui/SectionHeading'

const serviceCards = [
  'Discovery y arquitectura de landing',
  'Diseño UI para campañas y marca',
  'Desarrollo React + TypeScript',
  'Animaciones y microinteracciones',
  'Optimización mobile-first',
  'Escalabilidad para futuras secciones',
]

export function ServicesGridSection() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Servicios"
          title="Ruta lista para profundizar oferta, entregables y valor comercial."
          description="La página puede dividirse por soluciones, sectores o paquetes. Por ahora queda una base limpia donde cada bloque es reemplazable con el contenido real."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((card, index) => (
            <article
              key={card}
              className="panel interactive-lift min-h-52 px-6 py-7"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-700">
                Servicio 0{index + 1}
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-950">
                {card}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
