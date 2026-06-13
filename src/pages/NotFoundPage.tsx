import { Link, useLocation } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'

export function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <>
      <Seo pathname={pathname} />
      <section className="bg-[#f7f5f2] px-5 py-20 text-[#201614] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[760px]">
          <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[#d67b45]">
            404
          </p>
          <h1 className="mt-5 text-[2.7rem] font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-[3.5rem]">
            Esta ruta no está disponible.
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1rem] font-semibold leading-[1.6] text-[#201614]/76">
            El enlace puede haber cambiado o no existir. Puedes volver al sitio
            principal para continuar navegando por las soluciones de Fil-On Tech.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#7b3412] px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-white transition hover:brightness-[0.98]"
          >
            Volver al inicio &gt;
          </Link>
        </div>
      </section>
    </>
  )
}
