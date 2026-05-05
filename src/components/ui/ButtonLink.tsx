import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'

type ButtonLinkProps = {
  to: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

const variants = {
  primary:
    'bg-ink-950 text-white shadow-[0_18px_40px_rgba(11,21,38,0.18)] hover:-translate-y-0.5 hover:bg-ink-800',
  secondary:
    'border border-line bg-white/80 text-ink-950 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white',
}

export function ButtonLink({
  to,
  children,
  className,
  variant = 'primary',
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'inline-flex min-h-12 items-center rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] transition duration-300 ease-out',
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  )
}
