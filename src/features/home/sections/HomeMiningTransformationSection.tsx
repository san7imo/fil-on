import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import escudoTransformando from '@/assets/escudotransformando.webp'
import figuraGeometrica from '@/assets/figurageometrica.webp'

const viewport = { once: true, amount: 0.28 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const metrics = [
  {
    target: 73,
    prefix: '',
    suffix: 'K+',
    decimals: 0,
    label: 'Mineros de Subsistencia',
    delay: 0.18,
  },
  {
    target: 20,
    prefix: '',
    suffix: 'K+',
    decimals: 0,
    label: 'Participantes Ecosistema',
    delay: 0.28,
  },
  {
    target: 2.6,
    prefix: '$',
    suffix: 'B',
    decimals: 1,
    label: 'Volumen Anual de Oro',
    delay: 0.38,
  },
  {
    target: 15,
    prefix: '',
    suffix: '%',
    decimals: 0,
    label: 'Crecimiento Esperado',
    delay: 0.48,
  },
]

export function HomeMiningTransformationSection() {
  return (
    <section className="bg-[#f7f5f2] py-18 sm:py-22 lg:h-screen lg:min-h-screen lg:overflow-hidden lg:py-0">
      <div className="mx-auto flex w-full max-w-[980px] px-5 sm:px-6 lg:h-full lg:items-center lg:px-0">
        <div className="grid gap-14 lg:w-full lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={reveal}
              viewport={viewport}
              className="max-w-[24rem] font-sans text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.06em] text-[#231716] sm:text-[4rem] lg:text-[4.3rem]"
            >
              <span className="block">Transformando</span>
              <span className="block">el Sector Minero</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...reveal, delay: 0.14 }}
              viewport={viewport}
              className="mt-6 max-w-[25rem] text-[1rem] font-semibold leading-[1.5] text-[#231716] sm:text-[1.02rem]"
            >
              Impulsamos un ecosistema más seguro, trazable y sostenible con
              tecnología, inclusión financiera y herramientas que fortalecen la
              operación minera.
            </motion.p>

            <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 lg:mt-16 lg:gap-x-10">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...reveal, delay: 0.22 }}
            viewport={viewport}
            className="relative mx-auto w-full max-w-[22rem] lg:max-w-[24rem]"
          >
            <img
              src={figuraGeometrica}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-10%] z-0 h-[120%] w-[120%] object-contain opacity-[0.22] [filter:brightness(2.8)_contrast(0.72)]"
            />

            <motion.img
              src={escudoTransformando}
              alt="Escudo del sector minero"
              whileHover={{
                rotate: [0, -1.6, 1.6, -1.2, 1.2, 0],
                x: [0, -2, 2, -1, 1, 0],
                y: [0, 1, -1, 1, -1, 0],
              }}
              transition={{
                duration: 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 mx-auto w-full max-w-[22rem] drop-shadow-[0_22px_40px_rgba(0,0,0,0.18)] lg:max-w-[24rem]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

type MetricCardProps = {
  target: number
  prefix: string
  suffix: string
  decimals: number
  label: string
  delay: number
}

function MetricCard({
  target,
  prefix,
  suffix,
  decimals,
  label,
  delay,
}: MetricCardProps) {
  const ref = useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return
    }

    const duration = 1800
    const start = performance.now()
    let frameId = 0

    const updateValue = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) * (1 - progress)
      setDisplayValue(target * eased)

      if (progress < 1) {
        frameId = window.requestAnimationFrame(updateValue)
      }
    }

    frameId = window.requestAnimationFrame(updateValue)

    return () => window.cancelAnimationFrame(frameId)
  }, [isInView, target])

  const formattedValue =
    decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toString()

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...reveal, delay }}
      viewport={viewport}
      className="min-w-0"
    >
      <p className="font-sans text-[2.2rem] font-extrabold leading-none tracking-[-0.06em] text-black sm:text-[2.55rem]">
        {prefix}
        {formattedValue}
        {suffix}
      </p>
      <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[-0.01em] text-black/90 sm:text-[0.62rem]">
        {label}
      </p>
      <div className="mt-2 h-[0.72rem] overflow-hidden rounded-full bg-[#ecd0b6]">
        <div
          className="h-full w-full rounded-full bg-[linear-gradient(90deg,#1f120d_0%,#5f2410_22%,#8f3f18_48%,#c46228_72%,#e29a63_100%)]"
        />
      </div>
    </motion.article>
  )
}
