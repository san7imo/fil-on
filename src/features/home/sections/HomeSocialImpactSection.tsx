import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import fondoResponsabilidad from '@/assets/fondoresponsabilidadsocial.webp'
import figuraGeometrica from '@/assets/figurageometrica.webp'
import manoResponsabilidad from '@/assets/manoresponsabilidadsocial.webp'

const viewport = { once: true, amount: 0.3 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

export function HomeSocialImpactSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden py-16 sm:py-20 lg:h-screen lg:py-0">
      <div className="absolute inset-0 -z-20">
        <img
          src={fondoResponsabilidad}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(37,19,8,0.1)_0%,rgba(37,19,8,0.12)_100%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] items-center justify-center px-5 sm:px-6 lg:h-full lg:px-8">
        <div className="relative w-full max-w-[600px] lg:max-w-[620px]">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={reveal}
            viewport={viewport}
            className="pointer-events-none absolute bottom-[-1%] right-[-8%] z-[5] hidden w-[49%] lg:block"
          >
            <img
              src={manoResponsabilidad}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain object-bottom opacity-48 blur-[12px] grayscale contrast-[1.06]"
            />
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.1 }}
            viewport={viewport}
            className="relative z-10 min-h-[27.2rem] overflow-hidden rounded-[1.7rem] bg-[#eb8f8d] px-8 py-7 shadow-[0_28px_80px_rgba(31,12,3,0.16)] sm:px-10 sm:py-8 lg:min-h-[28.4rem] lg:px-8 lg:py-8"
          >
            <span className="absolute left-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-[#d86d33] text-[1.25rem] leading-none text-[#efb0a7]">
              ★
            </span>

            <div className="relative z-30 max-w-[19rem] pt-2 lg:max-w-[19.5rem]">
              <h2 className="font-sans text-[2.85rem] font-extrabold uppercase leading-[0.9] tracking-[-0.06em] text-[#d86d33] sm:text-[3.3rem] lg:text-[3.45rem]">
                <span className="block">Responsabilidad</span>
                <span className="block">SOCIAL</span>
              </h2>

              <p className="mt-4 max-w-[16rem] text-[0.98rem] font-bold leading-[1.08] text-white sm:text-[1.02rem]">
                Generamos impacto donde nace el desarrollo.
              </p>
              <p className="mt-2 max-w-[17.4rem] text-[0.93rem] font-semibold leading-[1.28] text-white sm:text-[0.96rem]">
                Construimos oportunidades sostenibles para comunidades y
                territorios con iniciativas ambientales, inclusión financiera,
                acceso a salud y proyectos sociales.
              </p>

              <Link
                to="/somos"
                className="mt-5 inline-flex min-h-9 items-center rounded-[0.6rem] bg-[#d86d33] px-4 text-[0.72rem] font-bold uppercase italic tracking-[-0.02em] text-[#f8d7c1] transition hover:brightness-[1.04]"
              >
                CONOCE IMPACTO &gt;
              </Link>
            </div>

            <span className="pointer-events-none absolute bottom-[-1.05rem] left-1/2 z-10 -translate-x-1/2 font-sans text-[4.3rem] font-extrabold uppercase leading-none tracking-[-0.08em] text-white/28 sm:text-[5.1rem] lg:text-[5.55rem]">
              ROOT
            </span>

            <div className="pointer-events-none absolute bottom-0 right-[-2%] z-20 w-[49%]">
              <img
                src={manoResponsabilidad}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain object-bottom opacity-[0.88] [filter:sepia(0.18)_saturate(0.9)_brightness(0.82)_contrast(1.08)] mix-blend-multiply"
              />
            </div>

            <div className="pointer-events-none absolute bottom-[-8%] right-[-31%] z-30 w-[72%]">
              <img
                src={figuraGeometrica}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain opacity-[0.88] [filter:brightness(2.7)_contrast(0.78)]"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
