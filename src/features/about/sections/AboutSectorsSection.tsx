import { motion } from 'motion/react'
import tresImagenes from '@/assets/tres-imagenes.webp'

const viewport = { once: true, amount: 0.26 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const sectors = [
  {
    title: 'Agroindustria',
    text: 'Soluciones para operaciones que requieren liquidez, dispersión y orden en campo.',
  },
  {
    title: 'Minería',
    text: 'Herramientas para trazabilidad, control y cumplimiento en cadenas sensibles.',
  },
]

export function AboutSectorsSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#ef8f8d] py-12 text-white sm:py-14 lg:h-screen lg:py-12">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-5 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: 0.08 }}
          viewport={viewport}
          className="mx-auto max-w-[52rem] text-center font-sans text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#783112] sm:text-[2.6rem] lg:text-[3.05rem]"
        >
          Integramos sectores que rara vez se entienden desde una misma lógica.
        </motion.h2>

        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <div className="grid gap-3 lg:h-[32rem] lg:grid-rows-2">
            {sectors.map((sector, index) => (
              <motion.article
                key={sector.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ ...reveal, delay: 0.18 + index * 0.08 }}
                viewport={viewport}
                className="flex min-h-[8.5rem] flex-col justify-center rounded-[1.35rem] border border-white/12 bg-[rgba(132,45,20,0.16)] px-5 py-5 backdrop-blur-[2px] lg:min-h-0"
              >
                <p className="text-[1.02rem] font-extrabold uppercase tracking-[-0.03em] text-white">
                  {sector.title}
                </p>
                <p className="mt-2 max-w-[25rem] text-[0.9rem] font-semibold leading-[1.45] text-white/82">
                  {sector.text}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.14 }}
            viewport={viewport}
            className="relative overflow-hidden rounded-[2rem] shadow-[0_28px_80px_rgba(95,31,14,0.18)] lg:h-[32rem]"
          >
            <img
              src={tresImagenes}
              alt="Personas y sectores productivos de agro y minería"
              className="h-[24rem] w-full object-cover object-center sm:h-[30rem] lg:h-full"
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: 0.16 }}
          viewport={viewport}
          className="mx-auto max-w-[45rem] text-center text-[0.98rem] font-semibold leading-[1.56] text-white/90 sm:text-[1rem]"
        >
          Fil-On opera en la intersección entre territorio, operación y
          capacidad técnica. Esa lectura cruzada nos permite construir una
          propuesta más útil para actores que no pueden detenerse.
        </motion.p>
      </div>
    </section>
  )
}
