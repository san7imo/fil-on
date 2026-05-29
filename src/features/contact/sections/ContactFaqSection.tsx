import { useRef } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll } from 'motion/react'
import figuraGeometrica from '@/assets/figurageometrica.webp'

const viewport = { once: true, amount: 0.24 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const faqs = [
  {
    question: '¿Qué tipo de proyectos atiende Fil-On Tech?',
    answer:
      'Operaciones de economía real que necesitan capital, herramientas de pago, control operativo, cumplimiento o acompañamiento tecnológico.',
  },
  {
    question: '¿Qué información conviene enviar primero?',
    answer:
      'Sector, ubicación, necesidad principal, tamaño aproximado de operación y restricción crítica que debe resolverse.',
  },
  {
    question: '¿La cobertura es solo en Medellín?',
    answer:
      'La base corporativa está en Medellín, pero la conversación se orienta a operaciones con presencia territorial y alcance nacional o regional.',
  },
  {
    question: '¿Cuándo tiene sentido pedir una reunión?',
    answer:
      'Cuando la necesidad ya requiere ordenar decisiones sobre liquidez, pagos, trazabilidad, documentación o riesgo regulatorio.',
  },
]

export function ContactFaqSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const rotation = useMotionValue(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? latest
    const delta = latest - previous
    rotation.set(rotation.get() + delta * 0.2)
  })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f5f2] py-18 sm:py-22 lg:py-24"
    >
      <motion.div
        style={{ rotate: rotation }}
        className="pointer-events-none absolute right-[-8%] top-[12%] z-0 hidden h-[27rem] w-[27rem] opacity-[0.58] lg:block"
      >
        <img
          src={figuraGeometrica}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain [filter:brightness(0)_saturate(100%)_invert(70%)_sepia(34%)_saturate(1450%)_hue-rotate(328deg)_brightness(98%)_contrast(104%)_drop-shadow(0_0_12px_rgba(230,140,102,0.16))]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] gap-10 px-5 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="max-w-[33rem]"
        >
          <span className="inline-flex rounded-full border border-[#e3c4a8] bg-white/70 px-4 py-2 text-[0.74rem] font-extrabold uppercase tracking-[0.22em] text-[#8f4a22]">
            Confianza
          </span>
          <h2 className="mt-6 font-sans text-[2.7rem] font-extrabold leading-[0.94] tracking-[-0.06em] text-[#201614] sm:text-[3.35rem] lg:text-[4rem]">
            Respuestas claras antes de abrir el caso.
          </h2>
          <p className="mt-5 max-w-[31rem] text-[0.98rem] font-semibold leading-[1.56] text-[#201614]/76 sm:text-[1rem]">
            La primera conversación debe reducir incertidumbre, no sumar ruido.
            Estos puntos ayudan a enfocar el contacto inicial.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.article
              key={faq.question}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...reveal, delay: 0.1 + index * 0.08 }}
              viewport={viewport}
              className="rounded-[1.8rem] bg-white/78 px-6 py-7 shadow-[0_18px_50px_rgba(23,15,8,0.08)]"
            >
              <p className="text-[0.76rem] font-extrabold uppercase tracking-[0.18em] text-[#d67b45]">
                0{index + 1}
              </p>
              <h3 className="mt-4 max-w-[20rem] text-[1.35rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#201614]">
                {faq.question}
              </h3>
              <p className="mt-4 text-[0.9rem] font-semibold leading-[1.5] text-[#201614]/72">
                {faq.answer}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
