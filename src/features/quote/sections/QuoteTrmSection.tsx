import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  loadTrmQuote,
  trmFallbackQuote,
  type TrmLoadResult,
} from '@/features/quote/data/trmQuote'

const viewport = { once: true, amount: 0.24 }
const reveal = {
  duration: 1.05,
  ease: [0.16, 1, 0.3, 1] as const,
}

export function QuoteTrmSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState<TrmLoadResult>({
    quote: trmFallbackQuote,
    status: 'fallback',
    sourceLabel: 'Datos Abiertos Colombia',
  })

  useEffect(() => {
    let active = true

    loadTrmQuote().then((nextResult) => {
      if (!active) return
      setResult(nextResult)
      setIsLoading(false)
    }).catch(() => {
      if (!active) return
      setIsLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  const { quote } = result
  const positive = quote.change >= 0
  const displayedStatus = isLoading ? 'loading' : result.status

  return (
    <section className="relative isolate overflow-hidden bg-[#f7f5f2] py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(234,146,141,0.2),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(214,123,69,0.14),transparent_30%)]"
      />

      <div className="mx-auto grid w-full max-w-[1120px] gap-5 px-5 sm:px-6 lg:grid-cols-[0.72fr_1fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reveal}
          viewport={viewport}
          className="flex flex-col justify-between"
        >
          <div>
            <p className="inline-flex rounded-full border border-[#7b3412]/14 bg-white/70 px-4 py-2 text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-[#7b3412]/72">
              Actualidad cambiaria
            </p>
            <h2 className="mt-4 max-w-[24rem] font-sans text-[2.55rem] font-extrabold leading-[0.9] tracking-[-0.075em] text-[#2b201b] sm:text-[3.4rem] lg:text-[4.15rem]">
              TRM para leer operación.
            </h2>
          </div>

          <p className="mt-5 max-w-[26rem] text-[0.95rem] font-semibold leading-[1.55] text-[#6f5a52]">
            La tasa representativa del mercado conecta costos, importaciones,
            pagos y decisiones de liquidez con una referencia diaria verificable.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: 0.12 }}
          viewport={viewport}
          className="relative min-h-[23rem] overflow-hidden rounded-[1.8rem] bg-[#2b201b] px-6 py-6 text-white shadow-[0_28px_90px_rgba(43,32,27,0.22)] sm:px-8 lg:min-h-[26rem]"
        >
          <span className="pointer-events-none absolute -bottom-5 right-4 font-sans text-[7rem] font-extrabold leading-none tracking-[-0.08em] text-white/6 sm:text-[9rem] lg:text-[10.5rem]">
            TRM
          </span>

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-white/46">
                  USD/COP · {quote.sourceName}
                </p>
                <h3 className="mt-2 font-sans text-[2.1rem] font-extrabold leading-none tracking-[-0.07em] sm:text-[2.8rem]">
                  Dólar oficial
                </h3>
              </div>

              <LiveBadge status={displayedStatus} />
            </div>

            <div>
              <p className="font-sans text-[3.25rem] font-extrabold leading-none tracking-[-0.08em] text-[#f5cfb0] sm:text-[4.4rem] lg:text-[5rem]">
                {formatCurrency(quote.value)}
              </p>
              <p className="mt-3 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-white/44">
                {quote.unit} por dólar estadounidense
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-4">
              <Metric label="Vigente desde" value={formatDate(quote.validFrom)} />
              <Metric label="Vigente hasta" value={formatDate(quote.validTo)} />
              <Metric
                label="Variación"
                value={`${positive ? '+' : ''}${quote.change.toFixed(2)}%`}
              />
              <Metric label="Fuente" value={result.sourceLabel} />
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

function LiveBadge({ status }: { status: TrmLoadResult['status'] | 'loading' }) {
  const isLive = status === 'live'

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-3.5 py-1.5 text-[0.64rem] font-extrabold uppercase tracking-[0.18em] text-white/78">
      <span className="relative flex h-2.5 w-2.5">
        {isLive ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5cfb0] opacity-60" />
        ) : null}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#f5cfb0]" />
      </span>
      {status === 'loading'
        ? 'Consultando fuente'
        : isLive
          ? 'Fuente activa'
          : 'Último dato disponible'}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.9rem] border border-white/10 bg-white/7 px-3 py-3">
      <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-white/38">
        {label}
      </p>
      <p className="mt-1.5 text-[0.82rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
        {value}
      </p>
    </div>
  )
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
