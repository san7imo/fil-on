import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import fondoHeroFooter from '@/assets/fondoheroyfooter.webp'
import { siteConfig } from '@/shared/config/site'

const viewport = { once: true, amount: 0.28 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

export function ContactClosingSection() {
  return (
    <section className="relative isolate overflow-hidden py-18 sm:py-22 lg:py-24">
      <div className="absolute inset-0 -z-20">
        <img
          src={fondoHeroFooter}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(94deg,rgba(61,25,10,0.78)_0%,rgba(127,56,19,0.5)_45%,rgba(245,207,176,0.18)_100%)]" />

      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="max-w-[47rem] text-white"
        >
          <h2 className="font-sans text-[2.75rem] font-extrabold leading-[0.92] tracking-[-0.06em] sm:text-[3.45rem] lg:text-[4.15rem]">
            Una buena conversación empieza con el problema correcto.
          </h2>
          <p className="mt-5 max-w-[35rem] text-[0.98rem] font-semibold leading-[1.56] text-white/84 sm:text-[1rem]">
            Comparte el contexto de tu operación y revisamos qué ruta tiene
            más sentido: capital, tecnología, cumplimiento o una combinación
            de capacidades.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-[#7b3412] transition hover:brightness-[0.98]"
            >
              ENVIAR CORREO &gt;
            </a>
            <Link
              to="/cotizaciones"
              className="inline-flex min-h-11 items-center rounded-full border border-white/28 bg-white/8 px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-white transition hover:bg-white/14"
            >
              VER COTIZACIONES &gt;
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
