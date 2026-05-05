import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import fondoHero from '@/assets/fondoheroyfooter.webp'
import figuraGeometrica from '@/assets/figurageometrica.webp'

export function HomeHeroSection() {
  const rotation = useMotionValue(0)
  const opacity = useMotionValue(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    const rotateControls = animate(rotation, 1080, {
      duration: 3.2,
      ease: [0.22, 1, 0.36, 1],
    })
    const opacityControls = animate(opacity, 0.58, {
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
          src={fondoHero}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(108,35,11,0.62)_0%,rgba(171,90,34,0.34)_38%,rgba(255,255,255,0)_76%)]" />

      <motion.img
        src={figuraGeometrica}
        alt=""
        aria-hidden="true"
        style={{ rotate: rotation, opacity }}
        onHoverStart={() => {
          animate(rotation, rotation.get() + 180, {
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          })
        }}
        className="absolute right-[-10%] top-[20%] z-0 hidden w-[42vw] max-w-[585px] min-w-[360px] cursor-pointer opacity-58 [filter:brightness(1.18)_contrast(1.08)_drop-shadow(0_0_1.2px_rgba(255,255,255,0.95))_drop-shadow(0_0_10px_rgba(255,255,255,0.08))] lg:block"
      />

      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] items-center px-5 pb-20 pt-[8.4rem] sm:px-6 sm:pt-[9.1rem] lg:px-7 lg:pb-24 lg:pt-[10rem]">
        <div className="relative z-10 max-w-[47rem] lg:pl-[6.5rem]">
          <motion.h1
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[2.8rem] font-extrabold leading-[0.96] tracking-[-0.06em] text-white sm:text-[3.55rem] lg:text-[4.2rem]"
          >
            <span className="block">Para que todo</span>
            <span className="block">
              siga en <span className="font-extrabold">MOVIMIENTO</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[42rem] text-[0.98rem] font-semibold leading-[1.42] text-white sm:text-[1.02rem]"
          >
            En Fil-on Tech impulsamos la transformación del ecosistema
            agrominero con soluciones financieras y tecnológicas que facilitan
            la comercialización, la inversión y el acceso a nuevos mercados.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.92, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[42rem] text-[0.98rem] font-semibold leading-[1.42] text-white sm:text-[1.02rem]"
          >
            Unimos innovación, seguridad y visión estratégica para desarrollar
            herramientas que fortalezcan la operación, mejoren la trazabilidad
            y generen crecimiento sostenible en Latinoamérica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9"
          >
            <Link
              to="/somos"
              className="inline-flex items-center text-[0.92rem] font-medium uppercase italic tracking-[-0.02em] text-white/92 transition hover:text-white"
            >
              Conoce cómo trabajamos
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
