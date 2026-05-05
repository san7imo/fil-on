import { BrowserRouter } from 'react-router-dom'
import { SmoothScroll } from '@/app/SmoothScroll'
import { ScrollToTop } from '@/app/ScrollToTop'
import { AppRoutes } from '@/routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}
