import { Link } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'
import { siteConfig } from '@/shared/config/site'
import { legalSeo } from '@/shared/config/seo'

interface LegalPageProps {
  kind: 'privacy' | 'terms' | 'cookies'
}

interface LegalSection {
  title: string
  body: string[]
  items?: string[]
}

interface LegalContent {
  seo: (typeof legalSeo)[string]
  eyebrow: string
  title: string
  intro: string
  updatedAt: string
  sections: LegalSection[]
}

const contactLine = `Canal de contacto: ${siteConfig.email}.`

const contentByKind: Record<LegalPageProps['kind'], LegalContent> = {
  privacy: {
    seo: legalSeo['/privacidad'],
    eyebrow: 'Política de privacidad',
    title: 'Tratamiento responsable de datos personales.',
    intro:
      'Esta política explica cómo Fil-On Tech recibe, utiliza, protege y conserva la información personal entregada a través de sus canales digitales, comerciales e institucionales.',
    updatedAt: '13 de junio de 2026',
    sections: [
      {
        title: 'Responsable del tratamiento',
        body: [
          `Fil-On Tech actúa como responsable del tratamiento de la información recibida por medio del sitio web, formularios, correo electrónico, teléfono y canales comerciales asociados a ${siteConfig.website}.`,
          'La información se administra con criterios de confidencialidad, necesidad, finalidad legítima y control operativo.',
        ],
      },
      {
        title: 'Datos que podemos recibir',
        body: [
          'Podemos recibir datos de identificación, contacto, cargo, empresa, sector, ubicación, mensajes enviados por formularios y contexto general de una solicitud comercial u operativa.',
          'No solicitamos información sensible a través del sitio web. Si el usuario la entrega voluntariamente, será tratada únicamente para responder la solicitud recibida o cumplir obligaciones aplicables.',
        ],
        items: [
          'Nombre, correo, teléfono y empresa.',
          'Información sobre necesidades de capital, tecnología, cumplimiento u operación.',
          'Datos técnicos básicos de navegación, cuando sean necesarios o autorizados.',
        ],
      },
      {
        title: 'Finalidades del tratamiento',
        body: [
          'Utilizamos la información para responder solicitudes, coordinar conversaciones, evaluar necesidades generales, dar continuidad a relaciones comerciales y mejorar la experiencia del sitio.',
          'También podemos usar datos de contacto para enviar comunicaciones relacionadas con una solicitud previa, una relación vigente o información institucional relevante.',
        ],
        items: [
          'Atender consultas comerciales, operativas o institucionales.',
          'Coordinar reuniones, llamadas y seguimiento de oportunidades.',
          'Gestionar seguridad, trazabilidad y continuidad de los canales digitales.',
          'Cumplir obligaciones legales, contractuales o regulatorias aplicables.',
        ],
      },
      {
        title: 'Conservación y seguridad',
        body: [
          'La información se conserva durante el tiempo necesario para cumplir la finalidad para la cual fue recibida, atender requerimientos internos o cumplir obligaciones legales.',
          'Fil-On Tech aplica medidas razonables de seguridad administrativa, técnica y organizacional para reducir riesgos de pérdida, acceso no autorizado, alteración o uso indebido.',
        ],
      },
      {
        title: 'Derechos del titular',
        body: [
          'El titular puede solicitar acceso, actualización, rectificación, supresión, revocatoria de autorización o información sobre el uso de sus datos, conforme a la normativa aplicable.',
          `${contactLine} Las solicitudes deben incluir identificación suficiente del titular y una descripción clara del requerimiento.`,
        ],
      },
    ],
  },
  terms: {
    seo: legalSeo['/terminos'],
    eyebrow: 'Términos de uso',
    title: 'Condiciones para navegar y usar este sitio.',
    intro:
      'Estos términos regulan el acceso y uso del sitio web de Fil-On Tech. Al navegarlo, el usuario acepta utilizar la información y los canales disponibles de forma responsable.',
    updatedAt: '13 de junio de 2026',
    sections: [
      {
        title: 'Naturaleza del contenido',
        body: [
          'El contenido publicado tiene carácter informativo, institucional y comercial. No constituye asesoría financiera, legal, tributaria, regulatoria ni una oferta vinculante de productos o servicios.',
          'La información sobre soluciones, capacidades, cotizaciones o referencias de mercado puede estar sujeta a cambios, validaciones, disponibilidad, requisitos documentales y condiciones particulares.',
        ],
      },
      {
        title: 'Uso permitido',
        body: [
          'El usuario se compromete a usar el sitio de forma lícita, respetuosa y compatible con su finalidad informativa y de contacto.',
          'No está permitido afectar la seguridad del sitio, intentar accesos no autorizados, copiar contenidos con fines indebidos o utilizar los canales para mensajes falsos, abusivos o contrarios a la ley.',
        ],
      },
      {
        title: 'Servicios y conversaciones comerciales',
        body: [
          'El envío de una solicitud por formulario, correo, teléfono, WhatsApp o tarjeta digital no implica aprobación automática, vinculación contractual ni obligación de prestación de servicio.',
          'Toda solución relacionada con capital, pagos, tecnología, control operativo o cumplimiento requiere revisión específica, validación de información y aceptación expresa de las partes.',
        ],
      },
      {
        title: 'Propiedad intelectual',
        body: [
          'Marcas, textos, diseño, fotografías, piezas gráficas, componentes visuales y demás contenidos del sitio pertenecen a Fil-On Tech o se usan con autorización.',
          'El usuario no adquiere derechos sobre dichos contenidos por el simple acceso al sitio.',
        ],
      },
      {
        title: 'Limitación de responsabilidad',
        body: [
          'Fil-On Tech procura mantener la información actualizada y disponible, pero no garantiza ausencia absoluta de errores, interrupciones, incompatibilidades técnicas o desactualización temporal.',
          'El usuario es responsable de verificar la pertinencia de la información antes de tomar decisiones comerciales, financieras u operativas.',
        ],
      },
      {
        title: 'Contacto',
        body: [
          `Para dudas sobre estos términos o el uso del sitio, el canal disponible es ${siteConfig.email}.`,
        ],
      },
    ],
  },
  cookies: {
    seo: legalSeo['/cookies'],
    eyebrow: 'Política de cookies',
    title: 'Control transparente sobre tecnologías de navegación.',
    intro:
      'Esta política explica qué son las cookies, para qué pueden utilizarse en el sitio de Fil-On Tech y cómo el usuario puede administrar su consentimiento.',
    updatedAt: '13 de junio de 2026',
    sections: [
      {
        title: 'Qué son las cookies',
        body: [
          'Las cookies son pequeños archivos o tecnologías similares que permiten recordar información sobre la navegación, mejorar funcionamiento, medir rendimiento o conservar preferencias.',
          'El sitio puede utilizar cookies propias y, si se integran herramientas externas, cookies de terceros asociadas a medición, seguridad o servicios embebidos.',
        ],
      },
      {
        title: 'Tipos de cookies',
        body: [
          'Clasificamos las cookies según su finalidad para que el usuario pueda decidir de forma clara.',
        ],
        items: [
          'Necesarias: permiten navegación, seguridad, carga de páginas y conservación del consentimiento.',
          'Analíticas: ayudan a conocer rendimiento, visitas, interacción general y oportunidades de mejora.',
          'Preferencias: permiten recordar decisiones del usuario para mejorar la experiencia.',
        ],
      },
      {
        title: 'Consentimiento',
        body: [
          'Al ingresar al sitio, el usuario puede aceptar todas las cookies, mantener solo las necesarias o guardar una selección personalizada.',
          'Las cookies necesarias no se pueden desactivar desde el modal porque son indispensables para el funcionamiento básico y la seguridad del sitio.',
        ],
      },
      {
        title: 'Gestión desde el navegador',
        body: [
          'El usuario puede borrar, bloquear o limitar cookies desde la configuración de su navegador. Al hacerlo, algunas funciones del sitio podrían comportarse de forma limitada.',
          'Los navegadores más comunes permiten revisar cookies almacenadas, eliminar datos de navegación y configurar reglas por sitio.',
        ],
      },
      {
        title: 'Actualizaciones',
        body: [
          'Fil-On Tech puede actualizar esta política si cambia el uso de tecnologías de medición, seguridad, preferencias o servicios externos.',
          `${contactLine} Para consultas sobre cookies o privacidad, puedes escribir a ese canal.`,
        ],
      },
    ],
  },
}

