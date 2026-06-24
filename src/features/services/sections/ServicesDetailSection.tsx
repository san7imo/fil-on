import { motion } from 'motion/react'
import { cn } from '@/shared/lib/cn'

const viewport = { once: true, amount: 0.24 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const services = [
  {
    label: 'Capital',
    title: 'Abastecimiento, ejecución y logística operativa en territorio y digital.',
    titleClassName:
      'max-w-[31rem] text-[1.32rem] leading-[1.02] sm:text-[1.58rem] lg:text-[1.52rem]',
    description:
      'Herramientas para dispersar recursos, pagar y gestionar operación.',
    capabilities: ['Dispersión', 'Pasarela de pagos', 'Servicios digitales'],
  },
  {
    label: 'Tech',
    title: 'Infraestructura inteligente para conectar y potenciar el ecosistema.',
    description:
      'Alternativas financieras para compra, expansión y flujo de caja.',
    capabilities: ['Créditos', 'Factoring', 'Leasing', 'Confirming'],
  },
  {
    label: 'Root',
    title: 'Responsabilidad social.',
    description: '',
    capabilities: [
      'Educación',
      'Salud',
      'Iniciativas ambientales',
      'Pólizas',
      'Inclusión financiera',
    ],
  },
  {
    label: 'Secure',
    title: 'Cumplimiento aplicable.',
    description:
      'Prevención de riesgos, lectura regulatoria y soporte documental.',
    capabilities: ['Compliance digital', 'Riesgo regulatorio', 'Soporte documental'],
  },
]

export function ServicesDetailSection() {
  return (
    <section className="flex min-h-screen items-center bg-[#ef8f8d] py-12 text-white sm:py-14 lg:h-screen lg:overflow-hidden lg:py-10">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="mx-auto max-w-[54rem] text-center"
        >
          <h2 className="font-sans text-[2.05rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#783112] sm:text-[2.55rem] lg:text-[2.95rem]">
            Servicios diseñados para operar, controlar y crecer.
          </h2>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...reveal, delay: 0.1 + index * 0.08 }}
              viewport={viewport}
              className="relative min-h-[14.2rem] overflow-hidden rounded-[1.6rem] border border-white/14 bg-[rgba(132,45,20,0.13)] px-6 py-6 backdrop-blur-[2px] transition duration-300 ease-out hover:-translate-y-0.5 lg:min-h-[15rem]"
            >
              <span className="pointer-events-none absolute bottom-[-0.4rem] right-4 font-sans text-[3.6rem] font-extrabold uppercase leading-none tracking-[-0.08em] text-white/10 sm:text-[4.1rem]">
                {service.label.split(' / ')[0]}
              </span>

              <div className="relative z-10">
                <div>
                  <div>
                    <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-white/62">
                      {service.label}
                    </p>
                    <h3
                      className={cn(
                        'mt-3 font-sans font-extrabold tracking-[-0.05em] text-white',
                        service.titleClassName ??
                          'max-w-[18rem] text-[1.55rem] leading-[0.98] sm:text-[1.8rem]',
                      )}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {service.description ? (
                  <p className="mt-4 max-w-[28rem] text-[0.9rem] font-semibold leading-[1.45] text-white/84">
                    {service.description}
                  </p>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="rounded-full border border-white/18 bg-white/10 px-3.5 py-1.5 text-[0.66rem] font-extrabold uppercase tracking-[0.12em] text-white/84"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
