import { SectionHeading } from '@/components/ui/SectionHeading'
import { siteConfig } from '@/shared/config/site'

const channels = [
  {
    label: 'Correo',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: 'Teléfono',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneHref}`,
  },
  {
    label: 'Cobertura',
    value: siteConfig.location,
    href: '#',
  },
]

export function ContactChannelsSection() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Contacto"
          title="Página lista para integrar formulario, datos de contacto y conversiones."
          description="Por ahora dejo una base corporativa con tarjetas de contacto y espacio suficiente para que luego integremos el formulario real, mapas, redes o automatizaciones."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {channels.map((channel) => (
            <article key={channel.label} className="panel interactive-lift px-6 py-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-700">
                {channel.label}
              </p>
              {channel.href === '#' ? (
                <p className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-950">
                  {channel.value}
                </p>
              ) : (
                <a
                  href={channel.href}
                  className="mt-4 inline-block font-display text-2xl font-bold tracking-tight text-ink-950 hover:text-brand-700"
                >
                  {channel.value}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
