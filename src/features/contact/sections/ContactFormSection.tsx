import { useState } from 'react'
import { motion } from 'motion/react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { siteConfig } from '@/shared/config/site'

const viewport = { once: true, amount: 0.24 }
const reveal = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
}

const socialLinks = [
  {
    name: 'Facebook',
    Icon: FaFacebook,
    href: siteConfig.social.facebook,
  },
  {
    name: 'Instagram',
    Icon: FaInstagram,
    href: siteConfig.social.instagram,
  },
  {
    name: 'LinkedIn',
    Icon: FaLinkedin,
    href: siteConfig.social.linkedin,
  },
]

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Solicitud de contacto desde fil-ontech.com')
    const body = encodeURIComponent(
      [
        `Nombre: ${formData.name}`,
        `Correo: ${formData.email}`,
        `Teléfono: ${formData.phone || 'No indicado'}`,
        '',
        'Mensaje:',
        formData.message,
      ].join('\n'),
    )

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  return (
    <section className="bg-[#f7f5f2] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left column - Info and Social */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={reveal}
          viewport={viewport}
        >
          <h2 className="font-sans text-[2.3rem] font-extrabold leading-[0.96] tracking-[-0.06em] text-[#201614] sm:text-[2.75rem]">
            Comparte tu contexto
          </h2>

          <p className="mt-4 max-w-[28rem] text-[0.96rem] font-semibold leading-[1.56] text-[#201614]/76">
            Cuéntanos sobre tu operación, necesidad y contexto. Revisaremos tu
            caso y nos comunicaremos pronto.
          </p>

          {/* Social Links */}
          <div className="mt-10">
            <p className="text-[0.74rem] font-extrabold uppercase tracking-[0.2em] text-[#8f4a22]">
              Síguenos también en
            </p>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    ...reveal,
                    delay: 0.2 + socialLinks.indexOf(social) * 0.08,
                  }}
                  viewport={viewport}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d67b45] transition hover:scale-110 hover:brightness-110"
                  aria-label={social.name}
                  title={social.name}
                >
                  <social.Icon size={24} className="text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column - Form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={reveal}
          viewport={viewport}
          className="rounded-[2rem] bg-white p-7 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset,0_8px_24px_rgba(0,0,0,0.06)] sm:p-9"
        >
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4"
            >
              <p className="text-[0.88rem] font-semibold text-green-700">
                Se abrió tu cliente de correo con el mensaje preparado.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-[#8f4a22]"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-[#e3c4a8] bg-[#f1efec] px-4 py-3 text-[0.96rem] font-semibold text-[#201614] placeholder:text-[#8f4a22]/48 focus:border-[#d67b45] focus:outline-none focus:ring-1 focus:ring-[#d67b45]/20 transition"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-[#8f4a22]"
              >
                Correo
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-[#e3c4a8] bg-[#f1efec] px-4 py-3 text-[0.96rem] font-semibold text-[#201614] placeholder:text-[#8f4a22]/48 focus:border-[#d67b45] focus:outline-none focus:ring-1 focus:ring-[#d67b45]/20 transition"
                placeholder="tu@correo.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-[#8f4a22]"
              >
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-[#e3c4a8] bg-[#f1efec] px-4 py-3 text-[0.96rem] font-semibold text-[#201614] placeholder:text-[#8f4a22]/48 focus:border-[#d67b45] focus:outline-none focus:ring-1 focus:ring-[#d67b45]/20 transition"
                placeholder="+57 300 000 00 00"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-[#8f4a22]"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-2 w-full rounded-lg border border-[#e3c4a8] bg-[#f1efec] px-4 py-3 text-[0.96rem] font-semibold text-[#201614] placeholder:text-[#8f4a22]/48 focus:border-[#d67b45] focus:outline-none focus:ring-1 focus:ring-[#d67b45]/20 transition resize-none"
                placeholder="Cuéntanos sobre tu operación y necesidad"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#d67b45] px-6 py-3.5 text-[0.84rem] font-extrabold uppercase italic tracking-[-0.02em] text-white transition hover:brightness-110"
            >
              Enviar mensaje
            </button>
          </form>

          <p className="mt-5 text-center text-[0.75rem] font-semibold text-[#8f4a22]/64">
            Responderemos en máximo 48 horas
          </p>
        </motion.div>
      </div>
    </section>
  )
}
