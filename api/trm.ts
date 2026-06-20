type ApiRequest = {
  method?: string
}

type ApiResponse = {
  status: (code: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
  end: () => void
}

type TrmQuote = {
  value: number
  unit: string
  validFrom: string
  validTo: string
  change: number
  sourceName: string
}

type DatosGovTrmRow = {
  valor?: string
  unidad?: string
  vigenciadesde?: string
  vigenciahasta?: string
}

const TRM_URL =
  'https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=2&$order=vigenciahasta%20DESC'

const trmFallbackQuote: TrmQuote = {
  value: 3459.53,
  unit: 'COP',
  validFrom: '2026-06-19T00:00:00.000',
  validTo: '2026-06-22T00:00:00.000',
  change: 0,
  sourceName: 'Datos Abiertos Colombia',
}

const parseTrmRow = (row: DatosGovTrmRow, previous?: DatosGovTrmRow): TrmQuote => {
  const value = Number(row.valor)
  const previousValue = Number(previous?.valor)
  const change =
    Number.isFinite(value) && Number.isFinite(previousValue) && previousValue > 0
      ? ((value - previousValue) / previousValue) * 100
      : 0

  return {
    value: Number.isFinite(value) ? value : trmFallbackQuote.value,
    unit: row.unidad ?? trmFallbackQuote.unit,
    validFrom: row.vigenciadesde ?? trmFallbackQuote.validFrom,
    validTo: row.vigenciahasta ?? trmFallbackQuote.validTo,
    change,
    sourceName: 'Datos Abiertos Colombia',
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
    return
  }

  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

  try {
    const response = await fetch(TRM_URL, {
      headers: { accept: 'application/json' },
    })
    if (!response.ok) throw new Error('TRM response failed')

    const rows = (await response.json()) as DatosGovTrmRow[]
    const [latest, previous] = rows
    if (!latest) throw new Error('TRM response is empty')

    res.status(200).json({
      quote: parseTrmRow(latest, previous),
      status: 'live',
      sourceLabel: 'Datos Abiertos Colombia',
    })
  } catch {
    res.status(200).json({
      quote: trmFallbackQuote,
      status: 'fallback',
      sourceLabel: 'Datos Abiertos Colombia',
    })
  }
}
