import { useState } from 'react'
import { motion } from 'motion/react'
import { NavLink, useLocation } from 'react-router-dom'
import logoFil from '@/assets/logofil.webp'
import { navigationItems } from '@/shared/config/navigation'
import { cn } from '@/shared/lib/cn'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const handleMenuClose = () => setIsMenuOpen(false)
  const headerTransition = {
    duration: 1.05,
    ease: [0.16, 1, 0.3, 1] as const,
  }

  return (
    <header
      className={cn(
        'inset-x-0 top-0 z-50 border-b',
        isHome
          ? 'absolute border-white/70 bg-transparent'
          : 'sticky border-white/50 bg-white/70 backdrop-blur-xl',
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={headerTransition}
        className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-7"
      >
        <div className="relative flex min-h-[90px] items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...headerTransition, delay: 0.16 }}
            className="shrink-0"
          >
            <NavLink to="/" className="block" onClick={handleMenuClose}>
              <img
                src={logoFil}
                alt="Fil-on Tech"
                className={cn(
                  'h-8 w-auto md:h-[35px]',
                  !isHome && 'brightness-0',
                )}
              />
            </NavLink>
          </motion.div>

          <button
            type="button"
            className={cn(
              'inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold uppercase italic tracking-[-0.02em] transition md:hidden',
              isHome
                ? 'border-white/70 text-white hover:bg-white/10'
                : 'border-line text-ink-950 hover:border-brand-500 hover:text-brand-700',
            )}
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
          >
            Menu
          </button>

          <motion.nav
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...headerTransition, delay: 0.26 }}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-9 md:flex"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center text-[0.92rem] font-medium uppercase italic tracking-[-0.02em] transition',
                    isHome
                      ? 'text-white/92 hover:text-white'
                      : 'text-ink-600 hover:text-ink-950',
                    !isHome && isActive && 'text-ink-950',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </motion.nav>

          <div className="hidden w-[86px] md:block" aria-hidden="true" />
        </div>

        <div
          id="main-navigation"
          className={cn(
            'overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-out md:hidden',
            isMenuOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <nav
            className={cn(
              'flex flex-col gap-2 rounded-[18px] p-3',
              isHome
                ? 'border border-white/30 bg-[rgba(102,48,19,0.78)] backdrop-blur-md'
                : 'panel',
            )}
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={handleMenuClose}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center rounded-2xl px-4 py-3 text-sm font-medium uppercase italic tracking-[-0.02em]',
                    isHome ? 'text-white' : 'text-ink-600',
                    isHome
                      ? isActive && 'bg-white/10'
                      : isActive && 'bg-ink-950 text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  )
}
