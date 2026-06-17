import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import fondoHeroFooter from '@/assets/fondoheroyfooter.webp'
import logoFil from '@/assets/logofil.webp'
import { navigationItems } from '@/shared/config/navigation'
import { siteConfig } from '@/shared/config/site'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const serviceLinks = ['Fil-On Tech', 'Fil-On Capital']

  return (
    <footer className="relative overflow-hidden pb-7 pt-22 text-[#1f1714]">
      <div className="absolute inset-0 -z-20">
        <img
          src={fondoHeroFooter}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(122,52,16,0.14)_0%,rgba(215,122,57,0.05)_42%,rgba(255,255,255,0.1)_100%)]" />

      <div className="page-shell relative">
        <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.58fr_0.7fr]">
          <div className="max-w-[27rem]">
            <div className="mb-5">
              <img src={logoFil} alt="Fil-On Tech" className="h-auto w-[8.5rem] brightness-0" />
            </div>

            <p className="max-w-[24rem] text-[0.9rem] leading-[1.55] text-black/84">
              Conectamos capital, tecnología, control y cumplimiento para
              acompañar operaciones de la economía real con presencia en
              territorio.
            </p>

            <div className="mt-7 space-y-4 text-[0.92rem] text-black/92">
              <FooterInfo
                icon={<MailIcon />}
                href={`mailto:${siteConfig.email}`}
                label={siteConfig.email}
              />
              <FooterInfo
                icon={<PhoneIcon />}
                href={`tel:${siteConfig.phoneHref}`}
                label={siteConfig.phone}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-[1.35rem] font-semibold tracking-[-0.04em] text-black">
              Enlaces rápidos
            </h3>
            <ul className="space-y-4 text-[0.92rem] text-black/86">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <NavLink to={item.href} className="transition hover:text-black">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-[1.35rem] font-semibold tracking-[-0.04em] text-black">
              Servicios
            </h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-[0.92rem] text-black/86">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <NavLink to="/servicios" className="transition hover:text-black">
                    {service}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t border-black/16 pt-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.9rem] text-black/84">
                © {currentYear} Fil-On Tech. Todos los derechos reservados.
              </p>
              <p className="mt-1 text-[0.78rem] text-black/62">
                Fintech agrominera para industrias estratégicas
              </p>
            </div>

            <div className="flex items-center gap-5 text-[0.86rem] text-black/78">
              <NavLink to="/privacidad" className="transition hover:text-black">
                Privacidad
              </NavLink>
              <NavLink to="/terminos" className="transition hover:text-black">
                Términos
              </NavLink>
              <NavLink to="/cookies" className="transition hover:text-black">
                Cookies
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterInfo({
  icon,
  label,
  href,
}: {
  icon: ReactNode
  label: string
  href?: string
}) {
  const content = href ? (
    <a href={href} className="transition hover:text-black">
      {label}
    </a>
  ) : (
    <span>{label}</span>
  )

  return (
    <div className="flex items-center gap-3">
      <span className="text-[#23401d]">{icon}</span>
      {content}
    </div>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1rem] w-[1rem]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.34 2.71a2 2 0 0 1-.57 1.71L7.09 9.91a16 16 0 0 0 7 7l1.77-1.79a2 2 0 0 1 1.71-.57l2.71.34A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
