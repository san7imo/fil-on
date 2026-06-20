type ApiRequest = {
  query?: {
    kind?: string
  }
  method?: string
}

type ApiResponse = {
  status: (code: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
  end: () => void
}

type MarketCategory = 'precious-metals' | 'agro'

type PricePoint = {
  label: string
  value: number
}

type MarketQuote = {
  id: string
  name: string
  symbol: string
  category: MarketCategory
  market: string
  price: number
  change: number
  unit: string
  color: string
  points: PricePoint[]
  sourceName: string
  lastUpdated: string
  high?: number
  low?: number
  volume?: number
}

type QuoteLoadResult = {
  quotes: MarketQuote[]
  status: 'live' | 'fallback'
  sourceLabel: string
}

type SilvCommodity = {
  price?: number
  last_updated?: string
  change_24h?: { percent?: number }
  change_7d?: { percent?: number }
  change_30d?: { percent?: number }
}

type SilvResponse = {
  commodities?: Record<string, SilvCommodity>
  metadata?: { updated?: string }
}

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number
        regularMarketTime?: number
        regularMarketDayHigh?: number
        regularMarketDayLow?: number
        regularMarketVolume?: number
        chartPreviousClose?: number
      }
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>
        }>
      }
    }>
  }
}

type SilvDefinition = {
  id: string
  sourceKey: string
  name: string
  symbol: string
  market: string
  unit: string
  color: string
}

type YahooDefinition = {
  id: string
  symbol: string
  name: string
  category: MarketCategory
  market: string
  unit: string
  color: string
}

const SILV_COMMODITIES_URL = 'https://data.silv.app/commodities.json'
const yahooChartUrl = (symbol: string) =>
  `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1mo&interval=1d`

const fetchHeaders = {
  accept: 'application/json,text/plain,*/*',
  'user-agent':
    'Mozilla/5.0 (compatible; FilOnTechMarketBot/1.0; +https://fil-ontech.com)',
}

const buildSeries = (base: number, factors: number[]): PricePoint[] =>
  factors.map((factor, index) => ({
    label: `D-${factors.length - index - 1}`,
    value: Number((base * factor).toFixed(2)),
  }))

const buildSeriesFromChanges = (
  price: number,
  change24h = 0,
  change7d = 0,
  change30d = 0,
): PricePoint[] => {
  const safePrice = Number.isFinite(price) && price > 0 ? price : 1
  const d30 = safePrice / (1 + change30d / 100)
  const d7 = safePrice / (1 + change7d / 100)
  const d1 = safePrice / (1 + change24h / 100)
  const values = [
    d30,
    d30 + (d7 - d30) * 0.35,
    d30 + (d7 - d30) * 0.7,
    d7,
    d7 + (d1 - d7) * 0.52,
    d1,
    safePrice,
  ]

  return values.map((value, index) => ({
    label: `D-${values.length - index - 1}`,
    value: Number(value.toFixed(2)),
  }))
}

const isoFromUnix = (timestamp?: number) =>
  timestamp ? new Date(timestamp * 1000).toISOString() : new Date().toISOString()

const percentChange = (current: number, previous?: number) => {
  if (!previous || previous <= 0) return 0
  return ((current - previous) / previous) * 100
}

