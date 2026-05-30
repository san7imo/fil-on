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
      setActiveId((current) => nextResult.quotes.some((quote) => quote.id === current)
        ? current
        : nextResult.quotes[0]?.id)
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

  return (
    <section
      id={id}
      className={cn(
        'relative isolate flex min-h-screen overflow-hidden py-14 sm:py-16 lg:h-screen lg:min-h-[720px] lg:py-0',
        'bg-[#f7f5f2] text-[#201614]',
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_24%,rgba(230,142,88,0.08),transparent_32%)]"
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
            <LiveBadge status={result.status} />
            <h2 className="mt-3 max-w-[32rem] font-sans text-[2.05rem] font-extrabold leading-[0.94] tracking-[-0.06em] text-[#201614] sm:text-[2.65rem] lg:text-[2.95rem]">
              {title}
            </h2>
          </div>

          <div className="max-w-[39rem] lg:justify-self-end">
            <p className="text-[0.86rem] font-semibold leading-[1.45] text-[#201614]/72 sm:text-[0.92rem]">
              {text}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-[#201614]/52">
              <span>{result.sourceLabel}</span>
              <span>Actualizado {updatedLabel}</span>
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

function LiveBadge({ status }: { status: QuoteLoadResult['status'] }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#e3c4a8] bg-[#f1efec] px-3.5 py-1.5 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-[#8f4a22]">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d67b45] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d67b45]" />
      </span>
      En vivo
      {status === 'fallback' && <span className="text-[#8f4a22]/52">sincronizando</span>}
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
              'group min-h-[4rem] rounded-[1rem] border px-3.5 py-3 text-left transition duration-300 ease-out',
              active
                ? 'border-[#d67b45] bg-white text-[#201614] shadow-[0_8px_24px_rgba(214,123,69,0.12)]'
                : 'border-[#e3c4a8] bg-[#f1efec] text-[#201614] hover:border-[#d67b45] hover:bg-white',
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p
                  className={cn(
                    'text-[0.64rem] font-extrabold uppercase tracking-[0.16em]',
                    active ? 'text-[#d67b45]' : 'text-[#8f4a22]',
                  )}
                >
                  {quote.symbol}
                </p>
                  <p className="mt-1 text-[0.94rem] font-extrabold leading-none tracking-[-0.05em] text-[#201614]">
                  {quote.name}
                </p>
              </div>
              <span
                className={cn(
                  'rounded-full px-2 py-1 text-[0.66rem] font-extrabold',
                  positive
                    ? active
                      ? 'bg-[#d67b45]/16 text-[#a64e1d]'
                      : 'bg-[#e3c4a8]/40 text-[#7b4a2f]'
                    : active
                      ? 'bg-[#ef8f8d]/20 text-[#7b2f24]'
                      : 'bg-[#ef8f8d]/24 text-[#7b2f24]',
                )}
              >
                {positive ? '+' : ''}
                {quote.change.toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="text-[0.98rem] font-extrabold leading-none tracking-[-0.05em] text-[#201614]">
                {formatPrice(quote)}
              </p>
              <MiniBars quote={quote} active={active} />
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
      className="relative overflow-hidden rounded-[1.55rem] border border-[#e3c4a8] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)] sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[#8f4a22]">
            {quote.symbol} · {quote.market}
          </p>
          <h3 className="mt-2 font-sans text-[1.9rem] font-extrabold leading-none tracking-[-0.07em] text-[#201614] sm:text-[2.45rem]">
            {quote.name}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-[1.85rem] font-extrabold leading-none tracking-[-0.07em] text-[#201614] sm:text-[2.35rem]">
            {formatPrice(quote)}
          </p>
          <p className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#8f4a22]">
            {quote.unit}
          </p>
        </div>
      </div>

      <DetailedChart quote={quote} kind={kind} />

      <div className="mt-4 grid gap-2 sm:grid-cols-4">
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
              'relative min-h-[7.1rem] overflow-hidden rounded-[1.1rem] border p-4 text-left transition duration-300 ease-out',
              active
                ? 'border-[#d67b45] bg-white text-[#201614] shadow-[0_8px_24px_rgba(214,123,69,0.12)]'
                : 'border-[#e3c4a8] bg-[#f1efec] text-[#201614] hover:border-[#d67b45] hover:bg-white',
            )}
          >
            <span
              className={cn(
                'pointer-events-none absolute -bottom-2 right-2 font-sans text-[3.8rem] font-extrabold uppercase leading-none tracking-[-0.08em]',
                active ? 'text-[#201614]/6' : 'text-[#201614]/4',
              )}
            >
              {quote.name}
            </span>
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p
                  className={cn(
                    'text-[0.66rem] font-extrabold uppercase tracking-[0.16em]',
                    active ? 'text-[#d67b45]' : 'text-[#8f4a22]',
                  )}
                >
                  {quote.market}
                </p>
                  <h4 className="mt-1.5 text-[1.32rem] font-extrabold leading-none tracking-[-0.06em] text-[#201614]">
                  {quote.name}
                </h4>
              </div>
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold',
                  positive
                    ? active
                      ? 'bg-[#d67b45]/14 text-[#a64e1d]'
                      : 'bg-[#e3c4a8]/48 text-[#7b4a2f]'
                    : active
                      ? 'bg-[#ef8f8d]/20 text-[#7b2f24]'
                      : 'bg-[#ef8f8d]/24 text-[#7b2f24]',
                )}
              >
                {positive ? '+' : ''}
                {quote.change.toFixed(2)}%
              </span>
            </div>
            <div className="relative z-10 mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[1.55rem] font-extrabold leading-none tracking-[-0.06em] text-[#201614]">
                  {formatPrice(quote)}
                </p>
                <p
                  className={cn(
                    'mt-1 text-[0.66rem] font-extrabold uppercase tracking-[0.16em]',
                    active ? 'text-[#8f4a22]' : 'text-[#8f4a22]/64',
                  )}
                >
                  {quote.unit}
                </p>
              </div>
              <MiniLine quote={quote} active={active} />
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
    <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-[#e3c4a8] bg-[#f1efec] p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[12.6rem] w-full" aria-label={`Gráfico de ${quote.name}`}>
        <defs>
          <linearGradient id={`area-${quote.id}-${kind}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={quote.color} stopOpacity="0.16" />
            <stop offset="100%" stopColor={quote.color} stopOpacity="0.02" />
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
                stroke="rgba(143,74,34,0.1)"
                strokeDasharray="4 6"
              />
              <text
                x={width - 6}
                y={y + 4}
                textAnchor="end"
                className="fill-[#8f4a22]/56 text-[0.62rem] font-bold"
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
            fill="#f1efec"
            stroke={quote.color}
            strokeWidth="3"
          />
        ))}

        <text x={padding.left} y={height - 10} className="fill-[#8f4a22]/48 text-[0.62rem] font-bold">
          {firstLabel}
        </text>
        <text
          x={padding.left + chartWidth / 2}
          y={height - 10}
          textAnchor="middle"
          className="fill-[#8f4a22]/48 text-[0.62rem] font-bold"
        >
          {middleLabel}
        </text>
        <text
          x={padding.left + chartWidth}
          y={height - 10}
          textAnchor="end"
          className="fill-[#8f4a22]/48 text-[0.62rem] font-bold"
        >
          {lastLabel}
        </text>
      </svg>
    </div>
  )
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-[#e3c4a8] bg-[#f1efec] px-3 py-2.5">
      <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-[#8f4a22]">
        {label}
      </p>
      <p className="mt-1.5 text-[0.92rem] font-extrabold leading-none tracking-[-0.04em] text-[#201614]">
        {value}
      </p>
    </div>
  )
}

function MiniLine({
  quote,
  active,
}: {
  quote: MarketQuote
  active: boolean
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
        fill={active ? 'rgba(214,123,69,0.14)' : 'rgba(214,123,69,0.06)'}
      />
      <path
        d={path}
        fill="none"
        stroke={active ? quote.color : quote.color}
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
}: {
  quote: MarketQuote
  active: boolean
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
            active ? 'bg-[#d67b45]' : 'bg-[#e3c4a8]/64',
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
