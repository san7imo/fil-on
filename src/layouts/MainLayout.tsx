import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from '@/components/common/SiteFooter'
import { SiteHeader } from '@/components/common/SiteHeader'

export function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const hasImmersiveHero =
    isHome ||
    pathname === '/somos' ||
    pathname === '/servicios' ||
    pathname === '/cotizaciones' ||
    pathname === '/contacto'

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteHeader />
      <main className={hasImmersiveHero ? undefined : 'pt-[7.2rem] sm:pt-[7.6rem]'}>
        <div key={pathname} className="animate-page-enter">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
