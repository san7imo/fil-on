import { motion } from 'motion/react'
import siembra from '@/assets/siembra.webp'

const viewport = { once: true, amount: 0.28 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const principles = [
  {
    label: 'Territorio',
  },
  {
    label: 'Control',
  },
  {
    label: 'Confianza',
  },
]

export function AboutNarrativeSection() {
  return (
    <section className="flex min-h-screen items-center bg-[#f7f5f2] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="relative overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(23,15,8,0.14)]"
        >
          <img
            src={siembra}
            alt="Paisaje agrícola al atardecer"
            className="h-[23rem] w-full object-cover object-center sm:h-[28rem] lg:h-[34rem]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,12,7,0.04)_0%,rgba(22,12,7,0.16)_100%)]" />
        </motion.div>

        <div className="lg:pl-6">
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.08 }}
            viewport={viewport}
            className="max-w-[36rem] font-sans text-[2.2rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#201614] sm:text-[2.65rem] lg:text-[3.1rem]"
          >
            Acompañamos operaciones donde la confianza se prueba todos los días.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.16 }}
            viewport={viewport}
            className="mt-6 max-w-[31rem] text-[0.98rem] font-semibold leading-[1.58] text-[#201614]/88 sm:text-[1rem]"
          >
            Fil-On Tech nace para responder a una necesidad concreta: llevar
            soluciones financieras, tecnológicas y de cumplimiento a sectores
            donde la operación depende de coordinación, trazabilidad y capacidad
            de ejecución sobre territorios.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.24 }}
            viewport={viewport}
            className="mt-4 max-w-[31rem] text-[0.94rem] font-semibold leading-[1.55] text-[#201614]/76 sm:text-[0.98rem]"
          >
            Trabajamos con una lectura transversal entre los sectores mineros y
            agroindustriales para convertir necesidades complejas en estructuras
            más simples, seguras y sostenibles.
          </motion.p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {principles.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...reveal, delay: 0.18 + index * 0.08 }}
                viewport={viewport}
                className="flex min-h-[6rem] items-center justify-center rounded-[1.4rem] bg-white/78 px-5 py-5 shadow-[0_14px_40px_rgba(23,15,8,0.08)]"
              >
                <p className="text-center text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-[#d67b45]">
                  {item.label}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
