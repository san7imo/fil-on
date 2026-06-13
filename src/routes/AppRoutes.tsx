import { Suspense, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import { CONTACT_PROFILES } from '@/features/contact-cards/data/contactProfiles'
import { MainLayout } from '@/layouts/MainLayout'

const HomePage = lazy(() => import('@/pages/HomePage').then((module) => ({ default: module.HomePage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then((module) => ({ default: module.ServicesPage })))
const QuotePage = lazy(() => import('@/pages/QuotePage').then((module) => ({ default: module.QuotePage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const ContactProfilePage = lazy(() =>
  import('@/pages/ContactProfilePage').then((module) => ({ default: module.ContactProfilePage })),
)
const LegalPage = lazy(() => import('@/pages/LegalPage').then((module) => ({ default: module.LegalPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'somos', element: <AboutPage /> },
      { path: 'servicios', element: <ServicesPage /> },
      { path: 'cotizaciones', element: <QuotePage /> },
      { path: 'contacto', element: <ContactPage /> },
      { path: 'privacidad', element: <LegalPage kind="privacy" /> },
      { path: 'terminos', element: <LegalPage kind="terms" /> },
      { path: 'cookies', element: <LegalPage kind="cookies" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  ...CONTACT_PROFILES.map((profile) => ({
    path: profile.slug,
    element: <ContactProfilePage profileSlug={profile.slug} />,
  })),
  { path: 'ceo', element: <ContactProfilePage profileSlug="CEO" /> },
]

export function AppRoutes() {
  const routeElements = useRoutes(routes)

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f5f2] text-[#201614]">
          <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[#8f4a22]">
            Fil-On Tech
          </span>
        </div>
      }
    >
      {routeElements}
    </Suspense>
  )
}
