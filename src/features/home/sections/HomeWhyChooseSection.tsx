import { useRef } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll } from 'motion/react'
import { Link } from 'react-router-dom'
import figuraGeometrica from '@/assets/figurageometrica.webp'
import { cn } from '@/shared/lib/cn'

const viewport = { once: true, amount: 0.26 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const cards = [
  {
    icon: 'person',
    ghostLines: ['INCLUSIÓN', 'FINANCIERA'],
    accentLine: 1,
    description:
      'Acercamos soluciones financieras a quienes mueven la industria, impulsando el progreso de miles de mineros, sus familias y sus comunidades.',
    className: 'xl:min-h-[29rem] xl:translate-y-10',
    contentClassName: 'pt-18',
    descriptionClassName: 'max-w-[13.4rem] text-[0.78rem] leading-[1.3]',
  },
  {
    icon: 'device',
    ghostLines: ['ALIANZAS', 'OPERATIVAS'],
    accentLine: 1,
    description:
      'Somos el punto de encuentro de una nueva generación de aliados que, a través de la tecnología y la confianza, están construyendo el ecosistema que la minería necesita para prosperar.',
    className: 'xl:min-h-[23.8rem]',
    contentClassName: 'pt-26',
    descriptionClassName: 'max-w-[13.2rem] text-[0.76rem] leading-[1.28]',
  },
  {
    icon: 'gear',
    ghostLines: ['ECOSISTEMA', 'MINERO'],
    accentLine: 1,
    description:
      'Un ecosistema diseñado para conectar oportunidades, optimizar operaciones y generar valor sostenible.',
    className: 'xl:min-h-[23.8rem]',
    contentClassName: 'pt-18',
  },
  {
    icon: 'globe',
    ghostLines: ['SOSTENIBILIDAD Y', 'FUTURO'],
    accentLine: 1,
    description:
      'Construimos una nueva generación de minería responsable, donde la tecnología, la conservación y el desarrollo de las comunidades crean prosperidad sostenible.',
    className: 'xl:min-h-[29rem] xl:translate-y-10',
    contentClassName: 'pt-20',
    descriptionClassName: 'max-w-[13.2rem] text-[0.78rem] leading-[1.28]',
    highlighted: true,
  },
]

export function HomeWhyChooseSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const rotation = useMotionValue(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? latest
    const delta = latest - previous
    rotation.set(rotation.get() + delta * 0.22)
  })

  return (
    <section
      ref={sectionRef}
      className="relative -mt-8 overflow-visible bg-[#f7f5f2] pb-16 pt-10 sm:-mt-10 sm:pb-18 sm:pt-12 lg:-mt-12 lg:pb-20 lg:pt-14"
    >
      <motion.div
        style={{ rotate: rotation }}
        className="pointer-events-none absolute left-[-12%] top-[38%] z-0 hidden h-[23rem] w-[23rem] opacity-[0.62] lg:block"
      >
        <img
          src={figuraGeometrica}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain [filter:brightness(0)_saturate(100%)_invert(69%)_sepia(31%)_saturate(1880%)_hue-rotate(313deg)_brightness(95%)_contrast(118%)_drop-shadow(0_0_1px_rgba(228,125,112,0.95))_drop-shadow(0_0_2px_rgba(228,125,112,0.92))_drop-shadow(0_0_16px_rgba(228,125,112,0.22))]"
        />
      </motion.div>

      <motion.div
        style={{ rotate: rotation }}
        className="pointer-events-none absolute right-[-10%] top-[14%] z-0 hidden h-[31rem] w-[31rem] opacity-[0.72] lg:block"
      >
        <img
          src={figuraGeometrica}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain [filter:brightness(0)_saturate(100%)_invert(69%)_sepia(31%)_saturate(1880%)_hue-rotate(313deg)_brightness(95%)_contrast(118%)_drop-shadow(0_0_1px_rgba(228,125,112,0.95))_drop-shadow(0_0_2px_rgba(228,125,112,0.92))_drop-shadow(0_0_18px_rgba(228,125,112,0.24))]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="text-center font-sans text-[2.35rem] font-extrabold tracking-[-0.06em] text-[#ea928d] sm:text-[3.1rem] lg:text-[4rem]"
        >
          ¿Por qué elegir Fil-On Tech?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: 0.14 }}
          viewport={viewport}
          className="mx-auto mt-5 max-w-[50rem] text-center font-sans text-[0.92rem] font-extrabold uppercase leading-[1.22] tracking-[-0.03em] text-[#1f1614] sm:text-[1rem] lg:text-[1.08rem]"
        >
          Reinventamos la industria minera desde una visión más humana, donde
          la tecnología se convierte en una herramienta para generar
          prosperidad, impulsar la inclusión financiera y construir un futuro
          sostenible para las personas, las comunidades y el territorio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: 0.24 }}
          viewport={viewport}
          className="mt-5 flex justify-center"
        >
          <Link
            to="/contacto"
            className="inline-flex min-h-10 items-center rounded-[0.68rem] bg-[#d9773d] px-6 text-[0.9rem] font-medium uppercase italic tracking-[-0.02em] text-white transition hover:brightness-[1.04]"
          >
            COMENZAR AHORA &gt;
          </Link>
        </motion.div>

        <div className="relative z-20 mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,13.8rem))] xl:justify-center xl:gap-10">
          {cards.map((card, index) => (
            <motion.article
              key={card.ghostLines.join('-')}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...reveal, delay: 0.1 + index * 0.1 }}
              viewport={viewport}
              className={cn(
                'relative min-h-[26rem] overflow-hidden rounded-[1.8rem] bg-[#f1efec] px-4 py-5',
                card.className,
                card.highlighted && 'ring-1 ring-[#ea928d]/34',
              )}
            >
              <div className="flex justify-center text-white/88">
                <CardIcon type={card.icon} />
              </div>

              <div className={cn('relative z-10', card.contentClassName)}>
                <p
                  className={cn(
                    'max-w-[9.8rem] text-[0.82rem] font-extrabold uppercase leading-[1.42] text-[#1a1412]',
                    card.descriptionClassName,
                  )}
                >
                  {card.description}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-3 z-0 flex justify-center px-3">
                <div className="w-full max-w-[12rem] text-center font-sans font-extrabold uppercase leading-[0.92] tracking-[-0.055em] text-white/88">
                  {card.ghostLines.map((line, lineIndex) => (
                    <span
                      key={line}
                      className={cn(
                        'block text-[1.62rem]',
                        lineIndex === card.accentLine && 'text-[2.18rem]',
                        card.icon === 'globe' && lineIndex === 0 && 'text-[1.18rem]',
                      )}
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardIcon({ type }: { type: string }) {
  if (type === 'person') {
    return (
      <svg viewBox="0 0 48 48" className="h-11 w-11 fill-current opacity-90" aria-hidden="true">
        <circle cx="24" cy="14" r="8" />
        <path d="M12 40c0-7 4.8-12 12-12s12 5 12 12v2H12z" />
      </svg>
    )
  }

  if (type === 'device') {
    return (
      <svg viewBox="0 0 48 48" className="h-11 w-11 fill-current opacity-90" aria-hidden="true">
        <path d="M10 10h28v20H10z" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="20" y="33" width="8" height="3" rx="1.5" />
        <rect x="14" y="37" width="20" height="3" rx="1.5" />
      </svg>
    )
  }

  if (type === 'gear') {
    return (
      <svg viewBox="0 0 48 48" className="h-11 w-11 fill-current opacity-90" aria-hidden="true">
        <path d="M27 5h-6l-1 5-4 2-4-3-4 4 3 4-2 4-5 1v6l5 1 2 4-3 4 4 4 4-3 4 2 1 5h6l1-5 4-2 4 3 4-4-3-4 2-4 5-1v-6l-5-1-2-4 3-4-4-4-4 3-4-2zM24 31a7 7 0 100-14 7 7 0 000 14z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11 fill-current opacity-90" aria-hidden="true">
      <circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M11 24h26M24 11c4 4 6 8.7 6 13s-2 9-6 13c-4-4-6-8.7-6-13s2-9 6-13z" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}
