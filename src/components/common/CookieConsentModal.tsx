import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const storageKey = 'filontech_cookie_consent_v1'

interface CookieConsent {
  necessary: true
  analytics: boolean
  preferences: boolean
  acceptedAt: string
}

export function CookieConsentModal() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false

    return !window.localStorage.getItem(storageKey)
  })
  const [analytics, setAnalytics] = useState(true)
  const [preferences, setPreferences] = useState(true)

  const saveConsent = (consent: Omit<CookieConsent, 'acceptedAt'>) => {
    const payload: CookieConsent = {
      ...consent,
      acceptedAt: new Date().toISOString(),
    }

    window.localStorage.setItem(storageKey, JSON.stringify(payload))
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6">
      <motion.section
        role="region"
        aria-labelledby="cookie-consent-title"
        initial={{ opacity: 0, y: 24, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-[860px] overflow-hidden rounded-[1.35rem] border border-white/60 bg-[#f7f5f2]/96 text-[#201614] shadow-[0_18px_60px_rgba(39,17,7,0.22)] backdrop-blur-md"
      >
        <div className="p-5 sm:p-6">
          <div className="max-w-[46rem]">
            <h2
              id="cookie-consent-title"
              className="text-[1.28rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#201614] sm:text-[1.55rem]"
            >
              Cookies para mejorar tu experiencia.
            </h2>
            <p className="mt-2.5 text-[0.86rem] font-semibold leading-[1.58] text-[#201614]/70">
              Usamos cookies necesarias y, con tu autorización, medición y
              preferencias. Puedes cambiar tu decisión desde el navegador.
            </p>
            <p className="mt-2 text-[0.76rem] font-semibold leading-[1.55] text-[#201614]/58">
              Puedes revisar más información en la{' '}
              <Link to="/cookies" className="font-extrabold text-[#7b3412] hover:brightness-90">
                política de cookies
              </Link>{' '}
              y la{' '}
              <Link to="/privacidad" className="font-extrabold text-[#7b3412] hover:brightness-90">
                política de privacidad
              </Link>
              .
            </p>
          </div>

          <div className="mt-5 border-t border-[#8b4a24]/10 pt-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2.5">
                <CookieOption
                  title="Analíticas"
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CookieOption
                  title="Preferencias"
                  checked={preferences}
                  onChange={setPreferences}
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-3 lg:w-[22rem]">
                <button
                  type="button"
                  onClick={() =>
                    saveConsent({
                      necessary: true,
                      analytics: false,
                      preferences: false,
                    })
                  }
                  className="min-h-10 rounded-full border border-[#7b3412]/20 px-4 text-center text-[0.66rem] font-extrabold uppercase italic leading-none tracking-[0.01em] text-[#7b3412] transition hover:bg-[#7b3412]/6"
                >
                  Solo necesarias
                </button>
                <button
                  type="button"
                  onClick={() =>
                    saveConsent({
                      necessary: true,
                      analytics,
                      preferences,
                    })
                  }
                  className="min-h-10 rounded-full border border-[#d67b45]/28 bg-white px-4 text-center text-[0.66rem] font-extrabold uppercase italic leading-none tracking-[0.01em] text-[#7b3412] transition hover:bg-[#f1efec]"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() =>
                    saveConsent({
                      necessary: true,
                      analytics: true,
                      preferences: true,
                    })
                  }
                  className="min-h-10 rounded-full bg-[#7b3412] px-4 text-center text-[0.66rem] font-extrabold uppercase italic leading-none tracking-[0.01em] text-white transition hover:brightness-[1.06]"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

function CookieOption({
  title,
  checked,
  onChange,
}: {
  title: string
  checked: boolean
  onChange?: (checked: boolean) => void
}) {
  return (
    <label className="flex min-h-10 w-full items-center justify-between gap-3 rounded-full border border-[#8b4a24]/10 bg-white/72 px-4 py-2.5 sm:w-[10rem]">
      <span className="min-w-0 flex-1">
        <span className="block text-[0.76rem] font-extrabold leading-none tracking-[-0.01em] text-[#201614]">
          {title}
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        className="h-4 w-4 accent-[#7b3412]"
      />
    </label>
  )
}
