import { motion } from 'motion/react'
import agromineria from '@/assets/agromineria.webp'
import tresImagenes from '@/assets/tres-imagenes.webp'

const viewport = { once: true, amount: 0.24 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const presenceItems = [
  'Agroindustria y cadenas productivas con operación en campo.',
  'Minería y sectores con exigencia de trazabilidad y cumplimiento.',
  'Empresas que necesitan ordenar pagos, liquidez y control operativo.',
]

export function ContactPresenceSection() {
  return (
    <section className="bg-[#ef8f8d] py-18 text-white sm:py-22 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={reveal}
            viewport={viewport}
            className="inline-flex rounded-full border border-white/24 bg-white/10 px-4 py-2 text-[0.74rem] font-extrabold uppercase tracking-[0.22em] text-white/88"
          >
            Cobertura
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.08 }}
            viewport={viewport}
            className="mt-6 max-w-[31rem] font-sans text-[2.7rem] font-extrabold leading-[0.94] tracking-[-0.06em] text-[#783112] sm:text-[3.35rem] lg:text-[4rem]"
          >
            La confianza se construye cerca de la operación.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.16 }}
            viewport={viewport}
            className="mt-6 max-w-[32rem] text-[0.98rem] font-semibold leading-[1.56] text-white/88 sm:text-[1rem]"
          >
            Atendemos conversaciones donde el territorio importa: necesidades
            de capital, pagos, documentación, riesgo regulatorio y operación
            diaria.
          </motion.p>

          <div className="mt-8 space-y-4">
            {presenceItems.map((item, index) => (
              <motion.article
                key={item}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ ...reveal, delay: 0.2 + index * 0.08 }}
                viewport={viewport}
                className="rounded-[1.35rem] border border-white/12 bg-[rgba(132,45,20,0.15)] px-5 py-5 backdrop-blur-[2px]"
              >
                <p className="text-[0.92rem] font-semibold leading-[1.48] text-white/86">
                  {item}
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
          className="grid gap-4 sm:grid-cols-[1.08fr_0.92fr] sm:items-end"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-[0_28px_80px_rgba(95,31,14,0.18)]">
            <img
              src={tresImagenes}
              alt="Sectores productivos de agro, minería e industria"
              className="h-[24rem] w-full object-cover object-center sm:h-[34rem]"
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-[0_28px_80px_rgba(95,31,14,0.18)] sm:translate-y-8">
            <img
              src={agromineria}
              alt="Operación agroindustrial con movimiento de carga"
              className="h-[20rem] w-full object-cover object-center sm:h-[28rem]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
