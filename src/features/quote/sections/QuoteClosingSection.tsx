import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import fondoHeroFooter from '@/assets/fondoheroyfooter.webp'

const viewport = { once: true, amount: 0.28 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

export function QuoteClosingSection() {
  return (
    <section className="relative isolate flex min-h-[50vh] overflow-hidden py-14 sm:py-16 lg:py-0">
      <div className="absolute inset-0 -z-20">
        <img
          src={fondoHeroFooter}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(94deg,rgba(61,25,10,0.78)_0%,rgba(127,56,19,0.5)_45%,rgba(245,207,176,0.18)_100%)]" />

      <div className="mx-auto flex w-full max-w-[1180px] items-center px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="max-w-[45rem] text-white"
        >
          <h2 className="font-sans text-[2.15rem] font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-[2.7rem] lg:text-[3.25rem]">
            Del precio de bolsa a una decisión operativa con respaldo.
          </h2>
          <p className="mt-5 max-w-[35rem] text-[0.92rem] font-semibold leading-[1.54] text-white/84 sm:text-[0.98rem]">
            Si una variación de mercado exige liquidez, control de pagos o
            lectura regulatoria, podemos revisar el contexto y estructurar una
            respuesta viable.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            viewport={viewport}
            style={{ originX: 0 }}
            className="mt-9 max-w-[42rem] overflow-hidden rounded-r-full rounded-l-[2px]"
          >
            <Link
              to="/contacto"
              className="relative flex h-[2.55rem] w-full items-center justify-end overflow-hidden rounded-r-full rounded-l-[2px] bg-[linear-gradient(90deg,#75310f_0%,#b8521d_42%,#df9154_76%,#edd4b8_100%)] px-6 pr-16 text-[0.9rem] font-medium uppercase italic tracking-[-0.03em] text-white transition hover:brightness-[1.03]"
            >
              HABLAR CON FIL-ON &gt;
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