const preciousMetalFallbackQuotes: MarketQuote[] = [
  {
    id: 'gold',
    name: 'Oro',
    symbol: 'XAU/USD',
    category: 'precious-metals',
    market: 'Spot internacional',
    price: 4540.77,
    change: 0.96,
    unit: 'USD/oz troy',
    color: '#d9a63c',
    points: buildSeries(4540.77, [0.998, 0.993, 0.997, 1.004, 1.001, 0.991, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T22:50:38.000Z',
  },
  {
    id: 'silver',
    name: 'Plata',
    symbol: 'XAG/USD',
    category: 'precious-metals',
    market: 'Spot internacional',
    price: 75.3,
    change: -0.47,
    unit: 'USD/oz troy',
    color: '#c7cbd2',
    points: buildSeries(75.3, [0.952, 0.966, 0.981, 0.996, 1.008, 1.005, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T22:50:39.000Z',
  },
  {
    id: 'copper',
    name: 'Cobre',
    symbol: 'HG/USD',
    category: 'precious-metals',
    market: 'COMEX / spot',
    price: 6.39,
    change: -0.42,
    unit: 'USD/lb',
    color: '#e06f3a',
    points: buildSeries(6.39, [0.928, 0.949, 0.965, 0.986, 1.011, 1.004, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T22:50:20.000Z',
  },
  {
    id: 'aluminum',
    name: 'Aluminio',
    symbol: 'ALI=F',
    category: 'precious-metals',
    market: 'COMEX',
    price: 3656.75,
    change: 0.54,
    unit: 'USD/t',
    color: '#8fd3d8',
    points: buildSeries(3656.75, [0.986, 0.992, 1.004, 1.011, 0.997, 1.006, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'platinum',
    name: 'Platino',
    symbol: 'XPT/USD',
    category: 'precious-metals',
    market: 'Spot internacional',
    price: 1922.9,
    change: -0.07,
    unit: 'USD/oz troy',
    color: '#dad1c8',
    points: buildSeries(1922.9, [0.978, 0.986, 0.993, 1.002, 1.008, 1.001, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'palladium',
    name: 'Paladio',
    symbol: 'XPD/USD',
    category: 'precious-metals',
    market: 'Spot internacional',
    price: 1368.5,
    change: -1.09,
    unit: 'USD/oz troy',
    color: '#b98460',
    points: buildSeries(1368.5, [1.075, 1.061, 1.044, 1.027, 1.011, 0.996, 1]),
    sourceName: 'SILV.DATA',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
]

const agronomicFallbackQuotes: MarketQuote[] = [
  {
    id: 'coffee',
    name: 'Café',
    symbol: 'KC=F',
    category: 'agro',
    market: 'ICE Futures',
    price: 265.9,
    change: -12.89,
    unit: 'USX/lb',
    color: '#7a4a2b',
    points: buildSeries(265.9, [1.148, 1.09, 1.055, 1.021, 0.994, 0.983, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'cocoa',
    name: 'Cacao',
    symbol: 'CC=F',
    category: 'agro',
    market: 'ICE Futures',
    price: 3901,
    change: -4.6,
    unit: 'USD/t',
    color: '#7d3d21',
    points: buildSeries(3901, [1.046, 1.028, 1.012, 0.991, 0.982, 1.006, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'corn',
    name: 'Maíz',
    symbol: 'ZC=F',
    category: 'agro',
    market: 'CBOT',
    price: 447,
    change: 1.15,
    unit: 'USX/bu',
    color: '#c8903e',
    points: buildSeries(447, [0.986, 0.991, 1.002, 1.008, 0.997, 1.01, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'soybean',
    name: 'Soya',
    symbol: 'ZS=F',
    category: 'agro',
    market: 'CBOT',
    price: 1186.5,
    change: 0.72,
    unit: 'USX/bu',
    color: '#8f8f45',
    points: buildSeries(1186.5, [0.981, 0.993, 1.004, 0.998, 1.006, 1.012, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'wheat',
    name: 'Trigo',
    symbol: 'ZW=F',
    category: 'agro',
    market: 'CBOT',
    price: 610.25,
    change: -0.33,
    unit: 'USX/bu',
    color: '#e0b84e',
    points: buildSeries(610.25, [1.01, 0.998, 0.986, 0.991, 1.004, 0.997, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
  {
    id: 'sugar',
    name: 'Azúcar',
    symbol: 'SB=F',
    category: 'agro',
    market: 'ICE Futures',
    price: 14.07,
    change: 0.21,
    unit: 'USX/lb',
    color: '#c7e5d3',
    points: buildSeries(14.07, [0.992, 1.006, 0.998, 1.012, 1.004, 0.996, 1]),
    sourceName: 'Yahoo Finance',
    lastUpdated: '2026-05-29T17:29:56.000Z',
  },
]

const silvMetalDefinitions: SilvDefinition[] = [
  {
    id: 'gold',
    sourceKey: 'gold',
    name: 'Oro',
    symbol: 'XAU/USD',
    market: 'Spot internacional',
    unit: 'USD/oz troy',
    color: '#d9a63c',
  },
  {
    id: 'silver',
    sourceKey: 'silver',
    name: 'Plata',
    symbol: 'XAG/USD',
    market: 'Spot internacional',
    unit: 'USD/oz troy',
    color: '#c7cbd2',
  },
  {
    id: 'copper',
    sourceKey: 'copper',
    name: 'Cobre',
    symbol: 'HG/USD',
    market: 'COMEX / spot',
    unit: 'USD/lb',
    color: '#e06f3a',
  },
  {
    id: 'platinum',
    sourceKey: 'platinum',
    name: 'Platino',
    symbol: 'XPT/USD',
    market: 'Spot internacional',
    unit: 'USD/oz troy',
    color: '#dad1c8',
  },
  {
    id: 'palladium',
    sourceKey: 'palladium',
    name: 'Paladio',
    symbol: 'XPD/USD',
    market: 'Spot internacional',
    unit: 'USD/oz troy',
    color: '#b98460',
  },
]

const yahooMetalDefinitions: YahooDefinition[] = [
  {
    id: 'aluminum',
    symbol: 'ALI=F',
    name: 'Aluminio',
    category: 'precious-metals',
    market: 'COMEX',
    unit: 'USD/t',
    color: '#8fd3d8',
  },
]

const agronomicDefinitions: YahooDefinition[] = [
  {
    id: 'coffee',
    symbol: 'KC=F',
    name: 'Café',
    category: 'agro',
    market: 'ICE Futures',
    unit: 'USX/lb',
    color: '#7a4a2b',
  },
  {
    id: 'cocoa',
    symbol: 'CC=F',
    name: 'Cacao',
    category: 'agro',
    market: 'ICE Futures',
    unit: 'USD/t',
    color: '#7d3d21',
  },
  {
    id: 'corn',
    symbol: 'ZC=F',
    name: 'Maíz',
    category: 'agro',
    market: 'CBOT',
    unit: 'USX/bu',
    color: '#c8903e',
  },
  {
    id: 'soybean',
    symbol: 'ZS=F',
    name: 'Soya',
    category: 'agro',
    market: 'CBOT',
    unit: 'USX/bu',
    color: '#8f8f45',
  },
  {
    id: 'wheat',
    symbol: 'ZW=F',
    name: 'Trigo',
    category: 'agro',
    market: 'CBOT',
    unit: 'USX/bu',
    color: '#e0b84e',
  },
  {
    id: 'sugar',
    symbol: 'SB=F',
    name: 'Azúcar',
    category: 'agro',
    market: 'ICE Futures',
    unit: 'USX/lb',
    color: '#c7e5d3',
  },
]

async function loadYahooQuote(
  definition: YahooDefinition,
  fallback: MarketQuote,
): Promise<MarketQuote> {
  const response = await fetch(yahooChartUrl(definition.symbol), {
    headers: fetchHeaders,
  })
  if (!response.ok) return fallback

  const data = (await response.json()) as YahooChartResponse
  const result = data.chart?.result?.[0]
  const closes =
    result?.indicators?.quote?.[0]?.close?.filter(
      (value): value is number => typeof value === 'number' && Number.isFinite(value),
    ) ?? []
  const price = result?.meta?.regularMarketPrice ?? closes.at(-1) ?? fallback.price
  const previous = closes.length > 1 ? closes[closes.length - 2] : result?.meta?.chartPreviousClose
  const sampled = closes.slice(-10)
  const points =
    sampled.length >= 2
      ? sampled.map((value, index) => ({
          label: `D-${sampled.length - index - 1}`,
          value: Number(value.toFixed(2)),
        }))
      : fallback.points

  return {
    ...fallback,
    name: definition.name,
    symbol: definition.symbol,
    market: definition.market,
    unit: definition.unit,
    color: definition.color,
    price,
    change: percentChange(price, previous),
    points,
    sourceName: 'Yahoo Finance',
    lastUpdated: isoFromUnix(result?.meta?.regularMarketTime),
    high: result?.meta?.regularMarketDayHigh,
    low: result?.meta?.regularMarketDayLow,
    volume: result?.meta?.regularMarketVolume,
  }
}

async function loadSilvMetals(): Promise<MarketQuote[]> {
  const response = await fetch(SILV_COMMODITIES_URL, {
    headers: fetchHeaders,
  })
  if (!response.ok) throw new Error('SILV response failed')

  const data = (await response.json()) as SilvResponse

  return silvMetalDefinitions.map((definition) => {
    const fallback =
      preciousMetalFallbackQuotes.find((quote) => quote.id === definition.id) ??
      preciousMetalFallbackQuotes[0]
    const commodity = data.commodities?.[definition.sourceKey]
    const price = Number(commodity?.price)
    const change24h = Number(commodity?.change_24h?.percent ?? fallback.change)
    const change7d = Number(commodity?.change_7d?.percent ?? change24h)
    const change30d = Number(commodity?.change_30d?.percent ?? change7d)

    return {
      ...fallback,
      name: definition.name,
      symbol: definition.symbol,
      market: definition.market,
      price: Number.isFinite(price) ? price : fallback.price,
      change: Number.isFinite(change24h) ? change24h : fallback.change,
      unit: definition.unit,
      color: definition.color,
      points: buildSeriesFromChanges(
        Number.isFinite(price) ? price : fallback.price,
        change24h,
        change7d,
        change30d,
      ),
      sourceName: 'SILV.DATA',
      lastUpdated: commodity?.last_updated ?? data.metadata?.updated ?? fallback.lastUpdated,
    }
  })
}

async function loadPreciousMetalQuotes(): Promise<QuoteLoadResult> {
  let usedLiveSource = false
  let silvQuotes: MarketQuote[]

  try {
    silvQuotes = await loadSilvMetals()
    usedLiveSource = true
  } catch {
    silvQuotes = preciousMetalFallbackQuotes.filter((quote) => quote.sourceName === 'SILV.DATA')
  }

  const yahooQuotes = await Promise.all(
    yahooMetalDefinitions.map(async (definition) => {
      const fallback =
        preciousMetalFallbackQuotes.find((quote) => quote.id === definition.id) ??
        preciousMetalFallbackQuotes[0]
      try {
        const quote = await loadYahooQuote(definition, fallback)
        if (quote.lastUpdated !== fallback.lastUpdated || quote.price !== fallback.price) {
          usedLiveSource = true
        }
        return quote
      } catch {
        return fallback
      }
    }),
  )

  return {
    quotes: [...silvQuotes, ...yahooQuotes],
    status: usedLiveSource ? 'live' : 'fallback',
    sourceLabel: 'SILV.DATA / Yahoo Finance',
  }
}

async function loadAgronomicQuotes(): Promise<QuoteLoadResult> {
  let usedLiveSource = false
  const quotes = await Promise.all(
    agronomicDefinitions.map(async (definition) => {
      const fallback =
        agronomicFallbackQuotes.find((quote) => quote.id === definition.id) ??
        agronomicFallbackQuotes[0]
      try {
        const quote = await loadYahooQuote(definition, fallback)
        if (quote.lastUpdated !== fallback.lastUpdated || quote.price !== fallback.price) {
          usedLiveSource = true
        }
        return quote
      } catch {
        return fallback
      }
    }),
  )

  return {
    quotes,
    status: usedLiveSource ? 'live' : 'fallback',
    sourceLabel: 'Yahoo Finance',
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

  const kind = req.query?.kind

  try {
    if (kind === 'metals') {
      res.status(200).json(await loadPreciousMetalQuotes())
      return
    }

    if (kind === 'agro') {
      res.status(200).json(await loadAgronomicQuotes())
      return
    }

    res.status(400).json({ error: 'Invalid kind. Use metals or agro.' })
  } catch {
    res.status(500).json({ error: 'Unable to load market quotes.' })
  }
}
