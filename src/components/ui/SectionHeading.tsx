import { cn } from '@/shared/lib/cn'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <span className="inline-flex rounded-full border border-brand-300/35 bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-700">
        {eyebrow}
      </span>
      <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink-950 text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-ink-600 sm:text-lg">
        {description}
      </p>
    </div>
  )
}
