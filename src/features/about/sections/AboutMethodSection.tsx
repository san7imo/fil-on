import { useRef } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll } from 'motion/react'
import figuraGeometrica from '@/assets/figurageometrica.webp'
import { cn } from '@/shared/lib/cn'

const viewport = { once: true, amount: 0.26 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const methodCards = [
  {
    label: '01',
    title: 'Leemos el terreno',
    description:
      'Partimos del contexto operativo, no de una solución genérica. Entendemos actores, riesgos y restricciones reales.',
  },
  {
    label: '02',
    title: 'Diseñamos arquitectura útil',
    description:
      'Conectamos capital, tecnología, logística y cumplimiento en un esquema que pueda ejecutarse con orden.',
  },
  {
    label: '03',
    title: 'Acompañamos la operación',
    description:
      'Bajamos la estrategia a mecanismos concretos de control, trazabilidad y respuesta para el día a día.',
  },
  {
    label: '04',
    title: 'Escalamos con criterio',
    description:
      'Buscamos crecimiento sostenible, no solo expansión rápida. La confianza se construye con consistencia.',
  },
]

export function AboutMethodSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const rotation = useMotionValue(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? latest
    const delta = latest - previous
    rotation.set(rotation.get() + delta * 0.18)
  })

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#f7f5f2] py-12 sm:py-14 lg:py-16"
    >
      <motion.div
        style={{ rotate: rotation }}
        className="pointer-events-none absolute right-[-8%] top-[15%] z-0 hidden h-[26rem] w-[26rem] opacity-[0.72] lg:block"
      >
        <img
          src={figuraGeometrica}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain [filter:brightness(0)_saturate(100%)_invert(70%)_sepia(34%)_saturate(1450%)_hue-rotate(328deg)_brightness(98%)_contrast(104%)_drop-shadow(0_0_12px_rgba(230,140,102,0.16))]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="max-w-[46rem]"
        >
          <h2 className="font-sans text-[2.2rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#201614] sm:text-[2.65rem] lg:text-[3.1rem]">
            Convertimos complejidad operativa en estructuras claras de ejecución.
          </h2>
          <p className="mt-5 max-w-[34rem] text-[0.98rem] font-semibold leading-[1.56] text-[#201614]/76 sm:text-[1rem]">
            Nuestro trabajo combina lectura estratégica, diseño operativo y
            acompañamiento real para que cada solución tenga lógica de negocio y
            capacidad de implementación.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {methodCards.map((card, index) => (
            <motion.article
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...reveal, delay: 0.1 + index * 0.08 }}
              viewport={viewport}
              className={cn(
                'relative overflow-hidden rounded-[1.8rem] bg-white/78 px-6 py-6 shadow-[0_18px_50px_rgba(23,15,8,0.08)]',
                index % 2 === 0 && 'lg:translate-y-4',
              )}
            >
              <span className="text-[0.8rem] font-extrabold uppercase tracking-[0.2em] text-[#d67b45]">
                {card.label}
              </span>
              <h3 className="mt-3 max-w-[17rem] font-sans text-[1.45rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#201614]">
                {card.title}
              </h3>
              <p className="mt-3 max-w-[24rem] text-[0.9rem] font-semibold leading-[1.45] text-[#201614]/74">
                {card.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
