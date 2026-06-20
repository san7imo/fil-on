import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  agronomicFallbackQuotes,
  loadAgronomicQuotes,
  loadPreciousMetalQuotes,
  preciousMetalFallbackQuotes,
  type MarketQuote,
  type QuoteLoadResult,
} from '@/features/quote/data/marketQuotes'
import { cn } from '@/shared/lib/cn'

const viewport = { once: true, amount: 0.18 }
const reveal = {
  duration: 1.05,
  ease: [0.16, 1, 0.3, 1] as const,
}

type MarketSectionProps = {
  id: string
  title: string
  text: string
  kind: 'metals' | 'agro'
}

const sectionLoaders = {
  metals: loadPreciousMetalQuotes,
  agro: loadAgronomicQuotes,
}

const sectionFallbacks = {
  metals: preciousMetalFallbackQuotes,
  agro: agronomicFallbackQuotes,
}

export function QuoteMarketSection({ id, title, text, kind }: MarketSectionProps) {
  const fallback = sectionFallbacks[kind]
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState<QuoteLoadResult>({
    quotes: fallback,
    status: 'fallback',
    sourceLabel: kind === 'metals' ? 'SILV.DATA / Yahoo Finance' : 'Yahoo Finance',
  })
  const [activeId, setActiveId] = useState(fallback[0]?.id)

  useEffect(() => {
    let active = true

    sectionLoaders[kind]().then((nextResult) => {
      if (!active) return
      setResult(nextResult)
      setIsLoading(false)
      setActiveId((current) => nextResult.quotes.some((quote) => quote.id === current)
        ? current
        : nextResult.quotes[0]?.id)
    }).catch(() => {
      if (!active) return
      setIsLoading(false)
    })

    return () => {
      active = false
    }
  }, [kind])

  const activeQuote =
    result.quotes.find((quote) => quote.id === activeId) ?? result.quotes[0] ?? fallback[0]
  const sortedQuotes = useMemo(
    () => [...result.quotes].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)),
    [result.quotes],
  )
  const latestUpdate = useMemo(
    () =>
      result.quotes
        .map((quote) => new Date(quote.lastUpdated).getTime())
        .filter(Number.isFinite)
        .sort((a, b) => b - a)[0],
    [result.quotes],
  )
  const updatedLabel = latestUpdate
    ? new Intl.DateTimeFormat('es-CO', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(latestUpdate))
    : 'Sin fecha disponible'
  const displayedStatus = isLoading ? 'loading' : result.status
  const displayedUpdatedLabel = isLoading ? 'Consultando fuente' : `Actualizado ${updatedLabel}`

  return (
    <section
      id={id}
      className={cn(
        'relative isolate flex min-h-screen overflow-hidden py-12 sm:py-14 lg:h-screen lg:min-h-[720px] lg:py-0',
        kind === 'metals'
          ? 'bg-[#12100f] text-white'
          : 'bg-[linear-gradient(135deg,#15110e_0%,#3e1d14_42%,#ef8f8d_100%)] text-white',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 opacity-60',
          kind === 'metals'
            ? 'bg-[radial-gradient(circle_at_72%_20%,rgba(143,211,216,0.18),transparent_34%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,52px_52px,52px_52px]'
            : 'bg-[radial-gradient(circle_at_22%_20%,rgba(224,184,78,0.2),transparent_34%),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:auto,52px_52px,52px_52px]',
        )}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="grid gap-5 lg:grid-cols-[0.76fr_1fr] lg:items-end"
        >
          <div>
            <LiveBadge status={displayedStatus} />
            <h2 className="mt-3 max-w-[32rem] font-sans text-[2.05rem] font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-[2.65rem] lg:text-[2.95rem]">
              {title}
            </h2>
          </div>

          <div className="max-w-[39rem] lg:justify-self-end">
            <p className="text-[0.86rem] font-semibold leading-[1.45] text-white/76 sm:text-[0.92rem]">
              {text}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-white/54">
              <span>{result.sourceLabel}</span>
              <span>{displayedUpdatedLabel}</span>
            </div>
          </div>
        </motion.div>

        <TickerRail
          quotes={result.quotes}
          activeId={activeQuote.id}
          onSelect={setActiveId}
          kind={kind}
        />

        <div
          className={cn(
            'mt-4 grid gap-3',
            kind === 'metals'
              ? 'lg:grid-cols-[1.04fr_0.96fr] lg:items-stretch'
              : 'lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch',
          )}
        >
          {kind === 'agro' && (
            <MarketMap
              quotes={sortedQuotes}
              activeId={activeQuote.id}
              onSelect={setActiveId}
              kind={kind}
            />
          )}

          <MarketTerminal quote={activeQuote} kind={kind} />

          {kind === 'metals' && (
            <MarketMap
              quotes={sortedQuotes}
              activeId={activeQuote.id}
              onSelect={setActiveId}
              kind={kind}
            />
          )}
        </div>
      </div>
    </section>
  )
}

