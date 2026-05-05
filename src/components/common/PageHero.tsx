import { cn } from '@/shared/lib/cn'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}

export function PageHero({
  eyebrow,
  title,
  description,
  align = 'left',
}: PageHeroProps) {
  return (
    <section className="page-shell pt-6 sm:pt-10">
      <div
        className={cn(
          'panel section-space px-6 sm:px-8 lg:px-12',
          align === 'center' && 'text-center',
        )}
      >
        <span className="inline-flex rounded-full border border-brand-300/40 bg-brand-100/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-700">
          {eyebrow}
        </span>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-ink-950 text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-ink-600 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}
