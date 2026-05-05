import { SectionHeading } from '@/components/ui/SectionHeading'

const steps = [
  'Recepción del brief y objetivos comerciales',
  'Definición de alcance, tiempos y stack',
  'Propuesta visual y técnica por etapas',
  'Aprobación, implementación y seguimiento',
]

export function QuoteProcessSection() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="panel px-6 py-10 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Cotizaciones"
            title="Página pensada para convertir interés en una conversación clara."
            description="Este espacio sirve para explicar el proceso, filtrar requerimientos y preparar formularios o CTAs de venta sin sobrecargar el resto del sitio."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step}
                className="interactive-lift rounded-[24px] border border-line bg-brand-50/80 px-5 py-5"
              >
                <p className="font-display text-4xl font-bold tracking-tight text-ink-950">
                  0{index + 1}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-600">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
