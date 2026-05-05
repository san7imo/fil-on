import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from '@/components/common/SiteFooter'
import { SiteHeader } from '@/components/common/SiteHeader'

export function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {!isHome ? (
        <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(20,157,216,0.12),transparent_60%)]" />
      ) : null}
      <SiteHeader />
      <main className={isHome ? 'pb-16' : 'pb-16 pt-6 sm:pt-8'}>
        <div key={pathname} className="animate-page-enter">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
