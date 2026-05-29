import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import fondoGeometrico from '@/assets/figurageometricas-porque.webp'
import tarjetas from '@/assets/tarjetas.webp'
import { cn } from '@/shared/lib/cn'

const viewport = { once: true, amount: 0.28 }
const reveal = {
  duration: 1.35,
  ease: [0.16, 1, 0.3, 1] as const,
}

const cards = [
  {
    title: 'Capital',
    description:
      'Liquidez, tecnología y cumplimiento integrados para operar con control y trazabilidad.',
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
    description:
      'Soluciones de tecnología financiera y de gestión para potenciar el sector agrominero.',
    className: 'min-h-[17rem] lg:min-h-0',
    titleClassName:
      'left-6 top-5 text-[4.2rem] tracking-[-0.08em] lg:text-[4.95rem]',
    contentClassName:
      'absolute left-[7.3rem] top-[7.6rem] right-6 max-w-[18rem] lg:left-[7.8rem] lg:top-[8.2rem] lg:max-w-[18.5rem]',
    descriptionClassName:
      'text-[0.98rem] font-extrabold leading-[0.94] tracking-[-0.04em] sm:text-[1.08rem] lg:text-[0.92rem]',
  },
  {
    title: 'Guardian',
    description:
      'Tarjetas corporativas y control del gasto operativo.',
    className: 'min-h-[32rem] overflow-hidden lg:min-h-0',
    titleClassName:
      'left-4 top-1/2 -translate-y-1/2 text-[3.45rem] tracking-[-0.08em] [writing-mode:vertical-rl] [text-orientation:mixed] lg:text-[4.25rem]',
    contentClassName: '',
    hasCardsImage: true,
    isGuardianCard: true,
    descriptionClassName:
      'text-[0.82rem] font-bold leading-[1.04] tracking-[-0.025em] sm:text-[0.9rem] lg:text-[0.78rem]',
  },
  {
    title: 'Legal',
    description:
      'Cumplimiento inteligente que asegura la viabilidad de la operación.',
    className: 'min-h-[12rem] lg:min-h-0',
    titleClassName:
      'bottom-1 right-5 text-[4rem] tracking-[-0.08em] lg:text-[4.65rem]',
    contentClassName: 'absolute left-6 top-5 max-w-[14.9rem] lg:max-w-[15.4rem]',
    descriptionClassName:
      'text-[0.98rem] font-extrabold leading-[0.94] tracking-[-0.04em] sm:text-[1.08rem] lg:text-[0.92rem]',
  },
  {
    title: 'Secure',
    description:
      'Infraestructura jurídica y regulatoria para escalar con seguridad, control y cumplimiento.',
    className: 'min-h-[11.6rem] lg:min-h-0',
    titleClassName:
      'bottom-1 right-5 text-[3.45rem] tracking-[-0.08em] lg:text-[4.05rem]',
    contentClassName:
      'absolute left-6 right-6 top-5 max-w-[16.8rem] lg:right-8 lg:max-w-[17.2rem]',
    descriptionClassName:
      'text-[0.88rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[0.93rem] lg:text-[0.82rem]',
  },
  {
    title: 'MOVI\nMIENTO',
    description: '',
    className: 'min-h-[11.8rem] justify-end lg:min-h-0',
    titleClassName:
      'left-5 top-5 whitespace-pre-line text-[3.75rem] leading-[0.9] tracking-[-0.08em] lg:text-[4.55rem]',
    contentClassName: '',
    isMotionCard: true,
  },
]

export function ServicesArchitectureSection() {
  return (
    <section className="bg-[#f7f5f2] py-14 sm:py-16 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:py-8">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col px-5 sm:px-6 lg:h-full lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="mx-auto max-w-[74rem] text-center font-sans text-[1.85rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#ea928d] sm:text-[2.25rem] lg:text-[2.65rem] xl:text-[2.9rem]"
        >
          Capital, tecnología y cumplimiento conectados.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: 0.12 }}
          viewport={viewport}
          className="mx-auto mt-3 max-w-[45rem] text-center text-[0.88rem] font-semibold leading-[1.42] text-[#201614]/76"
        >
          Capacidades integradas para financiar, pagar, controlar y demostrar trazabilidad.
        </motion.p>

        <div className="mt-5 grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4 lg:min-h-0 lg:grid-rows-[0.22fr_0.56fr_0.22fr]">
            <ServiceGhostCard {...cards[0]} delay={0.06} />
            <ServiceGhostCard {...cards[2]} delay={0.16} />
            <ServiceGhostCard {...cards[4]} delay={0.26} />
          </div>

          <div className="grid gap-4 lg:min-h-0 lg:grid-rows-[0.42fr_0.22fr_0.36fr]">
            <ServiceGhostCard {...cards[1]} delay={0.12} />
            <ServiceGhostCard {...cards[3]} delay={0.22} />
            <ServiceGhostCard {...cards[5]} delay={0.34} />
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
  description: string
  className: string
  titleClassName: string
  contentClassName: string
  descriptionClassName?: string
  hasCardsImage?: boolean
  isMotionCard?: boolean
  isGuardianCard?: boolean
  delay?: number
}

function ServiceGhostCard({
  title,
  description,
  className,
  titleClassName,
  contentClassName,
  descriptionClassName,
  hasCardsImage = false,
  isMotionCard = false,
  isGuardianCard = false,
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

      {isGuardianCard ? (
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex min-h-full flex-col pl-[6rem] pr-4 pt-4 pb-3 lg:pl-[6.8rem] lg:pr-5 lg:pt-5 lg:pb-4">
            <div className="mx-auto max-w-[13rem] text-center lg:max-w-[14.2rem]">
              <p
                className={cn(
                  'font-sans text-[#292322]',
                  descriptionClassName ??
                    'text-[0.98rem] font-extrabold leading-[0.94] tracking-[-0.04em] sm:text-[1.08rem] lg:text-[0.92rem]',
                )}
              >
                {description}
              </p>
            </div>

            <div className="flex flex-1 items-start justify-center overflow-hidden pb-0 pt-1">
              <img
                src={tarjetas}
                alt=""
                aria-hidden="true"
                className="pointer-events-none w-[10.6rem] max-w-full object-contain lg:w-[12.2rem]"
              />
            </div>
          </div>
        </div>
      ) : isMotionCard ? null : (
        <div className={cn('relative z-10', contentClassName)}>
          <p
            className={cn(
              'font-sans text-[#292322]',
              descriptionClassName ??
                'text-[0.98rem] font-extrabold leading-[0.94] tracking-[-0.04em] sm:text-[1.08rem] lg:text-[0.92rem]',
            )}
          >
            {description}
          </p>
        </div>
      )}

      {hasCardsImage && !isGuardianCard ? (
        <img
          src={tarjetas}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-2 z-10 w-[18.5rem] max-w-[69%] lg:bottom-4 lg:right-2 lg:w-[20.5rem]"
        />
      ) : null}
    </motion.article>
  )
}
