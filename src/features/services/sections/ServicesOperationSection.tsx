import { useRef } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll } from 'motion/react'
import agromineria from '@/assets/agromineria.webp'
import figuraGeometrica from '@/assets/figurageometrica.webp'
import siembraAgrominera from '@/assets/siembraagrominera.webp'

const viewport = { once: true, amount: 0.24 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const metrics = [
  {
    value: '01',
    label: 'Trazabilidad para leer el flujo de recursos y decisiones.',
  },
  {
    value: '02',
    label: 'Escalabilidad para crecer sin perder control operativo.',
  },
  {
    value: '03',
    label: 'Presencia en territorio para entender restricciones reales.',
  },
]

export function ServicesOperationSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const rotation = useMotionValue(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? latest
    const delta = latest - previous
    rotation.set(rotation.get() + delta * 0.2)
  })

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#f7f5f2] py-12 sm:py-14 lg:h-screen lg:py-12"
    >
      <motion.div
        style={{ rotate: rotation }}
        className="pointer-events-none absolute left-[-10%] top-[15%] z-0 hidden h-[25rem] w-[25rem] opacity-[0.62] lg:block"
      >
        <img
          src={figuraGeometrica}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain [filter:brightness(0)_saturate(100%)_invert(70%)_sepia(34%)_saturate(1450%)_hue-rotate(328deg)_brightness(98%)_contrast(104%)_drop-shadow(0_0_12px_rgba(230,140,102,0.16))]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.08 }}
            viewport={viewport}
            className="max-w-[35rem] font-sans text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#201614] sm:text-[2.65rem] lg:text-[3.1rem]"
          >
            Las soluciones se diseñan para campo, no para una presentación.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.16 }}
            viewport={viewport}
            className="mt-6 max-w-[33rem] text-[0.98rem] font-semibold leading-[1.56] text-[#201614]/78 sm:text-[1rem]"
          >
            En agroindustria y minería, cada decisión financiera termina
            impactando compras, turnos, pagos, permisos y relaciones de
            confianza. Por eso integramos herramientas que puedan sostener la
            operación diaria.
          </motion.p>

          <div className="mt-8 grid gap-4">
            {metrics.map((metric, index) => (
              <motion.article
                key={metric.value}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ ...reveal, delay: 0.2 + index * 0.08 }}
                viewport={viewport}
                className="grid grid-cols-[3.7rem_1fr] items-center gap-4 rounded-[1.35rem] bg-white/78 px-5 py-4 shadow-[0_14px_40px_rgba(23,15,8,0.08)]"
              >
                <span className="font-sans text-[2.25rem] font-extrabold leading-none tracking-[-0.07em] text-[#d67b45]">
                  {metric.value}
                </span>
                <p className="text-[0.9rem] font-semibold leading-[1.45] text-[#201614]/78">
                  {metric.label}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: 0.14 }}
          viewport={viewport}
          className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-end"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(23,15,8,0.13)]">
            <img
              src={siembraAgrominera}
              alt="Operación agrícola vista desde arriba"
              className="h-[24rem] w-full object-cover object-center sm:h-[29rem]"
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(23,15,8,0.13)] sm:translate-y-8">
            <img
              src={agromineria}
              alt="Cosecha y transferencia de carga en operación agroindustrial"
              className="h-[20rem] w-full object-cover object-center sm:h-[25rem]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
