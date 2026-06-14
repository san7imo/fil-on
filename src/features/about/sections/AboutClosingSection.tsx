import { motion } from 'motion/react'
import agromineriaSembradora from '@/assets/agromineria-sembradora.webp'
import { siteConfig } from '@/shared/config/site'

const viewport = { once: true, amount: 0.28 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const whatsappHref = `https://wa.me/${siteConfig.phoneHref.replace(/\D/g, '')}`

export function AboutClosingSection() {
  return (
    <section className="relative isolate flex min-h-[42vh] items-center overflow-hidden py-10 sm:py-12 lg:py-14">
      <div className="absolute inset-0 -z-20">
        <img
          src={agromineriaSembradora}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(24,12,7,0.72)_0%,rgba(24,12,7,0.48)_42%,rgba(24,12,7,0.3)_100%)]" />

      <div className="mx-auto flex w-full max-w-[1180px] justify-end px-5 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="max-w-[40rem] px-7 py-7 text-white sm:px-9 sm:py-8"
        >
          <h2 className="font-sans text-[2.05rem] font-extrabold leading-[0.94] tracking-[-0.055em] sm:text-[2.45rem] lg:text-[2.9rem]">
            La confianza se construye cuando la estrategia sí llega a la operación.
          </h2>
          <p className="mt-5 max-w-[33rem] text-[0.98rem] font-semibold leading-[1.56] text-white/84 sm:text-[1rem]">
            Si tu operación necesita una estructura más clara para crecer con
            control, Fil-On Tech puede ayudarte a conectar visión, ejecución y
            acompañamiento real.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-white/28 bg-white/8 px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-white transition hover:bg-white/14"
            >
              IR A WHATSAPP &gt;
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
