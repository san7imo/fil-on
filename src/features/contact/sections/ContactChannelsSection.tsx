import { motion } from 'motion/react'
import { siteConfig } from '@/shared/config/site'

const viewport = { once: true, amount: 0.24 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const channels = [
  {
    label: 'Correo',
    title: siteConfig.email,
    text: 'Para iniciar conversaciones comerciales, operativas o institucionales.',
    href: `mailto:${siteConfig.email}`,
    cta: 'Enviar correo',
  },
  {
    label: 'Teléfono',
    title: siteConfig.phone,
    text: 'Canal directo para coordinar una primera lectura del caso.',
    href: `tel:${siteConfig.phoneHref}`,
    cta: 'Llamar',
  },
  {
    label: 'Ubicación',
    title: siteConfig.location,
    text: 'Base de relación para operaciones con cobertura territorial.',
    href: null,
    cta: 'Cobertura',
  },
]

export function ContactChannelsSection() {
  return (
    <section className="bg-[#f7f5f2] py-18 sm:py-22 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="max-w-[44rem]"
        >
          <h2 className="font-sans text-[2.7rem] font-extrabold leading-[0.94] tracking-[-0.06em] text-[#201614] sm:text-[3.35rem] lg:text-[4rem]">
            Tres formas simples de abrir una conversación seria.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {channels.map((channel, index) => (
            <motion.article
              key={channel.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...reveal, delay: 0.12 + index * 0.08 }}
              viewport={viewport}
              className="relative min-h-[18rem] overflow-hidden rounded-[1.8rem] bg-[#f1efec] px-6 py-7 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]"
            >
              <span className="pointer-events-none absolute bottom-0 right-4 font-sans text-[4.3rem] font-extrabold uppercase leading-none tracking-[-0.08em] text-white/78">
                {channel.label}
              </span>
              <div className="relative z-10 flex min-h-[14rem] flex-col">
                <p className="text-[0.74rem] font-extrabold uppercase tracking-[0.2em] text-[#d67b45]">
                  {channel.label}
                </p>
                <h3 className="mt-5 max-w-[17rem] text-[1.65rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#201614]">
                  {channel.title}
                </h3>
                <p className="mt-4 max-w-[18rem] text-[0.92rem] font-semibold leading-[1.5] text-[#201614]/72">
                  {channel.text}
                </p>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="mt-auto inline-flex w-fit items-center rounded-full bg-[#d67b45] px-5 py-2.5 text-[0.78rem] font-extrabold uppercase italic tracking-[-0.02em] text-white transition hover:brightness-[1.03]"
                  >
                    {channel.cta} &gt;
                  </a>
                ) : (
                  <span className="mt-auto inline-flex w-fit items-center rounded-full border border-[#d67b45]/28 px-5 py-2.5 text-[0.78rem] font-extrabold uppercase italic tracking-[-0.02em] text-[#8f4a22]">
                    {channel.cta}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
