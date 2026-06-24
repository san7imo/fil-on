import { useRef } from 'react'
import { motion, type MotionValue, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import fondoGeometrico from '@/assets/figurageometricas-porque.webp'
import iconOperacion from '@/assets/iconos-cards/23Recurso 47 (1).png'
import iconTecnologia from '@/assets/iconos-cards/11Recurso 23.png'
import iconLogistica from '@/assets/iconos-cards/11Recurso 11 (1).png'
import iconCumplimiento from '@/assets/iconos-cards/11Recurso 35 (1).png'
import { cn } from '@/shared/lib/cn'

const viewport = { once: true, amount: 0.28 }
const reveal = {
  duration: 1.35,
  ease: [0.16, 1, 0.3, 1] as const,
}

const cards = [
  {
    title: 'Operación',
    icon: iconOperacion,
    iconClassName: 'right-[-2.7rem] top-[-2.6rem] h-28 w-28 opacity-45 sm:h-32 sm:w-32',
    className: 'min-h-[13rem] lg:min-h-0',
    titleClassName:
      'bottom-1 left-7 text-[3.35rem] tracking-[-0.08em] sm:text-[4.15rem] lg:text-[4.7rem]',
  },
  {
    title: 'Tecnología',
    icon: iconTecnologia,
    iconClassName: 'bottom-[-3.6rem] right-[-3.4rem] h-36 w-36 opacity-42 sm:h-44 sm:w-44',
    className: 'min-h-[17rem] lg:min-h-0',
    titleClassName:
      'left-6 top-5 text-[3.05rem] tracking-[-0.08em] sm:text-[4.2rem] lg:text-[4.65rem]',
  },
  {
    title: 'Logística',
    icon: iconLogistica,
    iconClassName: 'right-[-4.5rem] top-[-4.25rem] h-44 w-44 opacity-44 sm:h-52 sm:w-52',
    className: 'min-h-[32rem] overflow-hidden lg:min-h-0',
    titleClassName:
      'left-4 top-1/2 -translate-y-1/2 text-[3rem] tracking-[-0.08em] [writing-mode:vertical-rl] [text-orientation:mixed] sm:text-[3.45rem] lg:text-[4.25rem]',
  },
  {
    title: 'Cumplimiento',
    icon: iconCumplimiento,
    iconClassName: 'left-[-3.1rem] top-[-3rem] h-32 w-32 opacity-43 sm:h-40 sm:w-40',
    className: 'min-h-[12rem] lg:min-h-0',
    titleClassName:
      'bottom-1 right-5 text-[2.45rem] tracking-[-0.08em] sm:text-[3.25rem] lg:text-[3.85rem]',
  },
]

export function ServicesArchitectureSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section
      ref={sectionRef}
      id="aliados"
      className="bg-[#f7f5f2] py-14 sm:py-16 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:py-8"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col px-5 sm:px-6 lg:h-full lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="mx-auto max-w-[74rem] text-center font-sans text-[1.85rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#ea928d] sm:text-[2.25rem] lg:text-[2.65rem] xl:text-[2.9rem]"
        >
          Soluciones que conectan, activan y hacen crecer el ecosistema minero.
        </motion.h2>

        <div className="mt-5 grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4 lg:min-h-0 lg:grid-rows-[0.28fr_0.72fr]">
            <ServiceGhostCard {...cards[0]} delay={0.06} iconRotate={iconRotate} />
            <ServiceGhostCard {...cards[2]} delay={0.16} iconRotate={iconRotate} />
          </div>

          <div className="grid gap-4 lg:min-h-0 lg:grid-rows-[0.6fr_0.4fr]">
            <ServiceGhostCard {...cards[1]} delay={0.12} iconRotate={iconRotate} />
            <ServiceGhostCard {...cards[3]} delay={0.22} iconRotate={iconRotate} />
          </div>
        </div>

        <motion.div className="relative mt-4 px-2 sm:mt-5 lg:px-0">
          <div className="overflow-hidden rounded-r-full rounded-l-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.55, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              viewport={viewport}
              style={{ originX: 0 }}
              className="will-change-transform"
            >
              <Link
                to="/contacto"
                className="relative flex h-[2.35rem] w-full items-center justify-end overflow-hidden rounded-r-full rounded-l-[2px] bg-[linear-gradient(90deg,#75310f_0%,#b8521d_42%,#df9154_76%,#edd4b8_100%)] px-6 pr-24 text-[0.92rem] font-medium uppercase italic tracking-[-0.03em] text-white transition hover:brightness-[1.03]"
              >
                <motion.span
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  transition={{ duration: 1.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                  viewport={viewport}
                  className="absolute inset-y-0 left-0 z-0 w-[42%] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.28)_58%,rgba(255,255,255,0)_100%)]"
                />
                <img
                  src={fondoGeometrico}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 z-0 h-full w-full object-cover opacity-[0.08] mix-blend-screen"
                />
                <span className="relative z-10 whitespace-nowrap">CONVERSEMOS &gt;</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

type ServiceGhostCardProps = {
  title: string
  icon: string
  iconClassName?: string
  iconRotate: MotionValue<number>
  className: string
  titleClassName: string
  delay?: number
}

function ServiceGhostCard({
  title,
  icon,
  iconClassName,
  iconRotate,
  className,
  titleClassName,
  delay = 0,
}: ServiceGhostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...reveal, delay: 0.18 + delay }}
      viewport={viewport}
      className={cn(
        'relative overflow-hidden rounded-[1.8rem] bg-[#f1efec] px-6 py-5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset] transition duration-300 ease-out hover:-translate-y-0.5',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute font-sans font-extrabold uppercase text-white/72',
          titleClassName,
        )}
      >
        {title}
      </span>

      <motion.img
        src={icon}
        alt=""
        aria-hidden="true"
        style={{ rotate: iconRotate }}
        className={cn(
          'pointer-events-none absolute z-10 object-contain mix-blend-multiply',
          iconClassName,
        )}
      />
    </motion.article>
  )
}
