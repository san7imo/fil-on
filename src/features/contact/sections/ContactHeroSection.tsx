import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import fondoHeroFooter from '@/assets/fondoheroyfooter.webp'
import figuraGeometrica from '@/assets/figurageometrica.webp'

export function ContactHeroSection() {
  const rotation = useMotionValue(0)
  const opacity = useMotionValue(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    const rotateControls = animate(rotation, 980, {
      duration: 3.1,
      ease: [0.22, 1, 0.36, 1],
    })
    const opacityControls = animate(opacity, 0.48, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    })

    return () => {
      rotateControls.stop()
      opacityControls.stop()
    }
  }, [opacity, rotation])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? latest
    const delta = latest - previous
    rotation.set(rotation.get() + delta * 0.16)
  })

  return (
    <section className="relative isolate flex min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img
          src={fondoHeroFooter}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(45,20,9,0.82)_0%,rgba(112,50,20,0.58)_42%,rgba(230,142,88,0.24)_72%,rgba(255,255,255,0.02)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_24%,rgba(255,236,216,0.22),transparent_25%)]" />

      <motion.img
        src={figuraGeometrica}
        alt=""
        aria-hidden="true"
        style={{ rotate: rotation, opacity }}
        className="pointer-events-none absolute right-[-9%] top-[17%] z-0 hidden w-[42vw] max-w-[560px] min-w-[340px] [filter:brightness(1.18)_contrast(1.08)_drop-shadow(0_0_1.2px_rgba(255,255,255,0.95))_drop-shadow(0_0_16px_rgba(255,255,255,0.1))] lg:block"
      />

      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] items-center px-5 pb-20 pt-[8.6rem] sm:px-6 sm:pt-[9.2rem] lg:px-7 lg:pb-24 lg:pt-[10rem]">
        <div className="grid w-full gap-10 lg:grid-cols-[0.96fr_0.56fr] lg:items-end">
          <div className="relative z-10 max-w-[52rem] lg:pl-[6.5rem]">
            <motion.h1
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.15, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[45rem] font-sans text-[2.95rem] font-extrabold leading-[0.94] tracking-[-0.06em] text-white sm:text-[3.75rem] lg:text-[4.55rem]"
            >
              <span className="block">Hablemos de</span>
              <span className="block">operación, capital</span>
              <span className="block">y territorio.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -34 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[39rem] text-[1rem] font-semibold leading-[1.55] text-white sm:text-[1.06rem]"
            >
              Abrimos conversaciones serias para entender necesidades de
              liquidez, pagos, tecnología, cumplimiento y ejecución en campo.
              La respuesta empieza con contexto.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="mailto:contacto@fil-ontech.com"
                className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-[#7b3412] transition hover:brightness-[0.98]"
              >
                ESCRIBIR AL EQUIPO &gt;
              </a>
              <Link
                to="/servicios"
                className="inline-flex min-h-11 items-center rounded-full border border-white/32 bg-white/10 px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-white transition hover:bg-white/14"
              >
                VER SOLUCIONES &gt;
              </Link>
            </motion.div>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 hidden rounded-[1.8rem] border border-white/14 bg-[rgba(255,255,255,0.1)] px-6 py-6 text-white shadow-[0_26px_60px_rgba(39,17,7,0.18)] backdrop-blur-[3px] lg:block"
          >
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-white/72">
              Respuesta
            </p>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-[1.72rem] font-extrabold leading-none tracking-[-0.06em]">
                  Contexto primero
                </p>
                <p className="mt-2 text-[0.88rem] font-semibold leading-[1.5] text-white/78">
                  Sector, ubicación, necesidad y restricciones operativas.
                </p>
              </div>
              <div className="h-px bg-white/14" />
              <div>
                <p className="text-[1.72rem] font-extrabold leading-none tracking-[-0.06em]">
                  Ruta clara
                </p>
                <p className="mt-2 text-[0.88rem] font-semibold leading-[1.5] text-white/78">
                  Canalizamos la conversación hacia capital, tecnología o cumplimiento.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
