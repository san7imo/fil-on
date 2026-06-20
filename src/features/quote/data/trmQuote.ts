export type TrmQuote = {
  value: number
  unit: string
  validFrom: string
  validTo: string
  change: number
  sourceName: string
}

export type TrmLoadResult = {
  quote: TrmQuote
  status: 'live' | 'fallback'
  sourceLabel: string
}

export const trmFallbackQuote: TrmQuote = {
  value: 3459.53,
  unit: 'COP',
  validFrom: '2026-06-19T00:00:00.000',
  validTo: '2026-06-22T00:00:00.000',
  change: 0,
  sourceName: 'Datos Abiertos Colombia',
}

function isTrmQuote(value: unknown): value is TrmQuote {
  if (!value || typeof value !== 'object') return false
  const quote = value as TrmQuote

  return (
    typeof quote.value === 'number' &&
    typeof quote.unit === 'string' &&
    typeof quote.validFrom === 'string' &&
    typeof quote.validTo === 'string' &&
    typeof quote.change === 'number' &&
    typeof quote.sourceName === 'string'
  )
}

function isTrmLoadResult(value: unknown): value is TrmLoadResult {
  if (!value || typeof value !== 'object') return false
  const result = value as TrmLoadResult

  return (
    isTrmQuote(result.quote) &&
    (result.status === 'live' || result.status === 'fallback') &&
    typeof result.sourceLabel === 'string'
  )
}

export async function loadTrmQuote(): Promise<TrmLoadResult> {
  try {
    const response = await fetch('/api/trm', {
      headers: { accept: 'application/json' },
    })
    if (!response.ok) throw new Error('TRM response failed')

    const payload = await response.json()
    if (!isTrmLoadResult(payload)) throw new Error('Invalid TRM API payload')

    return payload
  } catch {
    return {
      quote: trmFallbackQuote,
      status: 'fallback',
      sourceLabel: 'Datos Abiertos Colombia',
    }
  }
}