function LiveBadge({ status }: { status: QuoteLoadResult['status'] | 'loading' }) {
  const isLive = status === 'live'

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-3.5 py-1.5 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-white/78">
      <span className="relative flex h-2.5 w-2.5">
        {isLive ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8fd3d8] opacity-60" />
        ) : null}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8fd3d8]" />
      </span>
      {status === 'loading'
        ? 'Consultando fuente'
        : isLive
          ? 'Fuente activa'
          : 'Último dato disponible'}
    </div>
  )
}

function TickerRail({
  quotes,
  activeId,
  onSelect,
  kind,
}: {
  quotes: MarketQuote[]
  activeId: string
  onSelect: (id: string) => void
  kind: 'metals' | 'agro'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...reveal, delay: 0.08 }}
      viewport={viewport}
      className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6"
    >
      {quotes.map((quote) => {
        const active = quote.id === activeId
        const positive = quote.change >= 0

        return (
          <button
            key={quote.id}
            type="button"
            onClick={() => onSelect(quote.id)}
            className={cn(
              'group min-h-[4rem] rounded-[0.95rem] border px-3 py-2.5 text-left transition duration-300 ease-out',
              active
                ? 'border-white/34 bg-white text-[#16110f] shadow-[0_20px_50px_rgba(0,0,0,0.24)]'
                : 'border-white/10 bg-white/7 text-white hover:border-white/24 hover:bg-white/10',
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p
                  className={cn(
                    'text-[0.64rem] font-extrabold uppercase tracking-[0.16em]',
                    active ? 'text-[#8f4a22]' : 'text-white/48',
                  )}
                >
                  {quote.symbol}
                </p>
                  <p className="mt-1 text-[0.94rem] font-extrabold leading-none tracking-[-0.05em]">
                  {quote.name}
                </p>
              </div>
              <span
                className={cn(
                  'rounded-full px-2 py-1 text-[0.66rem] font-extrabold',
                  positive
                    ? active
                      ? 'bg-[#d67b45]/12 text-[#a64e1d]'
                      : 'bg-white/10 text-[#f5cfb0]'
                    : active
                      ? 'bg-[#7b2f24]/10 text-[#7b2f24]'
                      : 'bg-[#7b2f24]/24 text-white/76',
                )}
              >
                {positive ? '+' : ''}
                {quote.change.toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="text-[0.98rem] font-extrabold leading-none tracking-[-0.05em]">
                {formatPrice(quote)}
              </p>
              <MiniBars quote={quote} active={active} kind={kind} />
            </div>
          </button>
        )
      })}
    </motion.div>
  )
}

function MarketTerminal({ quote, kind }: { quote: MarketQuote; kind: 'metals' | 'agro' }) {
  const high = quote.high ?? Math.max(...quote.points.map((point) => point.value))
  const low = quote.low ?? Math.min(...quote.points.map((point) => point.value))

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...reveal, delay: 0.14 }}
      viewport={viewport}
      className="relative overflow-hidden rounded-[1.45rem] border border-white/12 bg-[rgba(255,255,255,0.08)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-[4px] sm:p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-white/48">
            {quote.symbol} · {quote.market}
          </p>
          <h3 className="mt-2 font-sans text-[1.9rem] font-extrabold leading-none tracking-[-0.07em] text-white sm:text-[2.45rem]">
            {quote.name}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-[1.85rem] font-extrabold leading-none tracking-[-0.07em] text-white sm:text-[2.35rem]">
            {formatPrice(quote)}
          </p>
          <p className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white/44">
            {quote.unit}
          </p>
        </div>
      </div>

      <DetailedChart quote={quote} kind={kind} />

      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        <MetricTile label="Mínimo" value={formatNumeric(low)} />
        <MetricTile label="Máximo" value={formatNumeric(high)} />
        <MetricTile label="Cambio" value={`${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(2)}%`} />
        <MetricTile label="Volumen" value={quote.volume ? compactNumber(quote.volume) : 'N/D'} />
      </div>
    </motion.article>
  )
}

