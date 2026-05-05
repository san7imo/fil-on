import { SectionHeading } from '@/components/ui/SectionHeading'

const pillars = [
  {
    title: 'Visión',
    description:
      'Construir presencia digital con criterio de negocio, claridad visual y ejecución técnica consistente.',
  },
  {
    title: 'Método',
    description:
      'Diseño definido, traducción precisa a componentes, revisión por secciones y refinamiento continuo.',
  },
  {
    title: 'Resultado',
    description:
      'Una plataforma preparada para crecer en contenido, campañas, formularios y nuevas iteraciones de marca.',
  },
]

export function AboutStorySection() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Somos"
          title="Página base para contar quién es Fil-on Tech con una narrativa más institucional."
          description="Aquí podemos desarrollar historia, visión, metodología y credenciales sin contaminar el home con demasiado contenido secundario."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="panel px-6 py-7">
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink-950">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-ink-600">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
