import { useRef } from 'react'
import { motion, type MotionValue, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import fondoGeometrico from '@/assets/figurageometricas-porque.webp'
import iconCapital from '@/assets/iconos-cards/12Recurso 12.png'
import iconTech from '@/assets/iconos-cards/12Recurso 24.png'
import iconSecure from '@/assets/iconos-cards/12Recurso 36.png'
import iconMovimiento from '@/assets/iconos-cards/24Recurso 48.png'
import tarjetas from '@/assets/tarjetas.webp'
import { cn } from '@/shared/lib/cn'

const sectionViewport = { once: true, amount: 0.28 }
const slowReveal = {
  duration: 1.35,
  ease: [0.16, 1, 0.3, 1] as const,
}

const cards = [
  {
    title: 'Capital',
    icon: iconCapital,
    iconClassName: 'right-5 top-5',
    description: '',
    overlayDescription:
      'Donde los recursos se articulan inteligentemente para impulsar operaciones de alto impacto que ayuden al crecimiento del ecosistema minero.',
    className: 'min-h-[13rem] lg:min-h-0',
    titleClassName:
      'bottom-1 left-7 text-[4.15rem] tracking-[-0.08em] lg:text-[4.7rem]',
    contentClassName:
      'absolute left-[58%] right-6 top-1/2 max-w-[10.4rem] -translate-y-1/2 text-left lg:left-[56%] lg:right-8 lg:max-w-[11.2rem]',
    descriptionClassName:
      'text-[0.88rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[0.93rem] lg:text-[0.82rem]',
  },
  {
    title: 'Tech',
    icon: iconTech,
    iconClassName: 'bottom-5 left-5',
    description: '',
    overlayDescription:
      'Donde la inteligencia colectiva transforma el ecosistema minero en una red viva de valor y oportunidades. Transformamos la operación minera en acceso a liquidez y soluciones reales. En nuestro Hub conectamos créditos, pagos, rieles financieros y partners que activan el flujo del ecosistema minero y potencian a quienes lo construyen cada día en territorio.',
    className: 'min-h-[32rem] overflow-hidden lg:min-h-0',
    titleClassName:
      'left-6 top-5 text-[4.2rem] tracking-[-0.08em] lg:text-[5rem]',
    contentClassName: '',
    hasCardsImage: true,
    isTechCard: true,
    descriptionClassName:
      'text-[0.98rem] font-extrabold leading-[0.94] tracking-[-0.04em] sm:text-[1.08rem] lg:text-[0.92rem]',
  },
  {
    title: 'Secure',
    icon: iconSecure,
    iconClassName: 'left-5 top-5',
    description: '',
    overlayDescription:
      'Manejamos una plataforma que integra control, trazabilidad y cumplimiento normativo para garantizar operaciones seguras, transparentes y preparadas para escalar en un entorno cada vez más exigente.',
    className: 'min-h-[12rem] lg:min-h-0',
    titleClassName:
      'bottom-1 right-5 text-[4rem] tracking-[-0.08em] lg:text-[4.65rem]',
    contentClassName: 'absolute left-6 top-5 max-w-[14.9rem] lg:max-w-[15.4rem]',
    descriptionClassName:
      'text-[0.98rem] font-extrabold leading-[0.94] tracking-[-0.04em] sm:text-[1.08rem] lg:text-[0.92rem]',
  },
  {
    title: 'MOVI\nMIENTO',
    icon: iconMovimiento,
    iconClassName: 'bottom-5 right-5',
    description: '',
    overlayDescription:
      'Un laboratorio vivo de innovación para el ecosistema minero. Aquí no imaginamos el futuro. Lo construimos, lo probamos y lo activamos.',
    className: 'min-h-[11.8rem] justify-end lg:min-h-0',
    titleClassName:
      'left-5 top-5 whitespace-pre-line text-[3.75rem] leading-[0.9] tracking-[-0.08em] lg:text-[4.55rem]',
    contentClassName: '',
    isMotionCard: true,
  },
]

export function HomeIndustrialGridSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section ref={sectionRef} className="bg-[#f7f5f2] py-16 sm:py-20 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:py-8">
      <div className="mx-auto flex w-full max-w-[1110px] flex-col px-5 sm:px-6 lg:h-full lg:px-0">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={slowReveal}
          viewport={sectionViewport}
          className="text-center font-sans text-[2.3rem] font-extrabold tracking-[-0.05em] text-[#ea928d] sm:text-[2.9rem] lg:whitespace-nowrap lg:text-[2.9rem] lg:leading-none xl:text-[3.12rem]"
        >
          Sé parte de la revolución tecnológica agroMINERA
        </motion.h2>

        <div className="mt-8 grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4 lg:min-h-0 lg:grid-rows-[0.3fr_0.7fr]">
            <ServiceGhostCard {...cards[0]} delay={0.06} iconRotate={iconRotate} />
            <ServiceGhostCard {...cards[1]} delay={0.16} iconRotate={iconRotate} />
          </div>

          <div className="grid gap-4 lg:min-h-0 lg:grid-rows-[0.45fr_0.55fr]">
            <ServiceGhostCard {...cards[2]} delay={0.22} iconRotate={iconRotate} />
            <ServiceGhostCard {...cards[3]} delay={0.34} iconRotate={iconRotate} />
          </div>
        </div>

        <motion.div
          className="relative mt-4 px-2 sm:mt-5 lg:px-0"
        >
          <div className="overflow-hidden rounded-r-full rounded-l-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.55, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              viewport={sectionViewport}
              style={{ originX: 0 }}
              className="will-change-transform"
            >
              <Link
                to="/servicios"
                className="relative flex h-[2.35rem] w-full items-center justify-end overflow-hidden rounded-r-full rounded-l-[2px] bg-[linear-gradient(90deg,#75310f_0%,#b8521d_42%,#df9154_76%,#edd4b8_100%)] px-6 pr-24 text-[0.92rem] font-medium uppercase italic tracking-[-0.03em] text-white transition hover:brightness-[1.03]"
              >
                <motion.span
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  transition={{ duration: 1.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                  viewport={sectionViewport}
                  className="absolute inset-y-0 left-0 z-0 w-[42%] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.28)_58%,rgba(255,255,255,0)_100%)]"
                />
                <img
                  src={fondoGeometrico}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 z-0 h-full w-full object-cover opacity-[0.08] mix-blend-screen"
                />
                <span className="relative z-10 whitespace-nowrap">CONOCE MÁS &gt;</span>
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
  overlayDescription?: string
  className: string
  titleClassName: string
  hasCardsImage?: boolean
  isMotionCard?: boolean
  isTechCard?: boolean
  delay?: number
}

function ServiceGhostCard({
  title,
  icon,
  iconClassName,
  iconRotate,
  overlayDescription,
  className,
  titleClassName,
  hasCardsImage = false,
  isMotionCard = false,
  isTechCard = false,
  delay = 0,
}: ServiceGhostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...slowReveal, delay: 0.18 + delay }}
      viewport={sectionViewport}
      tabIndex={overlayDescription ? 0 : undefined}
      className={cn(
        'group relative overflow-hidden rounded-[1.8rem] bg-[#f1efec] px-6 py-5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset] transition duration-300 ease-out hover:-translate-y-0.5',
        overlayDescription &&
          'cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c3a15]/45',
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
          'pointer-events-none absolute z-10 h-12 w-12 object-contain opacity-75 mix-blend-multiply sm:h-14 sm:w-14',
          iconClassName,
        )}
      />

      {isTechCard ? (
        <div className="relative z-10 h-full min-h-[27rem] lg:min-h-0">
          <img
            src={tarjetas}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[12.2rem] w-[15.2rem] max-w-[76%] -translate-x-1/2 sm:top-[6.1rem] sm:w-[15.4rem] sm:max-w-[72%] lg:top-[5.25rem] lg:w-[16.2rem]"
          />
        </div>
      ) : isMotionCard ? (
        null
      ) : (
        null
      )}

      {hasCardsImage && !isTechCard ? (
        <img
          src={tarjetas}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-2 z-10 w-[18.5rem] max-w-[69%] lg:bottom-4 lg:right-2 lg:w-[20.5rem]"
        />
      ) : null}

      {overlayDescription ? (
        <div className="absolute inset-0 z-20 flex items-center overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(118,47,15,0.95)_0%,rgba(184,82,29,0.94)_42%,rgba(225,144,84,0.92)_100%)] px-6 py-6 opacity-0 backdrop-blur-[2px] transition duration-300 ease-out group-hover:opacity-100 group-focus:opacity-100 sm:px-8 sm:py-7">
          <p className="max-h-full w-full overflow-hidden font-sans text-[0.84rem] font-extrabold leading-[1.13] tracking-[-0.04em] text-white sm:text-[0.94rem] lg:text-[clamp(0.76rem,0.92vw,0.98rem)] xl:text-[1rem]">
            {overlayDescription}
          </p>
        </div>
      ) : null}
    </motion.article>
  )
}