function MarketMap({
  quotes,
  activeId,
  onSelect,
  kind,
}: {
  quotes: MarketQuote[]
  activeId: string
  onSelect: (id: string) => void
  kind: 'metals' | 'agro'
}) {
  const visibleQuotes = quotes.slice(0, 4)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...reveal, delay: 0.2 }}
      viewport={viewport}
      className="grid gap-3 sm:grid-cols-2"
    >
      {visibleQuotes.map((quote) => {
        const active = quote.id === activeId
        const positive = quote.change >= 0

        return (
          <button
            key={quote.id}
            type="button"
            onClick={() => onSelect(quote.id)}
            className={cn(
              'relative min-h-[7.1rem] overflow-hidden rounded-[1.1rem] border p-3.5 text-left transition duration-300 ease-out',
              active
                ? 'border-white/38 bg-white text-[#16110f]'
                : 'border-white/10 bg-white/7 text-white hover:border-white/24 hover:bg-white/10',
            )}
          >
            <span
              className={cn(
                'pointer-events-none absolute -bottom-2 right-2 font-sans text-[3.8rem] font-extrabold uppercase leading-none tracking-[-0.08em]',
                active ? 'text-[#16110f]/5' : 'text-white/6',
              )}
            >
              {quote.name}
            </span>
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p
                  className={cn(
                    'text-[0.66rem] font-extrabold uppercase tracking-[0.16em]',
                    active ? 'text-[#8f4a22]' : 'text-white/44',
                  )}
                >
                  {quote.market}
                </p>
                  <h4 className="mt-1.5 text-[1.32rem] font-extrabold leading-none tracking-[-0.06em]">
                  {quote.name}
                </h4>
              </div>
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold',
                  positive
                    ? active
                      ? 'bg-[#d67b45]/12 text-[#a64e1d]'
                      : 'bg-white/10 text-[#f5cfb0]'
                    : active
                      ? 'bg-[#7b2f24]/10 text-[#7b2f24]'
                      : 'bg-[#7b2f24]/24 text-white/76',
                )}
              >
                {positive ? '+' : ''}
                {quote.change.toFixed(2)}%
              </span>
            </div>
            <div className="relative z-10 mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[1.55rem] font-extrabold leading-none tracking-[-0.06em]">
                  {formatPrice(quote)}
                </p>
                <p
                  className={cn(
                    'mt-1 text-[0.66rem] font-extrabold uppercase tracking-[0.16em]',
                    active ? 'text-[#16110f]/42' : 'text-white/42',
                  )}
                >
                  {quote.unit}
                </p>
              </div>
              <MiniLine quote={quote} active={active} kind={kind} />
            </div>
          </button>
        )
      })}
    </motion.div>
  )
}

