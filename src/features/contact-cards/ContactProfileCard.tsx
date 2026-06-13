import { useEffect } from 'react'
import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import fondoHeroFooter from '@/assets/fondoheroyfooter.webp'
import figuraGeometrica from '@/assets/figurageometrica.webp'
import logoFil from '@/assets/logofil.webp'
import {
  type ContactProfile,
  buildPhoneHref,
  buildWhatsAppHref,
  formatPhoneNumber,
} from '@/features/contact-cards/data/contactProfiles'
import { cn } from '@/shared/lib/cn'

interface ContactProfileCardProps {
  profile: ContactProfile
}

const reveal = {
  duration: 1.05,
  ease: [0.16, 1, 0.3, 1] as const,
}

const actionBaseClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[0.82rem] font-extrabold uppercase italic tracking-[-0.02em] transition duration-300 ease-out'

export function ContactProfileCard({ profile }: ContactProfileCardProps) {
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

  const contactRows = [
    {
      label: 'Celular',
      value: formatPhoneNumber(profile.phone),
      href: buildPhoneHref(profile.phone),
      icon: Phone,
      accent: 'text-[#ffe0c3] bg-white/12',
    },
    {
      label: 'Correo',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      accent: 'text-[#f4b28a] bg-[#7b3412]/24',
    },
  ]

  const actions = [
    {
      label: 'WhatsApp',
      href: buildWhatsAppHref(profile),
      icon: MessageCircle,
      className: 'bg-[#178a52] text-white shadow-[0_18px_40px_rgba(23,138,82,0.26)] hover:bg-[#116b40]',
      external: true,
    },
    {
      label: 'Llamar',
      href: buildPhoneHref(profile.phone),
      icon: Phone,
      className: 'border border-white/26 bg-white/12 text-white hover:bg-white/18',
      external: false,
    },
    {
      label: 'Correo',
      href: `mailto:${profile.email}`,
      icon: Mail,
      className: 'border border-white/26 bg-white text-[#7b3412] hover:brightness-[0.98]',
      external: false,
    },
  ]

  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-[#281108] text-white">
      <div className="absolute inset-0 -z-30">
        <img
          src={fondoHeroFooter}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(108deg,rgba(45,20,9,0.9)_0%,rgba(113,51,20,0.68)_44%,rgba(228,134,76,0.22)_74%,rgba(255,255,255,0.04)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_18%,rgba(255,236,216,0.24),transparent_27%)]" />

      <motion.img
        src={figuraGeometrica}
        alt=""
        aria-hidden="true"
        style={{ rotate: rotation, opacity }}
        className="pointer-events-none absolute right-[-12rem] top-[7rem] z-0 hidden w-[45vw] max-w-[600px] min-w-[360px] [filter:brightness(1.18)_contrast(1.08)_drop-shadow(0_0_1.2px_rgba(255,255,255,0.95))_drop-shadow(0_0_16px_rgba(255,255,255,0.1))] lg:block"
      />

      <section className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1180px] items-center px-5 py-10 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reveal}
          className="grid w-full overflow-hidden rounded-[2rem] border border-white/18 bg-white/10 shadow-[0_34px_90px_rgba(39,17,7,0.28)] backdrop-blur-[4px] lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div className="relative flex min-h-[18rem] items-center justify-center overflow-hidden border-b border-white/14 bg-[rgba(255,255,255,0.08)] p-6 sm:p-8 lg:min-h-[31rem] lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(255,255,255,0.18),transparent_42%)]" />
            <div className="relative">
              <img
                src={logoFil}
                alt="Fil-On Tech"
                className="h-auto w-48 sm:w-60 lg:w-72"
              />
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-[42rem]">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...reveal, delay: 0.12 }}
              >
                <p className="inline-flex rounded-full border border-white/22 bg-white/10 px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-white/76">
                  {profile.company}
                </p>
                <h1 className="mt-6 text-[clamp(2.25rem,9vw,4.7rem)] font-extrabold leading-[0.9] tracking-[-0.065em] text-white">
                  {profile.name}
                </h1>
                <p className="mt-4 text-[1.18rem] font-bold leading-tight tracking-[-0.04em] text-[#ffd9bd] sm:text-[1.45rem]">
                  {profile.role}
                </p>
              </motion.div>

              <div className="mt-8 grid gap-4">
                {contactRows.map(({ label, value, href, icon: Icon, accent }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...reveal, delay: 0.24 + index * 0.08 }}
                    className="group flex items-center gap-4 rounded-[1.35rem] border border-white/14 bg-black/14 px-4 py-4 transition duration-300 ease-out hover:border-white/28 hover:bg-black/18 sm:px-5"
                  >
                    <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-full', accent)}>
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-white/52">
                        {label}
                      </span>
                      <span className="mt-1 block break-words text-[0.98rem] font-bold text-white sm:text-[1.1rem]">
                        {value}
                      </span>
                    </span>
                    <ArrowRight
                      size={18}
                      className="hidden text-white/44 transition group-hover:translate-x-1 group-hover:text-white sm:block"
                    />
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...reveal, delay: 0.46 }}
                className="mt-7 grid gap-3 sm:grid-cols-3"
              >
                {actions.map(({ label, href, icon: Icon, className, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className={cn(actionBaseClass, className)}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.article>
      </section>
    </main>
  )
}