export function LegalPage({ kind }: LegalPageProps) {
  const content = contentByKind[kind]

  return (
    <>
      <Seo config={content.seo} />
      <section className="bg-[#f7f5f2] px-5 py-20 text-[#201614] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1080px]">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[#d67b45]">
                {content.eyebrow}
              </p>
              <h1 className="mt-5 max-w-[34rem] text-[2.55rem] font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-[3.3rem] lg:text-[3.85rem]">
                {content.title}
              </h1>
              <p className="mt-6 max-w-[31rem] text-[0.98rem] font-semibold leading-[1.6] text-[#201614]/76">
                {content.intro}
              </p>
              <div className="mt-7 rounded-[1.3rem] border border-[#8b4a24]/12 bg-white/68 p-5">
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[#8f4a22]">
                  Última actualización
                </p>
                <p className="mt-2 text-[0.94rem] font-bold text-[#201614]/82">
                  {content.updatedAt}
                </p>
              </div>
              <Link
                to="/contacto"
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#7b3412] px-6 text-[0.84rem] font-bold uppercase italic tracking-[-0.02em] text-white transition hover:brightness-[0.98]"
              >
                Contactar equipo &gt;
              </Link>
            </aside>

            <div className="space-y-5">
              {content.sections.map((section, index) => (
                <article
                  key={section.title}
                  className="rounded-[1.6rem] border border-[#8b4a24]/10 bg-white/76 p-6 shadow-[0_18px_52px_rgba(39,17,7,0.07)] sm:p-7"
                >
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[#d67b45]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1] tracking-[-0.055em] text-[#201614] sm:text-[1.9rem]">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[0.96rem] font-semibold leading-[1.66] text-[#201614]/76">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.items && (
                    <ul className="mt-5 grid gap-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-[1rem] bg-[#f1efec] px-4 py-3 text-[0.9rem] font-bold leading-[1.45] text-[#201614]/78"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
