import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { HomePage } from '@/pages/HomePage'
import { QuotePage } from '@/pages/QuotePage'
import { ServicesPage } from '@/pages/ServicesPage'

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
    ],
  },
]

export function AppRoutes() {
  return useRoutes(routes)
}
