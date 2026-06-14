import { useEffect } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import figuraGeometrica from '@/assets/figurageometrica.webp'
import mina from '@/assets/mina.webp'

export function QuoteHeroSection() {
  const rotation = useMotionValue(0)
  const opacity = useMotionValue(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    const rotateControls = animate(rotation, 980, {
      duration: 3.1,
      ease: [0.22, 1, 0.36, 1],
    })
    const opacityControls = animate(opacity, 0.5, {
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
          src={mina}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(104deg,rgba(59,24,9,0.86)_0%,rgba(124,55,18,0.6)_43%,rgba(236,151,94,0.22)_76%,rgba(255,255,255,0.04)_100%)]" />

      <motion.img
        src={figuraGeometrica}
        alt=""
        aria-hidden="true"
        style={{ rotate: rotation, opacity }}
        className="pointer-events-none absolute right-[-9%] top-[17%] z-0 hidden w-[42vw] max-w-[560px] min-w-[340px] [filter:brightness(1.18)_contrast(1.08)_drop-shadow(0_0_1.2px_rgba(255,255,255,0.95))_drop-shadow(0_0_16px_rgba(255,255,255,0.1))] lg:block"
      />

      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] items-center px-5 pb-18 pt-[8.2rem] sm:px-6 sm:pt-[9rem] lg:px-7 lg:pb-22 lg:pt-[9.5rem]">
        <div className="relative z-10 max-w-[57rem] lg:pl-[6.5rem]">
            <motion.h1
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.15, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[50rem] font-sans text-[2.85rem] font-extrabold leading-[0.94] tracking-[-0.06em] text-white sm:text-[3.65rem] lg:text-[4.8rem]"
            >
              Centro de Inteligencia Fil-On.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -34 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[42rem] text-[0.98rem] font-semibold leading-[1.55] text-white/90 sm:text-[1.06rem]"
            >
              Actualidad, tendencias, análisis e indicadores de mercado para
              impulsar la transformación del ecosistema agrominero.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#metales-preciosos"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-[0.78rem] font-extrabold uppercase tracking-[-0.03em] text-[#783112] transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#f7f5f2]"
              >
                Indicadores de mercado
              </a>
              <a
                href="#agronomicos"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/34 bg-white/8 px-6 py-3 text-[0.78rem] font-extrabold uppercase tracking-[-0.03em] text-white backdrop-blur-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/14"
              >
                Insumos informativos
              </a>
            </motion.div>
        </div>
      </div>
    </section>
  )
}