function DetailedChart({ quote, kind }: { quote: MarketQuote; kind: 'metals' | 'agro' }) {
  const width = 620
  const height = 200
  const padding = { top: 14, right: 56, bottom: 30, left: 18 }
  const values = quote.points.map((point) => point.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const step = chartWidth / Math.max(quote.points.length - 1, 1)
  const coordinates = quote.points.map((point, index) => {
    const x = padding.left + index * step
    const y = padding.top + chartHeight - ((point.value - min) / range) * chartHeight
    return { ...point, x, y }
  })
  const path = coordinates
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(' ')
  const area = `${path} L ${padding.left + chartWidth} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`
  const gridLines = [0, 0.25, 0.5, 0.75, 1]
  const firstLabel = quote.points[0]?.label ?? 'D-0'
  const middleLabel = quote.points[Math.floor(quote.points.length / 2)]?.label ?? 'D-0'
  const lastLabel = quote.points.at(-1)?.label ?? 'Hoy'

  return (
    <div className="mt-3 overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#090807]/72 p-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[12.6rem] w-full" aria-label={`Gráfico de ${quote.name}`}>
        <defs>
          <linearGradient id={`area-${quote.id}-${kind}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={quote.color} stopOpacity="0.36" />
            <stop offset="100%" stopColor={quote.color} stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {gridLines.map((line) => {
          const y = padding.top + chartHeight * line
          const value = max - range * line
          return (
            <g key={line}>
              <line
                x1={padding.left}
                x2={padding.left + chartWidth}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="4 6"
              />
              <text
                x={width - 6}
                y={y + 4}
                textAnchor="end"
                className="fill-white/42 text-[0.62rem] font-bold"
              >
                {formatNumeric(value)}
              </text>
            </g>
          )
        })}

        <path d={area} fill={`url(#area-${quote.id}-${kind})`} />
        <path
          d={path}
          fill="none"
          stroke={quote.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4.5"
        />
        {coordinates.map((point) => (
          <circle
            key={`${point.label}-${point.value}`}
            cx={point.x}
            cy={point.y}
            r="4.2"
            fill="#090807"
            stroke={quote.color}
            strokeWidth="3"
          />
        ))}

        <text x={padding.left} y={height - 10} className="fill-white/38 text-[0.62rem] font-bold">
          {firstLabel}
        </text>
        <text
          x={padding.left + chartWidth / 2}
          y={height - 10}
          textAnchor="middle"
          className="fill-white/38 text-[0.62rem] font-bold"
        >
          {middleLabel}
        </text>
        <text
          x={padding.left + chartWidth}
          y={height - 10}
          textAnchor="end"
          className="fill-white/38 text-[0.62rem] font-bold"
        >
          {lastLabel}
        </text>
      </svg>
    </div>
  )
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.85rem] border border-white/10 bg-white/7 px-3 py-2.5">
      <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-white/38">
        {label}
      </p>
      <p className="mt-1.5 text-[0.92rem] font-extrabold leading-none tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  )
}

function MiniLine({
  quote,
  active,
  kind,
}: {
  quote: MarketQuote
  active: boolean
  kind: 'metals' | 'agro'
}) {
  const width = 128
  const height = 42
  const values = quote.points.map((point) => point.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = width / Math.max(quote.points.length - 1, 1)
  const path = quote.points
    .map((point, index) => {
      const x = index * step
      const y = height - ((point.value - min) / range) * height
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-9 w-24" aria-hidden="true">
      <path
        d={`${path} L ${width} ${height} L 0 ${height} Z`}
        fill={active ? 'rgba(214,123,69,0.12)' : 'rgba(255,255,255,0.08)'}
      />
      <path
        d={path}
        fill="none"
        stroke={active ? quote.color : kind === 'metals' ? '#8fd3d8' : '#f5cfb0'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  )
}

function MiniBars({
  quote,
  active,
  kind,
}: {
  quote: MarketQuote
  active: boolean
  kind: 'metals' | 'agro'
}) {
  const values = quote.points.slice(-5).map((point) => point.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  return (
    <div className="flex h-7 items-end gap-1">
      {values.map((value, index) => (
        <span
          key={`${quote.id}-${index}`}
          className={cn(
            'block w-1.5 rounded-full',
            active ? 'bg-[#d67b45]' : kind === 'metals' ? 'bg-[#8fd3d8]/72' : 'bg-[#f5cfb0]/72',
          )}
          style={{ height: `${28 + ((value - min) / range) * 72}%` }}
        />
      ))}
    </div>
  )
}

function formatPrice(quote: MarketQuote) {
  return `$${quote.price.toLocaleString('en-US', {
    minimumFractionDigits: quote.price < 100 ? 2 : 0,
    maximumFractionDigits: quote.price < 100 ? 2 : 2,
  })}`
}

function formatNumeric(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: value < 100 ? 2 : 0,
    maximumFractionDigits: value < 100 ? 2 : 2,
  })
}

function compactNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}
