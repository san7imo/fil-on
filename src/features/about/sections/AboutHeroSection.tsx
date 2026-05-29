import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import figuraGeometrica from '@/assets/figurageometrica.webp'
import siembra from '@/assets/siembra.webp'

export function AboutHeroSection() {
  const rotation = useMotionValue(0)
  const opacity = useMotionValue(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    const rotateControls = animate(rotation, 1080, {
      duration: 3.2,
      ease: [0.22, 1, 0.36, 1],
    })
    const opacityControls = animate(opacity, 0.52, {
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
          src={siembra}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(88,33,12,0.84)_0%,rgba(137,61,23,0.54)_38%,rgba(246,215,187,0.18)_70%,rgba(255,255,255,0.06)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_28%,rgba(247,225,205,0.22),transparent_24%)]" />

      <motion.img
        src={figuraGeometrica}
        alt=""
        aria-hidden="true"
        style={{ rotate: rotation, opacity }}
        className="pointer-events-none absolute right-[-8%] top-[18%] z-0 hidden w-[42vw] max-w-[560px] min-w-[340px] [filter:brightness(1.16)_contrast(1.04)_drop-shadow(0_0_1.2px_rgba(255,255,255,0.9))_drop-shadow(0_0_16px_rgba(255,255,255,0.08))] lg:block"
      />

      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] items-center px-5 pb-20 pt-[8.6rem] sm:px-6 sm:pt-[9.2rem] lg:px-7 lg:pb-24 lg:pt-[10rem]">
        <div className="w-full">
        <div className="relative z-10 max-w-[50rem] lg:pl-[6.5rem]">
          <motion.h1
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.15, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[40rem] font-sans text-[2.55rem] font-extrabold leading-[0.94] tracking-[-0.06em] text-white sm:text-[3.15rem] lg:text-[3.8rem]"
          >
            <span className="block">Infraestructura y presencia</span>
            <span className="block">para la economía real.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-[38rem] text-[1rem] font-semibold leading-[1.54] text-white sm:text-[1.06rem]"
          >
            En Fil-On Tech conectamos capital, tecnología, control operativo y
            cumplimiento para acompañar a las industrias estratégicas que
            sostienen territorios, activan cadenas productivas y requieren
            ejecución confiable en campo.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.92, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-[40rem] text-[0.96rem] font-semibold leading-[1.5] text-white/88 sm:text-[1rem]"
          >
            No operamos desde la distancia. Diseñamos soluciones para el
            territorio, con una lectura práctica del riesgo, la trazabilidad y
            la velocidad que exige la operación real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              to="/contacto"
              className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-[#7b3412] transition hover:brightness-[0.98]"
            >
              HABLAR CON FIL-ON &gt;
            </Link>
            <Link
              to="/servicios"
              className="inline-flex min-h-11 items-center rounded-full border border-white/32 bg-white/10 px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-white transition hover:bg-white/14"
            >
              VER SOLUCIONES &gt;
            </Link>
          </motion.div>
        </div>

        </div>
      </div>
    </section>
  )
}
