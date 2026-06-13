import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'
import { ContactProfileCard } from '@/features/contact-cards/ContactProfileCard'
import { getContactProfileBySlug } from '@/features/contact-cards/data/contactProfiles'
import { buildProfileSeo } from '@/shared/config/seo'

interface ContactProfilePageProps {
  profileSlug?: string
}

export function ContactProfilePage({ profileSlug: fixedProfileSlug }: ContactProfilePageProps) {
  const { profileSlug = '' } = useParams()
  const profile = getContactProfileBySlug(fixedProfileSlug ?? profileSlug)

  if (!profile) {
    return (
      <main className="flex min-h-dvh items-center bg-[#f7f5f2] px-5 py-16 text-[#201614]">
        <section className="mx-auto max-w-[42rem] rounded-[2rem] border border-[#8b4a24]/12 bg-white/76 p-8 shadow-[0_24px_70px_rgba(39,17,7,0.12)]">
          <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[#d67b45]">
            Perfil no encontrado
          </p>
          <h1 className="mt-4 text-[2.6rem] font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-[3.4rem]">
            Esta tarjeta no está disponible.
          </h1>
          <p className="mt-5 max-w-[31rem] text-[0.98rem] font-semibold leading-[1.55] text-[#201614]/76">
            Revisa el enlace o comunícate con el equipo de Fil-On Tech para
            continuar la conversación por los canales principales.
          </p>
          <Link
            to="/contacto"
            className="mt-7 inline-flex min-h-11 items-center rounded-full bg-[#7b3412] px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-white transition hover:brightness-[0.98]"
          >
            Ir a contacto &gt;
          </Link>
        </section>
      </main>
    )
  }

  return (
    <>
      <Seo config={buildProfileSeo(`/${profile.slug}`)} />
      <ContactProfileCard profile={profile} />
    </>
  )
}
