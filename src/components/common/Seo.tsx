import { useEffect } from 'react'
import {
  type SeoConfig,
  buildCanonicalUrl,
  buildOrganizationJsonLd,
  defaultSeo,
  getSeoByPath,
  siteUrl,
} from '@/shared/config/seo'

interface SeoProps {
  config?: SeoConfig
  pathname?: string
}

const managedSelectors = [
  'meta[data-seo="true"]',
  'link[data-seo="true"]',
  'script[data-seo="true"]',
]

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    element.dataset.seo = 'true'
    document.head.appendChild(element)
  }

  element.content = content
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    element.dataset.seo = 'true'
    document.head.appendChild(element)
  }

  element.href = href
}

export function Seo({ config, pathname }: SeoProps) {
  useEffect(() => {
    managedSelectors.forEach((selector) => {
      document.head.querySelectorAll(selector).forEach((element) => element.remove())
    })

    const seo = config ?? getSeoByPath(pathname ?? window.location.pathname)
    const canonicalUrl = buildCanonicalUrl(seo.path)
    const keywords = seo.keywords ?? defaultSeo.keywords ?? []

    document.documentElement.lang = 'es-CO'
    document.title = seo.title

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('name', 'keywords', keywords.join(', '))
    upsertMeta('name', 'author', 'Fil-On Tech')
    upsertMeta('name', 'theme-color', '#7b3412')
    upsertMeta('property', 'og:locale', 'es_CO')
    upsertMeta('property', 'og:type', seo.type ?? 'website')
    upsertMeta('property', 'og:site_name', 'Fil-On Tech')
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', `${siteUrl}/og-image.svg`)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', `${siteUrl}/og-image.svg`)
    upsertLink('canonical', canonicalUrl)

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seo = 'true'
    script.textContent = JSON.stringify(buildOrganizationJsonLd())
    document.head.appendChild(script)
  }, [config, pathname])

  return null
}
